import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ReactComponent as ClipIcon } from '@/images/clip.svg'

import { Chip } from './Chip'

export default {
  title: 'Chip',
  component: Chip,
} as ComponentMeta<typeof Chip>

const Template: ComponentStory<typeof Chip> = (args: any) => <Chip {...args} />

export const Primary = Template.bind({})
Primary.args = {
  children: (
    <>
      <ClipIcon />
      Attach
    </>
  ),
}
