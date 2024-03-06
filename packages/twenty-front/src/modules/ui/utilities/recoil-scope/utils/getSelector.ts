import { RecoilState } from 'recoil';

import { StateScopeMapKey } from '@/ui/utilities/recoil-scope/scopes-internal/types/StateScopeMapKey';

export const getSelector = <StateType>(
  stateScopeMap: (stateScopeMapKey: StateScopeMapKey) => RecoilState<StateType>,
  scopeId: string,
) => {
  return () => stateScopeMap({ scopeId });
};
