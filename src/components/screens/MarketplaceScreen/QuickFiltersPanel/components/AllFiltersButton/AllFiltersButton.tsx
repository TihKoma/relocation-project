import { useState, VFC } from 'react'

import { DropdownButton } from '@/components/ui-kit/DropdownButton'
import { AllFiltersIcon } from '@/images'
import { useAnalytics } from '@/modules/analytics'
import { usePropertyFilter } from '@/modules/marketplace'

import { ListingBathrooms } from '../../../../../../../__generated__/globalTypes'
import { PropertyFiltersModal } from '../../../PropertyFiltersModal'

type Props = {
  isOnlyIcon: boolean
}
export const AllFiltersButton: VFC<Props> = ({ isOnlyIcon }) => {
  const [isPropertyFiltersModalOpen, setIsPropertyFiltersModalOpen] =
    useState(false)
  const analytics = useAnalytics()
  const { filter } = usePropertyFilter()

  const isSelected =
    filter.bathrooms !== ListingBathrooms.ROOMS_ANY ||
    (filter.buildingType && filter.buildingType.length !== 6) ||
    Number(filter.maxLotSize) > 0 ||
    Number(filter.minLotSize) > 0 ||
    Number(filter.maxPrice) > 0 ||
    Number(filter.minPrice) > 0 ||
    Number(filter.maxSquareFeets) > 0 ||
    Number(filter.minSquareFeets) > 0 ||
    Number(filter.maxYearBuilt) > 0 ||
    Number(filter.minYearBuilt) > 0

  const onClick = () => {
    setIsPropertyFiltersModalOpen(true)
    analytics.MPFiltersButtonClick()
  }

  return (
    <>
      <DropdownButton
        isPopupPortal
        icon={<AllFiltersIcon />}
        title={'More filters'}
        isSelected={isSelected}
        isOnlyIcon={isOnlyIcon}
        onClick={onClick}
      />
      <PropertyFiltersModal
        isVisible={isPropertyFiltersModalOpen}
        onRequestClose={setIsPropertyFiltersModalOpen}
      />
    </>
  )
}
