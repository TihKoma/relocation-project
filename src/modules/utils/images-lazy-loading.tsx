import { forwardRef, useEffect, useRef } from 'react'

import { composeRefs } from '@/modules/utils/composeRefs'

// client only
let lazyImageObserver: IntersectionObserver | undefined

export const withImageLazyLoading = function <T>(Image: T): T {
  const WithImageLazyLoading = forwardRef<HTMLImageElement>((props, ref) => {
    const refImage = useRef<HTMLImageElement | null>(null)

    useEffect(() => {
      return () => {
        if (refImage.current) {
          lazyImageObserver?.unobserve(refImage.current)
        }
      }
    }, [])
    return (
      // @ts-ignore
      <Image
        {...props}
        ref={composeRefs([
          (newRefImage: HTMLImageElement | null) => {
            if (
              newRefImage === null ||
              (newRefImage === refImage.current &&
                newRefImage?.dataset?.src === refImage.current?.src)
            ) {
              return
            }
            if (refImage.current) {
              lazyImageObserver?.unobserve(refImage.current)
            }
            refImage.current = newRefImage

            if (!lazyImageObserver) {
              lazyImageObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                  if (entry.isIntersecting) {
                    const lazyImage = entry.target as HTMLImageElement
                    const src = lazyImage.dataset?.src

                    if (src) {
                      lazyImage.src = src
                    }

                    lazyImageObserver?.unobserve(lazyImage)
                  }
                })
              })
            }
            lazyImageObserver.observe(newRefImage)
          },
          ref,
        ])}
      />
    )
  })
  // @ts-ignore
  return WithImageLazyLoading
}
