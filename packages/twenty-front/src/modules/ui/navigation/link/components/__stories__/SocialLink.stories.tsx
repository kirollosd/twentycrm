import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from '@storybook/test';

import { ComponentWithRouterDecorator } from '~/testing/decorators/ComponentWithRouterDecorator';

import { LinkType, SocialLink } from '../SocialLink';

const meta: Meta<typeof SocialLink> = {
  title: 'UI/Navigation/Link/SocialLink',
  component: SocialLink,
  decorators: [ComponentWithRouterDecorator],
  args: {
    href: '/test',
    children: 'Social Link',
  },
};

export default meta;
type Story = StoryObj<typeof SocialLink>;
const clickJestFn = fn();

const linkedin: LinkType = LinkType.LinkedIn;
const twitter: LinkType = LinkType.Twitter;

export const LinkedIn: Story = {
  args: {
    href: '/LinkedIn',
    children: 'LinkedIn',
    onClick: clickJestFn,
    type: linkedin,
  },
};

export const Twitter: Story = {
  args: {
    href: '/Twitter',
    children: 'Twitter',
    onClick: clickJestFn,
    type: twitter,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(clickJestFn).toHaveBeenCalledTimes(0);
    const link = canvas.getByRole('link');
    await userEvent.click(link);

    await expect(clickJestFn).toHaveBeenCalledTimes(1);
  },
};
