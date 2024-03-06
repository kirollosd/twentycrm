import { useApolloClient } from '@apollo/client';

import { ObjectMetadataItem } from '@/object-metadata/types/ObjectMetadataItem';
import { getRecordsFromRecordConnection } from '@/object-record/cache/utils/getRecordsFromRecordConnection';
import { useGenerateFindManyRecordsQuery } from '@/object-record/hooks/useGenerateFindManyRecordsQuery';
import { ObjectRecord } from '@/object-record/types/ObjectRecord';
import { ObjectRecordQueryResult } from '@/object-record/types/ObjectRecordQueryResult';
import { ObjectRecordQueryVariables } from '@/object-record/types/ObjectRecordQueryVariables';
import { isNonNullable } from '~/utils/isNonNullable';

export const useReadFindManyRecordsQueryInCache = ({
  objectMetadataItem,
}: {
  objectMetadataItem: ObjectMetadataItem;
}) => {
  const apolloClient = useApolloClient();

  const generateFindManyRecordsQuery = useGenerateFindManyRecordsQuery();

  const readFindManyRecordsQueryInCache = <
    T extends ObjectRecord = ObjectRecord,
  >({
    queryVariables,
  }: {
    queryVariables: ObjectRecordQueryVariables;
  }) => {
    const findManyRecordsQueryForCacheRead = generateFindManyRecordsQuery({
      objectMetadataItem,
    });

    const existingRecordsQueryResult = apolloClient.readQuery<
      ObjectRecordQueryResult<T>
    >({
      query: findManyRecordsQueryForCacheRead,
      variables: queryVariables,
    });

    const existingRecordConnection =
      existingRecordsQueryResult?.[objectMetadataItem.namePlural];

    const existingObjectRecords = isNonNullable(existingRecordConnection)
      ? getRecordsFromRecordConnection({
          recordConnection: existingRecordConnection,
        })
      : [];

    return existingObjectRecords;
  };

  return {
    readFindManyRecordsQueryInCache,
  };
};
