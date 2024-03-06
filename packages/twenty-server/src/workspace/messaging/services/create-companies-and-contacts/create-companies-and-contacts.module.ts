import { Module } from '@nestjs/common';

import { PersonModule } from 'src/workspace/messaging/repositories/person/person.module';
import { WorkspaceMemberModule } from 'src/workspace/messaging/repositories/workspace-member/workspace-member.module';
import { CreateCompaniesAndContactsService } from 'src/workspace/messaging/services/create-companies-and-contacts/create-companies-and-contacts.service';
import { CreateCompanyModule } from 'src/workspace/messaging/services/create-company/create-company.module';
import { CreateContactModule } from 'src/workspace/messaging/services/create-contact/create-contact.module';
import { WorkspaceDataSourceModule } from 'src/workspace/workspace-datasource/workspace-datasource.module';

@Module({
  imports: [
    WorkspaceDataSourceModule,
    CreateContactModule,
    CreateCompanyModule,
    WorkspaceMemberModule,
    PersonModule,
  ],
  providers: [CreateCompaniesAndContactsService],
  exports: [CreateCompaniesAndContactsService],
})
export class CreateCompaniesAndContactsModule {}
