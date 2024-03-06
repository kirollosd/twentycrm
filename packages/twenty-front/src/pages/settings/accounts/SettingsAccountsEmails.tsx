import { SettingsAccountsEmailsAccountsListCard } from '@/settings/accounts/components/SettingsAccountsEmailsAccountsListCard';
import { SettingsPageContainer } from '@/settings/components/SettingsPageContainer';
import { IconSettings } from '@/ui/display/icon';
import { H2Title } from '@/ui/display/typography/components/H2Title';
import { SubMenuTopBarContainer } from '@/ui/layout/page/SubMenuTopBarContainer';
import { Section } from '@/ui/layout/section/components/Section';
import { Breadcrumb } from '@/ui/navigation/bread-crumb/components/Breadcrumb';

export const SettingsAccountsEmails = () => (
  <SubMenuTopBarContainer Icon={IconSettings} title="Settings">
    <SettingsPageContainer>
      <Breadcrumb
        links={[
          { children: 'Accounts', href: '/settings/accounts' },
          { children: 'Emails' },
        ]}
      />
      <Section>
        <H2Title
          title="Emails sync"
          description="Sync your inboxes and set your privacy settings"
        />
        <SettingsAccountsEmailsAccountsListCard />
      </Section>
    </SettingsPageContainer>
  </SubMenuTopBarContainer>
);
