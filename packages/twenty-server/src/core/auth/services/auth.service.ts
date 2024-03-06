import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { render } from '@react-email/components';
import { PasswordUpdateNotifyEmail } from 'twenty-emails';

import { ChallengeInput } from 'src/core/auth/dto/challenge.input';
import { assert } from 'src/utils/assert';
import {
  PASSWORD_REGEX,
  compareHash,
  hashPassword,
} from 'src/core/auth/auth.util';
import { Verify } from 'src/core/auth/dto/verify.entity';
import { UserExists } from 'src/core/auth/dto/user-exists.entity';
import { WorkspaceInviteHashValid } from 'src/core/auth/dto/workspace-invite-hash-valid.entity';
import { User } from 'src/core/user/user.entity';
import { Workspace } from 'src/core/workspace/workspace.entity';
import { UserService } from 'src/core/user/services/user.service';
import { EnvironmentService } from 'src/integrations/environment/environment.service';
import { EmailService } from 'src/integrations/email/email.service';
import { UpdatePassword } from 'src/core/auth/dto/update-password.entity';
import { SignUpService } from 'src/core/auth/services/sign-up.service';

import { TokenService } from './token.service';

export type UserPayload = {
  firstName: string;
  lastName: string;
  email: string;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
    private readonly signUpService: SignUpService,
    @InjectRepository(Workspace, 'core')
    private readonly workspaceRepository: Repository<Workspace>,
    @InjectRepository(User, 'core')
    private readonly userRepository: Repository<User>,
    private readonly environmentService: EnvironmentService,
    private readonly emailService: EmailService,
  ) {}

  async challenge(challengeInput: ChallengeInput) {
    const user = await this.userRepository.findOneBy({
      email: challengeInput.email,
    });

    assert(user, "This user doesn't exist", NotFoundException);
    assert(user.passwordHash, 'Incorrect login method', ForbiddenException);

    const isValid = await compareHash(
      challengeInput.password,
      user.passwordHash,
    );

    assert(isValid, 'Wrong password', ForbiddenException);

    return user;
  }

  async signUp({
    email,
    password,
    workspaceInviteHash,
    firstName,
    lastName,
    picture,
  }: {
    email: string;
    password?: string;
    firstName?: string | null;
    lastName?: string | null;
    workspaceInviteHash?: string | null;
    picture?: string | null;
  }) {
    return await this.signUpService.signUp({
      email,
      password,
      firstName,
      lastName,
      workspaceInviteHash,
      picture,
    });
  }

  async verify(email: string): Promise<Verify> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
      relations: ['defaultWorkspace', 'workspaces', 'workspaces.workspace'],
    });

    assert(user, "This user doesn't exist", NotFoundException);

    assert(
      user.defaultWorkspace,
      'User has no default workspace',
      NotFoundException,
    );

    // passwordHash is hidden for security reasons
    user.passwordHash = '';
    const workspaceMember = await this.userService.loadWorkspaceMember(user);

    if (workspaceMember) {
      user.workspaceMember = workspaceMember;
    }

    const accessToken = await this.tokenService.generateAccessToken(user.id);
    const refreshToken = await this.tokenService.generateRefreshToken(user.id);

    return {
      user,
      tokens: {
        accessToken,
        refreshToken,
      },
    };
  }

  async checkUserExists(email: string): Promise<UserExists> {
    const user = await this.userRepository.findOneBy({
      email,
    });

    return { exists: !!user };
  }

  async checkWorkspaceInviteHashIsValid(
    inviteHash: string,
  ): Promise<WorkspaceInviteHashValid> {
    const workspace = await this.workspaceRepository.findOneBy({
      inviteHash,
    });

    return { isValid: !!workspace };
  }

  async impersonate(userId: string) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: ['defaultWorkspace'],
    });

    assert(user, "This user doesn't exist", NotFoundException);

    if (!user.defaultWorkspace.allowImpersonation) {
      throw new ForbiddenException('Impersonation not allowed');
    }

    const accessToken = await this.tokenService.generateAccessToken(user.id);
    const refreshToken = await this.tokenService.generateRefreshToken(user.id);

    return {
      user,
      tokens: {
        accessToken,
        refreshToken,
      },
    };
  }

  async updatePassword(
    userId: string,
    newPassword: string,
  ): Promise<UpdatePassword> {
    const user = await this.userRepository.findOneBy({ id: userId });

    assert(user, 'User not found', NotFoundException);

    const isPasswordValid = PASSWORD_REGEX.test(newPassword);

    assert(isPasswordValid, 'Password too weak', BadRequestException);

    const newPasswordHash = await hashPassword(newPassword);

    await this.userRepository.update(userId, {
      passwordHash: newPasswordHash,
    });

    const emailTemplate = PasswordUpdateNotifyEmail({
      userName: `${user.firstName} ${user.lastName}`,
      email: user.email,
      link: this.environmentService.getFrontBaseUrl(),
    });

    const html = render(emailTemplate, {
      pretty: true,
    });
    const text = render(emailTemplate, {
      plainText: true,
    });

    this.emailService.send({
      from: `${this.environmentService.getEmailFromName()} <${this.environmentService.getEmailFromAddress()}>`,
      to: user.email,
      subject: 'Your Password Has Been Successfully Changed',
      text,
      html,
    });

    return { success: true };
  }
}
