import { ReactNode, useEffect } from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { renderHook } from '@testing-library/react';
import { RecoilRoot, useSetRecoilState } from 'recoil';

import { useGetRelationMetadata } from '@/object-metadata/hooks/useGetRelationMetadata';
import { objectMetadataItemsState } from '@/object-metadata/states/objectMetadataItemsState';
import { getObjectMetadataItemsMock } from '@/object-metadata/utils/getObjectMetadataItemsMock';

import { TestApolloMetadataClientProvider } from '../__mocks__/ApolloMetadataClientProvider';

const Wrapper = ({ children }: { children: ReactNode }) => (
  <RecoilRoot>
    <MockedProvider addTypename={false}>
      <TestApolloMetadataClientProvider>
        {children}
      </TestApolloMetadataClientProvider>
    </MockedProvider>
  </RecoilRoot>
);

describe('useGetRelationMetadata', () => {
  it('should return correct properties', async () => {
    const objectMetadataItems = getObjectMetadataItemsMock();
    const objectMetadata = objectMetadataItems.find(
      (item) => item.nameSingular === 'person',
    )!;
    const fieldMetadataItem = objectMetadata.fields.find(
      (field) => field.name === 'opportunities',
    )!;

    const { result } = renderHook(
      () => {
        const setMetadataItems = useSetRecoilState(objectMetadataItemsState);

        useEffect(() => {
          setMetadataItems(objectMetadataItems);
        }, [setMetadataItems]);

        return useGetRelationMetadata();
      },
      {
        wrapper: Wrapper,
        initialProps: {},
      },
    );

    const {
      relationFieldMetadataItem,
      relationObjectMetadataItem,
      relationType,
    } = result.current({ fieldMetadataItem }) ?? {};

    const expectedRelationObjectMetadataItem = objectMetadataItems.find(
      (item) => item.nameSingular === 'opportunity',
    );
    const expectedRelationFieldMetadataItem =
      expectedRelationObjectMetadataItem?.fields.find(
        (field) => field.name === 'person',
      );

    expect(relationObjectMetadataItem).toEqual(
      expectedRelationObjectMetadataItem,
    );
    expect(relationFieldMetadataItem).toEqual(
      expectedRelationFieldMetadataItem,
    );
    expect(relationType).toBe('ONE_TO_MANY');
  });
});
