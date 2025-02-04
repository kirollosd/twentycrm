import { useNavigate } from 'react-router-dom';

import { ConnectedAccount } from '@/accounts/types/ConnectedAccount';
import { CoreObjectNameSingular } from '@/object-metadata/types/CoreObjectNameSingular';
import { useDeleteOneRecord } from '@/object-record/hooks/useDeleteOneRecord';
import { IconDotsVertical, IconMail, IconTrash } from '@/ui/display/icon';
import { LightIconButton } from '@/ui/input/button/components/LightIconButton';
import { Dropdown } from '@/ui/layout/dropdown/components/Dropdown';
import { DropdownMenu } from '@/ui/layout/dropdown/components/DropdownMenu';
import { DropdownMenuItemsContainer } from '@/ui/layout/dropdown/components/DropdownMenuItemsContainer';
import { useDropdown } from '@/ui/layout/dropdown/hooks/useDropdown';
import { MenuItem } from '@/ui/navigation/menu-item/components/MenuItem';

type SettingsAccountsRowDropdownMenuProps = {
  account: Pick<ConnectedAccount, 'id' | 'messageChannels'>;
  className?: string;
};

export const SettingsAccountsRowDropdownMenu = ({
  account,
  className,
}: SettingsAccountsRowDropdownMenuProps) => {
  const dropdownId = `settings-account-row-${account.id}`;

  const navigate = useNavigate();
  const { closeDropdown } = useDropdown(dropdownId);

  const { deleteOneRecord } = useDeleteOneRecord({
    objectNameSingular: CoreObjectNameSingular.ConnectedAccount,
  });

  return (
    <Dropdown
      dropdownId={dropdownId}
      className={className}
      dropdownPlacement="right-start"
      dropdownHotkeyScope={{ scope: dropdownId }}
      clickableComponent={
        <LightIconButton Icon={IconDotsVertical} accent="tertiary" />
      }
      dropdownComponents={
        <DropdownMenu>
          <DropdownMenuItemsContainer>
            <MenuItem
              LeftIcon={IconMail}
              text="Emails settings"
              onClick={() => {
                navigate(
                  `/settings/accounts/emails/${account.messageChannels.edges[0].node.id}`,
                );
                closeDropdown();
              }}
            />
            <MenuItem
              accent="danger"
              LeftIcon={IconTrash}
              text="Remove account"
              onClick={() => {
                deleteOneRecord(account.id);
                closeDropdown();
              }}
            />
          </DropdownMenuItemsContainer>
        </DropdownMenu>
      }
    />
  );
};
