import { VFC } from 'react'
import { Controller } from 'react-hook-form'

import { StepSelect } from '@/modules/quiz'

import { ChooseWayBase } from './ChooseWayBase'

type Props = {
  step: StepSelect
  onChange?: () => void
}
export const ChooseWay: VFC<Props> = ({
  step: {
    id,
    payload: { subtitle, options },
  },
}) => {
  return (
    <Controller
      key={id}
      name={id}
      render={(input) => {
        return (
          <ChooseWayBase
            subtitle={subtitle}
            value={input.field.value ? [input.field.value] : []}
            options={options}
            onChange={(ids) => {
              input.field.onChange(ids[ids.length - 1] ?? null)
            }}
          />
        )
      }}
    />
  )
}
