import { Module } from '@nestjs/common';

import { EnvironmentModule } from 'src/integrations/environment/environment.module';
import { WorkspaceManagerModule } from 'src/workspace/workspace-manager/workspace-manager.module';
import { DataSeedDemoWorkspaceService } from 'src/database/commands/data-seed-demo-workspace/services/data-seed-demo-workspace.service';

@Module({
  imports: [WorkspaceManagerModule, EnvironmentModule],
  providers: [DataSeedDemoWorkspaceService],
  exports: [DataSeedDemoWorkspaceService],
})
export class DataSeedDemoWorkspaceModule {}
