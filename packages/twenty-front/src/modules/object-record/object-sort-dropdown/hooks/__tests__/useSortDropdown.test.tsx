import { act, renderHook, waitFor } from '@testing-library/react';
import { RecoilRoot } from 'recoil';

import { useSortDropdown } from '@/object-record/object-sort-dropdown/hooks/useSortDropdown';
import { Sort } from '@/object-record/object-sort-dropdown/types/Sort';
import { SortDefinition } from '@/object-record/object-sort-dropdown/types/SortDefinition';

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <RecoilRoot>{children}</RecoilRoot>
);

const sortDropdownId = 'sortDropdownId';
const renderHookConfig = {
  wrapper: Wrapper,
};

const sortDefinitions: SortDefinition[] = [
  { fieldMetadataId: 'id', label: 'definition label', iconName: 'icon' },
];

describe('useSortDropdown', () => {
  it('should set availableSortDefinitions', async () => {
    const { result } = renderHook(
      () => useSortDropdown({ sortDropdownId }),
      renderHookConfig,
    );
    expect(result.current.availableSortDefinitions).toEqual([]);
    act(() => {
      result.current.setAvailableSortDefinitions(sortDefinitions);
    });

    await waitFor(() => {
      expect(result.current.availableSortDefinitions).toEqual(sortDefinitions);
    });
  });

  it('should set isSortSelected', async () => {
    const { result } = renderHook(
      () => useSortDropdown({ sortDropdownId }),
      renderHookConfig,
    );

    expect(result.current.isSortSelected).toBe(false);

    act(() => {
      result.current.setIsSortSelected(true);
    });

    await waitFor(() => {
      expect(result.current.isSortSelected).toBe(true);
    });
  });

  it('should set onSortSelect', async () => {
    const OnSortSelectFunction = () => {};
    const mockOnSortSelect = jest.fn(() => OnSortSelectFunction);
    const { result } = renderHook(
      () => useSortDropdown({ sortDropdownId }),
      renderHookConfig,
    );

    expect(result.current.onSortSelect).toBeUndefined();

    act(() => {
      result.current.setOnSortSelect(mockOnSortSelect);
    });

    await waitFor(() => {
      expect(result.current.onSortSelect).toBe(OnSortSelectFunction);
    });
  });

  it('should call onSortSelect when a sort option is selected', async () => {
    const mockOnSortSelect = jest.fn(() => jest.fn());
    const sort: Sort = {
      fieldMetadataId: 'id',
      direction: 'asc',
      definition: sortDefinitions[0],
    };

    const { result } = renderHook(
      () => useSortDropdown({ sortDropdownId }),
      renderHookConfig,
    );

    act(() => {
      result.current.setOnSortSelect(mockOnSortSelect);
      result.current.onSortSelect?.(sort);
    });

    act(() => {
      result.current.onSortSelect?.(sort);
    });

    await waitFor(() => {
      expect(mockOnSortSelect.mock.results[0].value).toHaveBeenCalledWith(sort);
    });
  });
});
