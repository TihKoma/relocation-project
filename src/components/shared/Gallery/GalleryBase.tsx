import { FC, forwardRef, useMemo, useRef, useState } from 'react'
import styled from '@emotion/styled'
import { Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { Media } from '@/components/shared/Gallery/Gallery'
import { ViewerMobile } from '@/components/shared/Gallery/ViewerMobile'
import {
  Button as ButtonBase,
  NormalizedButton,
} from '@/components/ui-kit/Button'
import { ArrowIcon } from '@/images'
import { useIsMobileDevice } from '@/modules/device'
import { move } from '@/modules/utils/move'
import { mobileMedia, notMobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

import { Video as VideoBase } from './Video'
import { ViewerDesktop } from './ViewerDesktop'

type Props = {
  className?: string
  gallery: Media[]
  onOpen?: () => void
  withSwiper?: boolean
}
export const GalleryBase = forwardRef<HTMLDivElement, Props>(
  ({ className, gallery, onOpen, withSwiper }, ref) => {
    const firstVideoIndex = gallery.findIndex(({ type }) => type === 'VIDEO')
    const [one, two, three] = useMemo(() => {
      return firstVideoIndex === -1
        ? gallery
        : move(gallery, firstVideoIndex, 1)
    }, [gallery, firstVideoIndex])
    const isMobile = useIsMobileDevice()

    const [isShowViewer, setIsShowViewer] = useState(false)
    const [initialNthGallery, setInitialNthGallery] = useState(0)
    const openViewer = (initialView: number) => () => {
      setIsShowViewer(true)
      setInitialNthGallery(initialView)
      onOpen?.()
    }

    const nextRef = useRef<HTMLButtonElement>(null)
    const prevRef = useRef<HTMLButtonElement>(null)

    return (
      <>
        <Container
          className={className}
          ref={ref}
          isSinglePhoto={gallery.length === 1}
        >
          {isMobile ? (
            <ViewerMobile
              isVisible={isShowViewer}
              onRequestClose={setIsShowViewer}
              initialNthGallery={initialNthGallery}
              gallery={gallery}
            />
          ) : (
            <ViewerDesktop
              isVisible={isShowViewer}
              onRequestClose={setIsShowViewer}
              initialNthGallery={initialNthGallery}
              gallery={gallery}
            />
          )}
          {one && (
            <MainImageWrapper>
              <Button onClick={openViewer(0)}>
                {withSwiper && gallery.length > COUNT_PREVIEW_IMAGES ? (
                  <Slider ref={ref}>
                    <PrevButton
                      ref={prevRef}
                      size={'small'}
                      viewType={'primary'}
                      backgroundUnderButton={'map'}
                      Icon={<ArrowIcon direction={'left'} />}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <NextButton
                      ref={nextRef}
                      size={'small'}
                      viewType={'primary'}
                      backgroundUnderButton={'map'}
                      Icon={<ArrowIcon direction={'right'} />}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <Swiper
                      pagination={{
                        dynamicBullets: true,
                        clickable: true,
                      }}
                      navigation={{
                        nextEl: nextRef.current,
                        prevEl: prevRef.current,
                      }}
                      onBeforeInit={(swiper) => {
                        // @ts-ignore
                        swiper.params.navigation.nextEl = nextRef.current
                        // @ts-ignore
                        swiper.params.navigation.prevEl = prevRef.current
                      }}
                      modules={[Pagination, Navigation]}
                    >
                      {gallery.map(({ type, src }, index) => {
                        if (type === 'IMAGE') {
                          return (
                            <SwiperSlide key={src}>
                              <ImageStyled src={src} loading={'lazy'} />
                              <Cover onClick={openViewer(index)} />
                            </SwiperSlide>
                          )
                        }
                      })}
                    </Swiper>
                  </Slider>
                ) : (
                  <Content media={one} />
                )}
              </Button>
            </MainImageWrapper>
          )}
          {two && (
            <OtherImagesWrapper>
              <Button
                onClick={openViewer(
                  firstVideoIndex === -1 ? 1 : firstVideoIndex,
                )}
              >
                <Content media={two} />
              </Button>
              {three && (
                <Button onClick={openViewer(2)}>
                  {gallery.length > COUNT_PREVIEW_IMAGES ? (
                    <MorePhotosWrapper>
                      <Content media={three} />
                      <MorePhotos>
                        Other +{gallery.length - COUNT_PREVIEW_IMAGES}
                      </MorePhotos>
                    </MorePhotosWrapper>
                  ) : (
                    <Content media={three} />
                  )}
                </Button>
              )}
            </OtherImagesWrapper>
          )}
        </Container>
      </>
    )
  },
)

const COUNT_PREVIEW_IMAGES = 3

type PropsContent = { media: Media }

export const Content: FC<PropsContent> = ({ media }) => {
  return media.type === 'VIDEO' ? (
    <VideoWrapper>
      <Video src={media.src} />
      <Cover />
    </VideoWrapper>
  ) : (
    <ImageWrapper>
      <ImageStyled src={media.src} loading={'lazy'} />
    </ImageWrapper>
  )
}

const ImageWrapper = styled.div`
  position: relative;
`
const ImageStyled = styled.img`
  width: 100%;
  height: 100%;

  position: absolute;
  left: 0;
  top: 0;

  object-fit: cover;

  border-radius: 1.2rem;
`
const Video = styled(VideoBase)`
  width: 100%;
  height: 100%;

  position: absolute;
  left: 0;
  top: 0;

  border-radius: 1.2rem;
`
const Container = styled.div<{ isSinglePhoto: boolean }>`
  position: relative;

  display: ${(props) => (props.isSinglePhoto ? 'block' : 'grid')};
  grid-template-columns: 65% 1fr;
  gap: 0.8rem;

  ${mobileMedia} {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 12.2rem;
  }
`

const Button = styled(NormalizedButton)`
  display: flex;

  align-items: stretch;

  border-radius: 1.2rem;
  overflow: hidden;

  & > * {
    flex-grow: 1;
  }
`

const MainImageWrapper = styled.div`
  padding-bottom: calc(274 / 425 * 100%);

  position: relative;

  & > ${Button} {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  ${mobileMedia} {
    padding-bottom: calc(214 / 343 * 100%);
  }
`

const NextButton = styled(ButtonBase)`
  visibility: hidden;

  position: absolute;
  right: 0.8rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;

  transition: all 0.5s ease;

  ${mobileMedia} {
    display: none;
  }
`

const PrevButton = styled(ButtonBase)`
  visibility: hidden;

  position: absolute;
  left: 0.8rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;

  transition: all 0.5s ease;

  ${mobileMedia} {
    display: none;
  }
`

const Slider = styled.div`
  max-width: 100%;

  position: relative;

  &:hover > ${NextButton}, &:hover > ${PrevButton} {
    visibility: visible;
  }

  .swiper {
    height: 100%;
    width: 100%;
  }

  .swiper-pagination {
    max-width: 6.4rem !important;
    padding: 0.5rem 0.6rem;

    bottom: 2.4rem;

    background: rgba(18, 21, 31, 0.6);
    border-radius: 3.2rem;
  }

  .swiper-pagination-bullet {
    width: 0.6rem !important;
    height: 0.6rem !important;

    opacity: 0.7;
    background: ${getColorTheme('earth')};
  }
  .swiper-pagination-bullet-active {
    opacity: 1;
  }
  .swiper-slide {
    position: relative;

    background: ${getColorTheme('earth')};
  }
  .swiper-button-disabled {
    opacity: 0;
  }
`

const OtherImagesWrapper = styled.div`
  display: flex;

  ${notMobileMedia} {
    flex-direction: column;
  }

  gap: 0.8rem;

  & > *:nth-of-type(1) {
    flex-grow: 1;
  }
  & > *:nth-of-type(2) {
    flex-grow: 1;
  }
`
const MorePhotos = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  top: 0;
  left: 0;

  background: ${getColorTheme('oberon')};
  border-radius: 1.2rem;

  font-weight: 500;
  font-size: 1.6rem;
  line-height: 2.4rem;
  letter-spacing: -0.04em;
  color: ${getColorTheme('earth')};
`
const MorePhotosWrapper = styled.div`
  position: relative;

  display: flex;
  & > * {
    flex-grow: 1;
  }
`
const VideoWrapper = styled.div`
  position: relative;

  display: flex;
  & > * {
    flex-grow: 1;
  }
`
const Cover = styled.div`
  width: 100%;
  height: 100%;

  position: absolute;
  left: 0;
  top: 0;
`
