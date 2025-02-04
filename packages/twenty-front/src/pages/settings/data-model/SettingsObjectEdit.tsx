import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import pick from 'lodash.pick';
import { z } from 'zod';

import { useObjectMetadataItemForSettings } from '@/object-metadata/hooks/useObjectMetadataItemForSettings';
import { useUpdateOneObjectMetadataItem } from '@/object-metadata/hooks/useUpdateOneObjectMetadataItem';
import { getObjectSlug } from '@/object-metadata/utils/getObjectSlug';
import { SaveAndCancelButtons } from '@/settings/components/SaveAndCancelButtons/SaveAndCancelButtons';
import { SettingsHeaderContainer } from '@/settings/components/SettingsHeaderContainer';
import { SettingsPageContainer } from '@/settings/components/SettingsPageContainer';
import {
  SettingsDataModelObjectAboutForm,
  settingsDataModelObjectAboutFormSchema,
} from '@/settings/data-model/objects/forms/components/SettingsDataModelObjectAboutForm';
import { SettingsDataModelObjectSettingsFormCard } from '@/settings/data-model/objects/forms/components/SettingsDataModelObjectSettingsFormCard';
import { settingsUpdateObjectInputSchema } from '@/settings/data-model/validation-schemas/settingsUpdateObjectInputSchema';
import { getSettingsPagePath } from '@/settings/utils/getSettingsPagePath';
import { AppPath } from '@/types/AppPath';
import { SettingsPath } from '@/types/SettingsPath';
import { IconArchive, IconSettings } from '@/ui/display/icon';
import { H2Title } from '@/ui/display/typography/components/H2Title';
import { useSnackBar } from '@/ui/feedback/snack-bar-manager/hooks/useSnackBar';
import { Button } from '@/ui/input/button/components/Button';
import { SubMenuTopBarContainer } from '@/ui/layout/page/SubMenuTopBarContainer';
import { Section } from '@/ui/layout/section/components/Section';
import { Breadcrumb } from '@/ui/navigation/bread-crumb/components/Breadcrumb';

const objectEditFormSchema = settingsDataModelObjectAboutFormSchema;

type SettingsDataModelObjectEditFormValues = z.infer<
  typeof objectEditFormSchema
>;

export const SettingsObjectEdit = () => {
  const navigate = useNavigate();
  const { enqueueSnackBar } = useSnackBar();

  const { objectSlug = '' } = useParams();
  const { findActiveObjectMetadataItemBySlug } =
    useObjectMetadataItemForSettings();
  const { updateOneObjectMetadataItem } = useUpdateOneObjectMetadataItem();

  const activeObjectMetadataItem =
    findActiveObjectMetadataItemBySlug(objectSlug);

  const settingsObjectsPagePath = getSettingsPagePath(SettingsPath.Objects);

  const formConfig = useForm<SettingsDataModelObjectEditFormValues>({
    mode: 'onTouched',
    resolver: zodResolver(objectEditFormSchema),
  });

  useEffect(() => {
    if (!activeObjectMetadataItem) navigate(AppPath.NotFound);
  }, [activeObjectMetadataItem, navigate]);

  if (!activeObjectMetadataItem) return null;

  const { isDirty, isValid } = formConfig.formState;
  const canSave = isDirty && isValid;

  const handleSave = async () => {
    const formValues = formConfig.getValues();
    const dirtyFieldKeys = Object.keys(
      formConfig.formState.dirtyFields,
    ) as (keyof SettingsDataModelObjectEditFormValues)[];

    try {
      await updateOneObjectMetadataItem({
        idToUpdate: activeObjectMetadataItem.id,
        updatePayload: settingsUpdateObjectInputSchema.parse(
          pick(formValues, dirtyFieldKeys),
        ),
      });

      navigate(`${settingsObjectsPagePath}/${getObjectSlug(formValues)}`);
    } catch (error) {
      enqueueSnackBar((error as Error).message, {
        variant: 'error',
      });
    }
  };

  const handleDisable = async () => {
    await updateOneObjectMetadataItem({
      idToUpdate: activeObjectMetadataItem.id,
      updatePayload: { isActive: false },
    });
    navigate(settingsObjectsPagePath);
  };

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FormProvider {...formConfig}>
      <SubMenuTopBarContainer Icon={IconSettings} title="Settings">
        <SettingsPageContainer>
          <SettingsHeaderContainer>
            <Breadcrumb
              links={[
                {
                  children: 'Objects',
                  href: settingsObjectsPagePath,
                },
                {
                  children: activeObjectMetadataItem.labelPlural,
                  href: `${settingsObjectsPagePath}/${objectSlug}`,
                },
                { children: 'Edit' },
              ]}
            />
            {activeObjectMetadataItem.isCustom && (
              <SaveAndCancelButtons
                isSaveDisabled={!canSave}
                onCancel={() =>
                  navigate(`${settingsObjectsPagePath}/${objectSlug}`)
                }
                onSave={handleSave}
              />
            )}
          </SettingsHeaderContainer>
          <Section>
            <H2Title
              title="About"
              description="Name in both singular (e.g., 'Invoice') and plural (e.g., 'Invoices') forms."
            />
            <SettingsDataModelObjectAboutForm
              disabled={!activeObjectMetadataItem.isCustom}
              objectMetadataItem={activeObjectMetadataItem}
            />
          </Section>
          <Section>
            <H2Title
              title="Settings"
              description="Choose the fields that will identify your records"
            />
            <SettingsDataModelObjectSettingsFormCard
              objectMetadataItem={activeObjectMetadataItem}
            />
          </Section>
          <Section>
            <H2Title title="Danger zone" description="Disable object" />
            <Button
              Icon={IconArchive}
              title="Disable"
              size="small"
              onClick={handleDisable}
            />
          </Section>
        </SettingsPageContainer>
      </SubMenuTopBarContainer>
    </FormProvider>
  );
};
