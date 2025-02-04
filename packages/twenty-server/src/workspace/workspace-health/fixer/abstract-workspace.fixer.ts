import { EntityManager } from 'typeorm';

import {
  WorkspaceHealthIssue,
  WorkspaceHealthIssueType,
  WorkspaceIssueTypeToInterface,
} from 'src/workspace/workspace-health/interfaces/workspace-health-issue.interface';

import { ObjectMetadataEntity } from 'src/metadata/object-metadata/object-metadata.entity';
import { WorkspaceMigrationEntity } from 'src/metadata/workspace-migration/workspace-migration.entity';

export class CompareEntity<T> {
  current: T | null;
  altered: T | null;
}

export abstract class AbstractWorkspaceFixer<
  IssueTypes extends WorkspaceHealthIssueType,
  UpdateRecordEntities = unknown,
> {
  private issueTypes: IssueTypes[];

  constructor(...issueTypes: IssueTypes[]) {
    this.issueTypes = issueTypes;
  }

  filterIssues(
    issues: WorkspaceHealthIssue[],
  ): WorkspaceIssueTypeToInterface<IssueTypes>[] {
    return issues.filter(
      (issue): issue is WorkspaceIssueTypeToInterface<IssueTypes> =>
        this.issueTypes.includes(issue.type as IssueTypes),
    );
  }

  protected splitIssuesByType(
    issues: WorkspaceIssueTypeToInterface<IssueTypes>[],
  ): Record<IssueTypes, WorkspaceIssueTypeToInterface<IssueTypes>[]> {
    return issues.reduce(
      (
        acc: Record<IssueTypes, WorkspaceIssueTypeToInterface<IssueTypes>[]>,
        issue,
      ) => {
        const type = issue.type as IssueTypes;

        if (!acc[type]) {
          acc[type] = [];
        }
        acc[type].push(issue);

        return acc;
      },
      {} as Record<IssueTypes, WorkspaceIssueTypeToInterface<IssueTypes>[]>,
    );
  }

  async createWorkspaceMigrations?(
    manager: EntityManager,
    objectMetadataCollection: ObjectMetadataEntity[],
    issues: WorkspaceIssueTypeToInterface<IssueTypes>[],
  ): Promise<Partial<WorkspaceMigrationEntity>[]>;

  async createMetadataUpdates?(
    manager: EntityManager,
    objectMetadataCollection: ObjectMetadataEntity[],
    issues: WorkspaceIssueTypeToInterface<IssueTypes>[],
  ): Promise<CompareEntity<UpdateRecordEntities>[]>;
}
