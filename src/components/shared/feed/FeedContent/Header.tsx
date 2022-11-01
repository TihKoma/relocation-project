import { FC, ReactNode } from 'react'
import styled from '@emotion/styled'

import { FeedItem } from '@/modules/feed'

import { UserInfo } from './UserInfo'

type Props = {
  user: FeedItem['user']
  createdAt: string
  className?: string
  avatarClassName?: string
  region?: FeedItem['region']
  children: ReactNode
  group?: FeedItem['group']
  isOnDetailedPage?: boolean
  isInPost?: boolean
}

export const Header: FC<Props> = ({
  user,
  createdAt,
  className,
  avatarClassName,
  region,
  children,
  group,
  isOnDetailedPage,
  isInPost,
}) => {
  return (
    <Container className={className}>
      <UserInfo
        region={region}
        group={group}
        user={user}
        createdAt={createdAt}
        avatarClassName={avatarClassName}
        isOnDetailedPage={isOnDetailedPage}
        isInPost={isInPost}
      />
      {children}
    </Container>
  )
}

const Container = styled.header`
  position: relative;

  display: flex;
  justify-content: space-between;
`
