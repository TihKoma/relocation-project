import { useMedia } from 'react-use'

import { useDefaultDevice } from '@/modules/device/DefaultDeviceContext'
import { desktop } from '@/styles/media'

export function useIsDesktopDevice() {
  const defaultValue = useDefaultDevice().isDesktop
  return useMedia(`(min-width: ${desktop}px)`, defaultValue)
}
