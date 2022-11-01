import { useCallback, useMemo } from 'react'
import { useRouter } from 'next/router'
import { ListingOrder } from '__generated__/globalTypes'

const defaultOrder = ListingOrder['DAYS_ON_MARKET_DESC']

export const usePropertyOrder = () => {
  const { query, pathname, push } = useRouter()

  const order = useMemo(() => {
    const { order } = query

    return order ? order : defaultOrder
  }, [query])

  const setOrder = useCallback(
    (order: ListingOrder) => {
      push(
        {
          pathname,
          query: {
            ...query,
            order,
          },
        },
        undefined,
        { shallow: true },
      )
    },
    [pathname, push, query],
  )

  return {
    order: order as ListingOrder,
    setOrder,
  }
}
