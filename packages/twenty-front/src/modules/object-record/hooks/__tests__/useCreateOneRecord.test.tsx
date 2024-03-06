import { ReactNode } from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { act, renderHook } from '@testing-library/react';
import { RecoilRoot } from 'recoil';

import { CoreObjectNameSingular } from '@/object-metadata/types/CoreObjectNameSingular';
import {
  query,
  responseData,
} from '@/object-record/hooks/__mocks__/useCreateOneRecord';
import { useCreateOneRecord } from '@/object-record/hooks/useCreateOneRecord';

const personId = 'a7286b9a-c039-4a89-9567-2dfa7953cda9';
const input = { name: { firstName: 'John', lastName: 'Doe' } };

jest.mock('uuid', () => ({
  v4: jest.fn(() => personId),
}));

const mocks = [
  {
    request: {
      query,
      variables: { input: { ...input, id: personId } },
    },
    result: jest.fn(() => ({
      data: {
        createPerson: { ...responseData, ...input, id: personId },
      },
    })),
  },
];

const Wrapper = ({ children }: { children: ReactNode }) => (
  <RecoilRoot>
    <MockedProvider mocks={mocks} addTypename={false}>
      {children}
    </MockedProvider>
  </RecoilRoot>
);

describe('useCreateOneRecord', () => {
  it('works as expected', async () => {
    const { result } = renderHook(
      () =>
        useCreateOneRecord({
          objectNameSingular: CoreObjectNameSingular.Person,
        }),
      {
        wrapper: Wrapper,
      },
    );

    await act(async () => {
      const res = await result.current.createOneRecord(input);
      console.log('res', res);
      expect(res).toBeDefined();
      expect(res).toHaveProperty('id', personId);
    });

    expect(mocks[0].result).toHaveBeenCalled();
  });
});
