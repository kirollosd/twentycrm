import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { useFavorites } from '@/favorites/hooks/useFavorites';
import { useObjectMetadataItem } from '@/object-metadata/hooks/useObjectMetadataItem';
import { useFindOneRecord } from '@/object-record/hooks/useFindOneRecord';
import { RecordShowContainer } from '@/object-record/record-show/components/RecordShowContainer';
import { recordStoreFamilyState } from '@/object-record/record-store/states/recordStoreFamilyState';
import { IconBuildingSkyscraper } from '@/ui/display/icon';
import { PageBody } from '@/ui/layout/page/PageBody';
import { PageContainer } from '@/ui/layout/page/PageContainer';
import { PageFavoriteButton } from '@/ui/layout/page/PageFavoriteButton';
import { PageHeader } from '@/ui/layout/page/PageHeader';
import { ShowPageAddButton } from '@/ui/layout/show-page/components/ShowPageAddButton';
import { ShowPageMoreButton } from '@/ui/layout/show-page/components/ShowPageMoreButton';
import { PageTitle } from '@/ui/utilities/page-title/PageTitle';
import { FieldMetadataType } from '~/generated-metadata/graphql';
import { isNonNullable } from '~/utils/isNonNullable';

export const RecordShowPage = () => {
  const { objectNameSingular, objectRecordId } = useParams<{
    objectNameSingular: string;
    objectRecordId: string;
  }>();

  if (!objectNameSingular) {
    throw new Error(`Object name is not defined`);
  }

  if (!objectRecordId) {
    throw new Error(`Record id is not defined`);
  }

  const { labelIdentifierFieldMetadata, objectMetadataItem } =
    useObjectMetadataItem({ objectNameSingular });

  const { favorites, createFavorite, deleteFavorite } = useFavorites();

  const setEntityFields = useSetRecoilState(
    recordStoreFamilyState(objectRecordId),
  );

  const { record, loading } = useFindOneRecord({
    objectRecordId,
    objectNameSingular,
  });

  useEffect(() => {
    if (!record) return;
    setEntityFields(record);
  }, [record, setEntityFields]);

  const correspondingFavorite = favorites.find(
    (favorite) => favorite.recordId === objectRecordId,
  );

  const isFavorite = isNonNullable(correspondingFavorite);

  const handleFavoriteButtonClick = async () => {
    if (!objectNameSingular || !record) return;

    if (isFavorite && record) {
      deleteFavorite(correspondingFavorite.id);
    } else {
      createFavorite(record, objectNameSingular);
    }
  };

  const labelIdentifierFieldValue =
    record?.[labelIdentifierFieldMetadata?.name ?? ''];
  const pageName =
    labelIdentifierFieldMetadata?.type === FieldMetadataType.FullName
      ? [
          labelIdentifierFieldValue?.firstName,
          labelIdentifierFieldValue?.lastName,
        ].join(' ')
      : labelIdentifierFieldValue;

  return (
    <PageContainer>
      <PageTitle title={pageName} />
      <PageHeader
        title={pageName ?? ''}
        hasBackButton
        Icon={IconBuildingSkyscraper}
        loading={loading}
      >
        {record && (
          <>
            <PageFavoriteButton
              isFavorite={isFavorite}
              onClick={handleFavoriteButtonClick}
            />
            <ShowPageAddButton
              key="add"
              activityTargetObject={{
                id: record.id,
                targetObjectNameSingular: objectMetadataItem?.nameSingular,
              }}
            />
            <ShowPageMoreButton
              key="more"
              recordId={record.id}
              objectNameSingular={objectNameSingular}
            />
          </>
        )}
      </PageHeader>
      <PageBody>
        <RecordShowContainer
          objectNameSingular={objectNameSingular}
          objectRecordId={objectRecordId}
        />
      </PageBody>
    </PageContainer>
  );
};
