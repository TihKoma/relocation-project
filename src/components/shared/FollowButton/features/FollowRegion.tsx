import { ComponentProps, FC, useCallback } from 'react'

import { FollowButton } from '@/components/ui-kit/FollowButton'
import {
  useFollowNeighborhood,
  useUnfollowNeighborhood,
} from '@/modules/neighbourhood'
import { SubscriptableType } from '@/modules/subscription'

type Props = {
  regionId: string
  isSubscribed: boolean
  className?: string
} & Omit<
  ComponentProps<typeof FollowButton>,
  'onFollow' | 'onUnfollow' | 'subscribed'
>

export const FollowRegion: FC<Props> = ({
  className,
  regionId,
  isSubscribed,
  ...props
}) => {
  const [unfollow, { loading: unfollowRegionLoading }] =
    useUnfollowNeighborhood()
  const [follow, { loading: followRegionLoading }] = useFollowNeighborhood()

  const onUnfollow = useCallback(() => {
    if (regionId) {
      unfollow({ variables: { subscriptableId: regionId } })
    }
  }, [unfollow, regionId])

  const onFollow = useCallback(() => {
    if (regionId) {
      follow({
        variables: {
          input: {
            subscriptableId: regionId,
            subscriptableType: SubscriptableType.REGION,
          },
        },
      })
    }
  }, [follow, regionId])

  return (
    <FollowButton
      subscribed={isSubscribed}
      onFollow={onFollow}
      onUnfollow={onUnfollow}
      className={className}
      loading={unfollowRegionLoading || followRegionLoading}
      {...props}
    />
  )
}
