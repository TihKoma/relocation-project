import { useRef, useState } from 'react'

import { goToTop } from '@/modules/utils/go-to-top'

import type { PostFormRef } from './PostForm'

export const usePostForm = (
  goToTopWhenSuccess?: boolean,
  onCloseCallback?: (success: boolean) => void,
) => {
  const [isOpen, setOpen] = useState(false)
  const formRef = useRef<PostFormRef | null>(null)

  const onCloseForm = () => {
    if (formRef.current?.isDirty()) {
      if (window.confirm('Are you sure you want to leave without posting?')) {
        setOpen(false)
      }
    } else {
      setOpen(false)
    }
  }

  const onClose = (success: boolean) => {
    if (success) {
      setOpen(false)
      goToTopWhenSuccess && goToTop()
    } else {
      onCloseForm()
    }

    onCloseCallback?.(success)
  }

  return {
    isOpen,
    onOpen: () => setOpen(true),
    onRequestClose: onCloseForm,
    onClose,
    formRef,
  }
}
