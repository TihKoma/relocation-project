import { ComponentProps, VFC } from 'react'

import { Button } from '@/components/ui-kit/Button'
import { PlusIcon } from '@/images'
import { useIsMobileDevice } from '@/modules/device'

import { CreatePostButtonWrapper } from './CreatePostButtonWrapper'

export const CreatePostButton: VFC<
  Omit<ComponentProps<typeof CreatePostButtonWrapper>, 'button'>
> = (props) => {
  const isMobile = useIsMobileDevice()
  return (
    <CreatePostButtonWrapper
      {...props}
      button={({ onClick }) => {
        return (
          <>
            {isMobile ? (
              <Button
                size={'small'}
                onClick={onClick}
                data-test-id={'create-post:open-button'}
                Icon={<PlusIcon />}
              />
            ) : (
              <Button
                viewType={'secondary'}
                size={'small'}
                onClick={onClick}
                data-test-id={'create-post:open-button'}
              >
                Create post
              </Button>
            )}
          </>
        )
      }}
    />
  )
}
