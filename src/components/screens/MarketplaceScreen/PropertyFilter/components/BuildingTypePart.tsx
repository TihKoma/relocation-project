import { VFC } from 'react'
import { ListingBuildingType } from '__generated__/globalTypes'
import { useFormContext } from 'react-hook-form'

import { ChipControl } from '@/components/ui-kit/form/ChipControl'

import { PropertyFiltersFieldset } from './PropertyFiltersFieldset'

const buildingTypePartControls = [
  { label: 'Houses', value: ListingBuildingType.HOUSES },
  { label: 'Apartments', value: ListingBuildingType.APARTMENTS },
  { label: 'Multi-family units', value: ListingBuildingType.MULTI_FAMILY },
  { label: 'Townhouses', value: ListingBuildingType.TOWNHOUSES },
  { label: 'Condo / Coop', value: ListingBuildingType.CONDOS },
  { label: 'Other', value: ListingBuildingType.OTHERS },
]

export const BuildingTypePart: VFC = () => {
  const { register } = useFormContext()

  return (
    <PropertyFiltersFieldset withHorizontalScroll legend={'Building type'}>
      {buildingTypePartControls.map(({ value, label }) => (
        <ChipControl
          type={'checkbox'}
          value={value}
          {...register('buildingType')}
        >
          {label}
        </ChipControl>
      ))}
    </PropertyFiltersFieldset>
  )
}
