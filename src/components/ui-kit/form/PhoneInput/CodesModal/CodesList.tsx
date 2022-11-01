import { VFC } from 'react'
import styled from '@emotion/styled'

import { CountryCode } from '@/modules/authorization'
import { getColorTheme } from '@/styles/themes'

type Props = {
  items?: CountryCode[]
  onClick: (value: CountryCode) => void
}
export const CodesList: VFC<Props> = ({ items = [], onClick }) => {
  return (
    <List>
      {items.map((item) => {
        const onItemClick = () => {
          onClick(item)
        }
        return (
          <Item key={item.short} onClick={onItemClick}>
            <span>{item.name}</span>
            <span>{item.prefix}</span>
          </Item>
        )
      })}
    </List>
  )
}

const List = styled.ul`
  margin: 0;
  padding: 0;

  display: grid;
  grid-auto-flow: row;
  gap: 0.8rem;

  list-style: none;
`
const Item = styled.li`
  padding: 0.8rem 1.6rem;

  display: grid;
  grid-auto-flow: column;
  justify-content: space-between;

  cursor: pointer;

  font-size: 1.6rem;
  color: ${getColorTheme('sun')};

  &:hover {
    opacity: 0.5;
  }
`
