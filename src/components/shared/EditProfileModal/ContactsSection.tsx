import { Dispatch, FC, SetStateAction } from 'react'
import { Controller, ControllerRenderProps, FieldValues } from 'react-hook-form'

import type { Screen } from '@/components/shared/EditProfileModal/EditProfileModal'
import { FieldInput } from '@/components/ui-kit/form/Input'
import { FieldPhoneInput } from '@/components/ui-kit/form/PhoneInput'

import { Title } from './shared'

//TODO: someday we will return email editing
type Props = {
  setScreen: Dispatch<SetStateAction<Screen>>
}

export const ContactsSection: FC<Props> = ({ setScreen }) => {
  const editPhone = () => {
    setScreen('phone-edit')
  }

  // uncomment lines to return email editing
  // const editEmail = () => {
  //   setScreen('email-edit')
  // }

  return (
    <>
      <Title>Contacts</Title>
      <Controller
        name={'phone'}
        render={(input) => {
          return (
            <FieldPhoneInput
              {...input}
              field={input.field as ControllerRenderProps<FieldValues, string>}
              readOnly
              suffix={({ Button }) => {
                return <Button onClick={editPhone}>Edit</Button>
              }}
            />
          )
        }}
      />
      <Controller
        name={'email'}
        render={(input) => {
          if (!input.field.value) {
            return <></>
          }
          return (
            <FieldInput
              {...input}
              label={'Email'}
              field={input.field as ControllerRenderProps<FieldValues, string>}
              value={input.field.value}
              onChange={input.field.onChange}
              // uncomment lines and remove "disabled" to return email editing
              disabled
              // readOnly
              // suffix={({ Button }) => {
              //   return <Button onClick={editEmail}>Edit</Button>
              // }}
            />
          )
        }}
      />
    </>
  )
}
