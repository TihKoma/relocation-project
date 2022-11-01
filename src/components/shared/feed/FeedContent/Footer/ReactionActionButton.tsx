import { FC, useMemo } from 'react'
import { useMutation } from '@apollo/client'
import styled from '@emotion/styled'
import debounce from 'lodash/debounce'

import {
  ActionButton,
  // ActionLabel,
} from '@/components/shared/feed/FeedContent/Footer/ActionButton'
import { ReactionsDropdown } from '@/components/shared/ReactionsDropdown'
import { ReactIcon } from '@/images/postActions'
import { reactionsEmojis } from '@/images/reactions'
import { useAnalytics } from '@/modules/analytics'
import { useAuthGlobalModals } from '@/modules/authorization/authorization'
import {
  MUTATION_ADD_REACTION,
  MUTATION_REMOVE_REACTION,
  ReactionEntityType,
  ReactionType,
} from '@/modules/reaction'
import { QUERY_LIST_REACTION } from '@/modules/reaction/graphql/queries'

const REMOVE_REACTION_DEBOUNCE = 200 // avoid double click

type Props = {
  reacted: ReactionType | null
  entityType: ReactionEntityType
  entityId: string
}
export const ReactionActionButton: FC<Props> = ({
  entityId,
  entityType,
  reacted,
}) => {
  const [isNotHavePermission, showModal] = useAuthGlobalModals('reaction')
  const analytics = useAnalytics()

  const entity =
    entityType === ReactionEntityType.POST
      ? `FeedPost:${JSON.stringify({ post: { id: entityId } })}`
      : `FeedComment:${JSON.stringify({ comment: { id: entityId } })}`
  const [addReaction] = useMutation(MUTATION_ADD_REACTION, {
    update(cache, { data }) {
      const reaction = data?.addReaction
      if (!reaction) {
        // eslint-disable-next-line no-console
        console.log('not reaction for add reaction')
        return
      }
      cache.modify({
        id: entity,
        fields: {
          userReaction() {
            return reaction
          },
          reactions(reactions) {
            const typeModify = reaction.type.toLowerCase()
            return {
              ...reactions,
              [typeModify]: reactions[typeModify] + 1,
              total: reactions.total + 1,
            }
          },
        },
      })
    },
    refetchQueries() {
      return [QUERY_LIST_REACTION]
    },
  })
  const [removeReaction] = useMutation(MUTATION_REMOVE_REACTION, {
    update(cache, { data }) {
      if (!data) {
        // eslint-disable-next-line no-console
        console.log('not reaction for add reaction')
        return
      }
      cache.modify({
        id: entity,
        fields: {
          userReaction() {
            return null
          },
          reactions(reactions) {
            if (!reacted) {
              return
            }
            const typeModify = reacted.toLowerCase()
            return {
              ...reactions,
              [typeModify]: reactions[typeModify] - 1,
              total: reactions.total - 1,
            }
          },
        },
      })
    },
    refetchQueries() {
      return [QUERY_LIST_REACTION]
    },
  })

  const onReactionButtonClick = useMemo(
    () =>
      debounce(async () => {
        if (isNotHavePermission) {
          showModal()
          return
        }

        if (reacted) {
          await removeReaction({ variables: { entityID: entityId } })
          analytics?.removeReaction()
        }
      }, REMOVE_REACTION_DEBOUNCE),
    [
      analytics,
      removeReaction,
      entityId,
      reacted,
      isNotHavePermission,
      showModal,
    ],
  )

  const onReactionClick = (type: ReactionType) => {
    addReaction({ variables: { input: { type, entityType, entityId } } })

    analytics?.addReaction(type)
  }

  const Emoji = reactionsEmojis?.find((item) => item.type === reacted)?.Emoji

  return (
    <ReactionsDropdown
      onClick={onReactionClick}
      disabled={!!reacted || isNotHavePermission}
    >
      <ActionButton onClick={onReactionButtonClick}>
        {reacted && Emoji ? (
          <>
            <Reacted>
              <Emoji />
            </Reacted>{' '}
          </>
        ) : (
          <>
            <ReactIcon />
          </>
        )}
      </ActionButton>
    </ReactionsDropdown>
  )
}

const Reacted = styled.div`
  display: flex;
`
