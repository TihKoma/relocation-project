import { VFC } from 'react'
import { useQuery } from '@apollo/client'

import { MockWithAction } from '@/components/shared/MockWithAction'
import { PlaceholderUserPlus } from '@/images'
import { useFollowNeighborhood } from '@/modules/neighbourhood'
import { QUERY_GET_USER_PROFILE, QUERY_LIST_FOLLOWERS } from '@/modules/profile'
import { SubscriptableType } from '@/modules/subscription'

type Props = {
  userName: string
  userId: string
}
export const FollowersPlaceholder: VFC<Props> = ({ userId, userName }) => {
  const [follow] = useFollowNeighborhood({
    variables: {
      input: {
        subscriptableId: userId,
        subscriptableType: SubscriptableType.USER,
      },
    },
    refetchQueries: [QUERY_LIST_FOLLOWERS],
  })

  const { data: { getUserProfile: myProfile } = {} } = useQuery(
    QUERY_GET_USER_PROFILE,
  )

  if (myProfile?.userId === userId) {
    return (
      <MockWithAction
        image={<PlaceholderUserPlus />}
        title={'You have no followers'}
        description={'You’ll see all the people who follow you here'}
      />
    )
  }
  return (
    <MockWithAction
      image={<PlaceholderUserPlus />}
      title={`${userName} has no followers`}
      description={'You can be the first'}
      buttonText={'Follow'}
      onClick={follow}
    />
  )
}
