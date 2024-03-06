import { useInView } from 'react-intersection-observer';
import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';

import { useRecordBoardStates } from '@/object-record/record-board/hooks/internal/useRecordBoardStates';
import { GRAY_SCALE } from '@/ui/theme/constants/GrayScale';

const StyledText = styled.div`
  align-items: center;
  box-shadow: none;
  color: ${GRAY_SCALE.gray40};
  display: flex;
  height: 32px;
  margin-left: ${({ theme }) => theme.spacing(8)};
  padding-left: ${({ theme }) => theme.spacing(2)};
`;

export const RecordBoardColumnFetchMoreLoader = () => {
  const { getIsFetchingRecordState, getOnFetchMoreVisibilityChangeState } =
    useRecordBoardStates();
  const isFetchingRecords = useRecoilValue(getIsFetchingRecordState());

  const onFetchMoreVisibilityChange = useRecoilValue(
    getOnFetchMoreVisibilityChangeState(),
  );

  const { ref } = useInView({
    onChange: onFetchMoreVisibilityChange,
  });

  return (
    <div ref={ref}>
      {isFetchingRecords && <StyledText>Loading more...</StyledText>}
    </div>
  );
};
