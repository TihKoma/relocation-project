import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ScoresComponent } from './ScoresComponent'

export default {
  title: 'ScoresComponent',
  component: ScoresComponent,
} as ComponentMeta<typeof ScoresComponent>

const Template: ComponentStory<typeof ScoresComponent> = (args: any) => (
  <ScoresComponent {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
  type: 'price',
  scores: [
    { id: 'neighborhood', name: 'West Village', value: 536, color: '#5D54E6' },
    { id: 'city', name: 'New York City', value: 402, color: '#00E5BC' },
    { id: 'state', name: 'New York State', value: 473, color: '#B59AF8' },
    { id: 'country', name: 'United States', value: 212, color: '#85E2FF' },
  ],
}
