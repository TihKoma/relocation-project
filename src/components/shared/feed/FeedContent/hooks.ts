import { useCallback, useState } from 'react'

import { useAnalytics } from '@/modules/analytics'
import { useAuthGlobalModals } from '@/modules/authorization/authorization'

export const useCreateCommentForm = (initialValue = false) => {
  const [isNotHavePermission, showModal] = useAuthGlobalModals('comment')
  const [isVisible, setVisible] = useState(initialValue)
  const analytics = useAnalytics()

  const openCreateCommentForm = useCallback(() => {
    if (isNotHavePermission) {
      showModal()
      return
    }

    analytics?.startCreateComment()

    setVisible(true)
  }, [analytics, setVisible, showModal, isNotHavePermission])

  const closeCreateCommentForm = useCallback(() => {
    analytics?.closeCreationComment()
    setVisible(false)
  }, [analytics, setVisible])

  return {
    isCreateCommentFormVisible: isVisible,
    openCreateCommentForm,
    closeCreateCommentForm,
  }
}
