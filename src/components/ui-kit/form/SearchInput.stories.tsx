import { ComponentMeta, ComponentStory } from '@storybook/react'

import { SearchInput } from './SearchInput'

export default {
  title: 'SearchInput',
  component: SearchInput,
} as ComponentMeta<typeof SearchInput>

const Template: ComponentStory<typeof SearchInput> = (args: any) => (
  <SearchInput {...args} />
)

export const Primary = Template.bind({})

export const Error = Template.bind({})
Error.args = {
  error: 'Some error',
}
