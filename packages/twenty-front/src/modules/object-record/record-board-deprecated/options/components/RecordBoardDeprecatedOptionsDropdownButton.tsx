import { BOARD_OPTIONS_DROPDOWN_ID } from '@/object-record/record-board-deprecated/constants/BoardOptionsDropdownId';
import { StyledHeaderDropdownButton } from '@/ui/layout/dropdown/components/StyledHeaderDropdownButton';
import { useDropdown } from '@/ui/layout/dropdown/hooks/useDropdown';

export const RecordBoardDeprecatedOptionsDropdownButton = () => {
  const { isDropdownOpen, toggleDropdown } = useDropdown(
    BOARD_OPTIONS_DROPDOWN_ID,
  );

  const handleClick = () => {
    toggleDropdown();
  };

  return (
    <StyledHeaderDropdownButton
      isUnfolded={isDropdownOpen}
      onClick={handleClick}
    >
      Options
    </StyledHeaderDropdownButton>
  );
};
