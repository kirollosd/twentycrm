/* eslint-disable no-restricted-imports */
import { Module } from '@nestjs/common';

import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';

import { FileModule } from 'src/core/file/file.module';
import { User } from 'src/core/user/user.entity';
import { UserResolver } from 'src/core/user/user.resolver';
import { TypeORMService } from 'src/database/typeorm/typeorm.service';
import { DataSourceModule } from 'src/metadata/data-source/data-source.module';
import { TypeORMModule } from 'src/database/typeorm/typeorm.module';
import { UserWorkspaceModule } from 'src/core/user-workspace/user-workspace.module';
import { UserWorkspace } from 'src/core/user-workspace/user-workspace.entity';

import { userAutoResolverOpts } from './user.auto-resolver-opts';

import { UserService } from './services/user.service';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([User, UserWorkspace], 'core'),
        TypeORMModule,
      ],
      resolvers: userAutoResolverOpts,
    }),
    DataSourceModule,
    FileModule,
    UserWorkspaceModule,
  ],
  exports: [UserService],
  providers: [UserService, UserResolver, TypeORMService],
})
export class UserModule {}
