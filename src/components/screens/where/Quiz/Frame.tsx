import { VFC } from 'react'
import styled from '@emotion/styled'

import { useIsNotMobileDevice } from '@/modules/device/use-is-not-mobile-device'
import { mobileMedia, notDesktopMedia, notMobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

export type ProgressModel = {
  currentStep: number
  countStep: number
}

type Props = {
  srcDesktop?: string
  srcMobile?: string
  title: string
  className?: string
} & ProgressModel

export const Frame: VFC<Props> = ({
  srcDesktop,
  srcMobile,
  title,
  currentStep,
  countStep,
  className,
}) => {
  const isDesktop = useIsNotMobileDevice()
  return (
    <Container className={className}>
      <Title>{title}</Title>
      <ImageWrapper>
        {isDesktop
          ? srcDesktop && <Image src={srcDesktop} />
          : srcMobile && <Image src={srcMobile} />}
      </ImageWrapper>
      <ContainerProgressBar>
        <ProgressBar percent={(100 / countStep) * currentStep} />
      </ContainerProgressBar>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  ${mobileMedia} {
    margin-top: 0.8rem;

    align-items: center;
    gap: 2rem;
  }
  ${notMobileMedia} {
    padding-top: 2.4rem;

    flex-direction: column;

    border-radius: 2.2rem;
  }
`
const ImageWrapper = styled.div`
  ${notMobileMedia} {
    position: relative;

    flex-grow: 1;
  }
  ${mobileMedia} {
    margin-left: auto;
  }
`
const Image = styled.img`
  ${notMobileMedia} {
    width: 100%;
    max-height: 100%;

    position: absolute;
    top: 0;
    left: 0;

    object-fit: contain;
  }
  ${mobileMedia} {
    flex-shrink: 0;
  }
`
const Title = styled.h1`
  margin: 0;
  font-weight: 500;
  font-size: 6.2rem;
  line-height: 7.2rem;
  letter-spacing: -0.04em;
  color: #12151f;

  ${notDesktopMedia} {
    font-size: 4.2rem;
    line-height: 5.2rem;
  }

  ${mobileMedia} {
    font-size: 2.8rem;
    line-height: 3.6rem;
  }
`
const ContainerProgressBar = styled.div`
  ${mobileMedia} {
    position: fixed;
    left: 2.4rem;
    right: 2.4rem;
    bottom: 2.4rem;

    z-index: 100;
  }
  ${notMobileMedia} {
    width: 100%;
    margin-top: auto;
  }
`
const ProgressBar = styled.div<{ percent: number }>`
  width: 100%;
  height: 0.8rem;
  margin-bottom: 1rem;
  ${mobileMedia} {
    margin-bottom: 0.2rem;
  }

  position: relative;
  &:before {
    content: '';
    width: ${({ percent }) => percent}%;

    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    background: ${getColorTheme('neptune')};
    border-radius: 0.4rem;
  }
  overflow: hidden;
  background: #e2e6ec;
  border-radius: 0.4rem;
`
