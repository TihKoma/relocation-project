import { VFC } from 'react'
import { ListingTransactionType } from '__generated__/globalTypes'
import { useFormContext } from 'react-hook-form'

import { ChipControl } from '@/components/ui-kit/form/ChipControl'

import { PropertyFiltersFieldset } from './PropertyFiltersFieldset'

export type RealEstateFieldsetType = {
  transactionType: ListingTransactionType
}

export const realEstateTypePartControls = [
  {
    label: 'Sale',
    value: ListingTransactionType.FOR_SALE,
    name: 'transactionType',
  },
  {
    label: 'Rent',
    value: ListingTransactionType.FOR_RENT,
    name: 'transactionType',
  },
]

export const TransactionTypePart: VFC = () => {
  const { register } = useFormContext()

  return (
    <PropertyFiltersFieldset legend={'Real Estate for'}>
      {realEstateTypePartControls.map(({ label, value }) => (
        <ChipControl
          type={'radio'}
          value={value}
          {...register('transactionType')}
        >
          {label}
        </ChipControl>
      ))}
    </PropertyFiltersFieldset>
  )
}
