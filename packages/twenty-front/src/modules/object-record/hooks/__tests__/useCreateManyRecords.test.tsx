import { ReactNode } from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { mocked } from '@storybook/test';
import { act, renderHook } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { v4 } from 'uuid';

import { CoreObjectNameSingular } from '@/object-metadata/types/CoreObjectNameSingular';
import {
  query,
  response,
  variables,
} from '@/object-record/hooks/__mocks__/useCreateManyRecords';
import { useCreateManyRecords } from '@/object-record/hooks/useCreateManyRecords';

jest.mock('uuid', () => ({
  v4: jest.fn(),
}));

mocked(v4)
  .mockReturnValueOnce(variables.data[0].id)
  .mockReturnValueOnce(variables.data[1].id);

const input = variables.data.map(({ id: _id, ...personInput }) => personInput);

const mocks = [
  {
    request: {
      query,
      variables,
    },
    result: jest.fn(() => ({
      data: {
        createPeople: response,
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

describe('useCreateManyRecords', () => {
  it('works as expected', async () => {
    const { result } = renderHook(
      () =>
        useCreateManyRecords({
          objectNameSingular: CoreObjectNameSingular.Person,
        }),
      {
        wrapper: Wrapper,
      },
    );

    await act(async () => {
      const res = await result.current.createManyRecords(input);
      expect(res).toEqual(response);
    });

    expect(mocks[0].result).toHaveBeenCalled();
  });
});
