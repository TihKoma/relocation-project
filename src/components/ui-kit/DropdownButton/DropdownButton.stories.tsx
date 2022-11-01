import { ComponentMeta, ComponentStory } from '@storybook/react'

import { AllFiltersIcon } from '@/images'

import { DropdownButton } from './DropdownButton'

export default {
  title: 'DropdownButton',
  component: DropdownButton,
} as ComponentMeta<typeof DropdownButton>

const Template: ComponentStory<typeof DropdownButton> = (args: any) => (
  <DropdownButton {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
  title: 'Newest',
  icon: <AllFiltersIcon />,
  children: () => <div>Popup</div>,
}
