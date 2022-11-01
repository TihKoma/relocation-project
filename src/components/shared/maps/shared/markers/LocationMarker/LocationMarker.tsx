import { FC } from 'react'
import styled from '@emotion/styled'

import { CenteredMarker as CenteredMarkerBase } from '@/images'
import { getColorTheme } from '@/styles/themes'

type Props = {
  isDragging?: boolean
}
export const LocationMarker: FC<Props> = ({ isDragging }) => {
  return (
    <Container>
      <CenteredMarker isLifted={isDragging} />
      <Dot />
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  justify-items: center;
  gap: 0.1rem;

  position: absolute;
  left: 50%;
  top: 50%;

  transform: translate(-50%, calc(-100% + 0.4rem));
`
const Dot = styled.div`
  width: 0.8rem;
  height: 0.8rem;

  border-radius: 50%;
  background: ${getColorTheme('neptune')};
`
const CenteredMarker = styled(CenteredMarkerBase)<{ isLifted?: boolean }>`
  transform: ${(props) => (props.isLifted ? 'translateY(-0.7rem)' : 'none')};
  transition: transform 0.225s ease;
`
