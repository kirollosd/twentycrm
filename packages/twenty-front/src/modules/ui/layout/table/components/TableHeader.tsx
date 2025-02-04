import styled from '@emotion/styled';

const StyledTableHeader = styled.div<{ align?: 'left' | 'center' | 'right' }>`
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.border.color.light};
  color: ${({ theme }) => theme.font.color.tertiary};
  display: flex;
  font-weight: ${({ theme }) => theme.font.weight.medium};
  height: ${({ theme }) => theme.spacing(8)};
  justify-content: ${({ align }) =>
    align === 'right'
      ? 'flex-end'
      : align === 'center'
        ? 'center'
        : 'flex-start'};
  padding: 0 ${({ theme }) => theme.spacing(2)};
  text-align: ${({ align }) => align ?? 'left'};
`;

export { StyledTableHeader as TableHeader };
