import { VFC } from 'react'
import { ListingBathrooms } from '__generated__/globalTypes'
import { useFormContext } from 'react-hook-form'

import { ChipControl } from '@/components/ui-kit/form/ChipControl'

import { PropertyFiltersFieldset } from './PropertyFiltersFieldset'

export type BathroomsFieldsetType = {
  bathrooms: ListingBathrooms
}

const bathroomsPartControls = [
  { label: 'Any', value: ListingBathrooms.ROOMS_ANY },
  { label: '1+', value: ListingBathrooms.ROOMS_1 },
  { label: '1.5+', value: ListingBathrooms.ROOMS_1_HALF },
  { label: '2+', value: ListingBathrooms.ROOMS_1_HALF },
  { label: '3+', value: ListingBathrooms.ROOMS_3 },
  { label: '4+', value: ListingBathrooms.ROOMS_4 },
]

export const BathroomsPart: VFC = () => {
  const { register } = useFormContext()

  return (
    <PropertyFiltersFieldset withHorizontalScroll legend={'Bathrooms'}>
      {bathroomsPartControls.map(({ value, label }) => (
        <ChipControl type={'radio'} value={value} {...register('bathrooms')}>
          {label}
        </ChipControl>
      ))}
    </PropertyFiltersFieldset>
  )
}
