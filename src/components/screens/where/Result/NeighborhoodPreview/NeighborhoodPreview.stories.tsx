import { ComponentMeta, ComponentStory } from '@storybook/react'

import { NeighborhoodPreview } from './NeighborhoodPreview'

export default {
  title: 'NeighborhoodPreview',
  component: NeighborhoodPreview,
} as ComponentMeta<typeof NeighborhoodPreview>

const Template: ComponentStory<typeof NeighborhoodPreview> = (args: any) => {
  return <NeighborhoodPreview {...args} />
}

export const Primary = Template.bind({})
Primary.args = {
  neighborhood: 'West Village',
  score: 40,
  subtitle: 'New York, USA',
  quizId: 'test',
  image:
    'https://images.unsplash.com/photo-1603298108410-e6f28ad2708d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2833&q=80',
  badges: [' Best schools', 'Great location', 'Test', 'Test'],
  factorsScores: [{ score: 40, name: 'Schools', image: 'schools' }],
}
