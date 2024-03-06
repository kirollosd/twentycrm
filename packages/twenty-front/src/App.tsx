import { Route, Routes } from 'react-router-dom';

import { AppPath } from '@/types/AppPath';
import { SettingsPath } from '@/types/SettingsPath';
import { DefaultLayout } from '@/ui/layout/page/DefaultLayout';
import { useIsFeatureEnabled } from '@/workspace/hooks/useIsFeatureEnabled';
import { DefaultPageTitle } from '~/DefaultPageTitle';
import { CommandMenuEffect } from '~/effect-components/CommandMenuEffect';
import { GotoHotkeysEffect } from '~/effect-components/GotoHotkeysEffect';
import { ChooseYourPlan } from '~/pages/auth/ChooseYourPlan.tsx';
import { CreateProfile } from '~/pages/auth/CreateProfile';
import { CreateWorkspace } from '~/pages/auth/CreateWorkspace';
import { PasswordReset } from '~/pages/auth/PasswordReset';
import { PaymentSuccess } from '~/pages/auth/PaymentSuccess.tsx';
import { PlanRequired } from '~/pages/auth/PlanRequired';
import { SignInUp } from '~/pages/auth/SignInUp';
import { VerifyEffect } from '~/pages/auth/VerifyEffect';
import { DefaultHomePage } from '~/pages/DefaultHomePage';
import { ImpersonateEffect } from '~/pages/impersonate/ImpersonateEffect';
import { NotFound } from '~/pages/not-found/NotFound';
import { RecordIndexPage } from '~/pages/object-record/RecordIndexPage';
import { RecordShowPage } from '~/pages/object-record/RecordShowPage';
import { SettingsAccounts } from '~/pages/settings/accounts/SettingsAccounts';
import { SettingsAccountsCalendars } from '~/pages/settings/accounts/SettingsAccountsCalendars';
import { SettingsAccountsCalendarsSettings } from '~/pages/settings/accounts/SettingsAccountsCalendarsSettings';
import { SettingsAccountsEmails } from '~/pages/settings/accounts/SettingsAccountsEmails';
import { SettingsAccountsEmailsInboxSettings } from '~/pages/settings/accounts/SettingsAccountsEmailsInboxSettings';
import { SettingsNewAccount } from '~/pages/settings/accounts/SettingsNewAccount';
import { SettingsNewObject } from '~/pages/settings/data-model/SettingsNewObject';
import { SettingsObjectDetail } from '~/pages/settings/data-model/SettingsObjectDetail';
import { SettingsObjectEdit } from '~/pages/settings/data-model/SettingsObjectEdit';
import { SettingsObjectFieldEdit } from '~/pages/settings/data-model/SettingsObjectFieldEdit';
import { SettingsObjectNewFieldStep1 } from '~/pages/settings/data-model/SettingsObjectNewField/SettingsObjectNewFieldStep1';
import { SettingsObjectNewFieldStep2 } from '~/pages/settings/data-model/SettingsObjectNewField/SettingsObjectNewFieldStep2';
import { SettingsObjects } from '~/pages/settings/data-model/SettingsObjects';
import { SettingsDevelopersApiKeyDetail } from '~/pages/settings/developers/api-keys/SettingsDevelopersApiKeyDetail';
import { SettingsDevelopersApiKeysNew } from '~/pages/settings/developers/api-keys/SettingsDevelopersApiKeysNew';
import { SettingsDevelopers } from '~/pages/settings/developers/SettingsDevelopers';
import { SettingsDevelopersWebhooksDetail } from '~/pages/settings/developers/webhooks/SettingsDevelopersWebhookDetail';
import { SettingsDevelopersWebhooksNew } from '~/pages/settings/developers/webhooks/SettingsDevelopersWebhooksNew';
import { SettingsIntegrations } from '~/pages/settings/integrations/SettingsIntegrations';
import { SettingsAppearance } from '~/pages/settings/SettingsAppearance';
import { SettingsBilling } from '~/pages/settings/SettingsBilling.tsx';
import { SettingsProfile } from '~/pages/settings/SettingsProfile';
import { SettingsWorkspace } from '~/pages/settings/SettingsWorkspace';
import { SettingsWorkspaceMembers } from '~/pages/settings/SettingsWorkspaceMembers';
import { Tasks } from '~/pages/tasks/Tasks';

