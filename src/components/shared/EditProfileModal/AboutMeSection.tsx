import { Controller, ControllerRenderProps, FieldValues } from 'react-hook-form'

import { FieldInput } from '@/components/ui-kit/form/Input'
import { lengthLessOrEqualThen, required } from '@/modules/utils/validatores'

export const AboutMeSection = () => {
  return (
    <div>
      <Controller
        name={'firstName'}
        rules={{
          validate: {
            required: required(),
            lengthLessOrEqualThen: lengthLessOrEqualThen(40),
          },
        }}
        render={(input) => {
          return (
            <FieldInput
              {...input}
              field={input.field as ControllerRenderProps<FieldValues, string>}
              value={input.field.value}
              onChange={input.field.onChange}
              label={'First name'}
            />
          )
        }}
      />
      <Controller
        name={'lastName'}
        rules={{
          validate: {
            required: required(),
            lengthLessOrEqualThen: lengthLessOrEqualThen(40),
          },
        }}
        render={(input) => {
          return (
            <FieldInput
              {...input}
              field={input.field as ControllerRenderProps<FieldValues, string>}
              value={input.field.value}
              onChange={input.field.onChange}
              label={'Last name'}
            />
          )
        }}
      />
      <Controller
        name={'bio'}
        rules={{
          validate: lengthLessOrEqualThen(160),
        }}
        render={(input) => {
          return (
            <FieldInput
              {...input}
              field={input.field as ControllerRenderProps<FieldValues, string>}
              isMultiline
              maxLength={160}
              value={input.field.value}
              onChange={input.field.onChange}
              label={'About'}
            />
          )
        }}
      />
      <Controller
        name={'userName'}
        rules={{
          validate: {
            required: required(),
            lengthLessOrEqualThen: lengthLessOrEqualThen(40),
          },
        }}
        render={(input) => {
          return (
            <FieldInput
              {...input}
              field={input.field as ControllerRenderProps<FieldValues, string>}
              value={input.field.value}
              onChange={input.field.onChange}
              label={'Page url'}
            />
          )
        }}
      />
    </div>
  )
}
