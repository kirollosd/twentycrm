import { useMemo, useState } from 'react';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import { IconChevronDown } from '@/ui/display/icon';
import { IconComponent } from '@/ui/display/icon/types/IconComponent';
import { Dropdown } from '@/ui/layout/dropdown/components/Dropdown';
import { DropdownMenuItemsContainer } from '@/ui/layout/dropdown/components/DropdownMenuItemsContainer';
import { DropdownMenuSearchInput } from '@/ui/layout/dropdown/components/DropdownMenuSearchInput';
import { DropdownMenuSeparator } from '@/ui/layout/dropdown/components/DropdownMenuSeparator';
import { useDropdown } from '@/ui/layout/dropdown/hooks/useDropdown';
import { MenuItem } from '@/ui/navigation/menu-item/components/MenuItem';

import { SelectHotkeyScope } from '../types/SelectHotkeyScope';

export type SelectOption<Value extends string | number | null> = {
  value: Value;
  label: string;
  Icon?: IconComponent;
};

export type SelectProps<Value extends string | number | null> = {
  className?: string;
  disabled?: boolean;
  dropdownId: string;
  dropdownWidth?: `${string}px` | 'auto' | number;
  fullWidth?: boolean;
  label?: string;
  onChange?: (value: Value) => void;
  options: SelectOption<Value>[];
  value?: Value;
  withSearchInput?: boolean;
};

const StyledContainer = styled.div<{ fullWidth?: boolean }>`
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
`;

const StyledControlContainer = styled.div<{ disabled?: boolean }>`
  align-items: center;
  background-color: ${({ theme }) => theme.background.transparent.lighter};
  border: 1px solid ${({ theme }) => theme.border.color.medium};
  border-radius: ${({ theme }) => theme.border.radius.sm};
  color: ${({ disabled, theme }) =>
    disabled ? theme.font.color.tertiary : theme.font.color.primary};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  display: flex;
  gap: ${({ theme }) => theme.spacing(1)};
  height: ${({ theme }) => theme.spacing(8)};
  justify-content: space-between;
  padding: 0 ${({ theme }) => theme.spacing(2)};
`;

const StyledLabel = styled.span`
  color: ${({ theme }) => theme.font.color.light};
  display: block;
  font-size: ${({ theme }) => theme.font.size.xs};
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
  margin-bottom: ${({ theme }) => theme.spacing(1)};
  text-transform: uppercase;
`;

const StyledControlLabel = styled.div`
  align-items: center;
  display: flex;
  gap: ${({ theme }) => theme.spacing(1)};
`;

const StyledIconChevronDown = styled(IconChevronDown)<{ disabled?: boolean }>`
  color: ${({ disabled, theme }) =>
    disabled ? theme.font.color.extraLight : theme.font.color.tertiary};
`;

export const Select = <Value extends string | number | null>({
  className,
  disabled,
  dropdownId,
  dropdownWidth = 176,
  fullWidth,
  label,
  onChange,
  options,
  value,
  withSearchInput,
}: SelectProps<Value>) => {
  const theme = useTheme();
  const [searchInputValue, setSearchInputValue] = useState('');

  const selectedOption =
    options.find(({ value: key }) => key === value) || options[0];
  const filteredOptions = useMemo(
    () =>
      searchInputValue
        ? options.filter(({ label }) =>
            label.toLowerCase().includes(searchInputValue.toLowerCase()),
          )
        : options,
    [options, searchInputValue],
  );

  const { closeDropdown } = useDropdown(dropdownId);

  const selectControl = (
    <StyledControlContainer disabled={disabled}>
      <StyledControlLabel>
        {!!selectedOption?.Icon && (
          <selectedOption.Icon
            color={disabled ? theme.font.color.light : theme.font.color.primary}
            size={theme.icon.size.md}
            stroke={theme.icon.stroke.sm}
          />
        )}
        {selectedOption?.label}
      </StyledControlLabel>
      <StyledIconChevronDown disabled={disabled} size={theme.icon.size.md} />
    </StyledControlContainer>
  );

  return (
    <StyledContainer className={className} fullWidth={fullWidth}>
      {!!label && <StyledLabel>{label}</StyledLabel>}
      {disabled ? (
        selectControl
      ) : (
        <Dropdown
          dropdownId={dropdownId}
          dropdownMenuWidth={dropdownWidth}
          dropdownPlacement="bottom-start"
          clickableComponent={selectControl}
          dropdownComponents={
            <>
              {!!withSearchInput && (
                <DropdownMenuSearchInput
                  autoFocus
                  value={searchInputValue}
                  onChange={(event) => setSearchInputValue(event.target.value)}
                />
              )}
              {!!withSearchInput && !!filteredOptions.length && (
                <DropdownMenuSeparator />
              )}
              {!!filteredOptions.length && (
                <DropdownMenuItemsContainer hasMaxHeight>
                  {filteredOptions.map((option) => (
                    <MenuItem
                      key={option.value}
                      LeftIcon={option.Icon}
                      text={option.label}
                      onClick={() => {
                        onChange?.(option.value);
                        closeDropdown();
                      }}
                    />
                  ))}
                </DropdownMenuItemsContainer>
              )}
            </>
          }
          dropdownHotkeyScope={{ scope: SelectHotkeyScope.Select }}
        />
      )}
    </StyledContainer>
  );
};
