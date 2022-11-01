import { FC, ReactNode } from 'react'
import styled from '@emotion/styled'

import { CreatePostButtonWrapper } from '@/components/shared/PostForm/CreatePostButtonWrapper'
import { Activity } from '@/components/ui-kit/Activity'
import { Button as ButtonBase } from '@/components/ui-kit/Button'
import { mobileMedia, notMobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

type Props = {
  title: string
  description?: string
  buttonText?: string
  onClick?: () => void
  image?: ReactNode
  secondaryButtonText?: string
  secondaryButtonOnClick?: () => void
  loading?: boolean
  withCreatePostButton?: boolean
  className?: string
}

export const MockWithAction: FC<Props> = ({
  title,
  buttonText,
  description,
  onClick,
  image,
  secondaryButtonText,
  secondaryButtonOnClick,
  loading,
  withCreatePostButton,
  className,
}) => {
  if (loading) {
    return (
      <Container className={className}>
        <Activity />
      </Container>
    )
  }

  return (
    <Container className={className}>
      <ImageWrapper>{image}</ImageWrapper>
      <Title>{title}</Title>
      <Description>{description}</Description>
      {buttonText && onClick && (
        <Button
          viewType={'primary'}
          size={'medium'}
          fullWidth
          onClick={onClick}
        >
          {buttonText}
        </Button>
      )}
      {secondaryButtonText && secondaryButtonOnClick && (
        <Button
          viewType={'secondary'}
          size={'medium'}
          fullWidth
          onClick={secondaryButtonOnClick}
        >
          {secondaryButtonText}
        </Button>
      )}
      {withCreatePostButton && (
        <CreatePostButtonWrapper
          button={({ onClick }) => {
            return (
              <Button
                viewType={'primary'}
                size={'medium'}
                fullWidth
                onClick={onClick}
                data-test-id={'create-post:open-button'}
              >
                Create post
              </Button>
            )
          }}
        />
      )}
    </Container>
  )
}

const Container = styled.div`
  height: 100%;
  margin: 0 auto;

  display: grid;
  grid-auto-flow: row;
  align-content: center;
  justify-items: center;

  ${notMobileMedia} {
    max-width: 28.6rem;
  }
`
const Title = styled.h2`
  max-width: 27.4rem;
  margin: 0;

  font-weight: 500;
  font-size: 2rem;
  line-height: 2.4rem;
  text-align: center;

  ${mobileMedia} {
    font-size: 2rem;
  }
`
const Description = styled.p`
  max-width: 26.6rem;
  margin: 0.4rem 0 0 0;

  overflow: hidden;

  color: ${getColorTheme('davida')};
  font-size: 1.6rem;
  line-height: 2.4rem;
  text-align: center;
  text-overflow: ellipsis;
`
const ImageWrapper = styled.div`
  width: 14.8rem;
  height: 14.8rem;

  margin-bottom: 1.6rem;

  ${mobileMedia} {
    width: 10.8rem;
    height: 10.8rem;
  }
  & > svg {
    width: 14.8rem;
    height: 14.8rem;

    ${mobileMedia} {
      width: 10.8rem;
      height: 10.8rem;
    }
  }
`
const Button = styled(ButtonBase)`
  margin-top: 1.6rem;
`
