import { FC, useContext } from 'react'
import { Controller, ControllerRenderProps, FieldValues } from 'react-hook-form'

import { PostFormStageContext } from '@/components/shared/PostForm/post-form-stage-context'
import type { BasicSourceData } from '@/components/shared/PostForm/types'

import { FieldChoiceGroup } from './FieldChoiceGroup'

type Props = {
  onChange: (group: BasicSourceData, region?: BasicSourceData) => void
}

export const GroupStage: FC<Props> = ({ onChange }) => {
  const [_, setFormStage] = useContext(PostFormStageContext)

  return (
    <Controller
      name={'group'}
      render={(input) => {
        return (
          <FieldChoiceGroup
            {...input}
            field={input.field as ControllerRenderProps<FieldValues, string>}
            onChange={onChange}
            onRequestClose={() => setFormStage('main')}
            onBack={() => setFormStage('main')}
          />
        )
      }}
    />
  )
}
