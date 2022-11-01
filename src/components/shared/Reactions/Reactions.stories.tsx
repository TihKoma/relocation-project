import styled from '@emotion/styled'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ReactionType } from '@/modules/reaction'
import { ListReactionsByEntity_listReactionsByEntity } from '@/modules/reaction/graphql/__generated__/ListReactionsByEntity'

import { ReactionsCounter } from '../feed/FeedContent/Footer/ReactionsCounter'
import { ReactionsTooltip } from './ReactionsTooltip'

export default {
  title: 'Reactions',
  component: ReactionsTooltip,
} as ComponentMeta<typeof ReactionsTooltip>

const reactions = {
  angry: 2,
  funny: 3,
  like: 4,
  sad: 5,
  super: 7,
  total: 10,
}

const Template: ComponentStory<typeof ReactionsTooltip> = (args: any) => {
  return <></>
  return (
    <Container>
      <ReactionsTooltip {...args}>
        <ReactionsCounter reactions={reactions} />
      </ReactionsTooltip>
    </Container>
  )
}

const Container = styled.div`
  margin-top: 100px;
  width: 100px;
`

export const listReactions: ListReactionsByEntity_listReactionsByEntity[] = [
  {
    id: 'asdfer',
    type: ReactionType.ANGRY,
    user: {
      __typename: 'FeedUser',
      userId: '12312312312',
      userName: 'asdfd',
      firstName: 'First',
      lastName: 'Name',
      photoUrl:
        'https://public-test-storage.s3.eu-central-1.amazonaws.com/d9a5fed9-0e25-4c66-a23c-947928c9abd6.jpg',
      isSubscribed: false,
    },
    __typename: 'FeedReaction',
  },
  {
    id: 'asddghfhhgffer',
    type: ReactionType.FUNNY,
    user: {
      __typename: 'FeedUser',
      userId: '122fdg312312',
      userName: 'asdfd',
      firstName: 'Test',
      lastName: 'Testov',
      photoUrl:
        'https://public-test-storage.s3.eu-central-1.amazonaws.com/24ce8267-5343-48f2-b8c8-9442cc998770.jpeg',
      isSubscribed: false,
    },
    __typename: 'FeedReaction',
  },
  {
    id: 'asddghfhhgff2343er',
    type: ReactionType.LIKE,
    user: {
      __typename: 'FeedUser',
      userId: '122fdg3123erre12',
      userName: 'asd32dwfd',
      firstName: 'Ivan',
      lastName: 'Ivanov',
      photoUrl:
        'https://public-test-storage.s3.eu-central-1.amazonaws.com/ed62cd2e-aafe-4a8b-bb6d-0cc6c1a8b06e.jpeg',
      isSubscribed: false,
    },
    __typename: 'FeedReaction',
  },
]

export const General = Template.bind({})
General.args = {
  reactions,
}
