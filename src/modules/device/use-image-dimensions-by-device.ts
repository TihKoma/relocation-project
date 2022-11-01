import { useMemo } from 'react'

import {
  useIsDesktopDevice,
  useIsRetinaScreen,
  useIsTabletDevice,
} from './index'

type Config = {
  desktop: string
  desktopRetina: string
  tablet: string
  mobile: string
}

export const useImageDimensionsByDevice = (
  url: string,
  { desktopRetina, desktop, tablet, mobile }: Config,
) => {
  const isDesktop = useIsDesktopDevice()
  const isRetinaScreen = useIsRetinaScreen()
  const isTablet = useIsTabletDevice()

  return useMemo(() => {
    let replaceValue = ''

    if (isDesktop) {
      replaceValue = isRetinaScreen ? desktopRetina : desktop
    } else if (isTablet) {
      replaceValue = tablet
    } else {
      replaceValue = mobile
    }

    if (!replaceValue.match(/^\d+x\d+$/)) {
      return url
    }

    return replaceValue ? url.replace(/\/\d+x\d+\//, `/${replaceValue}/`) : url
  }, [
    url,
    isTablet,
    isDesktop,
    isRetinaScreen,
    desktopRetina,
    desktop,
    tablet,
    mobile,
  ])
}
