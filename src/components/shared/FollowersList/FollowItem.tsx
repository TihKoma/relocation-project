import { FC, ReactNode } from 'react'
import Link from 'next/link'
import styled from '@emotion/styled'

import { Avatar as AvatarBase } from '@/components/ui-kit/Avatar'
import { getColorTheme } from '@/styles/themes'

import { SubscriptableType } from '../../../../__generated__/globalTypes'
import { FollowButton } from './FollowButton'

export type followersListItem = {
  id: string
  name: string
  slug: string
  subscribed: boolean
  avatarSrc: string
  isMyProfile?: boolean
  subtitle?: ReactNode
}
type Props = {
  item: followersListItem
  subscriptableType: SubscriptableType
}

export const FollowItem: FC<Props> = ({ item, subscriptableType }) => {
  return (
    <Container key={item.id}>
      <Link href={item.slug} passHref>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a>
          <Avatar src={item.avatarSrc} profileName={item.name} isLazyLoad />
        </a>
      </Link>
      <Link href={item.slug} passHref>
        <NameWrapper>
          <Name>{item.name}</Name>
          {item.subtitle ? <Subtitle>{item.subtitle}</Subtitle> : null}
        </NameWrapper>
      </Link>
      {!item.isMyProfile && (
        <FollowButton
          initialSubscribed={item.subscribed}
          subscriptableId={item.id}
          subscriptableType={subscriptableType}
        />
      )}
    </Container>
  )
}

const Container = styled.li`
  display: grid;
  gap: 1.6rem;
  grid-template-columns: auto 1fr auto;
  align-items: center;

  font-size: 1.4rem;
`
const Avatar = styled(AvatarBase)`
  cursor: pointer;
`
const Name = styled.div`
  overflow: hidden;

  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 2rem;
  font-weight: 500;
  color: ${getColorTheme('sun')};
`
const Subtitle = styled.div`
  overflow: hidden;

  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 400;
  line-height: 2rem;
  color: ${getColorTheme('mercury')};
`
const NameWrapper = styled.a`
  cursor: pointer;
  overflow: hidden;

  &:hover {
    & > ${Name} {
      color: ${getColorTheme('neptune')};
    }
  }
`
