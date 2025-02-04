import { GateDecoratorParams } from 'src/workspace/workspace-sync-metadata/interfaces/gate-decorator.interface';

import {
  RelationOnDeleteAction,
  RelationMetadataType,
} from 'src/metadata/relation-metadata/relation-metadata.entity';

export interface RelationMetadataDecoratorParams {
  type: RelationMetadataType;
  objectName: string;
  inverseSideFieldName?: string;
  onDelete?: RelationOnDeleteAction;
}

export interface ReflectRelationMetadata {
  type: RelationMetadataType;
  fromObjectNameSingular: string;
  toObjectNameSingular: string;
  fromFieldMetadataName: string;
  toFieldMetadataName: string;
  gate?: GateDecoratorParams;
  onDelete: RelationOnDeleteAction;
}
