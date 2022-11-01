import { VFC } from 'react'
import { useFormContext } from 'react-hook-form'

import { InputField } from './InputField'
import { PropertyFiltersFieldset } from './PropertyFiltersFieldset'

const yearBuiltPartControls = [
  {
    label: 'min',
    name: 'minYearBuilt',
  },
  {
    label: 'max',
    name: 'maxYearBuilt',
  },
]

export const YearBuiltPart: VFC = () => {
  const { register } = useFormContext()

  return (
    <PropertyFiltersFieldset legend={'Year Built'} grow>
      {yearBuiltPartControls.map(({ label, name }) => (
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
