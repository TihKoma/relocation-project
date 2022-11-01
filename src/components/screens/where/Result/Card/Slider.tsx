import { FC } from 'react'
import 'swiper/css'
import 'swiper/css/pagination'
import styled from '@emotion/styled'
import { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { Media } from '@/components/shared/Gallery'
import { GallerySlideToOverlay } from '@/components/shared/GallerySlideToOverlay'
import { notMobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

type Props = {
  gallery: Media[]
  maxItemsAmount?: number
}

export const Slider: FC<Props> = ({ gallery, maxItemsAmount = 8 }) => {
  const overflowItemsAmount = gallery.length - maxItemsAmount
  const cuttedGallery = overflowItemsAmount
    ? gallery.slice(0, maxItemsAmount - 1)
    : gallery

  return (
    <SliderWrapper>
      <CustomSwiper
        modules={[Pagination]}
        pagination={{ dynamicBullets: true, clickable: true }}
      >
        {cuttedGallery.map(({ src }, index) => (
          <SwiperSlide key={index}>
            <Image src={src} loading={'lazy'} />
          </SwiperSlide>
        ))}
        {overflowItemsAmount > 0 && (
          <SwiperSlide>
            <DarkenImage
              src={gallery[maxItemsAmount - 1]?.src}
              loading={'lazy'}
            />
            <MoreItemsText>{`+${overflowItemsAmount} more`}</MoreItemsText>
          </SwiperSlide>
        )}
        <CustomGallerySlideToOverlay itemsAmount={cuttedGallery.length} />
      </CustomSwiper>
    </SliderWrapper>
  )
}

const SliderWrapper = styled.div`
  width: 100%;
  height: 100%;
`

const CustomGallerySlideToOverlay = styled(GallerySlideToOverlay)`
  display: none;
`
const CustomSwiper = styled(Swiper)`
  height: 100%;
  width: 100%;
  margin: 0;

  border-radius: 1.2rem;

  .swiper-pagination {
    padding: 6px;
    max-height: 21px;

    bottom: 8px;

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

  ${notMobileMedia} {
    &:hover {
      ${CustomGallerySlideToOverlay} {
        display: block;
      }
    }
  }
`
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`
const DarkenImage = styled(Image)`
  filter: brightness(55%);
`
const MoreItemsText = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  letter-spacing: -0.04em;
  line-height: 2.4rem;
  color: ${getColorTheme('earth')};
`
