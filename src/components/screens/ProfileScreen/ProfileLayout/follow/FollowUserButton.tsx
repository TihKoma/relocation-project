import { ComponentProps, FC } from 'react'
import { FetchResult, InternalRefetchQueriesInclude } from '@apollo/client'

import { FollowButton } from '@/components/ui-kit/FollowButton'
import { useAnalytics } from '@/modules/analytics'
import { useAuthGlobalModals } from '@/modules/authorization'
import { useFollowUser, useUnfollowUser } from '@/modules/profile'

type Props = {
  userId: string
  refetchQueries?:
    | InternalRefetchQueriesInclude
    | ((
        result: FetchResult<any, Record<string, any>, Record<string, any>>,
      ) => InternalRefetchQueriesInclude)
  from?: string
} & Omit<ComponentProps<typeof FollowButton>, 'onFollow' | 'onUnfollow'>

export const FollowUserButton: FC<Props> = ({
  userId,
  refetchQueries = [],
  from = '',
  subscribed,
  ...props
}) => {
  const [isNotHavePermission, showModal] = useAuthGlobalModals('follow')
  const analytics = useAnalytics()

  const [followUser, { loading: isFollowLoading }] = useFollowUser({
    variables: {
      input: {
        subscriptableId: userId,
      },
    },
    refetchQueries,
    update: (cache) => {
      cache.modify({
        id: `PublicProfile:${JSON.stringify({ userId })}`,
        fields: {
          subscribed: () => {
            return true
          },
        },
      })
    },
  })

  const [unfollowUser, { loading: isUnfollowLoading }] = useUnfollowUser({
    variables: {
      subscriptableId: userId,
    },
    refetchQueries,
    update: (cache) => {
      cache.modify({
        id: `PublicProfile:${JSON.stringify({ userId })}`,
        fields: {
          subscribed: () => {
            return false
          },
        },
      })
    },
  })

  const onFollow = () => {
    if (isNotHavePermission) {
      showModal()
      return
    }
    followUser()
    analytics.userFollow(from)
  }

  const onUnfollow = () => {
    if (isNotHavePermission) {
      showModal()
      return
    }
    unfollowUser()
    analytics.userUnfollow(from)
  }

  return (
    <FollowButton
      onFollow={onFollow}
      onUnfollow={onUnfollow}
      disabled={subscribed ? isUnfollowLoading : isFollowLoading} // TODO replace with loading state, when it will be added to design system
      subscribed={subscribed}
      {...props}
    />
  )
}
