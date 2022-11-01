import { forwardRef } from 'react'

import { useIsMobileDevice } from '@/modules/device'

import { GalleryBase } from './GalleryBase'
import { GalleryMobile } from './GalleryMobile'

export type MediaImage = {
  type: 'IMAGE'
  description?: string
  src: string
  meta?: {
    authorName: string
    linkSource: string
    license: {
      name: string
      link: string
    }
  }
}
export type MediaVideo = {
  type: 'VIDEO'
  src: string
}
export type Media = MediaImage | MediaVideo

type Props = {
  className?: string
  gallery: Media[]
  onOpen?: () => void
  isMinimizedMobile?: boolean
  withSwiper?: boolean
}
export const Gallery = forwardRef<HTMLDivElement, Props>(
  ({ gallery, className, onOpen, isMinimizedMobile, withSwiper }, ref) => {
    const isMobile = useIsMobileDevice()
    if (gallery.length === 0) {
      return null
    }

    return (
      <>
        {(!isMobile || (isMobile && !isMinimizedMobile)) && (
          <GalleryBase
            withSwiper={withSwiper}
            className={className}
            gallery={gallery}
            onOpen={onOpen}
            ref={ref}
          />
        )}
        {isMobile && isMinimizedMobile && (
          <GalleryMobile
            className={className}
            gallery={gallery}
            onOpen={onOpen}
            ref={ref}
          />
        )}
      </>
    )
  },
)
