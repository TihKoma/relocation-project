import React, { useEffect, useMemo, useRef, VFC } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'

import { AreaLayout } from '@/components/shared/AreaLayout'
import { CommentForm as CommentFormBase } from '@/components/shared/feed/FeedContent/CommentForm'
import { Post as PostBase } from '@/components/shared/feed/Post'
import { DiscoveryCPMap } from '@/components/shared/maps/DiscoveryCPMap'
import { Activity } from '@/components/ui-kit/Activity'
import { useAuthorizationStore } from '@/modules/authorization'
import { QUERY_LIST_ENTITY_COMMENTS } from '@/modules/comment'
import { useInfinityScrollProvider } from '@/modules/infinity-scroll'
import { useScrollOnElement } from '@/modules/infinity-scroll'
import { mapServiceLocator } from '@/modules/map'
import { QUERY_GET_POST_BY_SLUG } from '@/modules/post'
import { mobileMedia, notMobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

import { PostMeta } from './PostMeta'

const START_COMMENTS_PAGE = 0
const COMMENTS_PAGE_LIMIT = 10

type Props = {
  postSlug: string
}

export const PostScreen: VFC<Props> = ({ postSlug }) => {
  const router = useRouter()
  return (
    <AreaLayout
      map={() => <DiscoveryCPMap />}
      onRequestBack={() => router.back()}
      theme={'dark'}
    >
      <Content postSlug={postSlug} />
    </AreaLayout>
  )
}
const Content: VFC<Props> = ({ postSlug }) => {
  const prevCommentsPage = useRef(START_COMMENTS_PAGE)
  const postContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    prevCommentsPage.current = START_COMMENTS_PAGE
    mapServiceLocator.getDiscoveryCPMapAsync().then((mapFacade) => {
      mapFacade.highlightMarkerById(postSlug)
    })

    return () => {
      mapServiceLocator.getDiscoveryCPMapAsync().then((mapFacade) => {
        mapFacade.resetHighlightMarkerById(postSlug)
      })
    }
  }, [postSlug])

  // TODO: problem not observer ref, use just useOnScrollProvider and add event on onScroll container
  useScrollOnElement(postContainerRef.current)

  const [authState] = useAuthorizationStore()

  const {
    loading: isLoadingPost,
    data: postData,
    error: postError,
  } = useQuery(QUERY_GET_POST_BY_SLUG, {
    variables: { slug: postSlug },
    ssr: true,
  })
  const post = postData?.getPostBySlug
  const {
    data: commentsList,
    loading: isLoadingComments,
    fetchMore: fetchMoreComments,
  } = useQuery(QUERY_LIST_ENTITY_COMMENTS, {
    skip: !post?.post.id,
    variables: {
      entityId: post?.post.id as string,
      limit: COMMENTS_PAGE_LIMIT,
      page: START_COMMENTS_PAGE,
    },
    ssr: false,
  })

  // TODO: use body scroll, is it correct?
  useInfinityScrollProvider(async () => {
    if (isLoadingComments) {
      return
    }

    prevCommentsPage.current++

    await fetchMoreComments({
      variables: {
        page: prevCommentsPage.current,
        entityId: post?.post.id,
        limit: COMMENTS_PAGE_LIMIT,
      },
    })
  })

  useEffect(() => {
    mapServiceLocator.getDiscoveryCPMapAsync().then((mapFacade) => {
      const coordinates =
        postData?.getPostBySlug.post.geoData?.geometry.coordinates
      if (coordinates) {
        mapFacade.easeToPost(coordinates, 17)
      }
    })
  }, [postData?.getPostBySlug])

  let content

  const initialValues = useMemo(() => {
    return {
      postId: post?.post.id ?? '',
    }
  }, [post])

  const withCommentForm = authState.isLoggedIn

  if (isLoadingPost) {
    content = (
      <Loader>
        <Activity />
      </Loader>
    )
  } else if (postError) {
    content = <div>Error</div>
  } else {
    content = (
      <>
        <PostMeta item={postData!.getPostBySlug} />
        <Post
          item={postData!.getPostBySlug}
          isOnDetailedPage
          comments={commentsList?.listEntityComments}
        />
        {withCommentForm && (
          <CommentFormContainer>
            <CommentForm withAvatar initialValues={initialValues} />
          </CommentFormContainer>
        )}
      </>
    )
  }

  return <Container>{content}</Container>
}

const Container = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  flex-grow: 1;

  background: ${getColorTheme('earth')};

  ${notMobileMedia} {
    margin: 1.6rem;

    border-radius: 1.2rem;
  }
`
const Post = styled(PostBase)`
  border-bottom-left-radius: unset;
  border-bottom-right-radius: unset;
  ${mobileMedia} {
    border: none;
    border-radius: unset;
  }
`
const Loader = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 10rem;
  padding-bottom: 10rem;

  display: flex;
  justify-content: center;
`
const CommentFormContainer = styled.div`
  height: 73px;
  width: 100%;
  padding: 0.8rem 0 0.8rem 7.4rem;
  z-index: 100;

  position: sticky;
  bottom: 0;
  left: 0;

  border-top: 1px solid #f0f1f6;
  background-color: ${getColorTheme('earth')};

  ${notMobileMedia} {
    border-radius: 0 0 1.2rem 1.2rem;
    margin-top: auto;
  }
`
const CommentForm = styled(CommentFormBase)`
  height: 100%;
`
