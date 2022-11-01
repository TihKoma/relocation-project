import { FC } from 'react'
import styled from '@emotion/styled'

import { ShareDropdown } from '@/components/shared/ShareDropdown'
import { Button } from '@/components/ui-kit/Button'
import { SharingImg } from '@/images'
import { mobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

// TODO: fix storybook images https://nicity.atlassian.net/browse/LA-788
type Props = {
  title: string
  subtitle: string
  quizResultUrl: string
  hideForSession: () => void
  onShare?: () => void
}

export const SharingBanner: FC<Props> = ({
  title,
  subtitle,
  quizResultUrl,
  hideForSession,
  onShare,
}) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
      <ShareDropdown
        url={quizResultUrl}
        offset={[44, -72]}
        hideForSession={hideForSession}
        contentType={'match'}
        onShare={onShare}
      >
        <Button
          size={'medium'}
          viewType={'primary'}
          backgroundUnderButton={'alt'}
        >
          Share
        </Button>
      </ShareDropdown>
      <ImageWrapper>
        <SharingImg />
      </ImageWrapper>
    </Container>
  )
}

const Container = styled.div`
  padding: 1.6rem;

  position: relative;

  border-radius: 1.2rem;
  background-color: ${getColorTheme('pluto')};

  color: #fff;

  ${mobileMedia} {
    padding: 1.6rem 1.6rem 11.8rem;
  }
`
const Title = styled.h2`
  margin: 0 0 1.2rem;

  font-weight: 400;
  font-size: 2.4rem;
  line-height: 2.8rem;

  ${mobileMedia} {
    margin-bottom: 0.4rem;

    font-size: 2rem;
    line-height: 2.4rem;
  }
`
const Subtitle = styled.p`
  margin: 0 0 1.6rem;

  font-size: 1.6rem;
  line-height: 2.4rem;

  ${mobileMedia} {
    font-size: 1.4rem;
    line-height: 2rem;
  }
`
const ImageWrapper = styled.div`
  width: 21.6rem;
  max-width: 38%;
  height: 16.4rem;

  position: absolute;
  right: 0;
  bottom: 0;

  ${mobileMedia} {
    width: 18.9rem;
    max-width: 55%;
  }
`
