import { Logger } from '@nestjs/common';

import { Command, CommandRunner, Option } from 'nest-commander';
import chalk from 'chalk';

import { WorkspaceHealthMode } from 'src/workspace/workspace-health/interfaces/workspace-health-options.interface';
import { WorkspaceHealthFixKind } from 'src/workspace/workspace-health/interfaces/workspace-health-fix-kind.interface';

import { WorkspaceHealthService } from 'src/workspace/workspace-health/workspace-health.service';
import { CommandLogger } from 'src/commands/command-logger';

interface WorkspaceHealthCommandOptions {
  workspaceId: string;
  mode?: WorkspaceHealthMode;
  fix?: WorkspaceHealthFixKind;
  dryRun?: boolean;
}

@Command({
  name: 'workspace:health',
  description: 'Check health of the given workspace.',
})
export class WorkspaceHealthCommand extends CommandRunner {
  private readonly logger = new Logger(WorkspaceHealthCommand.name);
  private readonly commandLogger = new CommandLogger(
    WorkspaceHealthCommand.name,
  );

  constructor(private readonly workspaceHealthService: WorkspaceHealthService) {
    super();
  }

  async run(
    _passedParam: string[],
    options: WorkspaceHealthCommandOptions,
  ): Promise<void> {
    const issues = await this.workspaceHealthService.healthCheck(
      options.workspaceId,
      {
        mode: options.mode ?? WorkspaceHealthMode.All,
      },
    );

    if (issues.length === 0) {
      this.logger.log(chalk.green('Workspace is healthy'));
    } else {
      this.logger.log(
        chalk.red(`Workspace is not healthy, found ${issues.length} issues`),
      );

      if (options.dryRun) {
        await this.commandLogger.writeLog(
          `workspace-health-issues-${options.workspaceId}`,
          issues,
        );
        this.logger.log(chalk.yellow('Issues written to log'));
      }
    }

    if (options.fix) {
      this.logger.log(chalk.yellow('Fixing issues'));

      const { workspaceMigrations, metadataEntities } =
        await this.workspaceHealthService.fixIssues(
          options.workspaceId,
          issues,
          {
            type: options.fix,
            applyChanges: !options.dryRun,
          },
        );
      const totalCount = workspaceMigrations.length + metadataEntities.length;

      if (options.dryRun) {
        await this.commandLogger.writeLog(
          `workspace-health-${options.fix}-migrations`,
          workspaceMigrations,
        );

        await this.commandLogger.writeLog(
          `workspace-health-${options.fix}-metadata-entities`,
          metadataEntities,
        );
      } else {
        this.logger.log(
          chalk.green(`Fixed ${totalCount}/${issues.length} issues`),
        );
      }
    }
  }

  @Option({
    flags: '-w, --workspace-id [workspace_id]',
    description: 'workspace id',
    required: true,
  })
  parseWorkspaceId(value: string): string {
    return value;
  }

  @Option({
    flags: '-f, --fix [kind]',
    description: 'fix issues',
    required: false,
  })
  fix(value: string): WorkspaceHealthFixKind {
    if (!Object.values(WorkspaceHealthFixKind).includes(value as any)) {
      throw new Error(`Invalid fix kind ${value}`);
    }

    return value as WorkspaceHealthFixKind;
  }

  @Option({
    flags: '-m, --mode [mode]',
    description: 'Mode of the health check [structure, metadata, all]',
    required: false,
    defaultValue: WorkspaceHealthMode.All,
  })
  parseMode(value: string): WorkspaceHealthMode {
    if (!Object.values(WorkspaceHealthMode).includes(value as any)) {
      throw new Error(`Invalid mode ${value}`);
    }

    return value as WorkspaceHealthMode;
  }

  @Option({
    flags: '-d, --dry-run',
    description: 'Dry run without applying changes',
    required: false,
  })
  dryRun(): boolean {
    return true;
  }
}
