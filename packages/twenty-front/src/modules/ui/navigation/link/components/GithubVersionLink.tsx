import { useTheme } from '@emotion/react';

import { IconBrandGithub } from '@/ui/display/icon';
import { ActionLink } from '@/ui/navigation/link/components/ActionLink.tsx';

import packageJson from '../../../../../../package.json';
import { GITHUB_LINK } from '../constants/GithubLink';

export const GithubVersionLink = () => {
  const theme = useTheme();

  return (
    <ActionLink href={GITHUB_LINK} target="_blank" rel="noreferrer">
      <IconBrandGithub size={theme.icon.size.md} />
      {packageJson.version}
    </ActionLink>
  );
};
