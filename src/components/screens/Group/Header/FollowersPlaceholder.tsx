import { FC } from 'react'

import { MockWithAction } from '@/components/shared/MockWithAction'
import { PlaceholderUserPlus } from '@/images'
import { useFollowGroup } from '@/modules/group'
import { QUERY_LIST_FOLLOWERS } from '@/modules/profile'
import { SubscriptableType } from '@/modules/subscription'

type Props = {
  groupId: string
  groupName: string
}
export const FollowersPlaceholder: FC<Props> = ({ groupId, groupName }) => {
  const [follow] = useFollowGroup({
    variables: {
      input: {
        subscriptableId: groupId,
        subscriptableType: SubscriptableType.GROUP,
      },
    },
    refetchQueries: [QUERY_LIST_FOLLOWERS],
  })

  return (
    <MockWithAction
      image={<PlaceholderUserPlus />}
      title={`${groupName} has no followers`}
      description={'You can be the first'}
      buttonText={'Follow'}
      onClick={follow}
    />
  )
}
