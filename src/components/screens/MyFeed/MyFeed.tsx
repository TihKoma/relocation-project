import { FC, useContext, useEffect, useRef } from 'react'
import styled from '@emotion/styled'

import { AreaLayout } from '@/components/shared/AreaLayout'
import { FeedPostsList } from '@/components/shared/feed/FeedPostsList'
import { Shadow } from '@/components/shared/layout'
import { LoadingState } from '@/components/shared/LoadingState'
import { DiscoveryCPMap } from '@/components/shared/maps/DiscoveryCPMap'
import { DataForCreatePostContext } from '@/components/shared/PostForm'
import { Loader } from '@/components/ui-kit/Loader'
import { useAuthorizationStore } from '@/modules/authorization'
import { useIsNotMobileDevice } from '@/modules/device'
import {
  QUERY_GET_USER_FEED,
  useInfinityScrollFeed,
  useRestoreScroll,
} from '@/modules/feed'
import { getColorTheme } from '@/styles/themes'

import { MyFeedMeta } from './MyFeedMeta'
import { Placeholder } from './Placeholder'

export const MyFeed = () => {
  return (
    <>
      <MyFeedMeta />
      <LayoutWithContent />
    </>
  )
}

const LayoutWithContent: FC = () => {
  const [{ isLoggedIn }] = useAuthorizationStore()
  const isNotMobile = useIsNotMobileDevice()

  const contentRef = useRef<HTMLDivElement>(null)

  const [, setDataForCreatePostContext] = useContext(DataForCreatePostContext)

  const { loading, error, posts, feedId } = useInfinityScrollFeed(
    QUERY_GET_USER_FEED,
    {
      skip: !isLoggedIn,
    },
    null,
  )

  useRestoreScroll(contentRef, 'my-feed-scroll-top', !loading, /\/post\/.*/)

  useEffect(() => {
    if (feedId) {
      setDataForCreatePostContext?.({ feedId })
    }
  }, [feedId, setDataForCreatePostContext])

  return (
    <AreaLayout map={() => <DiscoveryCPMap />} contentRef={contentRef}>
      <Container>
        <LoadingState
          loading={loading}
          error={error?.message}
          loadingComponent={
            <Loader withGradient={true} color={'neptune'} size={'large'} />
          }
        >
          {isLoggedIn && posts.length ? (
            <>
              <Shadow position={'top'} />
              <Wrapper>
                {isNotMobile && <Title>My feed</Title>}
                {isNotMobile && (
                  <Description>
                    Learn local experiences and explore new places
                  </Description>
                )}
                <FeedPostsList
                  posts={posts}
                  feedId={feedId}
                  withCreatePostButton
                />
              </Wrapper>
              <Shadow position={'bottom'} />
            </>
          ) : (
            <Placeholder />
          )}
        </LoadingState>
      </Container>
    </AreaLayout>
  )
}

const Container = styled.div`
  height: 100%;

  position: relative;
`
const Wrapper = styled.div`
  padding: 1.6rem;

  background-color: ${getColorTheme('moon')};
`
const Title = styled.h1`
  font-size: 42px;
  letter-spacing: -0.05em;
  margin: 0;

  color: ${getColorTheme('sun')};
  font-weight: 500;
`
const Description = styled.p`
  margin: 0 0 1.6rem 0;

  color: ${getColorTheme('mercury')};
  font-size: 16px;
  line-height: 20px;
  letter-spacing: -0.04em;
`
