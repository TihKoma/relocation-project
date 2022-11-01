import React, { FC, useCallback, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import styled from '@emotion/styled'

import { Comments as CommentsBase } from '@/components/shared/feed/FeedContent/Comments'
import { Content } from '@/components/shared/feed/FeedContent/Content'
import { Footer } from '@/components/shared/feed/FeedContent/Footer'
import { useCreateCommentForm } from '@/components/shared/feed/FeedContent/hooks'
import { TextButtonDeprecated } from '@/components/ui-kit/TextButton'
import { MUTATION_VIEW_TIMES, ViewTimeEntityType } from '@/modules/analytics'
import { useViewTimeTracking } from '@/modules/analytics/track-view-time'
import { CommentItem, PostItem } from '@/modules/feed'
import { ReactionEntityType } from '@/modules/reaction'
import { ROUTES } from '@/modules/router'

import { Header } from './Header'

const VIEWED_POST_LIST_KEY = 'viewed-post-list'

type Props = {
  item: PostItem
  className?: string
  isOnDetailedPage?: boolean
  comments?: CommentItem[] | null
  feedId?: string
  onContainerClick?: () => void
  isLazyLoadPictures?: boolean
  onMouseEnter?: (postId: string) => void
  onMouseLeave?: (postId: string) => void
}

export const Post: FC<Props> = ({
  item,
  className,
  isOnDetailedPage,
  comments,
  feedId,
  onContainerClick,
  isLazyLoadPictures,
  onMouseEnter,
  onMouseLeave,
}) => {
  const router = useRouter()
  const { userReaction, reactions, viewsCount, post } = item

  const [addViewTime] = useMutation(MUTATION_VIEW_TIMES)

  const actualComments = useMemo(
    () => (isOnDetailedPage ? comments : comments?.slice(0, 1)),
    [comments, isOnDetailedPage],
  )

  const {
    isCreateCommentFormVisible,
    openCreateCommentForm,
    closeCreateCommentForm,
  } = useCreateCommentForm()

  const goToPostDetailedPage = () => {
    router.push(
      ROUTES.detailedPost.calcUrl({ postSlug: post.slug ?? '' }),
      undefined,
      {
        shallow: true,
      },
    )
  }

  const isMoreCommentsButtonVisible =
    !isOnDetailedPage && item.commentsCount && item.commentsCount > 1

  const [isViewed, setIsViewed] = useState(false)

  const addViewTimeCallback = useCallback(
    async (duration: number) => {
      if (isViewed || duration < 500) {
        return
      }
      const viewedPostsString = sessionStorage.getItem(VIEWED_POST_LIST_KEY)
      const viewedPosts = viewedPostsString
        ? JSON.parse(viewedPostsString)
        : null
      if (viewedPosts && viewedPosts.includes(post.id)) {
        setIsViewed(true)
        return
      }
      if (duration >= 2000) {
        setIsViewed(true)
        if (viewedPosts && viewedPosts instanceof Array) {
          viewedPosts.push(post.id)
          sessionStorage.setItem(
            VIEWED_POST_LIST_KEY,
            JSON.stringify(viewedPosts),
          )
        } else {
          sessionStorage.setItem(
            VIEWED_POST_LIST_KEY,
            JSON.stringify([post.id]),
          )
        }
      }
      await addViewTime({
        variables: {
          input: {
            duration,
            entityID: post.id,
            entityType: ViewTimeEntityType.POST,
          },
        },
      })
    },
    [addViewTime, post, isViewed],
  )

  const setRef = useViewTimeTracking(addViewTimeCallback)

  return (
    <Container
      ref={setRef}
      className={className}
      onClick={onContainerClick}
      onMouseEnter={() => {
        onMouseEnter?.(item.post.id)
      }}
      onMouseLeave={() => {
        onMouseLeave?.(item.post.id)
      }}
    >
      <Header feedId={feedId} isOnDetailedPage={isOnDetailedPage} item={item} />
      <Content
        withLinksInText
        content={post.content}
        media={post.media?.filter((media) => media.type !== 'MAP')}
        geoData={post.geoData}
        isLazyLoadPictures={isLazyLoadPictures}
        isOnDetailedPage={isOnDetailedPage}
        linkToDetailedPage={
          !isOnDetailedPage
            ? ROUTES.detailedPost.calcUrl({ postSlug: post.slug ?? '' })
            : ''
        }
      />
      <Footer
        reactions={reactions}
        reacted={userReaction?.type ?? null}
        entityId={post.id}
        entityType={ReactionEntityType.POST}
        onReply={isOnDetailedPage ? undefined : openCreateCommentForm}
        viewsCount={viewsCount}
        postSlug={post.slug}
      />
      {isMoreCommentsButtonVisible ? (
        <MoreCommentsButton onClick={goToPostDetailedPage}>
          Show all comments: {item.commentsCount}
        </MoreCommentsButton>
      ) : null}
      <Comments
        isCreateCommentFormVisible={isCreateCommentFormVisible}
        commentsLevel={'first'}
        items={actualComments}
        postId={post.id}
        isOnPostDetailedPage={!!isOnDetailedPage}
        onCommentCreated={closeCreateCommentForm}
      />
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  padding: 1.6rem;

  display: grid;
  grid-auto-flow: row;
  gap: 1.6rem;

  background-color: white;
  border-radius: 1.2rem;
`
const MoreCommentsButton = styled(TextButtonDeprecated)`
  justify-self: start;

  &:hover {
    text-decoration: underline;
  }
`
const Comments = styled(CommentsBase)`
  padding-left: 5.7rem;
`
