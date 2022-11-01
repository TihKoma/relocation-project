import { useContext, VFC } from 'react'
import { Controller, ControllerRenderProps, FieldValues } from 'react-hook-form'

import { FieldChoiceNeighborhood } from '@/components/shared/Location'
import { PostFormStageContext } from '@/components/shared/PostForm/post-form-stage-context'
import { BasicSourceData } from '@/components/shared/PostForm/types'

type Props = {
  onChange?: (region: BasicSourceData) => void
  title: string
  description?: string | null
}
export const NeighborhoodStage: VFC<Props> = ({
  onChange,
  title,
  description,
}) => {
  const [_, setFormStage] = useContext(PostFormStageContext)
  return (
    <Controller
      name={'region'}
      render={(input) => (
        <FieldChoiceNeighborhood
          title={title}
          description={description}
          onChange={onChange}
          onRequestClose={() => setFormStage('main')}
          onBack={() => setFormStage('main')}
          value={input.field.value}
          {...input}
          field={input.field as ControllerRenderProps<FieldValues, string>}
        />
      )}
    />
  )
}