export const App = () => {
  const isSelfBillingEnabled = useIsFeatureEnabled('IS_SELF_BILLING_ENABLED');

  return (
    <>
      <DefaultPageTitle />
      <GotoHotkeysEffect />
      <CommandMenuEffect />
      <DefaultLayout>
        <Routes>
          <Route path={AppPath.Verify} element={<VerifyEffect />} />
          <Route path={AppPath.SignIn} element={<SignInUp />} />
          <Route path={AppPath.SignUp} element={<SignInUp />} />
          <Route path={AppPath.Invite} element={<SignInUp />} />
          <Route path={AppPath.ResetPassword} element={<PasswordReset />} />
          <Route path={AppPath.CreateWorkspace} element={<CreateWorkspace />} />
          <Route path={AppPath.CreateProfile} element={<CreateProfile />} />
          <Route
            path={AppPath.PlanRequired}
            element={
              isSelfBillingEnabled ? <ChooseYourPlan /> : <PlanRequired />
            }
          />
          <Route
            path={AppPath.PlanRequiredSuccess}
            element={<PaymentSuccess />}
          />
          <Route path={AppPath.Index} element={<DefaultHomePage />} />
          <Route path={AppPath.TasksPage} element={<Tasks />} />
          <Route path={AppPath.Impersonate} element={<ImpersonateEffect />} />
          <Route path={AppPath.RecordIndexPage} element={<RecordIndexPage />} />
          <Route path={AppPath.RecordShowPage} element={<RecordShowPage />} />

          <Route
            path={AppPath.SettingsCatchAll}
            element={
              <Routes>
                <Route
                  path={SettingsPath.ProfilePage}
                  element={<SettingsProfile />}
                />
                <Route
                  path={SettingsPath.Appearance}
                  element={<SettingsAppearance />}
                />
                <Route
                  path={SettingsPath.Accounts}
                  element={<SettingsAccounts />}
                />
                <Route
                  path={SettingsPath.NewAccount}
                  element={<SettingsNewAccount />}
                />
                <Route
                  path={SettingsPath.AccountsCalendars}
                  element={<SettingsAccountsCalendars />}
                />
                <Route
                  path={SettingsPath.AccountsCalendarsSettings}
                  element={<SettingsAccountsCalendarsSettings />}
                />
                <Route
                  path={SettingsPath.AccountsEmails}
                  element={<SettingsAccountsEmails />}
                />
                <Route
                  path={SettingsPath.AccountsEmailsInboxSettings}
                  element={<SettingsAccountsEmailsInboxSettings />}
                />
                <Route
                  path={SettingsPath.Billing}
                  element={<SettingsBilling />}
                />
                <Route
                  path={SettingsPath.WorkspaceMembersPage}
                  element={<SettingsWorkspaceMembers />}
                />
                <Route
                  path={SettingsPath.Workspace}
                  element={<SettingsWorkspace />}
                />
                <Route
                  path={SettingsPath.Objects}
                  element={<SettingsObjects />}
                />
                <Route
                  path={SettingsPath.ObjectDetail}
                  element={<SettingsObjectDetail />}
                />
                <Route
                  path={SettingsPath.ObjectEdit}
                  element={<SettingsObjectEdit />}
                />
                <Route
                  path={SettingsPath.NewObject}
                  element={<SettingsNewObject />}
                />
                <Route
                  path={SettingsPath.Developers}
                  element={<SettingsDevelopers />}
                />
                <Route
                  path={AppPath.DevelopersCatchAll}
                  element={
                    <Routes>
                      <Route
                        path={SettingsPath.DevelopersNewApiKey}
                        element={<SettingsDevelopersApiKeysNew />}
                      />
                      <Route
                        path={SettingsPath.DevelopersApiKeyDetail}
                        element={<SettingsDevelopersApiKeyDetail />}
                      />
                      <Route
                        path={SettingsPath.DevelopersNewWebhook}
                        element={<SettingsDevelopersWebhooksNew />}
                      />
                      <Route
                        path={SettingsPath.DevelopersNewWebhookDetail}
                        element={<SettingsDevelopersWebhooksDetail />}
                      />
                    </Routes>
                  }
                />
                <Route
                  path={SettingsPath.Integrations}
                  element={<SettingsIntegrations />}
                />
                <Route
                  path={SettingsPath.ObjectNewFieldStep1}
                  element={<SettingsObjectNewFieldStep1 />}
                />
                <Route
                  path={SettingsPath.ObjectNewFieldStep2}
                  element={<SettingsObjectNewFieldStep2 />}
                />
                <Route
                  path={SettingsPath.ObjectFieldEdit}
                  element={<SettingsObjectFieldEdit />}
                />
              </Routes>
            }
          />
          <Route path={AppPath.NotFoundWildcard} element={<NotFound />} />
        </Routes>
      </DefaultLayout>
    </>
  );
};
