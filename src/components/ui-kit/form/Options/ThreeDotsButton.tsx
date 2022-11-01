import { forwardRef } from 'react'

import { Button } from '@/components/ui-kit/Button'
import { ThreeDotsIcon } from '@/images'

type Props = {
  onClick?: () => void
}
export const ThreeDotsButton = forwardRef<HTMLButtonElement, Props>(
  (props, ref) => {
    return (
      <Button
        ref={ref}
        size={'small'}
        viewType={'ghost'}
        Icon={<ThreeDotsIcon />}
        {...props}
      />
    )
  },
)
