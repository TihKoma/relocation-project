import {
  ApolloCache,
  DefaultContext,
  MutationHookOptions,
  OperationVariables,
  StoreObject,
  useMutation,
} from '@apollo/client'

import { useAnalytics } from '@/modules/analytics'
import { useAuthGlobalModals } from '@/modules/authorization'
import { QUERY_GET_USER_FEED } from '@/modules/feed'
import { QUERY_GET_REGION_BY_SLUG } from '@/modules/map'
import { MUTATION_CREATE_SUBSCRIPTION } from '@/modules/subscription'

export const useFollowNeighborhood = (
  options?: MutationHookOptions<
    any,
    OperationVariables,
    DefaultContext,
    ApolloCache<any>
  >,
) => {
  const analytics = useAnalytics()

  const [isNotHavePermission, showModal] = useAuthGlobalModals('discovery')
  const [method, data] = useMutation(
    MUTATION_CREATE_SUBSCRIPTION,
    // @ts-ignore
    {
      ...options,
      refetchQueries: (mutationResult) => {
        if (options?.refetchQueries) {
          if (typeof options?.refetchQueries === 'function') {
            const refetchQueries = options.refetchQueries(mutationResult)

            return [...new Set([...refetchQueries, QUERY_GET_REGION_BY_SLUG])]
          }

          return [
            ...new Set([...options.refetchQueries, QUERY_GET_REGION_BY_SLUG]),
          ]
        }

        return [QUERY_GET_REGION_BY_SLUG]
      },
      update: (cache, ...rest) => {
        options?.update?.(cache, ...rest)

        const [, { variables }] = rest
        if (variables?.input.subscriptableId) {
          analytics?.regionFollowed({
            regionId: variables.input?.subscriptableId,
          })
        }

        const { getUserFeed } =
          cache.readQuery({
            query: QUERY_GET_USER_FEED,
            variables: { limit: 10 },
          }) ?? {}

        if (!getUserFeed) return

        cache.modify({
          id: cache.identify(getUserFeed as unknown as StoreObject),
          fields: {
            posts(_, { DELETE }) {
              return DELETE
            },
          },
        })
      },
    },
  )

  return [
    async (...args) => {
      if (isNotHavePermission) {
        showModal()
        return
      }
      return method(...args)
    },
    data,
  ] as [typeof method, typeof data]
}
