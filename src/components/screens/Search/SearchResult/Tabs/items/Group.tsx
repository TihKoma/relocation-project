import { FC } from 'react'
import Link from 'next/link'
import styled from '@emotion/styled'

import { followersListItem } from '@/components/shared/FollowersList'
import { Avatar } from '@/components/ui-kit/Avatar'
import { FollowButton } from '@/components/ui-kit/FollowButton'
import { useFollowGroup, useUnfollowGroup } from '@/modules/group'
import { getColorTheme } from '@/styles/themes'

type GroupProps = {
  item: followersListItem
}

export const Group: FC<GroupProps> = ({ item }) => {
  const [followGroup, { loading: followGroupLoading }] = useFollowGroup({
    variables: {
      input: {
        subscriptableId: item.id,
      },
    },
  })

  const [unfollowGroup, { loading: unfollowGroupLoading }] = useUnfollowGroup({
    variables: {
      subscriptableId: item.id,
    },
  })

  const onFollow = () => followGroup()
  const onUnfollow = () => unfollowGroup()

  return (
    <GroupContainer>
      <Link href={item.slug} passHref>
        <a>
          <Avatar
            src={item.avatarSrc}
            profileName={item.name}
            isLazyLoad
            size={'large'}
            shape={'square'}
          />
        </a>
      </Link>
      <Link href={item.slug} passHref>
        <GroupNameWrapper>
          <GroupName>{item.name}</GroupName>
          {item.subtitle ? (
            <GroupSubtitle>{item.subtitle}</GroupSubtitle>
          ) : null}
        </GroupNameWrapper>
      </Link>
      {!item.isMyProfile && (
        <FollowButton
          size={'small'}
          subscribed={item.subscribed}
          onFollow={onFollow}
          onUnfollow={onUnfollow}
          disabled={followGroupLoading || unfollowGroupLoading} // TODO replace with loading state, when it will be added to design system
        />
      )}
    </GroupContainer>
  )
}

const GroupContainer = styled.li`
  display: grid;

  gap: 1.6rem;
  grid-template-columns: auto 1fr auto;
  align-items: center;

  font-size: 1.4rem;

  padding: 0 1.6rem;
`
const GroupName = styled.div`
  overflow: hidden;

  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 2rem;
  font-weight: 500;

  color: ${getColorTheme('sun')};
`
const GroupNameWrapper = styled.a`
  cursor: pointer;
  overflow: hidden;

  &:hover {
    & > ${GroupName} {
      color: ${getColorTheme('neptune')};
    }
  }
`
const GroupSubtitle = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;

  white-space: nowrap;
  font-weight: 400;
  line-height: 2rem;

  color: ${getColorTheme('mercury')};
`
