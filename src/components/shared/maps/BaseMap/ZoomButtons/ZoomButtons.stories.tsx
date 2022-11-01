import { action } from '@storybook/addon-actions'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ZoomButtons } from './ZoomButtons'

export default {
  title: 'ZoomButtons',
  component: ZoomButtons,
} as ComponentMeta<typeof ZoomButtons>

const Template: ComponentStory<typeof ZoomButtons> = (args: any) => {
  return <ZoomButtons {...args} />
}

export const General = Template.bind({})
General.args = {
  onZoomIn: () => action('zoom in'),
  onZoomOut: () => action('zoom out'),
}
