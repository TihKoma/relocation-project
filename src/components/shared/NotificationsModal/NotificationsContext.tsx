import { createContext, FC, ReactNode, useContext, useState } from 'react'

import { useAnalytics } from '@/modules/analytics'

type NotificationsModalContextState = {
  isNotificationsModalOpen: boolean
  openNotificationsModal: () => void
  closeNotificationsModal: () => void
}
export const NotificationsModalContext =
  createContext<NotificationsModalContextState>({
    isNotificationsModalOpen: false,
    openNotificationsModal: () => {},
    closeNotificationsModal: () => {},
  })

type Props = {
  children: ReactNode
}
export const NotificationsModalContextProvider: FC<Props> = ({ children }) => {
  const analytics = useAnalytics()

  const [isNotificationsModalOpen, setIsNotificationsModalOpen] =
    useState(false)
  const openNotificationsModal = () => {
    analytics.notificationsScreenOpened()
    setIsNotificationsModalOpen(true)
  }
  const closeNotificationsModal = () => {
    setIsNotificationsModalOpen(false)
  }
  return (
    <NotificationsModalContext.Provider
      value={{
        isNotificationsModalOpen,
        openNotificationsModal,
        closeNotificationsModal,
      }}
    >
      {children}
    </NotificationsModalContext.Provider>
  )
}

export const useNotificationsModal = (): NotificationsModalContextState => {
  return useContext(NotificationsModalContext)
}
