import { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/test';

import { SettingsIntegrations } from '~/pages/settings/integrations/SettingsIntegrations';
import {
  PageDecorator,
  PageDecoratorArgs,
} from '~/testing/decorators/PageDecorator';
import { graphqlMocks } from '~/testing/graphqlMocks';
import { sleep } from '~/testing/sleep';

const meta: Meta<PageDecoratorArgs> = {
  title: 'Pages/Settings/Integrations/SettingsIntegrations',
  component: SettingsIntegrations,
  decorators: [PageDecorator],
  args: { routePath: '/settings/integrations' },
  parameters: {
    msw: graphqlMocks,
  },
};

export default meta;

export type Story = StoryObj<typeof SettingsIntegrations>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await sleep(1000);

    await canvas.findByText('Go to GitHub');
  },
};
