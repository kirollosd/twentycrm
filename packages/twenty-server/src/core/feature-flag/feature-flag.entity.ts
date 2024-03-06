import { Field, ID, ObjectType } from '@nestjs/graphql';

import {
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { IDField } from '@ptc-org/nestjs-query-graphql';

import { Workspace } from 'src/core/workspace/workspace.entity';

export enum FeatureFlagKeys {
  IsBlocklistEnabled = 'IS_BLOCKLIST_ENABLED',
  IsCalendarEnabled = 'IS_CALENDAR_ENABLED',
  IsSelfBillingEnabled = 'IS_SELF_BILLING_ENABLED',
}

@Entity({ name: 'featureFlag', schema: 'core' })
@ObjectType('FeatureFlag')
@Unique('IndexOnKeyAndWorkspaceIdUnique', ['key', 'workspaceId'])
export class FeatureFlagEntity {
  @IDField(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ nullable: false, type: 'text' })
  key: FeatureFlagKeys;

  @Field()
  @Column({ nullable: false, type: 'uuid' })
  workspaceId: string;

  @ManyToOne(() => Workspace, (workspace) => workspace.featureFlags, {
    onDelete: 'CASCADE',
  })
  workspace: Workspace;

  @Field()
  @Column({ nullable: false })
  value: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
