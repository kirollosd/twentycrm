import { ApolloCache, StoreObject } from '@apollo/client';

import { isCachedObjectRecordConnection } from '@/apollo/optimistic-effect/utils/isCachedObjectRecordConnection';
import { CachedObjectRecordEdge } from '@/apollo/types/CachedObjectRecordEdge';
import { isNonNullable } from '~/utils/isNonNullable';
import { capitalize } from '~/utils/string/capitalize';

export const triggerAttachRelationOptimisticEffect = ({
  cache,
  sourceObjectNameSingular,
  sourceRecordId,
  targetObjectNameSingular,
  fieldNameOnTargetRecord,
  targetRecordId,
}: {
  cache: ApolloCache<unknown>;
  sourceObjectNameSingular: string;
  sourceRecordId: string;
  targetObjectNameSingular: string;
  fieldNameOnTargetRecord: string;
  targetRecordId: string;
}) => {
  const sourceRecordTypeName = capitalize(sourceObjectNameSingular);
  const targetRecordTypeName = capitalize(targetObjectNameSingular);

  const targetRecordCacheId = cache.identify({
    id: targetRecordId,
    __typename: targetRecordTypeName,
  });

  cache.modify<StoreObject>({
    id: targetRecordCacheId,
    fields: {
      [fieldNameOnTargetRecord]: (targetRecordFieldValue, { toReference }) => {
        const fieldValueIsCachedObjectRecordConnection =
          isCachedObjectRecordConnection(
            sourceObjectNameSingular,
            targetRecordFieldValue,
          );

        const sourceRecordReference = toReference({
          id: sourceRecordId,
          __typename: sourceRecordTypeName,
        });

        if (!isNonNullable(sourceRecordReference)) {
          return targetRecordFieldValue;
        }

        if (fieldValueIsCachedObjectRecordConnection) {
          const nextEdges: CachedObjectRecordEdge[] = [
            ...targetRecordFieldValue.edges,
            {
              __typename: `${sourceRecordTypeName}Edge`,
              node: sourceRecordReference,
              cursor: '',
            },
          ];

          return {
            ...targetRecordFieldValue,
            edges: nextEdges,
          };
        } else {
          // To one object => attach next relation record
          return sourceRecordReference;
        }
      },
    },
  });
};
