import { MouseEvent, ReactNode, useCallback, VFC } from 'react'
import styled from '@emotion/styled'

import { getColorTheme } from '@/styles/themes'

// TODO add <Link /> when there is link
export type ItemOptionsList = {
  id: string
  title: ReactNode
  icon?: JSX.Element
  link?: string
  isNewWindow?: boolean
} | null
export type OnClickOptionsList = (id: string) => void | Promise<void>

type Props = {
  items: ItemOptionsList[]
  onClick: OnClickOptionsList
  activeId?: string
}

export const OptionsList: VFC<Props> = ({ items, onClick, activeId }) => {
  const onClickItem = useCallback(
    (e: MouseEvent) => {
      const item = e.currentTarget as HTMLLIElement

      if (item.dataset.id) {
        onClick(item.dataset.id)
      }
    },
    [onClick],
  )

  return (
    <List>
      {items.map((item) =>
        item ? (
          <Item
            key={item.id}
            onClick={onClickItem}
            data-id={item.id}
            isActive={item.id === activeId}
          >
            {item.icon}
            <Title>{item.title}</Title>
          </Item>
        ) : null,
      )}
    </List>
  )
}

const List = styled.ul`
  padding: 0.8rem 0;
  margin: 0;

  display: grid;

  list-style-type: none;
`
const Title = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  align-items: center;
  flex: 1;

  border-bottom: 1px solid ${getColorTheme('moon')};

  font-size: 1.4rem;
  white-space: nowrap;
  color: black;
`
const Item = styled.li<{ isActive: boolean }>`
  width: 100%;
  height: 3.7rem;
  padding: 0 1.6rem;

  display: flex;
  align-items: center;
  gap: 1.4rem;

  transition: all 0.1s ease-out;
  cursor: pointer;

  ${(props) =>
    props.isActive
      ? `
    background-color: #FAFBFF;
  `
      : ''}

  &:last-child ${Title} {
    border-bottom: none;
  }

  :hover {
    background-color: #f0f1f6;
  }
`
