import { Meta } from '@storybook/react';

import { ModalWrapper } from '@/spreadsheet-import/components/ModalWrapper';
import { Providers } from '@/spreadsheet-import/components/Providers';
import { ValidationStep } from '@/spreadsheet-import/steps/components/ValidationStep/ValidationStep';
import {
  editableTableInitialData,
  mockRsiValues,
} from '@/spreadsheet-import/tests/mockRsiValues';
import { DialogManagerScope } from '@/ui/feedback/dialog-manager/scopes/DialogManagerScope';

const meta: Meta<typeof ValidationStep> = {
  title: 'Modules/SpreadsheetImport/ValidationStep',
  component: ValidationStep,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

const file = new File([''], 'file.csv');

export const Default = () => (
  <DialogManagerScope dialogManagerScopeId="dialog-manager">
    <Providers values={mockRsiValues}>
      <ModalWrapper isOpen={true} onClose={() => null}>
        <ValidationStep initialData={editableTableInitialData} file={file} />
      </ModalWrapper>
    </Providers>
  </DialogManagerScope>
);
