import { VFC } from 'react'
import { Controller } from 'react-hook-form'

import { StepSelect } from '@/modules/quiz'

import { SelectBase } from './SelectBase'

type Props = {
  step: StepSelect
  onChange?: () => void
}
export const Select: VFC<Props> = ({
  step: {
    id,
    payload: { subtitle, options },
  },
  onChange,
}) => {
  return (
    <Controller
      key={id}
      name={id}
      render={(input) => {
        return (
          <SelectBase
            subtitle={subtitle}
            value={input.field.value ? [input.field.value] : []}
            options={options}
            onChange={(ids) => {
              onChange?.()
              input.field.onChange(ids[ids.length - 1] ?? null)
            }}
          />
        )
      }}
    />
  )
}
