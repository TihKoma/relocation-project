import { FC } from 'react'
import { useFormContext } from 'react-hook-form'

import { InputField } from './InputField'
import { PropertyFiltersFieldset } from './PropertyFiltersFieldset'

const pricePartControls = [
  {
    label: 'min',
    name: 'minPrice',
  },
  {
    label: 'max',
    name: 'maxPrice',
  },
]

type Props = {
  title?: string
  fieldClassName?: string
}

export const PricePart: FC<Props> = ({ title, fieldClassName }) => {
  const { register } = useFormContext()

  return (
    <PropertyFiltersFieldset legend={title ?? ''} grow>
      {pricePartControls.map(({ label, name }) => (
        <InputField
          key={name}
          label={label}
          withoutNegative
          min={0}
          type={'number'}
          fieldClassName={fieldClassName}
          {...register(name)}
        />
      ))}
    </PropertyFiltersFieldset>
  )
}
