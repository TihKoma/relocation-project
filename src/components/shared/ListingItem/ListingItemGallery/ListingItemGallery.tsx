import { FC, useState } from 'react'
import 'swiper/css'
import 'swiper/css/pagination'
import { MediaInput } from '__generated__/globalTypes'
import styled from '@emotion/styled'
import { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { GallerySlideToOverlay } from '@/components/shared/GallerySlideToOverlay'
import { PlaceholderRegion1 } from '@/images/placeholder-region'
import { useAnalytics } from '@/modules/analytics'
import {
  useImageDimensionsByDevice,
  useIsDesktopDevice,
} from '@/modules/device'
import { desktopMedia, notDesktopMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

type Props = {
  gallery: Omit<MediaInput, '__typename'>[]
  maxItemsAmount?: number
  isViewed?: boolean
}

export const ListingItemGallery: FC<Props> = ({
  gallery,
  maxItemsAmount = 8,
  isViewed,
}) => {
  const isDesktop = useIsDesktopDevice()
  const overflowItemsAmount = gallery.length - maxItemsAmount
  const analytics = useAnalytics()
  const cuttedGallery = overflowItemsAmount
    ? gallery.slice(0, maxItemsAmount - 1)
    : gallery

  return (
    <CustomSwiper
      isVisiblePagination={gallery.length > 1}
      modules={[Pagination]}
      onSlideChange={() => {
        analytics.MPFeedListingPreviewImagesScrolling()
      }}
      pagination={{
        clickable: true,
      }}
    >
      {cuttedGallery.map(({ url, description }, index) => (
        <SwiperSlide
          key={index}
          onTouchStart={(e) => {
            e.stopPropagation()
          }}
        >
          <SliderPicture
            url={url}
            description={description}
            isViewed={isViewed}
          />
        </SwiperSlide>
      ))}
      {overflowItemsAmount > 0 && (
        <SwiperSlide>
          <SliderPicture isDarken url={gallery[maxItemsAmount - 1].url} />
          <MoreItemsText>{`Other +${overflowItemsAmount}`}</MoreItemsText>
        </SwiperSlide>
      )}
      {isDesktop && (
        <CustomGallerySlideToOverlay itemsAmount={cuttedGallery.length} />
      )}
    </CustomSwiper>
  )
}

const CustomGallerySlideToOverlay = styled(GallerySlideToOverlay)`
  display: none;
`
const CustomSwiper = styled(Swiper)<{ isVisiblePagination: boolean }>`
  width: 100%;
  height: 14.8rem;

  margin: 0;

  border-radius: 1.2rem;

  .swiper-pagination {
    display: ${(props) => (props.isVisiblePagination ? 'flex' : 'none')};
    align-items: center;
    gap: 0.6rem;

    max-width: 100%;
    width: max-content;
    height: 1.6rem;

    bottom: 0.8rem;
    left: 50%;

    padding: 0 0.6rem;

    background: rgba(18, 21, 31, 0.6);
    border-radius: 0.8rem;
    transform: translateX(-50%);
  }
  .swiper-pagination-bullet {
    --swiper-pagination-bullet-horizontal-gap: 0;

    flex-shrink: 0;

    width: 0.6rem;
    height: 0.6rem;

    opacity: 0.7;
    background: ${getColorTheme('earth')};
  }
  .swiper-pagination-bullet-active {
    opacity: 1;
  }

  &:hover {
    ${CustomGallerySlideToOverlay} {
      display: block;
    }
  }
  ${desktopMedia} {
    .swiper-pagination {
      display: none;
    }
  }
  ${notDesktopMedia} {
    @supports (aspect-ratio: 16 / 9) {
      height: auto;
      aspect-ratio: 16 / 9;
    }
    @supports not (aspect-ratio: 16 / 9) {
      height: 34.3rem;
    }
  }
`
const Image = styled.img<{ isDarken?: boolean; isViewed?: boolean }>`
  width: 100%;
  height: 100%;
  background-color: ${getColorTheme('milkyway')};
  object-fit: cover;

  opacity: ${(props) => (props.isViewed ? '.48' : '1')};

  ${(props) => (props.isDarken ? `filter: brightness(55%);` : '')}
`
const Preview = styled.img`
  background-color: ${getColorTheme('milkyway')};
  object-fit: scale-down;
  width: 100%;
  height: 100%;
  position: absolute;
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

const SliderPicture: FC<{
  url: string
  description?: string | null
  isDarken?: boolean
  isViewed?: boolean
}> = ({ url, description, isDarken, isViewed }) => {
  const pictureUrl = useImageDimensionsByDevice(url, {
    desktop: '300x150',
    desktopRetina: '600x300',
    tablet: '600x300',
    mobile: '800x400',
  })
  const [isPreview, setIsPreview] = useState(true)

  return (
    <>
      {isPreview && <Preview src={PlaceholderRegion1.src} />}
      <Image
        isViewed={isViewed}
        isDarken={isDarken}
        onLoad={() => setIsPreview(false)}
        src={pictureUrl}
        loading={'lazy'}
        {...(description && { alt: description })}
      />
    </>
  )
}
