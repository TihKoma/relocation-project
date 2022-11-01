import { VFC } from 'react'
import { Controller, ControllerRenderProps, FieldValues } from 'react-hook-form'

import { FieldTextArea } from '@/components/ui-kit/form/TextArea'

const MAX_POST_TEXT_LENGTH = 2500

type Props = {
  onCursorPositionChange: (text: string, position: number | null) => void
}

export const TextField: VFC<Props> = ({ onCursorPositionChange }) => {
  return (
    <Controller
      name={'content'}
      rules={{ maxLength: MAX_POST_TEXT_LENGTH }}
      render={(input) => {
        return (
          <FieldTextArea
            autoresize
            withHighlightLinks
            onCursorPositionChange={onCursorPositionChange}
            maxLength={MAX_POST_TEXT_LENGTH}
            data-test-id={'create-post'}
            placeholder={'Write something'}
            ref={input.field.ref}
            autoFocus
            {...input}
            field={input.field as ControllerRenderProps<FieldValues, string>}
          />
        )
      }}
    />
  )
}
