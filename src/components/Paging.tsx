import styled from 'styled-components'

export interface IPagination {
  page: number
  totalPage: number
  onChange: (page: number) => void
}

export const Pagination = ({ page, totalPage, onChange }: IPagination) => {
  return (
    <Styled.Wrap>
      <Styled.Item onClick={() => onChange(page - 1)} disabled={page == 1}>
        {'<'}
      </Styled.Item>
      {page > 3 && <Styled.Item onClick={() => onChange(1)}>{1}</Styled.Item>}
      {page > 5 && <Styled.ItemDot>...</Styled.ItemDot>}

      {page > 2 && (
        <Styled.Item onClick={() => onChange(page - 2)}>{page - 2}</Styled.Item>
      )}
      {page > 1 && (
        <Styled.Item onClick={() => onChange(page - 1)}>{page - 1}</Styled.Item>
      )}
      <Styled.Item current>{page}</Styled.Item>

      {page < totalPage - 1 && (
        <Styled.Item onClick={() => onChange(page + 1)}>{page + 1}</Styled.Item>
      )}
      {page < totalPage - 2 && (
        <Styled.Item onClick={() => onChange(page + 2)}>{page + 2}</Styled.Item>
      )}

      {page < totalPage - 3 && <Styled.ItemDot>...</Styled.ItemDot>}
      {page < totalPage && (
        <Styled.Item onClick={() => onChange(totalPage)}>
          {totalPage}
        </Styled.Item>
      )}
      <Styled.Item
        onClick={() => onChange(page + 1)}
        disabled={page == totalPage}
      >
        {'>'}
      </Styled.Item>
    </Styled.Wrap>
  )
}

const Styled = {
  Wrap: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
  `,
  ItemDot: styled.div``,
  Item: styled.button<{ current?: boolean }>`
    height: 30px;
    min-width: 30px;
    border: 1px solid #ccc;
    display: flex;
    align-items: center;
    border-radius: 4px;
    justify-content: center;
    font-weight: bold;
    cursor: pointer;
    background: #f4f4f4;
    &:hover {
      background: #ccc;
    }

    &:disabled {
      opacity: 0.5;
    }
    ${({ current }) =>
      current
        ? ` background: rgb(47, 18, 18); color: white; border-color: rgb(47, 18, 18)  `
        : ''}
  `,
}
