import { VFC } from 'react'
import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'

type Props = {
  color?: string
  className?: string
}

export const Activity: VFC<Props> = ({ color, className }) => {
  return (
    <Container className={className} color={color}>
      <Ball />
      <Ball />
      <Ball />
    </Container>
  )
}

const bouncingAnimation = keyframes`
    0% {
      transform: translate3d(0, 10px, 0);
    }
    100% {
      transform: translate3d(0, -20px, 0);
    }
`

const Container = styled.div<{
  color?: string
}>`
  width: 40px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  & div {
    background: ${(props) => props.color ?? '#000'};
  }
`

const Ball = styled.div`
  --anim-drt: 0.4s;
  --anim-ease: cubic-bezier(0.6, 0.05, 0.15, 0.95);

  width: 10px;
  height: 10px;

  border-radius: 50%;

  &:nth-of-type(1) {
    animation: ${bouncingAnimation} var(--anim-drt) alternate infinite
      var(--anim-ease);
  }

  &:nth-of-type(2) {
    animation: ${bouncingAnimation} var(--anim-drt) calc(var(--anim-drt) / 4)
      alternate infinite var(--anim-ease) backwards;
  }

  &:nth-of-type(3) {
    animation: ${bouncingAnimation} var(--anim-drt) calc(var(--anim-drt) / 2)
      alternate infinite var(--anim-ease) backwards;
  }
`
