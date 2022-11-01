import { ComponentMeta, ComponentStory } from '@storybook/react'

import { BigPlusIcon, ShareIcon } from '@/images'

import { Option } from './Option'
import { Options } from './Options'

export default {
  title: 'Options',
  component: Options,
} as ComponentMeta<typeof Options>

const Template: ComponentStory<typeof Options> = () => {
  return (
    <Options>
      <Option icon={<BigPlusIcon />}>Follow neighborhood</Option>
      <Option icon={<ShareIcon />}>Share</Option>
    </Options>
  )
}

export const Primary = Template.bind({})
