import { VFC } from 'react'
import { useFormContext } from 'react-hook-form'

import { InputField } from './InputField'
import { PropertyFiltersFieldset } from './PropertyFiltersFieldset'

const lotSizePartControls = [
  {
    label: 'min',
    name: 'minLotSize',
  },
  {
    label: 'max',
    name: 'maxLotSize',
  },
]

export const LotSizePart: VFC = () => {
  const { register } = useFormContext()

  return (
    <PropertyFiltersFieldset legend={'Lot size'} grow>
      {lotSizePartControls.map(({ label, name }) => (
        <InputField
          key={name}
          label={label}
          type={'number'}
          withoutNegative
          min={0}
          {...register(name)}
        />
      ))}
    </PropertyFiltersFieldset>
  )
}
