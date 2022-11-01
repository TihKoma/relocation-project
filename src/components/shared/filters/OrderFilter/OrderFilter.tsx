import { useMemo, VFC } from 'react'
import { ListingOrder } from '__generated__/globalTypes'

import { DropdownButton } from '@/components/ui-kit/DropdownButton'
import { ListRow } from '@/components/ui-kit/ListRow'
import { SortIcon } from '@/images'
import { useAnalytics } from '@/modules/analytics'
import { usePropertyOrder } from '@/modules/marketplace'

const OPTIONS = [
  { label: 'Newest', value: ListingOrder.DAYS_ON_MARKET_DESC },
  { label: 'Lowest Price', value: ListingOrder.PRICE_ASC },
  { label: 'Highest Price', value: ListingOrder.PRICE_DESC },
]

type Props = {
  isOnlyIcon: boolean
  className?: string
}

export const OrderFilter: VFC<Props> = ({ isOnlyIcon, className }) => {
  const { order, setOrder } = usePropertyOrder()
  const analytics = useAnalytics()

  const title = useMemo(() => {
    switch (order) {
      case ListingOrder.PRICE_ASC: {
        return 'Lowest Price'
      }
      case ListingOrder.PRICE_DESC: {
        return 'Highest Price'
      }
      default: {
        return 'Newest'
      }
    }
  }, [order])

  const onOpenChange = (open: boolean) => {
    if (open) {
      analytics.MPSortingButtonClick()
    }
  }
  return (
    <DropdownButton
      isPopupPortal
      className={className}
      title={title}
      isSelected={order !== ListingOrder.DAYS_ON_MARKET_DESC}
      isOnlyIcon={isOnlyIcon}
      icon={<SortIcon />}
      onOpenChange={onOpenChange}
    >
      {({ closeDropdown }) => {
        return (
          <>
            {OPTIONS.map(({ label, value }) => (
              <ListRow
                isSelected={value === order}
                title={label}
                key={value}
                onClick={() => {
                  setOrder(value)
                  closeDropdown()
                }}
              />
            ))}
          </>
        )
      }}
    </DropdownButton>
  )
}
