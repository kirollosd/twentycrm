import { useState } from 'react';
import styled from '@emotion/styled';

import { EmailThreadMessageBody } from '@/activities/emails/components/EmailThreadMessageBody';
import { EmailThreadMessageBodyPreview } from '@/activities/emails/components/EmailThreadMessageBodyPreview';
import { EmailThreadMessageReceivers } from '@/activities/emails/components/EmailThreadMessageReceivers';
import { EmailThreadMessageSender } from '@/activities/emails/components/EmailThreadMessageSender';
import { EmailThreadMessageParticipant } from '@/activities/emails/types/EmailThreadMessageParticipant';

const StyledThreadMessage = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.border.color.light};
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing(4, 0)};
`;

const StyledThreadMessageHeader = styled.div`
  display: flex;
  cursor: pointer;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(0, 6)};
`;

const StyledThreadMessageBody = styled.div`
  padding: ${({ theme }) => theme.spacing(0, 6)};
`;

type EmailThreadMessageProps = {
  body: string;
  sentAt: string;
  participants: EmailThreadMessageParticipant[];
};

export const EmailThreadMessage = ({
  body,
  sentAt,
  participants,
}: EmailThreadMessageProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const from = participants.find((participant) => participant.role === 'from');
  const receivers = participants.filter(
    (participant) => participant.role !== 'from',
  );

  if (!from || receivers.length === 0) {
    return null;
  }

  return (
    <StyledThreadMessage
      onClick={() => !isOpen && setIsOpen(true)}
      style={{ cursor: isOpen ? 'auto' : 'pointer' }}
    >
      <StyledThreadMessageHeader onClick={() => isOpen && setIsOpen(false)}>
        <EmailThreadMessageSender sender={from} sentAt={sentAt} />
        {isOpen && <EmailThreadMessageReceivers receivers={receivers} />}
      </StyledThreadMessageHeader>
      <StyledThreadMessageBody>
        {isOpen ? (
          <EmailThreadMessageBody body={body} isDisplayed />
        ) : (
          <EmailThreadMessageBodyPreview body={body} />
        )}
      </StyledThreadMessageBody>
    </StyledThreadMessage>
  );
};
