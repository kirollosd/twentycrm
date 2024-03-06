import { useContext } from 'react';
import { useRecoilState } from 'recoil';

import { FieldUUidValue } from '@/object-record/record-field/types/FieldMetadata';
import { isFieldUuid } from '@/object-record/record-field/types/guards/isFieldUuid';
import { recordStoreFamilySelector } from '@/object-record/record-store/states/selectors/recordStoreFamilySelector';

import { FieldContext } from '../../contexts/FieldContext';
import { assertFieldMetadata } from '../../types/guards/assertFieldMetadata';
import { isFieldTextValue } from '../../types/guards/isFieldTextValue';

export const useUuidField = () => {
  const { entityId, fieldDefinition, hotkeyScope } = useContext(FieldContext);

  assertFieldMetadata('UUID', isFieldUuid, fieldDefinition);

  const fieldName = fieldDefinition.metadata.fieldName;

  const [fieldValue, setFieldValue] = useRecoilState<FieldUUidValue>(
    recordStoreFamilySelector({
      recordId: entityId,
      fieldName: fieldName,
    }),
  );
  const fieldTextValue = isFieldTextValue(fieldValue) ? fieldValue : '';

  return {
    fieldDefinition,
    fieldValue: fieldTextValue,
    setFieldValue,
    hotkeyScope,
  };
};
