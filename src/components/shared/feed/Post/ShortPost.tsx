import React, { FC } from 'react'
import styled from '@emotion/styled'

import { Content as ContentBase } from '@/components/shared/feed/FeedContent/Content'
import { Footer } from '@/components/shared/feed/FeedContent/Footer'
import { PostItem } from '@/modules/feed'
import { ReactionEntityType } from '@/modules/reaction'
import { ROUTES } from '@/modules/router'

import { Gallery as GalleryBase } from '../FeedContent/Gallery'
import { Header } from './Header'

type Props = {
  item: PostItem
  className?: string
  isOnDetailedPage?: boolean
  feedId?: string
  onContainerClick?: () => void
  isLazyLoadPictures?: boolean
}

export const ShortPost: FC<Props> = ({
  item,
  className,
  isOnDetailedPage,
  feedId,
  onContainerClick,
  isLazyLoadPictures,
}) => {
  const { userReaction, reactions, post, viewsCount } = item
  const hasMedia = !!(post.media && post.media.length)

  return (
    <Container className={className} onClick={onContainerClick}>
      <MainContent>
        <Header
          feedId={feedId}
          isOnDetailedPage={isOnDetailedPage}
          item={item}
          isContextMenuPopupVisible={false}
        />
        <Content
          withLinksInText
          content={post.content}
          geoData={post.geoData}
          isOnDetailedPage={isOnDetailedPage}
          linkToDetailedPage={
            !isOnDetailedPage
              ? ROUTES.detailedPost.calcUrl({ postSlug: post.slug ?? '' })
              : ''
          }
          variant={'short'}
        />
        <Footer
          reactions={reactions}
          reacted={userReaction?.type ?? null}
          entityId={post.id}
          entityType={ReactionEntityType.POST}
          postSlug={post.slug}
          isActionsVisible={false}
          viewsCount={viewsCount}
        />
      </MainContent>
      {hasMedia && <Gallery isLazy={isLazyLoadPictures} media={post.media} />}
    </Container>
  )
}

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
`
const Container = styled.div`
  width: 100%;
  padding: 1.6rem;

  display: grid;
  grid-auto-flow: row;
  gap: 1.6rem;
  grid-template-columns: auto auto;

  background-color: white;
  border-radius: 1.2rem;
`
const Content = styled(ContentBase)`
  display: flex;
  flex: 1;

  margin: 1rem 0;
`
const Gallery = styled(GalleryBase)`
  height: 15.8rem;
  justify-content: flex-end;
`
