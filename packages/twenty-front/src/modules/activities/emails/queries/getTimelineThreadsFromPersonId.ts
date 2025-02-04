import { gql } from '@apollo/client';

import { timelineThreadWithTotalFragment } from '@/activities/emails/queries/fragments/timelineThreadWithTotalFragment';

export const getTimelineThreadsFromPersonId = gql`
  query GetTimelineThreadsFromPersonId(
    $personId: ID!
    $page: Int!
    $pageSize: Int!
  ) {
    getTimelineThreadsFromPersonId(
      personId: $personId
      page: $page
      pageSize: $pageSize
    ) {
      ...TimelineThreadsWithTotalFragment
    }
  }
  ${timelineThreadWithTotalFragment}
`;
