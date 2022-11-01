import { forwardRef, useRef } from 'react'
import styled from '@emotion/styled'

import { PlaceholderFeed } from '@/components/shared/feed/PlaceholderFeed'
import { Post } from '@/components/shared/feed/Post'
import { useDataForCreatePostContext } from '@/components/shared/PostForm'
// TODO: add CreatePostFromFeedButton to PostForm/index
import { CreatePostFromFeedButton } from '@/components/shared/PostForm/CreatePostFromFeedButton'
import { Loader } from '@/components/ui-kit/Loader'
import {
  FeedItem,
  QUERY_GET_REGION_FEED,
  useInfinityScrollFeed,
} from '@/modules/feed'
import { mobileMedia, notMobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

type Props = {
  regionId: string
  regionName: string
  className?: string
  onMouseEnter?: (postId: string) => void
  onMouseLeave?: (postId: string) => void
}

// TODO: Add virtual list(like react-window)
export const Feed = forwardRef<HTMLUListElement, Props>(
  ({ regionId, regionName, className, onMouseEnter, onMouseLeave }) => {
    const ref = useRef<HTMLDivElement>(null)

    const { posts, feedId, loading } = useInfinityScrollFeed(
      QUERY_GET_REGION_FEED,
      {
        ssr: false,
        variables: {
          regionId,
        },
      },
      ref?.current,
    )
    useDataForCreatePostContext(feedId, {
      id: regionId,
      name: regionName,
    })

    if (posts.length === 0) {
      if (loading) {
      } else {
        return <PlaceholderFeed />
      }
    }
    return (
      <Container ref={ref} className={className}>
        <List>
          <Title>Community</Title>
          {loading ? (
            <Loader withGradient={true} color={'neptune'} size={'large'} />
          ) : (
            <>
              <CreatePostFromFeedButton />
              {(posts as FeedItem[]).map((feedItem, index) => (
                <Item
                  key={feedItem.post.id}
                  onMouseEnter={() => onMouseEnter?.(feedItem.post.id)}
                  onMouseLeave={() => onMouseLeave?.(feedItem.post.id)}
                >
                  <Post
                    item={feedItem}
                    feedId={feedId}
                    comments={feedItem.comments}
                    isLazyLoadPictures={index !== 0}
                  />
                </Item>
              ))}
            </>
          )}
        </List>
      </Container>
    )
  },
)

const Container = styled.div`
  padding: 1.6rem;

  background: ${getColorTheme('sun50')};
  border-radius: 2.4rem;
`
const Title = styled.div`
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  letter-spacing: -0.04em;
  color: ${getColorTheme('sun1000')};

  ${mobileMedia} {
    font-size: 20px;
    line-height: 24px;
  }
`
const List = styled.ul`
  padding: 0;
  margin: 0;
  &:not(:last-child) {
    margin-bottom: 1.6rem;
  }

  display: grid;
  grid-auto-flow: row;
  row-gap: 1.6rem;

  list-style-type: none;

  ${notMobileMedia} {
    row-gap: 1.6rem;
  }
`
const Item = styled.li`
  transition: box-shadow 0.3s;
  border-radius: 1.2rem;

  &:hover {
    box-shadow: 0 2px 8px rgba(18, 21, 31, 0.04),
      0 6px 24px rgba(18, 21, 31, 0.1);
  }
`
