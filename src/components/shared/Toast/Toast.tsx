import styled from '@emotion/styled'
import { ToastContainer as ToastContainerBase } from 'react-toastify'

import { useIsMobileDevice } from '@/modules/device'
import { mobileMedia } from '@/styles/media'

export const Toast = () => {
  const isMobile = useIsMobileDevice()

  return (
    <ToastContainer
      icon={false}
      position={isMobile ? 'bottom-center' : 'top-right'}
      hideProgressBar={true}
    />
  )
}

const ToastContainer = styled(ToastContainerBase)`
  ${mobileMedia} {
    padding: 0.8rem;
  }
`
