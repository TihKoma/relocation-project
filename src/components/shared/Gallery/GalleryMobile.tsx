import { forwardRef, useState } from 'react'
import 'swiper/css'
import 'swiper/css/pagination'
import styled from '@emotion/styled'
import { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { Media } from '@/components/shared/Gallery/Gallery'
import { notMobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

import { Video as VideoBase } from './Video'
import { ViewerMobile } from './ViewerMobile'

type Props = { className?: string; gallery: Media[]; onOpen?: () => void }
export const GalleryMobile = forwardRef<HTMLDivElement, Props>(
  ({ className, gallery, onOpen }, ref) => {
    const [isShowViewer, setIsShowViewer] = useState(false)
    const [initialNthGallery, setInitialNthGallery] = useState(0)
    const openViewer = (initialView: number) => () => {
      setIsShowViewer(true)
      setInitialNthGallery(initialView)
      onOpen?.()
    }
    return (
      <>
        <ViewerMobile
          isVisible={isShowViewer}
          onRequestClose={setIsShowViewer}
          initialNthGallery={initialNthGallery}
          gallery={gallery}
        />
        <Slider className={className} ref={ref}>
          <Swiper
            pagination={{ dynamicBullets: true, clickable: true }}
            modules={[Pagination]}
          >
            {gallery.map(({ type, src }, index) => (
              <SwiperSlide key={src}>
                {type === 'IMAGE' && <Image src={src} loading={'lazy'} />}
                {type === 'VIDEO' && <Video src={src} />}
                <Cover onClick={openViewer(index)} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Slider>
      </>
    )
  },
)
const Slider = styled.div`
  ${notMobileMedia} {
    display: none;
  }
  .swiper {
    height: 222px;
    width: 100%;
  }
  .swiper-pagination {
    padding: 6px;

    bottom: 24px;

    background: rgba(18, 21, 31, 0.6);
    border-radius: 8px;
  }
  .swiper-pagination-bullet {
    opacity: 0.7;
    background: ${getColorTheme('earth')};
  }
  .swiper-pagination-bullet-active {
    opacity: 1;
  }
  .swiper-slide {
    position: relative;

    background: #fff;
  }
`
const Video = styled(VideoBase)`
  width: 100%;
  height: 100%;
`
const Cover = styled.div`
  width: 100%;
  height: 100%;

  position: absolute;
  left: 0;
  top: 0;
`
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`
