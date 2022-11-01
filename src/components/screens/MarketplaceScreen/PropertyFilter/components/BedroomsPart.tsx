import { VFC } from 'react'
import { ListingBedrooms } from '__generated__/globalTypes'
import { useFormContext } from 'react-hook-form'

import { ChipControl } from '@/components/ui-kit/form/ChipControl'

import { PropertyFiltersFieldset } from './PropertyFiltersFieldset'

export type BedroomsFieldsetType = {
  bedrooms: ListingBedrooms
}

export const bedroomsPartControls = [
  { label: 'Any', value: ListingBedrooms.ROOMS_ANY },
  { label: 'Studio', value: ListingBedrooms.ROOMS_STUDIO },
  { label: '1+', value: ListingBedrooms.ROOMS_1 },
  { label: '2+', value: ListingBedrooms.ROOMS_2 },
  { label: '3+', value: ListingBedrooms.ROOMS_3 },
  { label: '4+', value: ListingBedrooms.ROOMS_4 },
  { label: '5+', value: ListingBedrooms.ROOMS_5 },
]

export const BedroomsPart: VFC = () => {
  const { register } = useFormContext()

  return (
    <PropertyFiltersFieldset withHorizontalScroll legend={'Bedrooms'}>
      {bedroomsPartControls.map(({ label, value }) => (
        <ChipControl type={'radio'} value={value} {...register('bedrooms')}>
          {label}
        </ChipControl>
      ))}
    </PropertyFiltersFieldset>
  )
}
