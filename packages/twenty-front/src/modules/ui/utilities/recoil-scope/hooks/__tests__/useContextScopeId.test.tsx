import { createContext } from 'react';
import { renderHook } from '@testing-library/react';

import { useContextScopeId } from '@/ui/utilities/recoil-scope/hooks/useContextScopeId';

const mockedContextValue = 'mocked-scope-id';
const MockedContext = createContext<string | null>(mockedContextValue);
const nullContext = createContext<string | null>(null);

const ERROR_MESSAGE =
  'Using useContextScopedId outside of the specified context : undefined, verify that you are using a RecoilScope with the specific context you want to use.';

describe('useContextScopeId', () => {
  it('Should return the scoped ID when used within the specified context', () => {
    const { result } = renderHook(() => useContextScopeId(MockedContext), {
      wrapper: ({ children }) => (
        <MockedContext.Provider value={mockedContextValue}>
          {children}
        </MockedContext.Provider>
      ),
    });

    const scopedId = result.current;
    expect(scopedId).toBe(mockedContextValue);
  });

  it('Should throw an error when used outside of the specified context', () => {
    expect(() => {
      renderHook(() => useContextScopeId(nullContext));
    }).toThrow(ERROR_MESSAGE);
  });
});
