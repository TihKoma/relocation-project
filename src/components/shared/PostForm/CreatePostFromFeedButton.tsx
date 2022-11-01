import { ComponentProps, VFC } from 'react'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'

import { Avatar } from '@/components/ui-kit/Avatar'
import { NormalizedButton } from '@/components/ui-kit/Button'
import { QUERY_GET_USER_PROFILE } from '@/modules/profile'
import { HOVER_TRANSITION_TIME } from '@/styles/const'
import { getColorTheme } from '@/styles/themes'

import { CreatePostButtonWrapper } from './CreatePostButtonWrapper'

type Props = {
  isHighlight?: boolean
} & Omit<ComponentProps<typeof CreatePostButtonWrapper>, 'button'>
export const CreatePostFromFeedButton: VFC<Props> = ({
  isHighlight,
  ...props
}) => {
  const { data: profileData } = useQuery(QUERY_GET_USER_PROFILE, {
    ssr: true,
  })
  const profile = profileData?.getUserProfile

  return (
    <CreatePostButtonWrapper
      {...props}
      button={({ onClick }) => {
        return (
          <Container
            isHighlight={isHighlight}
            onClick={onClick}
            data-test-id={'create-post:open-from-feed-button'}
          >
            <Avatar src={profile?.photoUrl} />
            <Text isHighlight={isHighlight}>
              Ask questions and share insights
            </Text>
          </Container>
        )
      }}
    />
  )
}

const Container = styled(NormalizedButton)<{ isHighlight?: boolean }>`
  width: 100%;
  height: 7.4rem;
  padding: 1.6rem;

  display: grid;
  grid-template-columns: auto 1fr;
  align-content: center;
  gap: 1.6rem;

  background: ${getColorTheme('earth')};
  border-radius: 1.2rem;
  border: ${(props) =>
    props.isHighlight ? `1px solid ${getColorTheme('pluto')(props)}` : ''};

  cursor: pointer;
  transition: box-shadow ${HOVER_TRANSITION_TIME};
  &:hover {
    box-shadow: 0 0.2rem 0.4rem rgba(18, 21, 31, 0.08),
      0 0.4rem 1.6rem 0.1rem rgba(18, 21, 31, 0.08);
  }
`
const Text = styled.div<{ isHighlight?: boolean }>`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  font-weight: ${(props) => (props.isHighlight ? 'bold' : 'normal')};

  color: ${(props) =>
    props.isHighlight
      ? getColorTheme('pluto')(props)
      : getColorTheme('mercury')(props)};
`
