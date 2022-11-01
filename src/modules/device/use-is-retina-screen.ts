import { useMedia } from 'react-use'

export const useIsRetinaScreen = () => {
  return useMedia(
    `(-webkit-min-device-pixel-ratio: 2), 
(min-resolution: 192dpi)`,
    false,
  )
}
