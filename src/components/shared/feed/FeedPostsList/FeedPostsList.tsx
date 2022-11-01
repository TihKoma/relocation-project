import { forwardRef } from 'react'
import styled from '@emotion/styled'

import { Post } from '@/components/shared/feed/Post'
import { CreatePostFromFeedButton as CreatePostFromFeedButtonBase } from '@/components/shared/PostForm/CreatePostFromFeedButton'
import { FeedItem } from '@/modules/feed'
import { notMobileMedia } from '@/styles/media'

type Props = {
  posts: FeedItem[]
  feedId?: string
  className?: string
  onMouseEnter?: (postId: string) => void
  onMouseLeave?: (postId: string) => void
  withCreatePostButton?: boolean
  isHighlightCreateButton?: boolean
}

// TODO: Add virtual list(like react-window)
export const FeedPostsList = forwardRef<HTMLUListElement, Props>(
  ({
    posts,
    feedId,
    className,
    withCreatePostButton,
    isHighlightCreateButton,
    onMouseEnter,
    onMouseLeave,
  }) => {
    if (posts.length === 0) {
      return null
    }
    return (
      <List className={className}>
        {withCreatePostButton ? (
          <CreatePostFromFeedButton isHighlight={isHighlightCreateButton} />
        ) : null}
        {posts.map((feedItem, index) => (
          <Item key={feedItem.post.id}>
            <Post
              item={feedItem}
              feedId={feedId}
              comments={feedItem.comments}
              isLazyLoadPictures={index !== 0}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            />
          </Item>
        ))}
      </List>
    )
  },
)

const List = styled.ul`
  padding: 0;
  margin: 0;

  position: relative;

  display: grid;
  grid-auto-flow: row;
  row-gap: 1.6rem;

  border-radius: 1.2rem;
  list-style-type: none;

  ${notMobileMedia} {
    row-gap: 1.6rem;
  }
`

const Item = styled.li`
  transition: box-shadow 0.3s;
  border-radius: 1.2rem;
  &:hover {
    box-shadow: 0px 2px 8px rgba(18, 21, 31, 0.04),
      0px 6px 24px rgba(18, 21, 31, 0.1);
  }
`

const CreatePostFromFeedButton = styled(CreatePostFromFeedButtonBase)<{
  isHighlight?: boolean
}>`
  ${(props) =>
    props.isHighlight
      ? `
    position: sticky;
    top: 1.6rem;
    z-index: 10;
  `
      : ''}
`
