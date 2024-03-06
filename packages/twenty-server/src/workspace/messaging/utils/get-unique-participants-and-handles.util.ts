import { uniq, uniqBy } from 'lodash';

import { Participant } from 'src/workspace/messaging/types/gmail-message';
export function getUniqueParticipantsAndHandles(participants: Participant[]): {
  uniqueParticipants: Participant[];
  uniqueHandles: string[];
} {
  if (participants.length === 0) {
    return { uniqueParticipants: [], uniqueHandles: [] };
  }

  const uniqueHandles = uniq(
    participants.map((participant) => participant.handle),
  );

  const uniqueParticipants = uniqBy(participants, 'handle');

  return { uniqueParticipants, uniqueHandles };
}
