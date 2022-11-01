import styled from '@emotion/styled'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { TextCollapse } from './TextCollapse'

export default {
  title: 'TextCollapse',
  component: TextCollapse,
} as ComponentMeta<typeof TextCollapse>

const Template: ComponentStory<typeof TextCollapse> = (args: any) => (
  <Container>
    <TextCollapse {...args} />
  </Container>
)
const Container = styled.div`
  width: 400px;
`

export const Primary = Template.bind({})
Primary.args = {
  countRow: 3,
  children: `
   The traditional boundaries of the West Village are the Hudson River
            to the west, West 14th Street to the north, Greenwich Avenue to the
            east, and Christopher Street to the south. Other popular definitions
            have extended the southern boundary as far south as Houston The
            traditional boundaries of the West Village are the Hudson River to
            the west, West 14th Street to the north, Greenwich Avenue to the
            east, and Christopher Street to the south. Other popular definitions
            have extended the southern boundary as far south as Houston The
            traditional boundaries of the West Village are the Hudson River to
            the west, West 14th Street to the north, Greenwich Avenue to the
            east, and Christopher Street to the south. Other popular definitions
            have extended the southern boundary as far south as Houston The
            traditional boundaries of the West Village are the Hudson River to
            the west, West 14th Street to the north, Greenwich Avenue to the
            east, and Christopher Street to the south. Other popular definitions
            have extended the southern boundary as far south as Houston
  `,
}

export const NoneShowButtonMore = Template.bind({})
NoneShowButtonMore.args = {
  countRow: 3,
  children: `
   The traditional boundaries of the West Village are the Hudson River
  `,
}
