import { useCallback, useEffect, useState, VFC } from 'react'
import styled from '@emotion/styled'
import { useKey } from 'react-use'

import { Button } from '@/components/ui-kit/Button'
import { ModalController, ModalPortal } from '@/components/ui-kit/Modal'
import { ArrowIcon, CrossIcon } from '@/images'
import { useAnalytics } from '@/modules/analytics'
import { getColorTheme } from '@/styles/themes'

import { Media } from './Gallery'
import { Video as VideoBase } from './Video'

type Props = {
  initialNthGallery: number
  gallery: Media[]
} & ModalController

export const ViewerDesktop: VFC<Props> = ({
  isVisible,
  onRequestClose,
  initialNthGallery,
  gallery,
}) => {
  const [currentGallery, setCurrentGallery] = useState(initialNthGallery)
  useEffect(() => {
    setCurrentGallery(initialNthGallery)
  }, [initialNthGallery])

  const next = useCallback(
    () =>
      setCurrentGallery((current) =>
        current < gallery.length - 1 ? current + 1 : current,
      ),
    [setCurrentGallery, gallery.length],
  )
  const prev = useCallback(
    () => setCurrentGallery((current) => (current > 0 ? current - 1 : current)),
    [setCurrentGallery],
  )

  const media = gallery[currentGallery]

  const analytics = useAnalytics()
  useEffect(() => {
    if (media?.src && isVisible) {
      analytics.areaMediaGalleryViewed({ src: media.src })
    }
  }, [analytics, media?.src, isVisible])

  useKey('ArrowRight', next)
  useKey('ArrowLeft', prev)

  if (!media) {
    return null
  }

  return (
    <Modal isVisible={isVisible} onRequestClose={onRequestClose}>
      <Container>
        <CloseButton
          Icon={<CrossIcon />}
          onClick={() => onRequestClose(false)}
          size={'small'}
          viewType={'ghost'}
        />

        {currentGallery !== 0 && (
          <ButtonLeft
            size={'small'}
            viewType={'primary'}
            backgroundUnderButton={'map'}
            Icon={<ArrowIcon direction={'left'} />}
            onClick={prev}
          />
        )}
        {media.type === 'IMAGE' ? (
          <ImageWrapper>
            <Image src={media.src} />
          </ImageWrapper>
        ) : (
          <VideoWrapper>
            <Video src={media.src} />
          </VideoWrapper>
        )}
        {currentGallery !== gallery.length - 1 && (
          <ButtonRight
            size={'small'}
            viewType={'primary'}
            backgroundUnderButton={'map'}
            Icon={<ArrowIcon direction={'right'} />}
            onClick={next}
          />
        )}
        {media.type === 'IMAGE' && (
          <>
            {media.description && (
              <Description>{media.description}</Description>
            )}
            {media.meta && (
              <Signature>
                <Link href={media.meta.linkSource} target={'_blank'}>
                  Photo
                </Link>{' '}
                by {media.meta.authorName} /{' '}
                <Link href={media.meta.license.link} target={'_blank'}>
                  {media.meta.license.name}
                </Link>
              </Signature>
            )}
          </>
        )}
        <Nth>
          {currentGallery + 1}/{gallery.length}
        </Nth>
      </Container>
    </Modal>
  )
}

const Video = styled(VideoBase)`
  width: 100%;
  height: 100%;
  margin-bottom: 1.6rem;
`

const Modal = styled(ModalPortal)`
  padding: 2.4rem;
`
const Container = styled.div`
  padding: 2.4rem 12.4rem;
  width: 100%;
  height: 100%;
  max-width: 102.2rem;
  max-height: 64.2rem;

  position: relative;

  display: flex;
  flex-direction: column;

  background: ${getColorTheme('earth')};
  border-radius: 1.6rem;
`
const ImageWrapper = styled.div`
  margin-bottom: 1.6rem;

  position: relative;
  flex-grow: 1;
`

const VideoWrapper = styled.div`
  position: relative;

  flex-grow: 1;
`

const Image = styled.img`
  width: 100%;
  height: 100%;

  position: absolute;
  left: 0;
  top: 0;

  object-fit: contain;
`
const Description = styled.div`
  margin-bottom: 0.4rem;

  text-align: center;
  font-weight: 500;
  font-size: 1.8rem;
  line-height: 2.4rem;
  letter-spacing: -0.04em;
  color: ${getColorTheme('sun')};
`
const Link = styled.a`
  color: ${getColorTheme('neptune')};
`
const Signature = styled.div`
  text-align: center;

  font-size: 1.4rem;
  line-height: 2rem;
  color: ${getColorTheme('mercury')};
`
const Nth = styled.div`
  text-align: center;
  font-size: 1.4rem;
  line-height: 2rem;
  color: ${getColorTheme('sun1000')}; ;
`
const ButtonLeft = styled(Button)`
  position: absolute;
  top: 50%;
  left: 2.4rem;
`
const ButtonRight = styled(Button)`
  position: absolute;
  top: 50%;
  right: 2.4rem;
`
const CloseButton = styled(Button)`
  position: absolute;
  top: 2.4rem;
  right: 2.4rem;
`
