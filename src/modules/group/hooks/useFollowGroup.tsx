import {
  ApolloCache,
  DefaultContext,
  MutationHookOptions,
  OperationVariables,
  useMutation,
} from '@apollo/client'

import { QUERY_GET_PUBLIC_PROFILE } from '@/modules/profile'
import { MUTATION_CREATE_SUBSCRIPTION } from '@/modules/subscription'
import { SubscriptableType } from '@/modules/subscription'

export const useFollowGroup = (
  options?: MutationHookOptions<
    any,
    OperationVariables,
    DefaultContext,
    ApolloCache<any>
  >,
) => {
  return useMutation(MUTATION_CREATE_SUBSCRIPTION, {
    ...options,
    variables: {
      input: {
        ...options?.variables?.input,
        subscriptableType: SubscriptableType.GROUP,
      },
    },
    refetchQueries: (mutationResult) => {
      const requiredQueries = [QUERY_GET_PUBLIC_PROFILE]
      if (options?.refetchQueries) {
        if (typeof options?.refetchQueries === 'function') {
          const refetchQueries = options.refetchQueries(mutationResult)

          return [...new Set([...refetchQueries, ...requiredQueries])]
        }

        return [...new Set([...options.refetchQueries, ...requiredQueries])]
      }

      return requiredQueries
    },
    update: (cache, ...rest) => {
      options?.update?.(cache, ...rest)

      cache.modify({
        id: `Group:${options?.variables?.input.subscriptableId}`,
        fields: {
          members: (data) => {
            return {
              ...data,
              iAmIn: true,
              total: data.total + 1,
            }
          },
        },
      })
    },
  })
}
