import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios';

import { Workspace } from 'src/core/workspace/workspace.entity';
import { User } from 'src/core/user/user.entity';
import { EnvironmentService } from 'src/integrations/environment/environment.service';
import { SignUpService } from 'src/core/auth/services/sign-up.service';
import { FileUploadService } from 'src/core/file/services/file-upload.service';
import { UserWorkspaceService } from 'src/core/user-workspace/user-workspace.service';

describe('SignUpService', () => {
  let service: SignUpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SignUpService,
        {
          provide: FileUploadService,
          useValue: {},
        },
        {
          provide: UserWorkspaceService,
          useValue: {},
        },
        {
          provide: getRepositoryToken(Workspace, 'core'),
          useValue: {},
        },
        {
          provide: getRepositoryToken(User, 'core'),
          useValue: {},
        },
        {
          provide: EnvironmentService,
          useValue: {},
        },
        {
          provide: HttpService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<SignUpService>(SignUpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
