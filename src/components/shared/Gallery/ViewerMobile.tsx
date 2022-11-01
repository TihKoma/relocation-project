import { useEffect, useRef, useState, VFC } from 'react'
import styled from '@emotion/styled'
import { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Swiper as SwiperClass } from 'swiper/types'

import { ModalController, ModalPortal } from '@/components/ui-kit/Modal'
import { CrossIcon } from '@/images'
import { useAnalytics } from '@/modules/analytics'
import { getColorTheme } from '@/styles/themes'

import { Media } from './Gallery'
import { Video as VideoBase } from './Video'

type Props = {
  initialNthGallery: number
  gallery: Media[]
} & ModalController

export const ViewerMobile: VFC<Props> = ({
  isVisible,
  onRequestClose,
  initialNthGallery,
  gallery,
}) => {
  const analytics = useAnalytics()
  const ref = useRef<SwiperClass>()
  const [currentGallery, setCurrentGallery] = useState(initialNthGallery)

  useEffect(() => {
    ref.current?.slideTo(initialNthGallery)
  }, [initialNthGallery])
  return (
    <ModalPortal isVisible={isVisible} onRequestClose={onRequestClose}>
      <Container>
        <Header>
          <ButtonClose onClick={() => onRequestClose(false)}>
            <CrossIcon />
          </ButtonClose>
        </Header>
        <Slider>
          <Swiper
            onSwiper={(swiper) => (ref.current = swiper)}
            initialSlide={initialNthGallery}
            modules={[Pagination]}
            onSlideChange={({ activeIndex }) => {
              analytics.areaMediaGalleryViewed({
                src: gallery[activeIndex].src,
              })
              setCurrentGallery(activeIndex)
            }}
          >
            {gallery.map((media) => (
              <SwiperSlide key={media.src}>
                {media.type === 'IMAGE' && (
                  <>
                    <ImageWrapper>
                      <Image src={media.src} />
                    </ImageWrapper>
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
                {media.type === 'VIDEO' && (
                  <VideoWrapper>
                    <Video src={media.src} />
                  </VideoWrapper>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </Slider>
        <Nth>
          {currentGallery + 1}/{gallery.length}
        </Nth>
      </Container>
    </ModalPortal>
  )
}

const Container = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;

  padding-bottom: 2rem;

  background: ${getColorTheme('sun1000')};
`
const Slider = styled.div`
  flex-grow: 1;
  .swiper {
    height: 100%;
    width: 100%;
  }
  .swiper-pagination {
    bottom: 2.4rem;

    border-radius: 0.8rem;
  }
  .swiper-pagination-bullet {
    background: ${getColorTheme('milkyway')};
  }
  .swiper-pagination-bullet-active {
    background: ${getColorTheme('sun')};
  }
  .swiper-slide {
    display: flex;
    flex-direction: column;
  }
  .swiper-slide img {
  }
`
const Header = styled.div`
  height: 4.4rem;
  padding-right: 1rem;
  padding-top: 0.5rem;

  display: flex;
  align-items: center;
`
const ButtonClose = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-left: auto;

  background-color: ${getColorTheme('sun50')};
  border-radius: 4rem;

  width: 3rem;
  height: 3rem;
`
const Description = styled.div`
  margin-bottom: 0.2rem;
  margin-top: auto;

  text-align: center;
  font-weight: 500;
  font-size: 1.6rem;
  line-height: 2.2rem;
  letter-spacing: -0.04em;
  color: ${getColorTheme('sun')};
`
const Link = styled.a`
  color: ${getColorTheme('neptune')};
`
const Signature = styled.div`
  margin-bottom: 5.4rem;

  text-align: center;
  font-size: 1.2rem;
  line-height: 1.6rem;
  color: ${getColorTheme('mercury')};
`
const VideoWrapper = styled.div`
  position: relative;

  flex-grow: 1;
`

const Video = styled(VideoBase)`
  height: 100%;
`

const ImageWrapper = styled.div`
  margin-bottom: 1.6rem;

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
const Nth = styled.div`
  align-self: center;

  font-size: 1.4rem;
  line-height: 2rem;
  color: white;
`
