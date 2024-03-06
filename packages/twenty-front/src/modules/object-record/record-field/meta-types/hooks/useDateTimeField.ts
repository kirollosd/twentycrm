import { useContext } from 'react';
import { useRecoilState } from 'recoil';

import { useRecordFieldInput } from '@/object-record/record-field/hooks/useRecordFieldInput';
import { FieldDateTimeValue } from '@/object-record/record-field/types/FieldMetadata';
import { recordStoreFamilySelector } from '@/object-record/record-store/states/selectors/recordStoreFamilySelector';

import { FieldContext } from '../../contexts/FieldContext';
import { assertFieldMetadata } from '../../types/guards/assertFieldMetadata';
import { isFieldDateTime } from '../../types/guards/isFieldDateTime';

export const useDateTimeField = () => {
  const { entityId, fieldDefinition, hotkeyScope, clearable } =
    useContext(FieldContext);

  assertFieldMetadata('DATE_TIME', isFieldDateTime, fieldDefinition);

  const fieldName = fieldDefinition.metadata.fieldName;

  const [fieldValue, setFieldValue] = useRecoilState<string>(
    recordStoreFamilySelector({
      recordId: entityId,
      fieldName: fieldName,
    }),
  );

  const { setDraftValue } = useRecordFieldInput<FieldDateTimeValue>(
    `${entityId}-${fieldName}`,
  );

  return {
    fieldDefinition,
    fieldValue,
    setDraftValue,
    setFieldValue,
    hotkeyScope,
    clearable,
  };
};
