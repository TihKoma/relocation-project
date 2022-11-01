import { useState } from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Input } from '../Input/Input'
import { PhoneInput } from './PhoneInput'

export default {
  title: 'PhoneInput',
  component: PhoneInput,
} as ComponentMeta<typeof Input>

export const Primary: ComponentStory<typeof Input> = (args: any) => {
  const [value, onChange] = useState('some text')
  return (
    <>
      <PhoneInput value={value} onChange={onChange} disabled={args.disabled} />
      <div id={'modalRoot'} />
    </>
  )
}
