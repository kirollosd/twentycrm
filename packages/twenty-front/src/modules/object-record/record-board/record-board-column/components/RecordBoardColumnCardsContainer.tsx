import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { Draggable, DroppableProvided } from '@hello-pangea/dnd';

import { CoreObjectNameSingular } from '@/object-metadata/types/CoreObjectNameSingular';
import { RecordBoardContext } from '@/object-record/record-board/contexts/RecordBoardContext';
import { RecordBoardColumnCardsMemo } from '@/object-record/record-board/record-board-column/components/RecordBoardColumnCardsMemo';
import { RecordBoardColumnFetchMoreLoader } from '@/object-record/record-board/record-board-column/components/RecordBoardColumnFetchMoreLoader';
import { RecordBoardColumnNewButton } from '@/object-record/record-board/record-board-column/components/RecordBoardColumnNewButton';
import { RecordBoardColumnNewOpportunityButton } from '@/object-record/record-board/record-board-column/components/RecordBoardColumnNewOpportunityButton';
import { RecordBoardColumnContext } from '@/object-record/record-board/record-board-column/contexts/RecordBoardColumnContext';

const StyledColumnCardsContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const StyledNewButtonContainer = styled.div`
  padding-bottom: ${({ theme }) => theme.spacing(4)};
`;

type RecordBoardColumnCardsContainerProps = {
  recordIds: string[];
  droppableProvided: DroppableProvided;
};

export const RecordBoardColumnCardsContainer = ({
  recordIds,
  droppableProvided,
}: RecordBoardColumnCardsContainerProps) => {
  const { columnDefinition } = useContext(RecordBoardColumnContext);
  const { objectMetadataItem } = useContext(RecordBoardContext);

  return (
    <StyledColumnCardsContainer
      ref={droppableProvided?.innerRef}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...droppableProvided?.droppableProps}
    >
      <RecordBoardColumnCardsMemo recordIds={recordIds} />
      <RecordBoardColumnFetchMoreLoader />
      <Draggable
        draggableId={`new-${columnDefinition.id}`}
        index={recordIds.length}
        isDragDisabled={true}
      >
        {(draggableProvided) => (
          <div
            ref={draggableProvided?.innerRef}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...draggableProvided?.draggableProps}
          >
            <StyledNewButtonContainer>
              {objectMetadataItem.nameSingular ===
              CoreObjectNameSingular.Opportunity ? (
                <RecordBoardColumnNewOpportunityButton />
              ) : (
                <RecordBoardColumnNewButton />
              )}
            </StyledNewButtonContainer>
          </div>
        )}
      </Draggable>
    </StyledColumnCardsContainer>
  );
};
