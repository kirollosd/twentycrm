import { BoardFieldDefinition } from '@/object-record/record-board-deprecated/types/BoardFieldDefinition';
import { FieldMetadata } from '@/object-record/record-field/types/FieldMetadata';
import { isNonNullable } from '~/utils/isNonNullable';

import { ViewField } from '../types/ViewField';

export const mapViewFieldsToBoardFieldDefinitions = (
  viewFields: ViewField[],
  fieldsMetadata: BoardFieldDefinition<FieldMetadata>[],
): BoardFieldDefinition<FieldMetadata>[] => {
  return viewFields
    .map((viewField) => {
      const correspondingFieldMetadata = fieldsMetadata.find(
        ({ fieldMetadataId }) => viewField.fieldMetadataId === fieldMetadataId,
      );

      return correspondingFieldMetadata
        ? {
            fieldMetadataId: viewField.fieldMetadataId,
            label: correspondingFieldMetadata.label,
            metadata: correspondingFieldMetadata.metadata,
            infoTooltipContent: correspondingFieldMetadata.infoTooltipContent,
            iconName: correspondingFieldMetadata.iconName,
            type: correspondingFieldMetadata.type,
            position: viewField.position,
            isVisible: viewField.isVisible,
            viewFieldId: viewField.id,
          }
        : null;
    })
    .filter(isNonNullable);
};
