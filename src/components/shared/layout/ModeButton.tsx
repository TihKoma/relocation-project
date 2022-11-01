import { ReactElement, VFC } from 'react'
import styled from '@emotion/styled'

import { NormalizedButton } from '@/components/ui-kit/Button'
import { MapIcon } from '@/images'
import { FeedIcon } from '@/images/navigation'
import { notMobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

type Mode = 'feed' | 'map'

type Props = {
  className?: string
  mode: Mode
  onClick: () => void
  buttonList?: ReactElement
}
export const ModeButton: VFC<Props> = ({
  className,
  mode,
  onClick,
  buttonList = (
    <>
      <FeedIcon />
      <span>Feed</span>
    </>
  ),
}) => {
  return (
    <Container className={className} onClick={onClick}>
      {mode === 'map' ? (
        buttonList
      ) : (
        <>
          <MapIcon />
          <span>Map</span>
        </>
      )}
    </Container>
  )
}

const Container = styled(NormalizedButton)`
  padding: 0.6rem 1.2rem;

  display: grid;
  grid-auto-flow: column;
  align-items: center;
  gap: 0.2rem;

  border-radius: 1.2rem;
  background-color: ${getColorTheme('sun')};

  color: ${getColorTheme('earth')};

  & svg {
    fill: ${getColorTheme('earth')};
    stroke: ${getColorTheme('earth')};
  }

  ${notMobileMedia} {
    display: none;
  }
`
