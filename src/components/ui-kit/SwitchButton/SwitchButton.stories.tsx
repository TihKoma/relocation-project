import { ComponentMeta, ComponentStory } from '@storybook/react'

import { SwitchButton } from './SwitchButton'

export default {
  title: 'SwitchButton',
  component: SwitchButton,
} as ComponentMeta<typeof SwitchButton>

const Template: ComponentStory<typeof SwitchButton> = (args: any) => (
  <SwitchButton {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
  tabs: [
    {
      name: 'Rent',
      type: 'RENT',
    },
    {
      name: 'Buy',
      type: 'BUY',
    },
  ],
}
