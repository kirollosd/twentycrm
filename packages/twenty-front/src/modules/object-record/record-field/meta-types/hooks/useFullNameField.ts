import { useContext } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { useRecordFieldInput } from '@/object-record/record-field/hooks/useRecordFieldInput';
import { recordStoreFamilySelector } from '@/object-record/record-store/states/selectors/recordStoreFamilySelector';

import { FieldContext } from '../../contexts/FieldContext';
import { usePersistField } from '../../hooks/usePersistField';
import { FieldFullNameValue } from '../../types/FieldMetadata';
import { assertFieldMetadata } from '../../types/guards/assertFieldMetadata';
import { isFieldFullName } from '../../types/guards/isFieldFullName';
import { isFieldFullNameValue } from '../../types/guards/isFieldFullNameValue';

export const useFullNameField = () => {
  const { entityId, fieldDefinition, hotkeyScope } = useContext(FieldContext);

  assertFieldMetadata('FULL_NAME', isFieldFullName, fieldDefinition);

  const fieldName = fieldDefinition.metadata.fieldName;

  const [fieldValue, setFieldValue] = useRecoilState<FieldFullNameValue>(
    recordStoreFamilySelector({
      recordId: entityId,
      fieldName: fieldName,
    }),
  );

  const persistField = usePersistField();

  const persistFullNameField = (newValue: FieldFullNameValue) => {
    if (!isFieldFullNameValue(newValue)) {
      return;
    }

    persistField(newValue);
  };

  const { setDraftValue, getDraftValueSelector } =
    useRecordFieldInput<FieldFullNameValue>(`${entityId}-${fieldName}`);

  const draftValue = useRecoilValue(getDraftValueSelector());

  return {
    fieldDefinition,
    fieldValue,
    setFieldValue,
    draftValue,
    setDraftValue,
    hotkeyScope,
    persistFullNameField,
  };
};
