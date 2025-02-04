import { atom } from 'recoil';

import { WorkspaceMember } from '@/workspace-member/types/WorkspaceMember';

export const currentWorkspaceMemberState = atom<Omit<
  WorkspaceMember,
  'createdAt' | 'updatedAt' | 'userId' | 'userEmail'
> | null>({
  key: 'currentWorkspaceMemberState',
  default: null,
});
