import { useState } from 'react'
import styled from '@emotion/styled'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Input } from './Input'

export default {
  title: 'Input',
  component: Input,
} as ComponentMeta<typeof Input>

const Template: ComponentStory<typeof Input> = (args: any) => {
  const [value, onChange] = useState('some text')
  return (
    <InputStyle {...args} value={value} onChange={onChange} label={'Label'} />
  )
}

const InputStyle = styled(Input)`
  width: 600px;
`

export const Primary = Template.bind({})

export const Error = Template.bind({})
Error.args = {
  error: 'Some error',
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
}

export const Multiline = Template.bind({})
Multiline.args = {
  isMultiline: true,
  disabled: false,
  maxLength: 160,
}
