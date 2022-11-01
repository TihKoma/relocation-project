import { FC, SVGProps } from 'react'

import { NotificationType } from '../../../__generated__/globalTypes'
import { ReactComponent as NotificationComment } from './notification-comment.svg'
import { ReactComponent as NotificationFollow } from './notification-follow.svg'
import { ReactComponent as NotificationPost } from './notification-post.svg'

export type NotificationIcon = {
  type: NotificationType
  Icon: FC<SVGProps<SVGSVGElement>>
}
export const notificationIcons: NotificationIcon[] = [
  {
    type: NotificationType.COMMENT_COMMENTED,
    Icon: NotificationComment,
  },
  {
    type: NotificationType.NEW_SUBSCRIBER,
    Icon: NotificationFollow,
  },
  {
    type: NotificationType.POST_COMMENTED,
    Icon: NotificationComment,
  },
  {
    type: NotificationType.SUBSCRIPTIONS_POST,
    Icon: NotificationPost,
  },
]
