import { FC } from 'react'
import styled from '@emotion/styled'

import { ReactionsTooltipContainer } from '@/components/shared/Reactions'
import { ReactComponent as ViewsIconBase } from '@/images/post-stats-eye.svg'
import { ReplyIcon } from '@/images/postActions'
import { Reactions } from '@/modules/feed'
import { ReactionEntityType, ReactionType } from '@/modules/reaction'

import { ActionButton } from './ActionButton'
import { ReactionActionButton } from './ReactionActionButton'
import { ReactionsCounter } from './ReactionsCounter'
import { ShareActionButton } from './ShareActionButton'

type Props = {
  reactions?: Reactions
  reacted: ReactionType | null
  entityType: ReactionEntityType
  entityId: string
  onReply?: () => void
  viewsCount?: number | null
  postSlug?: string | null
  isActionsVisible?: boolean
}

export const Footer: FC<Props> = ({
  reactions,
  entityId,
  entityType,
  reacted,
  onReply,
  viewsCount = 0,
  postSlug,
  isActionsVisible = true,
}) => {
  return (
    <Container>
      {isActionsVisible && (
        <Actions>
          <ReactionActionButton
            entityId={entityId}
            entityType={entityType}
            reacted={reacted}
          />
          {onReply && (
            <ActionButton onClick={onReply}>
              <ReplyIcon />
            </ActionButton>
          )}
          {entityType === ReactionEntityType.POST && postSlug && (
            <ShareActionButton postSlug={postSlug} />
          )}
        </Actions>
      )}
      <Stats>
        <ReactionsTooltipContainer entityId={entityId} reactions={reactions}>
          <ReactionsCounter reactions={reactions} />
        </ReactionsTooltipContainer>

        {viewsCount && viewsCount > 0 ? (
          <ViewsCounter>
            <ViewsIconBase />
            {viewsCount}
          </ViewsCounter>
        ) : null}
      </Stats>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;

  color: #9ea9b2;
`
const Actions = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: 0.8rem;
`
const Stats = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: 1.3rem;
`
const ViewsCounter = styled.div`
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  gap: 0.4rem;
`
