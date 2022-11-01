import { useMedia } from 'react-use'

import { useDefaultDevice } from '@/modules/device/DefaultDeviceContext'
import { desktop, mobile } from '@/styles/media'

export function useIsTabletDevice() {
  const defaultValue = useDefaultDevice().isTablet
  return useMedia(
    `(min-width: ${mobile}px) and (max-width: ${desktop - 1}px)`,
    defaultValue,
  )
}
