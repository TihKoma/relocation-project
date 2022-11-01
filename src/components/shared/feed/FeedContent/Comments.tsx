import { useMemo, VFC } from 'react'
import styled from '@emotion/styled'

import { Comment } from '@/components/shared/feed/Comment'
import { CommentLevel } from '@/components/shared/feed/Comment/Comment'
import { CommentForm } from '@/components/shared/feed/FeedContent/CommentForm'
import { useAuthorizationStore } from '@/modules/authorization'
import { CommentItem, FeedItem } from '@/modules/feed'

type Props = {
  items: CommentItem['replies'] | FeedItem['comments']
  parentId?: string
  className?: string
  isCreateCommentFormVisible?: boolean
  commentsLevel: CommentLevel
  onCommentCreated: () => void
  postId: string
  isOnPostDetailedPage: boolean
}

export const Comments: VFC<Props> = ({
  commentsLevel,
  className,
  items,
  parentId,
  postId,
  isOnPostDetailedPage,
  isCreateCommentFormVisible = false,
  onCommentCreated,
}) => {
  const [{ isLoggedIn }] = useAuthorizationStore()

  const isVisibleForm = isLoggedIn && isCreateCommentFormVisible

  const initialValues = useMemo(
    () => ({ postId, parentId }),
    [parentId, postId],
  )

  if (!isVisibleForm && !items?.length) {
    return null
  }

  return (
    <Container className={className}>
      {isVisibleForm && (
        <CommentForm
          withBackground
          withAvatar
          initialValues={initialValues}
          onClose={onCommentCreated}
        />
      )}
      {items?.length ? (
        <List>
          {items.map((item) => (
            <Item key={item.comment.id}>
              <Comment
                commentLevel={commentsLevel}
                item={item as CommentItem}
                postId={postId}
                parentId={parentId}
                isOnPostDetailedPage={isOnPostDetailedPage}
              />
            </Item>
          ))}
        </List>
      ) : null}
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-auto-flow: row;
  gap: 1.6rem;
`
const List = styled.ul`
  margin: 0;
  padding: 0;

  display: grid;
  grid-auto-flow: row;
  gap: 1.6rem;

  list-style: none;
`
const Item = styled.li``
