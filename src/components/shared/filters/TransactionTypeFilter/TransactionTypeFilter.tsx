import { ListingTransactionType } from '__generated__/globalTypes'

import { realEstateTypePartControls } from '@/components/screens/MarketplaceScreen/PropertyFilter/components/TransactionTypePart'
import { DropdownButton } from '@/components/ui-kit/DropdownButton'
import { ListRow } from '@/components/ui-kit/ListRow'
import { useAnalytics } from '@/modules/analytics'
import { usePropertyFilter } from '@/modules/marketplace'

export const TransactionTypeFilter = () => {
  const { filter, setFilter } = usePropertyFilter()
  const analytics = useAnalytics()

  const title =
    filter.transactionType === ListingTransactionType.FOR_RENT
      ? 'For rent'
      : 'For sale'

  const onOpenChange = (open: boolean) => {
    if (open) {
      analytics.MPMainForSaleForRentSelectorClick()
    }
  }

  return (
    <DropdownButton
      title={title}
      isPopupPortal
      withArrow
      isSelected={filter.transactionType !== ListingTransactionType.FOR_SALE}
      onOpenChange={onOpenChange}
    >
      {({ closeDropdown }) => {
        return (
          <>
            {realEstateTypePartControls.map(({ label, value }) => (
              <ListRow
                key={value}
                isSelected={value === filter.transactionType}
                title={label}
                onClick={() => {
                  setFilter({ ...filter, transactionType: value })
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
