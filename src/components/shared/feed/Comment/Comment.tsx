import React, { FC, useMemo, useState } from 'react'
import { useQuery } from '@apollo/client'
import { css } from '@emotion/css'
import styled from '@emotion/styled'

import { Comments } from '@/components/shared/feed/FeedContent'
import { CommentForm as CommentFormBase } from '@/components/shared/feed/FeedContent/CommentForm'
import { Content } from '@/components/shared/feed/FeedContent/Content'
import { Footer } from '@/components/shared/feed/FeedContent/Footer/Footer'
import { Header } from '@/components/shared/feed/FeedContent/Header'
import { useCreateCommentForm } from '@/components/shared/feed/FeedContent/hooks'
import { CommentItem } from '@/modules/feed'
import { QUERY_GET_USER_PROFILE } from '@/modules/profile'
import { ReactionEntityType } from '@/modules/reaction'

import { ContextMenuPopup } from './ContextMenuPopup'

export type CommentLevel = 'first' | 'second'

type Props = {
  item: CommentItem
  postId: string
  commentLevel: CommentLevel
  isOnPostDetailedPage: boolean
  parentId?: string
}

// TODO: ad-hoc with CommentForm it's temporarily - it will be refactoring by design
export const Comment: FC<Props> = ({
  postId,
  parentId,
  isOnPostDetailedPage,
  commentLevel,
  item,
}) => {
  const { data: profileQuery } = useQuery(QUERY_GET_USER_PROFILE, {
    ssr: false,
  })
  const profile = profileQuery?.getUserProfile
  const {
    comment: { id, text, createdAt },
    comment,
    userReaction,
    user,
    reactions,
    replies,
  } = item

  const {
    isCreateCommentFormVisible,
    openCreateCommentForm,
    closeCreateCommentForm,
  } = useCreateCommentForm()
  const [isShowEditForm, setIsShowEditForm] = useState(false)
  const initialValues = useMemo(() => ({ id, comment: text }), [text, id])

  const isThreadVisible = commentLevel === 'first'

  const openEditForm = () => {
    setIsShowEditForm(true)
  }

  return (
    <>
      <Container>
        <Background>
          <Header
            user={user}
            createdAt={createdAt}
            avatarClassName={avatarClassName}
          >
            <ContextMenuPopup
              openEditForm={openEditForm}
              postId={postId}
              parentId={parentId}
              commentId={comment.id}
              isCurrentUserComment={profile?.userId === user.userId}
            />
          </Header>
          {isShowEditForm ? (
            <CommentForm
              withBackground
              initialValues={initialValues}
              onClose={() => setIsShowEditForm(false)}
            />
          ) : (
            <Content content={text} withLinksInText />
          )}
          <Footer
            reactions={reactions}
            reacted={userReaction?.type ?? null}
            entityId={id}
            entityType={ReactionEntityType.COMMENT}
            onReply={isThreadVisible ? openCreateCommentForm : undefined}
          />
        </Background>
        {isThreadVisible && (
          <Thread>
            <Comments
              isCreateCommentFormVisible={isCreateCommentFormVisible}
              onCommentCreated={closeCreateCommentForm}
              commentsLevel={'second'}
              items={replies}
              parentId={id}
              postId={postId}
              isOnPostDetailedPage={isOnPostDetailedPage}
            />
          </Thread>
        )}
      </Container>
    </>
  )
}

const Container = styled.div`
  display: grid;
  grid-auto-flow: row;
  gap: 1.6rem;
`
const Background = styled.div`
  padding: 1.6rem;

  display: grid;
  grid-auto-flow: row;
  gap: 1.6rem;

  border-radius: 1.2rem;
  background-color: ${(props) => props.theme.moon};
`
// We cannot override Comments, 'cause Comments has Comment(cycle dependencies)
const Thread = styled.div`
  padding-left: 5.7rem;
`
const avatarClassName = css`
  position: absolute;
  left: -7.4rem;
`
const CommentForm = styled(CommentFormBase)`
  position: relative;
  top: 0;
  right: -1.5rem;
  left: -1.4rem;
`
