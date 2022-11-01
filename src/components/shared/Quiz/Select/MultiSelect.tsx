import { VFC } from 'react'
import { useController } from 'react-hook-form'

import { StepMultiSelect } from '@/modules/quiz'

import { SelectBase } from './SelectBase'

type Props = {
  step: StepMultiSelect
}
export const MultiSelect: VFC<Props> = ({
  step: {
    id,
    payload: { options },
  },
}) => {
  const { field } = useController({ name: id })
  const value = field.value || []
  return (
    <SelectBase
      value={value}
      options={options}
      onChange={(ids) => {
        field.onChange(ids)
      }}
    />
  )
}
