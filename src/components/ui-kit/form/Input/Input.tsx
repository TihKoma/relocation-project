import { forwardRef, ForwardRefExoticComponent, VFC } from 'react'
import { UseControllerReturn } from 'react-hook-form/dist/types/controller'

import { InlineInput } from './InlineInput'
import { MultilineInput } from './MultilineInput'
import { InputProps } from './shared'

type Props = {
  isMultiline?: boolean
} & InputProps

export const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, Props>(
  ({ isMultiline, ...props }, ref) => {
    return isMultiline ? (
      <MultilineInput
        ref={ref as ForwardRefExoticComponent<HTMLTextAreaElement>}
        {...props}
      />
    ) : (
      <InlineInput
        ref={ref as ForwardRefExoticComponent<HTMLInputElement>}
        {...props}
      />
    )
  },
)

export const FieldInput: VFC<UseControllerReturn & Props> = ({
  field,
  fieldState,
  ...props
}) => {
  return <Input {...field} error={fieldState.error?.message} {...props} />
}
