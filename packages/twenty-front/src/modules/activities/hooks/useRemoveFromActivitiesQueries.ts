import { isNonEmptyArray, isNonEmptyString } from '@sniptt/guards';

import { ActivityTargetableObject } from '@/activities/types/ActivityTargetableEntity';
import { getActivityTargetsFilter } from '@/activities/utils/getActivityTargetsFilter';
import { useObjectMetadataItemOnly } from '@/object-metadata/hooks/useObjectMetadataItemOnly';
import { CoreObjectNameSingular } from '@/object-metadata/types/CoreObjectNameSingular';
import { OrderByField } from '@/object-metadata/types/OrderByField';
import { useReadFindManyRecordsQueryInCache } from '@/object-record/cache/hooks/useReadFindManyRecordsQueryInCache';
import { useUpsertFindManyRecordsQueryInCache } from '@/object-record/cache/hooks/useUpsertFindManyRecordsQueryInCache';
import { ObjectRecordQueryFilter } from '@/object-record/record-filter/types/ObjectRecordQueryFilter';
import { ObjectRecordQueryVariables } from '@/object-record/types/ObjectRecordQueryVariables';
import { sortByAscString } from '~/utils/array/sortByAscString';

// TODO: improve, no bug if query to inject doesn't exist
export const useRemoveFromActivitiesQueries = () => {
  const { objectMetadataItem: objectMetadataItemActivity } =
    useObjectMetadataItemOnly({
      objectNameSingular: CoreObjectNameSingular.Activity,
    });

  const {
    upsertFindManyRecordsQueryInCache: overwriteFindManyActivitiesInCache,
  } = useUpsertFindManyRecordsQueryInCache({
    objectMetadataItem: objectMetadataItemActivity,
  });

  const { objectMetadataItem: objectMetadataItemActivityTarget } =
    useObjectMetadataItemOnly({
      objectNameSingular: CoreObjectNameSingular.ActivityTarget,
    });

  const {
    readFindManyRecordsQueryInCache: readFindManyActivityTargetsQueryInCache,
  } = useReadFindManyRecordsQueryInCache({
    objectMetadataItem: objectMetadataItemActivityTarget,
  });

  const {
    readFindManyRecordsQueryInCache: readFindManyActivitiesQueryInCache,
  } = useReadFindManyRecordsQueryInCache({
    objectMetadataItem: objectMetadataItemActivity,
  });

  const removeFromActivitiesQueries = ({
    activityIdToRemove,
    targetableObjects,
    activitiesFilters,
    activitiesOrderByVariables,
  }: {
    activityIdToRemove: string;
    targetableObjects: ActivityTargetableObject[];
    activitiesFilters?: ObjectRecordQueryFilter;
    activitiesOrderByVariables?: OrderByField;
  }) => {
    const findManyActivitiyTargetsQueryFilter = getActivityTargetsFilter({
      targetableObjects,
    });

    const findManyActivityTargetsQueryVariables = {
      filter: findManyActivitiyTargetsQueryFilter,
    } as ObjectRecordQueryVariables;

    const existingActivityTargetsForTargetableObject =
      readFindManyActivityTargetsQueryInCache({
        queryVariables: findManyActivityTargetsQueryVariables,
      });

    const existingActivityIds = existingActivityTargetsForTargetableObject
      ?.map((activityTarget) => activityTarget.activityId)
      .filter(isNonEmptyString);

    const currentFindManyActivitiesQueryVariables = {
      filter: {
        id: {
          in: [...existingActivityIds].sort(sortByAscString),
        },
        ...activitiesFilters,
      },
      orderBy: activitiesOrderByVariables,
    };

    const existingActivities = readFindManyActivitiesQueryInCache({
      queryVariables: currentFindManyActivitiesQueryVariables,
    });

    if (!isNonEmptyArray(existingActivities)) {
      return;
    }

    const activityIdsAfterRemoval = existingActivityIds.filter(
      (existingActivityId) => existingActivityId !== activityIdToRemove,
    );

    const nextFindManyActivitiesQueryVariables = {
      filter: {
        id: {
          in: [...activityIdsAfterRemoval].sort(sortByAscString),
        },
        ...activitiesFilters,
      },
      orderBy: activitiesOrderByVariables,
    };

    const newActivities = existingActivities.filter(
      (existingActivity) => existingActivity.id !== activityIdToRemove,
    );

    overwriteFindManyActivitiesInCache({
      objectRecordsToOverwrite: newActivities,
      queryVariables: nextFindManyActivitiesQueryVariables,
    });
  };

  return {
    removeFromActivitiesQueries,
  };
};
