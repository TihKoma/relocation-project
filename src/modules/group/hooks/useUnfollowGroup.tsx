import {
  ApolloCache,
  DefaultContext,
  MutationHookOptions,
  OperationVariables,
  useMutation,
} from '@apollo/client'

import { QUERY_GET_PUBLIC_PROFILE } from '@/modules/profile'
import { MUTATION_REMOVE_SUBSCRIPTION } from '@/modules/subscription'

export const useUnfollowGroup = (
  options?: MutationHookOptions<
    any,
    OperationVariables,
    DefaultContext,
    ApolloCache<any>
  >,
) => {
  return useMutation(
    MUTATION_REMOVE_SUBSCRIPTION,
    // @ts-ignore
    {
      ...options,
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

        const [, { variables }] = rest

        cache.modify({
          id: `Group:${variables?.subscriptableId}`,
          fields: {
            members: (data) => {
              return {
                ...data,
                iAmIn: false,
                total: Math.max(data.total - 1, 0),
              }
            },
          },
        })
      },
    },
  )
}
