import { useMedia } from 'react-use'

import { useDefaultDevice } from '@/modules/device/DefaultDeviceContext'
import { mobile } from '@/styles/media'

export function useIsMobileDevice() {
  const defaultValue = useDefaultDevice().isMobile
  return useMedia(`(max-width: ${mobile - 1}px)`, defaultValue)
}
