import { ReactNode } from 'react';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import { ConnectedAccount } from '@/accounts/types/ConnectedAccount';
import { IconComponent } from '@/ui/display/icon/types/IconComponent';
import { CardContent } from '@/ui/layout/card/components/CardContent';

const StyledRow = styled(CardContent)`
  align-items: center;
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'default')};
  display: flex;
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  gap: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(2)};
  padding-left: ${({ theme }) => theme.spacing(4)};
`;

const StyledAccountHandle = styled.span`
  flex: 1 0 auto;
`;

type SettingsAccountRowProps = {
  account: Pick<ConnectedAccount, 'handle'>;
  divider?: boolean;
  LeftIcon: IconComponent;
  onClick?: () => void;
  rightComponent: ReactNode;
};

export const SettingsAccountRow = ({
  account,
  divider,
  LeftIcon,
  onClick,
  rightComponent,
}: SettingsAccountRowProps) => {
  const theme = useTheme();

  return (
    <StyledRow onClick={onClick} divider={divider}>
      <LeftIcon size={theme.icon.size.md} />
      <StyledAccountHandle>{account.handle}</StyledAccountHandle>
      {rightComponent}
    </StyledRow>
  );
};
