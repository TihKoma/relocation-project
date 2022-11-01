import { useQuery } from '@apollo/client'

import { QUERY_GET_USER_PROFILE } from '@/modules/profile'

import { SubscriptionPlan } from '../../../../__generated__/globalTypes'

type Feature = 'task-manager' | 'guide'

export const useCheckAccess = (feature: Feature): boolean => {
  const { data: profileQuery } = useQuery(QUERY_GET_USER_PROFILE)

  const featuresByPlan: { [key in Feature]: Array<SubscriptionPlan> } = {
    'task-manager': [SubscriptionPlan.OPTIMAL, SubscriptionPlan.PREMIUM],
    guide: [SubscriptionPlan.OPTIMAL, SubscriptionPlan.PREMIUM],
  }

  if (profileQuery?.getUserProfile?.subscriptionPlan) {
    return featuresByPlan[feature].includes(
      profileQuery?.getUserProfile?.subscriptionPlan,
    )
  }
  return false
}
