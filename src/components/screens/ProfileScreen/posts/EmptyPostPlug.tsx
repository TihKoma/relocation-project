import { VFC } from 'react'

import { Plug } from '@/components/shared/Plug'
import { MessagesColorized } from '@/images'

type Props = {
  firstName: string
  className?: string
}
export const EmptyPostPlug: VFC<Props> = ({ firstName, className }) => (
  <Plug
    className={className}
    title={`${firstName} hasn't got posts?`}
    icon={<MessagesColorized />}
  />
)
