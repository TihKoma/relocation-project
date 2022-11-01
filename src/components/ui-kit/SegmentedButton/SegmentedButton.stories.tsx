import { useState } from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { SettingsIcon } from '@/images'

import { SegmentedButton } from './SegmentedButton'

export default {
  title: 'SegmentedButton',
  component: SegmentedButton,
} as ComponentMeta<typeof SegmentedButton>

const Template: ComponentStory<typeof SegmentedButton> = (args: any) => {
  const [value, setValue] = useState(args.value)
  return (
    <SegmentedButton
      {...args}
      onChange={(type) => {
        args.onChange(type)
        setValue(type)
      }}
      value={value}
    />
  )
}

export const Primary = Template.bind({})
Primary.args = {
  buttons: [
    {
      name: 'Country',
      type: 'country',
      icon: <SettingsIcon />,
      counter: 99,
    },
    {
      name: 'State',
      type: 'state',
    },
    {
      name: 'City',
      type: 'city',
    },
  ],
  value: 'country',
}
