import { VFC } from 'react'
import {
  ListingBuildingCondition,
  ListingTransactionType,
} from '__generated__/globalTypes'
import { useFormContext } from 'react-hook-form'

import { ChipControl } from '@/components/ui-kit/form/ChipControl'

import { PropertyFiltersFieldset } from './PropertyFiltersFieldset'

export type ListingFieldsetType = {
  buildingCondition: ListingBuildingCondition[]
}

export const BuildingConditionPart: VFC = () => {
  const { register, watch } = useFormContext()

  return (
    <PropertyFiltersFieldset withHorizontalScroll legend={'Listing type'}>
      <ChipControl
        type={'checkbox'}
        value={ListingBuildingCondition.EXISTING}
        {...register('buildingCondition')}
      >
        Existing homes
      </ChipControl>
      <ChipControl
        type={'checkbox'}
        value={ListingBuildingCondition.NEW}
        {...register('buildingCondition')}
      >
        New construction
      </ChipControl>
      {watch('transactionType') === ListingTransactionType.FOR_SALE && (
        <ChipControl
          type={'checkbox'}
          value={ListingBuildingCondition.PENDING}
          {...register('buildingCondition')}
        >
          Pending & Under Contract
        </ChipControl>
      )}
    </PropertyFiltersFieldset>
  )
}
