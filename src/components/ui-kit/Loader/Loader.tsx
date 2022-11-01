import { VFC } from 'react'
import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'

import { getColorTheme } from '@/styles/themes'
import { ThemeType } from '@/styles/themes'

type Color = ('neptune' | 'earth' | 'uranus') & keyof ThemeType
type Size = 'xxSmall' | 'xSmall' | 'small' | 'medium' | 'large'
type Props = {
  size?: Size
  color?: Color
  withGradient?: boolean
  className?: string
}
export const Loader: VFC<Props> = ({
  size = 'medium',
  color = 'neptune',
  withGradient = false,
  className,
}) => {
  return (
    <Container className={className}>
      <Wrapper color={color} size={size} withGradient={withGradient}>
        <Circle3 />
        <Circle2 />
        <Circle1 />
      </Wrapper>
    </Container>
  )
}

const ANIMATION_DURATION = '600ms'
const ANIMATION_FUNCTION = 'ease-out'

const getContainerSize = (size: Size) => {
  switch (size) {
    case 'large': {
      return 10
    }
    case 'medium': {
      return 6.4
    }
    case 'small': {
      return 3.2
    }
    case 'xSmall': {
      return 2.4
    }
    case 'xxSmall': {
      return 1.6
    }
  }
}
const Circle = styled.div`
  height: 88%;
  width: 88%;
  margin: auto 0;

  position: absolute;
  top: 0;
  bottom: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;
  background: ${getColorTheme('earth')};

  &:after {
    content: '';
    border-radius: 50%;
    width: calc(91.3%);
    height: calc(91.3%);
    background-color: ${getColorTheme('neptune')};
  }
`
const circle1Animation = keyframes`
  0% {}
  96% {
    transform: translateX(50%) scaleX(0);
  }
  100% {
    transform: translateX(50%) scaleX(0);
  }
`
const circle1InnerAnimation = keyframes`
  0% {}
  96% {
    opacity: 0.5;
  }
  100% {
    opacity: 0.5;
  }
`
const Circle1 = styled(Circle)`
  right: 0;

  animation: ${circle1Animation} ${ANIMATION_FUNCTION} ${ANIMATION_DURATION}
    infinite;
  &:after {
    animation: ${circle1InnerAnimation} ${ANIMATION_FUNCTION}
      ${ANIMATION_DURATION} infinite;
  }
`

const circle2Animation = keyframes`
  0% {
    transform: translateX(-39%) scaleX(50%);
  }
  96% {
    transform: translateX(0) scaleX(100%);
  }
  100% {
    transform: translateX(0) scaleX(100%);
  }
`
const Circle2 = styled(Circle)`
  right: 0;

  animation: ${circle2Animation} ${ANIMATION_FUNCTION} ${ANIMATION_DURATION}
    infinite;
`

const circle3Animation = keyframes`
  0% {
    opacity: 0;
    transform: translateX(0) scaleX(0) scaleY(80%);
  }
  96% {
    opacity: 1;
    transform: translateX(-39%) scaleX(50%) scaleY(100%);
  }
  100% {
    opacity: 1;
    transform: translateX(-39%) scaleX(50%) scaleY(100%);
  }
`
const circle3InnerAnimation = keyframes`
  0% {
    opacity: 0;
  }
  96% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
`
const Circle3 = styled(Circle)`
  right: 0;

  opacity: 0;

  animation: ${circle3Animation} ${ANIMATION_FUNCTION} ${ANIMATION_DURATION}
    infinite;

  &:after {
    animation: ${circle3InnerAnimation} ${ANIMATION_FUNCTION}
      ${ANIMATION_DURATION} infinite;
  }
`
const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`
const Wrapper = styled.div<Required<Omit<Props, 'className'>>>`
  height: ${(props) => getContainerSize(props.size)}rem;
  width: ${(props) => getContainerSize(props.size)}rem;

  position: relative;

  & > ${Circle1}, ${Circle2}, ${Circle3} {
    ${(props) => {
      if (props.withGradient) {
        return `background: linear-gradient(90deg, ${getColorTheme(props.color)(
          props,
        )} 0%, rgba(0, 0, 0, 0) 100%);`
      }
    }}
    &:after {
      ${(props) => {
        if (props.withGradient) {
          return `
            animation: unset;
            opacity: 0;
          `
        }
        return `background-color: ${getColorTheme(props.color)(props)};`
      }}
    }
  }
`
