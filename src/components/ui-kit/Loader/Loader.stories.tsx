import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Loader } from './Loader'

export default {
  title: 'Loader',
  component: Loader,
} as ComponentMeta<typeof Loader>

const Template: ComponentStory<typeof Loader> = (args: any) => {
  return <Loader {...args} />
}

export const Common = Template.bind({})
Common.args = {
  size: 'large',
}

export const Transparent = Template.bind({})
Transparent.args = {
  size: 'large',
  withGradient: true,
}
