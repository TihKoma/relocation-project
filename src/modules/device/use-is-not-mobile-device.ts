import { useIsDesktopDevice } from '@/modules/device/use-is-desktop-device'
import { useIsTabletDevice } from '@/modules/device/use-is-tablet-device'

export function useIsNotMobileDevice() {
  const isDesktop = useIsDesktopDevice()
  const isTablet = useIsTabletDevice()

  return isDesktop || isTablet
}
