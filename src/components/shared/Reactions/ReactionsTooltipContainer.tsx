import { FC, useState } from 'react'

import { useAnalytics } from '@/modules/analytics'
import { Reactions } from '@/modules/feed'

import { ReactionsModal } from '../ReactionsModal/ReactionsModal'
import { ReactionsTooltip } from './ReactionsTooltip'

type Props = {
  entityId: string
  reactions?: Reactions
  children: JSX.Element
}

export const ReactionsTooltipContainer: FC<Props> = ({
  entityId,
  reactions,
  children,
}) => {
  const [isReactionsModalOpen, setIsReactionsModalOpen] = useState(false)

  const analytics = useAnalytics()

  if (!reactions) return <></>

  return (
    <>
      <ReactionsTooltip
        reactions={reactions}
        entityId={entityId}
        onOtherReactionClick={() => {
          setIsReactionsModalOpen(true)
          analytics.reactionList()
        }}
      >
        {children}
      </ReactionsTooltip>

      {isReactionsModalOpen && (
        <ReactionsModal
          entityId={entityId}
          reactions={reactions}
          isOpen={isReactionsModalOpen}
          setIsOpen={setIsReactionsModalOpen}
        />
      )}
    </>
  )
}
