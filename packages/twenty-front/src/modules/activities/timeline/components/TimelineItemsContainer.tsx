import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';

import { timelineActivitiesForGroupState } from '@/activities/timeline/states/timelineActivitiesForGroupState';
import { ScrollWrapper } from '@/ui/utilities/scroll/components/ScrollWrapper';

import { groupActivitiesByMonth } from '../utils/groupActivitiesByMonth';

import { TimelineActivityGroup } from './TimelingeActivityGroup';

const StyledTimelineContainer = styled.div`
  align-items: center;
  align-self: stretch;

  display: flex;
  flex: 1 0 0;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
  justify-content: flex-start;

  padding: ${({ theme }) => theme.spacing(4)};
  width: calc(100% - ${({ theme }) => theme.spacing(8)});
`;

const StyledScrollWrapper = styled(ScrollWrapper)``;

export const TimelineItemsContainer = () => {
  const timelineActivitiesForGroup = useRecoilValue(
    timelineActivitiesForGroupState,
  );

  const groupedActivities = groupActivitiesByMonth(timelineActivitiesForGroup);

  return (
    <StyledScrollWrapper>
      <StyledTimelineContainer>
        {groupedActivities.map((group, index) => (
          <TimelineActivityGroup
            key={group.year.toString() + group.month}
            group={group}
            month={new Date(group.items[0].createdAt).toLocaleString(
              'default',
              { month: 'long' },
            )}
            year={
              index === 0 || group.year !== groupedActivities[index - 1].year
                ? group.year
                : undefined
            }
          />
        ))}
      </StyledTimelineContainer>
    </StyledScrollWrapper>
  );
};
