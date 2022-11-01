import { useCallback, useMemo } from 'react'
import { useRouter } from 'next/router'
import { ListingFilterInput } from '__generated__/globalTypes'

import {
  defaultPropertyFilters,
  mapQueryToFilters,
  mapQueryWithNewFilters,
} from '@/modules/marketplace/utils'

export const usePropertyFilter = () => {
  const { query, pathname, push } = useRouter()

  const filter = useMemo(() => {
    return mapQueryToFilters(query)
  }, [query])

  const setFilter = useCallback(
    (filter: Partial<ListingFilterInput>) => {
      push(
        {
          pathname,
          query: mapQueryWithNewFilters(filter, query),
        },
        undefined,
        { shallow: true },
      )
    },
    [pathname, push, query],
  )

  const resetFilters = useCallback(() => {
    setFilter(defaultPropertyFilters)
  }, [setFilter])

  return {
    filter: filter as unknown as ListingFilterInput,
    setFilter,
    resetFilters,
  }
}
