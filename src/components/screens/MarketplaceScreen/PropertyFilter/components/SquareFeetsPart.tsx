import { VFC } from 'react'
import { useFormContext } from 'react-hook-form'

import { InputField } from './InputField'
import { PropertyFiltersFieldset } from './PropertyFiltersFieldset'

const squareFeetPartControls = [
  {
    label: 'min',
    name: 'minSquareFeets',
  },
  {
    label: 'max',
    name: 'maxSquareFeets',
  },
]

export const SquareFeetsPart: VFC = () => {
  const { register } = useFormContext()

  return (
    <PropertyFiltersFieldset legend={'Square footage'} grow>
      {squareFeetPartControls.map(({ label, name }) => (
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
