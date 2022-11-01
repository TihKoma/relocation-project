import { FC } from 'react'

import { FollowButton as FollowButtonBase } from '@/components/ui-kit/FollowButton'
import { useAuthGlobalModals } from '@/modules/authorization'
import { useFollowGroup, useUnfollowGroup } from '@/modules/group'
import {
  useFollowNeighborhood,
  useUnfollowNeighborhood,
} from '@/modules/neighbourhood'
import {
  QUERY_GET_PUBLIC_PROFILE,
  useFollowUser,
  useUnfollowUser,
} from '@/modules/profile'
import { SubscriptableType } from '@/modules/subscription'

type Props = {
  initialSubscribed: boolean
  subscriptableId: string
  subscriptableType: SubscriptableType
}
export const FollowButton: FC<Props> = ({
  initialSubscribed,
  subscriptableId,
  subscriptableType,
}) => {
  const [isNotHavePermission, showModal] = useAuthGlobalModals('follow')

  const [followRegion, { loading: followRegionLoading }] =
    useFollowNeighborhood({
      variables: {
        input: {
          subscriptableId,
          subscriptableType,
        },
      },
      refetchQueries: [QUERY_GET_PUBLIC_PROFILE],
      update: (cache) => {
        cache.modify({
          id: `Region:${subscriptableId}`,
          fields: {
            subscribed: () => true,
          },
        })
      },
    })

  const [unfollowRegion, { loading: unfollowRegionLoading }] =
    useUnfollowNeighborhood({
      variables: {
        subscriptableId,
        subscriptableType,
      },
      refetchQueries: [QUERY_GET_PUBLIC_PROFILE],
      update: (cache) => {
        cache.modify({
          id: `Region:${subscriptableId}`,
          fields: {
            subscribed: () => false,
          },
        })
      },
    })

  const [followUser, { loading: followUserLoading }] = useFollowUser({
    variables: {
      input: {
        subscriptableId,
      },
    },
    update: (cache) => {
      cache.modify({
        id: `PublicProfile:${JSON.stringify({
          userId: subscriptableId,
        })}`,
        fields: {
          subscribed: () => true,
        },
      })
    },
  })

  const [unfollowUser, { loading: unfollowUserLoading }] = useUnfollowUser({
    variables: {
      subscriptableId,
    },
    update: (cache) => {
      cache.modify({
        id: `PublicProfile:${JSON.stringify({
          userId: subscriptableId,
        })}`,
        fields: {
          subscribed: () => false,
        },
      })
    },
  })

  const [followGroup, { loading: followGroupLoading }] = useFollowGroup({
    variables: {
      input: {
        subscriptableId,
      },
    },
  })

  const [unfollowGroup, { loading: unfollowGroupLoading }] = useUnfollowGroup({
    variables: {
      subscriptableId,
    },
  })

  const follow = async () => {
    switch (subscriptableType) {
      case SubscriptableType.USER: {
        await followUser()
        break
      }
      case SubscriptableType.REGION: {
        await followRegion()
        break
      }
      case SubscriptableType.GROUP: {
        await followGroup()
        break
      }
    }
  }

  const unfollow = async () => {
    switch (subscriptableType) {
      case SubscriptableType.USER: {
        await unfollowUser()
        break
      }
      case SubscriptableType.REGION: {
        await unfollowRegion()
        break
      }
      case SubscriptableType.GROUP: {
        await unfollowGroup()
        break
      }
    }
  }

  const followLoading = {
    [SubscriptableType.USER]: followUserLoading,
    [SubscriptableType.REGION]: followRegionLoading,
    [SubscriptableType.GROUP]: followGroupLoading,
  }[subscriptableType]

  const unfollowLoading = {
    [SubscriptableType.USER]: unfollowUserLoading,
    [SubscriptableType.REGION]: unfollowRegionLoading,
    [SubscriptableType.GROUP]: unfollowGroupLoading,
  }[subscriptableType]

  const onUnfollow = async () => {
    await unfollow()
  }

  const onFollow = async () => {
    if (isNotHavePermission) {
      showModal()
      return
    }
    await follow()
  }

  return (
    <FollowButtonBase
      size={'small'}
      subscribed={initialSubscribed}
      disabled={unfollowLoading || followLoading} // TODO replace with loading state, when it will be added to design system
      onFollow={onFollow}
      onUnfollow={onUnfollow}
    />
  )
}
