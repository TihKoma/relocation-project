import { VFC } from 'react'
import styled from '@emotion/styled'

import { CreatePostButtonWrapper } from '@/components/shared/PostForm/CreatePostButtonWrapper'
import { Button } from '@/components/ui-kit/Button'
import { PlaceholderFeedIcon as PlaceholderFeedIconBase } from '@/images'
import { useIsMobileDevice } from '@/modules/device'
import { mobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

type Props = { className?: string }
export const PlaceholderFeed: VFC<Props> = ({ className }) => {
  const isMobile = useIsMobileDevice()
  return (
    <Container className={className}>
      <Wrapper>
        <Title>Feed is empty</Title>
        <Tip>Start a conversation first</Tip>
        <CreatePostButtonWrapper
          button={({ onClick }) => (
            <Button
              viewType={'primary'}
              size={isMobile ? 'small' : 'medium'}
              onClick={onClick}
            >
              Create post
            </Button>
          )}
        />
      </Wrapper>
      <PlaceholderFeedIcon />
    </Container>
  )
}

const Container = styled.div`
  padding: 2.4rem 1.6rem;

  display: flex;

  background: ${getColorTheme('sun50')};

  border-radius: 2.4rem;

  ${mobileMedia} {
    padding: 1.6rem;
  }
`
const Title = styled.div`
  margin-bottom: 0.4rem;

  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  color: ${getColorTheme('sun1000')};

  ${mobileMedia} {
    font-size: 20px;
    line-height: 24px;
  }
`
const Tip = styled.div`
  margin-bottom: 2rem;

  font-size: 16px;
  line-height: 24px;
  color: ${getColorTheme('sun500')};
  ${mobileMedia} {
    margin-bottom: 1.2rem;

    font-size: 14px;
    line-height: 20px;
  }
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`
const PlaceholderFeedIcon = styled(PlaceholderFeedIconBase)`
  margin-left: auto;
  width: 148px;

  ${mobileMedia} {
    width: 10.8rem;
  }
`
