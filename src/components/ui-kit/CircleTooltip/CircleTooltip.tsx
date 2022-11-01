import { FC, Fragment } from 'react'
import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'

import { Button } from '@/components/ui-kit/Button'
import { getColorTheme } from '@/styles/themes'

import { ModalPortal } from '../Modal'

const ANIMATION_DURATION = 0.25

type Offset = {
  top?: number
  bottom?: number
  right?: number
  left?: number
}

type Options = {
  offset: Offset
  withModal?: boolean
  withIcons?: boolean
  contentPosition?: 'right' | 'left'
}

type Props = {
  isVisible: boolean
  onRequestClose: () => void
  onButtonClick: () => void
  buttonText: string
  text: string
  description?: string
  icons?: JSX.Element[]
  options: Options
}
export const CircleTooltip: FC<Props> = ({
  isVisible,
  onRequestClose,
  onButtonClick,
  buttonText,
  text,
  description,
  icons = [],
  options,
}) => {
  const content = (
    <Circle offset={options.offset}>
      <ContentWrapper align={options.contentPosition}>
        {icons.length > 0 && (
          <IconsContainer>
            {icons.map((icon, i) => (
              <Fragment key={i}>{icon}</Fragment>
            ))}
          </IconsContainer>
        )}
        <Text>{text}</Text>
        <Description>{description}</Description>
        <Button
          size={'small'}
          backgroundUnderButton={'alt'}
          onClick={() => onButtonClick()}
        >
          {buttonText}
        </Button>
      </ContentWrapper>
    </Circle>
  )

  return (
    <>
      {options?.withModal && (
        <ModalPortal isVisible={isVisible} onRequestClose={onRequestClose}>
          {content}
        </ModalPortal>
      )}

      {!options?.withModal && isVisible && content}
    </>
  )
}

const showAnimation = keyframes`
  from {
    transform: scale(0)
  }
  to {
    transform: scale(1)
  }
`
const Circle = styled.div<{ offset: Offset }>`
  position: absolute;
  ${({ offset }) =>
    Object.keys(offset).map(
      (key) => `${key}: ${offset[key as keyof Offset]}rem;`,
    )}

  width: 34rem;
  height: 34rem;

  align-items: center;
  display: flex;

  border-radius: 50%;
  background: linear-gradient(
    43deg,
    #5750dc 32.42%,
    #7959ef 55.03%,
    #bf8ff4 89.72%
  );

  color: ${getColorTheme('earth')};
  shape-outside: circle(50%);

  z-index: 3000;

  animation: ${showAnimation} ${ANIMATION_DURATION}s linear;
`
const ContentWrapper = styled.div<{ align?: 'right' | 'left' }>`
  ${(props) => {
    if (props.align === 'left') {
      return `
        padding-left: 5.2rem;
        padding-right: 9.4rem;
      `
    }
    return `
        padding-right: 5.2rem;
        padding-left: 9.4rem;
      `
  }}
`
const Text = styled.div`
  margin-bottom: 1.2rem;

  font-weight: 500;
  font-size: 1.6rem;
  line-height: 2.4rem;
`
const Description = styled.div`
  margin-bottom: 1.6rem;

  font-size: 1.4rem;
  line-height: 2rem;
`
const IconsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`
