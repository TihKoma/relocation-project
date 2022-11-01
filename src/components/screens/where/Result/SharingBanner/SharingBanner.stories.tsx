import { ComponentMeta, ComponentStory } from '@storybook/react'

import { SharingBanner } from './SharingBanner'

export default {
  title: 'SharingBanner',
  component: SharingBanner,
} as ComponentMeta<typeof SharingBanner>

const Template: ComponentStory<typeof SharingBanner> = (args: any) => (
  <SharingBanner {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
  title: 'Do you like your experience?',
  subtitle: 'Tell your friends about Where',
  quizResultUrl: 'https://nicity.com/where/',
}
