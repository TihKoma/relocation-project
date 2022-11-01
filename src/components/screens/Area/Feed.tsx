import { FC } from 'react'
import styled from '@emotion/styled'

import { PlaceholderFeed as PlaceholderFeedBase } from '@/components/shared/feed/PlaceholderFeed'
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
import { notMobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

import { RealEstateFeed } from './RealEstateFeed'

const COUNT_FIRST_POSTS = 3

type Props = {
  regionId: string
  regionName: string
  regionSlug: string
  className?: string
  onMouseEnter?: (postId: string) => void
  onMouseLeave?: (postId: string) => void
}

export const Feed: FC<Props> = ({
  regionId,
  regionName,
  className,
  onMouseEnter,
  onMouseLeave,
  regionSlug,
}) => {
  const { posts, feedId, loading } = useInfinityScrollFeed(
    QUERY_GET_REGION_FEED,
    {
      variables: {
        regionId,
      },
    },
    null,
  )
  const realEstateFeed = (
    <RealEstateFeed regionSlug={regionSlug} regionId={regionId} />
  )

  useDataForCreatePostContext(feedId, {
    id: regionId,
    name: regionName,
  })

  if (loading) {
    return <Loader withGradient={true} color={'neptune'} size={'large'} />
  }
  if (posts.length === 0) {
    if (loading) {
      return null
    }
    return (
      <>
        <PlaceholderFeed />
        {realEstateFeed}
      </>
    )
  }

  const firstPosts = posts.slice(0, COUNT_FIRST_POSTS) as FeedItem[]
  const secondPosts = posts.slice(COUNT_FIRST_POSTS, Infinity) as FeedItem[]
  const renderPosts = (posts: FeedItem[]) => {
    return posts.map((feedItem, index) => (
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
    ))
  }
  return (
    <Container className={className}>
      {firstPosts.length > 0 && (
        <List>
          <CreatePostFromFeedButton />
          {renderPosts(firstPosts)}
        </List>
      )}
      {realEstateFeed}
      {secondPosts.length > 0 && <List>{renderPosts(secondPosts)}</List>}
    </Container>
  )
}

const Container = styled.div`
  & :last-child {
    margin-bottom: 0;
  }
`
const List = styled.ul`
  padding: 1.6rem;
  margin: 0;
  &:not(:last-child) {
    margin-bottom: 1.6rem;
  }

  display: grid;
  grid-auto-flow: row;
  row-gap: 1.6rem;

  background: ${getColorTheme('sun50')};
  border-radius: 2.4rem;
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
const PlaceholderFeed = styled(PlaceholderFeedBase)`
  margin-bottom: 1.6rem;
`
