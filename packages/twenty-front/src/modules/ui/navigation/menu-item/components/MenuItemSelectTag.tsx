import { useTheme } from '@emotion/react';
import { Tag } from 'tsup.ui.index';

import { IconCheck } from '@/ui/display/icon';
import { ThemeColor } from '@/ui/theme/constants/MainColorNames';

import { StyledMenuItemLeftContent } from '../internals/components/StyledMenuItemBase';

import { StyledMenuItemSelect } from './MenuItemSelect';

type MenuItemSelectTagProps = {
  selected: boolean;
  className?: string;
  onClick?: () => void;
  color: ThemeColor;
  text: string;
};

export const MenuItemSelectTag = ({
  color,
  selected,
  className,
  onClick,
  text,
}: MenuItemSelectTagProps) => {
  const theme = useTheme();

  return (
    <StyledMenuItemSelect
      onClick={onClick}
      className={className}
      selected={selected}
    >
      <StyledMenuItemLeftContent>
        <Tag color={color} text={text} />
      </StyledMenuItemLeftContent>
      {selected && <IconCheck size={theme.icon.size.sm} />}
    </StyledMenuItemSelect>
  );
};
