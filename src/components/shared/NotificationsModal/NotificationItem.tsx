import { FC, ReactNode, SVGProps } from 'react'
import Link from 'next/link'
import { useMutation } from '@apollo/client'
import styled from '@emotion/styled'

import { showSuccessToast } from '@/components/shared/Toast'
import { Avatar as AvatarBase } from '@/components/ui-kit/Avatar'
import { FollowButton } from '@/components/ui-kit/FollowButton'
import { notificationIcons } from '@/images/notification'
import { reactionsEmojis } from '@/images/reactions'
import {
  MUTATION_MARK_NOTIFICATION_AS_READ,
  NotificationType,
  SearchNotifications_searchNotifications_notifications,
} from '@/modules/notification'
import {
  SearchNotifications_searchNotifications_notifications_entities_Comment,
  SearchNotifications_searchNotifications_notifications_entities_FeedPost,
  SearchNotifications_searchNotifications_notifications_entities_PublicProfileNotification,
  SearchNotifications_searchNotifications_notifications_entities_Reaction,
} from '@/modules/notification'
import { useFollowUser, useUnfollowUser } from '@/modules/profile'
import { ROUTES } from '@/modules/router'
import { useTimePassed } from '@/modules/utils/time-passed'
import { mobileMedia, notMobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

import { SubscriptableType } from '../../../../__generated__/globalTypes'

type Props = {
  item: SearchNotifications_searchNotifications_notifications
}
export const NotificationItem: FC<Props> = ({ item }) => {
  const [followUser, { loading: followUserLoading }] = useFollowUser()
  const [unfollowUser, { loading: unfollowUserLoading }] = useUnfollowUser()

  const [markNotificationAsRead] = useMutation(
    MUTATION_MARK_NOTIFICATION_AS_READ,
    {
      variables: {
        notificationID: item.id,
      },
      update: (cache) => {
        cache.modify({
          id: `Notification:${item.id}`,
          fields: {
            isRead: () => true,
          },
        })
      },
    },
  )

  const follow = async () => {
    await followUser({
      variables: {
        input: {
          subscriptableId: formattedItem.user.userId,
          subscriptableType: SubscriptableType.USER,
        },
      },
      update: (cache) => {
        cache.modify({
          id: `PublicProfileNotification:${JSON.stringify({
            userId: formattedItem.user.userId,
          })}`,
          fields: {
            subscribed: () => true,
          },
        })
      },
      onCompleted: () => {
        showSuccessToast(
          `You are now following ${formattedItem.user.firstName} ${formattedItem.user.lastName}!`,
          {
            autoClose: 2000,
          },
        )
      },
    })
  }
  const unfollow = async () => {
    await unfollowUser({
      variables: {
        subscriptableId: formattedItem.user.userId,
      },
      update: (cache) => {
        cache.modify({
          id: `PublicProfileNotification:${JSON.stringify({
            userId: formattedItem.user.userId,
          })}`,
          fields: {
            subscribed: () => false,
          },
        })
      },
      onCompleted: () => {
        showSuccessToast(
          `You are no longer following ${formattedItem.user.firstName} ${formattedItem.user.lastName}!`,
          {
            autoClose: 2000,
          },
        )
      },
    })
  }
  const markAsRead = async () => {
    await markNotificationAsRead()
  }

  const { Badge, ...formattedItem } = formatItemFromEntities(item)
  const timePassed = useTimePassed(item.createdAt)

  return (
    <Container>
      <Link href={formattedItem.userSlug} passHref>
        <AvatarWrapper onClick={markAsRead}>
          <Avatar
            src={formattedItem.src}
            badge={Badge ? <Badge /> : undefined}
          />
        </AvatarWrapper>
      </Link>
      <Link
        href={formattedItem.targetSlug}
        passHref
        onClick={markNotificationAsRead}
      >
        <ContentWrapper onClick={markAsRead}>
          <Text isRead={formattedItem.isRead}>{formattedItem.text}</Text>
          <Date>{timePassed}</Date>
        </ContentWrapper>
      </Link>
      {formattedItem.withFollow && (
        <FollowButton
          subscribed={formattedItem.user.subscribed}
          onFollow={follow}
          onUnfollow={unfollow}
          size={'small'}
          disabled={unfollowUserLoading || followUserLoading} // TODO replace with loading state, when it will be added to design system
        />
      )}
    </Container>
  )
}

type formattedItem = {
  src: string
  Badge?: FC<SVGProps<SVGSVGElement>>
  text: ReactNode
  isRead: boolean
  userSlug: string
  targetSlug: string
  withFollow?: boolean
  user: SearchNotifications_searchNotifications_notifications_entities_PublicProfileNotification
}
const formatItemFromEntities = (
  item: SearchNotifications_searchNotifications_notifications,
): formattedItem => {
  const result = {} as formattedItem

  const user =
    (item.entities?.find(
      (entity) => entity.__typename === 'PublicProfileNotification',
    ) as SearchNotifications_searchNotifications_notifications_entities_PublicProfileNotification) ??
    {}
  const post = item.entities?.find(
    (entity) => entity.__typename === 'FeedPost',
  ) as
    | SearchNotifications_searchNotifications_notifications_entities_FeedPost
    | undefined
  const reaction = item.entities?.find(
    (entity) => entity.__typename === 'Reaction',
  ) as
    | SearchNotifications_searchNotifications_notifications_entities_Reaction
    | undefined
  const comments = item.entities?.filter(
    (entity) => entity.__typename === 'Comment',
  ) as (
    | SearchNotifications_searchNotifications_notifications_entities_Comment
    | undefined
  )[]

  result.userSlug = ROUTES.publicProfile.calcUrl({ userName: user.userName })
  result.src = user.photoUrl
  result.isRead = item.isRead
  result.user = user

  if (
    reaction &&
    (item.type === NotificationType.REACTION_POST ||
      item.type === NotificationType.REACTION_COMMENT)
  ) {
    result.Badge = reactionsEmojis.find(
      (item) => item.type === reaction.type,
    )?.Emoji
  } else {
    result.Badge = notificationIcons.find(
      (icon) => icon.type === item.type,
    )?.Icon
  }
  switch (item.type) {
    case NotificationType.NEW_SUBSCRIBER: {
      result.targetSlug = result.userSlug
      result.text = (
        <>
          <b>
            {user.firstName} {user.lastName}
          </b>{' '}
          started follow you
        </>
      )
      result.withFollow = true
      break
    }
    case NotificationType.REACTION_POST: {
      result.targetSlug = ROUTES.detailedPost.calcUrl({
        postSlug: post?.post.slug ?? '',
      })
      result.text = (
        <>
          <b>
            {user.firstName} {user.lastName}
          </b>{' '}
          reacted to your post: <b>«{post?.post.content}»</b>
        </>
      )
      break
    }
    case NotificationType.REACTION_COMMENT: {
      result.targetSlug = ROUTES.detailedPost.calcUrl({
        postSlug: post?.post.slug ?? '',
      })
      result.text = (
        <>
          <b>
            {user.firstName} {user.lastName}
          </b>{' '}
          reacted to your comment: <b>«{comments[0]?.text}»</b>
        </>
      )
      break
    }
    case NotificationType.POST_COMMENTED: {
      result.targetSlug = ROUTES.detailedPost.calcUrl({
        postSlug: post?.post.slug ?? '',
      })
      result.text = (
        <>
          <b>
            {user.firstName} {user.lastName}
          </b>{' '}
          commented to your post: <b>«{comments[0]?.text}»</b>
        </>
      )
      break
    }
    case NotificationType.COMMENT_COMMENTED: {
      result.targetSlug = ROUTES.detailedPost.calcUrl({
        postSlug: post?.post.slug ?? '',
      })
      result.text = (
        <>
          <b>
            {user.firstName} {user.lastName}
          </b>{' '}
          commented to your comment: <b>«{comments[0]?.text}»</b>
        </>
      )
      break
    }
    case NotificationType.SUBSCRIPTIONS_POST: {
      result.targetSlug = ROUTES.detailedPost.calcUrl({
        postSlug: post?.post.slug ?? '',
      })
      result.text = (
        <>
          <b>
            {user.firstName} {user.lastName}
          </b>{' '}
          created a new post: <b>«{post?.post.content}»</b>
        </>
      )
      break
    }
  }

  return result
}

const Container = styled.div`
  width: 100%;

  display: grid;
  gap: 1.6rem;
  justify-content: start;
  grid-template-columns: auto 1fr auto;
`
const Text = styled.div<{ isRead: boolean }>`
  color: ${(props) =>
    props.isRead
      ? getColorTheme('sun800')(props)
      : getColorTheme('sun')(props)};
  font-size: 1.4rem;
  line-height: 2rem;
  overflow: hidden;
  & b {
    font-weight: 500;
  }
  ${notMobileMedia} {
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  ${mobileMedia} {
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`
const ContentWrapper = styled.a`
  display: flex;
  flex-direction: column;

  overflow: hidden;

  cursor: pointer;
  &:hover > ${Text} {
    color: ${getColorTheme('neptune')};
  }
`
const Date = styled.div`
  font-size: 1.4rem;
  line-height: 1.6rem;
  color: ${getColorTheme('sun500')};
`
const AvatarWrapper = styled.a`
  display: inline-block;

  position: relative;
`

const Avatar = styled(AvatarBase)`
  &:hover::after {
    opacity: 0;
  }
`
