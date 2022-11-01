import { FC, useRef } from 'react'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'

import { FeedPostsList as FeedPostsListBase } from '@/components/shared/feed/FeedPostsList'
import { LoadingState } from '@/components/shared/LoadingState'
import { MockWithAction } from '@/components/shared/MockWithAction'
import { Loader } from '@/components/ui-kit/Loader'
import { PlaceholderBubbles } from '@/images'
import {
  useInfinityScrollProvider,
  useScrollOnElement,
} from '@/modules/infinity-scroll'
import { QUERY_GET_POSTS_BY_USER } from '@/modules/post'
import { mobileMedia, notMobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

import { Section } from '../Section'

const START_PAGE = 0
const PAGINATION_LIMIT = 10

type Props = {
  userId: string
  isMyProfile: boolean
  firstName: string
  hasPhotoAndCover: boolean
}
export const PostsSectionContent: FC<Props> = ({
  userId,
  isMyProfile,
  firstName,
}) => {
  const postsContainerRef = useRef<null>(null)
  useScrollOnElement(postsContainerRef.current)

  const {
    loading,
    data: { listPostsByUser: posts = [] } = {},
    fetchMore,
    error,
  } = useQuery(QUERY_GET_POSTS_BY_USER, {
    variables: {
      userId,
      page: START_PAGE,
      limit: PAGINATION_LIMIT,
    },
    ssr: false,
  })
  const prevPage = useRef(START_PAGE)
  useInfinityScrollProvider(() => {
    if (fetchMore) {
      prevPage.current = prevPage.current + 1
      fetchMore({
        variables: {
          page: prevPage.current,
          limit: PAGINATION_LIMIT,
        },
      })
    }
  })

  return (
    <PostsSection ref={postsContainerRef} isUserHasPosts={!!posts?.length}>
      <LoadingState
        loading={loading}
        error={error?.message}
        loadingComponent={
          <Loader withGradient={true} color={'neptune'} size={'large'} />
        }
      >
        {posts?.length ? (
          <FeedPostsList posts={posts} withCreatePostButton={isMyProfile} />
        ) : (
          <MockWithAction
            title={
              isMyProfile
                ? `You haven't post anything yet`
                : `${firstName} hasn’t got posts`
            }
            withCreatePostButton={isMyProfile}
            description={
              isMyProfile
                ? 'Share something interesting with your neighbors'
                : undefined
            }
            image={<PlaceholderBubbles />}
          />
        )}
      </LoadingState>
    </PostsSection>
  )
}

const FeedPostsList = styled(FeedPostsListBase)`
  width: 100%;
`
const PostsSection = styled(Section)<{ isUserHasPosts: boolean }>`
  ${notMobileMedia} {
    padding: 16px;
  }
  ${mobileMedia} {
    padding: 16px;
    order: 2;

    background-color: ${(props) =>
      props.isUserHasPosts
        ? getColorTheme('moon')(props)
        : getColorTheme('earth')(props)};
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }
`
