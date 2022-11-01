import { FC } from 'react'

import { Plug } from '@/components/shared/Plug'
import { PostForm, usePostForm } from '@/components/shared/PostForm'
import { Button } from '@/components/ui-kit/Button'
import { ModalPortal } from '@/components/ui-kit/Modal'
import { MessagesColorized } from '@/images'
import { useAnalytics } from '@/modules/analytics'

const INITIAL_VALUES = {}

type Props = {
  className?: string
}

export const CreatePostPlug: FC<Props> = ({ className }) => {
  const analytics = useAnalytics()
  const { isOpen, onOpen, onRequestClose, onClose, formRef } = usePostForm(
    true,
    () => {},
  )

  return (
    <Plug
      className={className}
      title={'Create a post'}
      description={'Share something interesting with your neighbors'}
      icon={<MessagesColorized />}
    >
      <Button
        size={'medium'}
        viewType={'primary'}
        fullWidth
        onClick={() => {
          analytics?.startCreatePost()
          onOpen()
        }}
      >
        Post now
      </Button>
      <ModalPortal isVisible={isOpen} onRequestClose={onRequestClose}>
        <PostForm
          initialValues={INITIAL_VALUES}
          ref={formRef}
          onClose={onClose}
          title={'Creating post'}
        />
      </ModalPortal>
    </Plug>
  )
}
