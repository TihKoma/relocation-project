import { FC } from 'react'
import styled from '@emotion/styled'

import { SubscriptableType } from '@/modules/subscription'

import type { followersListItem } from './FollowItem'
import { FollowItem } from './FollowItem'

type Props = {
  items: followersListItem[]
  subscriptableType: SubscriptableType
}

export const FollowersList: FC<Props> = ({ items, subscriptableType }) => {
  return (
    <List>
      {items.map((item) => {
        return (
          <FollowItem
            key={item.id}
            item={item}
            subscriptableType={subscriptableType}
          />
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
  gap: 1.6rem;

  list-style: none;
`
