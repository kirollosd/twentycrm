import { useRecoilCallback } from 'recoil';

import { useRecordTableStates } from '@/object-record/record-table/hooks/internal/useRecordTableStates';
import { getSnapshotValue } from '@/ui/utilities/recoil-scope/utils/getSnapshotValue';

import { TableCellPosition } from '../../types/TableCellPosition';

export const useMoveEditModeToTableCellPosition = (recordTableId?: string) => {
  const {
    isTableCellInEditModeFamilyState,
    getCurrentTableCellInEditModePositionState,
  } = useRecordTableStates(recordTableId);

  return useRecoilCallback(
    ({ set, snapshot }) => {
      return (newPosition: TableCellPosition) => {
        const currentTableCellInEditModePosition = getSnapshotValue(
          snapshot,
          getCurrentTableCellInEditModePositionState(),
        );

        set(
          isTableCellInEditModeFamilyState(currentTableCellInEditModePosition),
          false,
        );

        set(getCurrentTableCellInEditModePositionState(), newPosition);

        set(isTableCellInEditModeFamilyState(newPosition), true);
      };
    },
    [
      getCurrentTableCellInEditModePositionState,
      isTableCellInEditModeFamilyState,
    ],
  );
};
