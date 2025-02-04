import { RecordChip } from '@/object-record/components/RecordChip';
import { useFindDuplicateRecords } from '@/object-record/hooks/useFindDuplicateRecords';
import { RecordDetailRecordsList } from '@/object-record/record-show/record-detail-section/components/RecordDetailRecordsList';
import { RecordDetailRecordsListItem } from '@/object-record/record-show/record-detail-section/components/RecordDetailRecordsListItem';
import { RecordDetailSection } from '@/object-record/record-show/record-detail-section/components/RecordDetailSection';
import { RecordDetailSectionHeader } from '@/object-record/record-show/record-detail-section/components/RecordDetailSectionHeader';

export const RecordDetailDuplicatesSection = ({
  objectRecordId,
  objectNameSingular,
}: {
  objectRecordId: string;
  objectNameSingular: string;
}) => {
  const { records: duplicateRecords } = useFindDuplicateRecords({
    objectRecordId,
    objectNameSingular,
  });

  if (!duplicateRecords.length) return null;

  return (
    <RecordDetailSection>
      <RecordDetailSectionHeader title="Duplicates" />
      <RecordDetailRecordsList>
        {duplicateRecords.slice(0, 5).map((duplicateRecord) => (
          <RecordDetailRecordsListItem key={duplicateRecord.id}>
            <RecordChip
              record={duplicateRecord}
              objectNameSingular={objectNameSingular}
            />
          </RecordDetailRecordsListItem>
        ))}
      </RecordDetailRecordsList>
    </RecordDetailSection>
  );
};
