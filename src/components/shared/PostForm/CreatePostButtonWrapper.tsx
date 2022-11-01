import { MouseEventHandler, ReactNode, useContext, VFC } from 'react'
import styled from '@emotion/styled'

import { ModalPortal } from '@/components/ui-kit/Modal'
import { useAnalytics } from '@/modules/analytics'
import { useAuthGlobalModals } from '@/modules/authorization'

import { PostForm } from '.'
import { DataForCreatePostContext } from './CreatePostContext'
import { usePostForm } from './use-post-form'

export type CreatePostButtonProps = {
  className?: string
  onSuccess?: () => void
  button: (props: { onClick: MouseEventHandler }) => ReactNode
}

export const CreatePostButtonWrapper: VFC<CreatePostButtonProps> = ({
  className,
  onSuccess,
  button,
}) => {
  const [isNotHavePermission, showModal] = useAuthGlobalModals('post')
  const analytics = useAnalytics()

  const { isOpen, onOpen, onRequestClose, onClose, formRef } = usePostForm(
    true,
    (success) => {
      if (success) {
        onSuccess?.()
      }
    },
  )

  const [initialValues] = useContext(DataForCreatePostContext)

  const onCreateButtonClick = () => {
    if (isNotHavePermission) {
      showModal()
      return
    }

    analytics?.startCreatePost()

    onOpen()
  }

  return (
    <Container className={className}>
      {button?.({
        onClick: onCreateButtonClick,
      })}
      <ModalPortal isVisible={isOpen} onRequestClose={onRequestClose}>
        <PostForm
          initialValues={initialValues}
          ref={formRef}
          onClose={onClose}
          title={'Creating post'}
          feedId={initialValues?.feedId}
        />
      </ModalPortal>
    </Container>
  )
}

const Container = styled.div`
  height: min-content;

  display: flex;
  align-items: center;
  justify-content: center;
`
