import { FC } from 'react'
import { ListingBedrooms } from '__generated__/globalTypes'

import { bedroomsPartControls } from '@/components/screens/MarketplaceScreen/PropertyFilter/components/BedroomsPart'
import { DropdownButton } from '@/components/ui-kit/DropdownButton'
import { ListRow } from '@/components/ui-kit/ListRow'
import { useAnalytics } from '@/modules/analytics'
import { usePropertyFilter } from '@/modules/marketplace'

type Props = {
  className?: string
}
export const BedroomsFilter: FC<Props> = ({ className }) => {
  const { filter, setFilter } = usePropertyFilter()
  const analytics = useAnalytics()

  const onOpenChange = (open: boolean) => {
    if (open) {
      analytics.MPMainFilterBedsClick()
    }
  }

  let title = 'Bed'

  switch (filter?.bedrooms) {
    case ListingBedrooms.ROOMS_STUDIO: {
      title = 'Studio'
      break
    }
    case ListingBedrooms.ROOMS_1: {
      title = '1+ bed'
      break
    }
    case ListingBedrooms.ROOMS_2: {
      title = '2+ bed'
      break
    }
    case ListingBedrooms.ROOMS_3: {
      title = '3+ bed'
      break
    }
    case ListingBedrooms.ROOMS_4: {
      title = '4+ bed'
      break
    }
    case ListingBedrooms.ROOMS_5: {
      title = '5+ bed'
      break
    }
  }

  return (
    <DropdownButton
      isPopupPortal
      className={className}
      isSelected={filter?.bedrooms !== ListingBedrooms.ROOMS_ANY}
      title={title}
      withArrow
      onOpenChange={onOpenChange}
    >
      {({ closeDropdown }) => {
        return (
          <>
            {bedroomsPartControls.map(({ label, value }) => (
              <ListRow
                isSelected={value === filter.bedrooms}
                title={label}
                key={value}
                onClick={() => {
                  setFilter({ ...filter, bedrooms: value })
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
