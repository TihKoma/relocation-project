import { FC, useState } from 'react'
import styled from '@emotion/styled'

import { PlayButtonIcon as PlayButtonIconBase } from '@/images'
import { mobileMedia } from '@/styles/media'

type Props = { src: string; className?: string }
export const Video: FC<Props> = ({ src, className }) => {
  const [isVideoShawn, setVideoShawn] = useState(false)
  const videoId = src.split('/embed/')[1]
  const background = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`

  return (
    <>
      {isVideoShawn && (
        <IFrame
          className={className}
          src={`${src}?autoplay=1`}
          title={'YouTube video player'}
          frameBorder={'0'}
          loading={'lazy'}
          allow={
            'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          }
          allowFullScreen
        />
      )}
      <Container
        background={background}
        onClick={() => setVideoShawn(true)}
        isVideoShawn={isVideoShawn}
      >
        <PlayButtonIcon />
      </Container>
    </>
  )
}

const IFrame = styled.iframe`
  width: 100%;

  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  z-index: 1;
`

const Container = styled.div<{ background: string; isVideoShawn: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  border-radius: 1.2rem;
  ${({ background }) =>
    background ? `background: no-repeat center/100% url(${background})` : ''};

  ${({ isVideoShawn }) =>
    isVideoShawn
      ? `
    opacity: 0;`
      : ''};

  transition: all 0.8s ease;

  ${mobileMedia} {
    background-size: cover;
    border-radius: 0;
  }
`

const PlayButtonIcon = styled(PlayButtonIconBase)`
  cursor: pointer;
`
