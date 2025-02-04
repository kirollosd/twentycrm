import { useContext } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { useRecordFieldInput } from '@/object-record/record-field/hooks/useRecordFieldInput';
import { FieldNumberValue } from '@/object-record/record-field/types/FieldMetadata';
import { recordStoreFamilySelector } from '@/object-record/record-store/states/selectors/recordStoreFamilySelector';
import {
  canBeCastAsIntegerOrNull,
  castAsIntegerOrNull,
} from '~/utils/cast-as-integer-or-null';

import { FieldContext } from '../../contexts/FieldContext';
import { usePersistField } from '../../hooks/usePersistField';
import { assertFieldMetadata } from '../../types/guards/assertFieldMetadata';
import { isFieldNumber } from '../../types/guards/isFieldNumber';

export const useNumberField = () => {
  const { entityId, fieldDefinition, hotkeyScope } = useContext(FieldContext);

  assertFieldMetadata('NUMBER', isFieldNumber, fieldDefinition);

  const fieldName = fieldDefinition.metadata.fieldName;

  const [fieldValue, setFieldValue] = useRecoilState<number | null>(
    recordStoreFamilySelector({
      recordId: entityId,
      fieldName: fieldName,
    }),
  );

  const persistField = usePersistField();

  const persistNumberField = (newValue: string) => {
    if (!canBeCastAsIntegerOrNull(newValue)) {
      return;
    }

    const castedValue = castAsIntegerOrNull(newValue);

    persistField(castedValue);
  };

  const { setDraftValue, getDraftValueSelector } =
    useRecordFieldInput<FieldNumberValue>(`${entityId}-${fieldName}`);

  const draftValue = useRecoilValue(getDraftValueSelector());

  return {
    fieldDefinition,
    fieldValue,
    draftValue,
    setDraftValue,
    setFieldValue,
    hotkeyScope,
    persistNumberField,
  };
};
