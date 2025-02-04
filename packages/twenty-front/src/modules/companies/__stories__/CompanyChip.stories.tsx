import { Meta, StoryObj } from '@storybook/react';

import { ComponentWithRouterDecorator } from '~/testing/decorators/ComponentWithRouterDecorator';

import { CompanyChip } from '../components/CompanyChip';

const meta: Meta<typeof CompanyChip> = {
  title: 'Modules/Companies/CompanyChip',
  component: CompanyChip,
  decorators: [ComponentWithRouterDecorator],
};

export default meta;
type Story = StoryObj<typeof CompanyChip>;

export const SmallName: Story = {
  args: {
    opportunityId: 'airbnb',
    companyName: 'Airbnb',
    avatarUrl: 'https://api.faviconkit.com/airbnb.com/144',
  },
};

export const BigName: Story = {
  args: {
    opportunityId: 'google',
    companyName: 'Google with a real big name to overflow the cell',
    avatarUrl: 'https://api.faviconkit.com/google.com/144',
  },
};
