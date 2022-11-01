import { FC, useContext, useEffect, useRef } from 'react'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'

import { Header } from '@/components/screens/Discovery'
import { FeedPostsList as FeedPostsListBase } from '@/components/shared/feed/FeedPostsList'
import {
  HEIGHT_MOBILE_HEADER,
  Layout,
  NAVIGATION_BAR_HEIGHT,
  Shadow,
  SplitContentWrapper,
} from '@/components/shared/layout'
import { LoadingState } from '@/components/shared/LoadingState'
import { DiscoveryCPMap } from '@/components/shared/maps/DiscoveryCPMap'
import { MockWithAction } from '@/components/shared/MockWithAction'
import { DataForCreatePostContext } from '@/components/shared/PostForm'
import { Loader } from '@/components/ui-kit/Loader'
import { PlaceholderQuestion } from '@/images'
import { useCookieController } from '@/modules/cookie'
import {
  QUERY_GET_REGION_FEED,
  useInfinityScrollFeed,
  useRestoreScroll,
} from '@/modules/feed'
import {
  mapServiceLocator,
  QUERY_GET_REGION_BY_SLUG,
  Region,
} from '@/modules/map'
import { desktopMedia, mobileMedia, notMobileMedia } from '@/styles/media'
import { SCROLLBAR_DISPLAY_NONE_MIXIN } from '@/styles/mixins'
import { getColorTheme } from '@/styles/themes'

import { DiscoveryMeta } from './DiscoveryMeta'

// TODO isAskingQuestion is experiment
type Props = {
  regionSlug: string
  isAskingQuestion: boolean
}
export const Discovery: FC<Props> = ({ regionSlug, isAskingQuestion }) => {
  const { loading, data, error } = useQuery(QUERY_GET_REGION_BY_SLUG, {
    variables: { slug: regionSlug },
    ssr: true,
  })

  const region = data?.getRegionBySlug
  const cookieController = useCookieController()
  useEffect(() => {
    if (region) {
      cookieController.set('last_discovery_region_slug', region.slug)
    }
  }, [region, cookieController])

  const content = region ? (
    <>
      <DiscoveryMeta name={region.name} subtitle={region.subtitle} />
      <Content
        regionId={region.id}
        regionInfo={region}
        isAskingQuestion={isAskingQuestion}
      />
    </>
  ) : null

  return (
    <Layout initialViewMode={'feed'}>
      {isAskingQuestion ? (
        <LoadingState
          error={error?.message}
          loading={loading}
          loadingComponent={
            <Loader withGradient={true} color={'neptune'} size={'large'} />
          }
        >
          <AskingQuestionContainer>
            <AskingQuestionContent>{content}</AskingQuestionContent>
          </AskingQuestionContainer>
        </LoadingState>
      ) : (
        <SplitContentWrapper
          content={
            <LoadingState
              error={error?.message}
              loading={loading}
              loadingComponent={
                <Loader withGradient={true} color={'neptune'} size={'large'} />
              }
            >
              {content}
            </LoadingState>
          }
          map={<DiscoveryCPMap regionSlug={regionSlug} />}
        />
      )}
    </Layout>
  )
}

type ContentProps = {
  regionId: string
  regionInfo: Region
  isAskingQuestion: boolean
}
const Content: FC<ContentProps> = ({
  regionId,
  regionInfo,
  isAskingQuestion,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [_, setDataForCreatePostContext] = useContext(DataForCreatePostContext)

  const { loading, posts, feedId, error } = useInfinityScrollFeed(
    QUERY_GET_REGION_FEED,
    {
      ssr: false,
      variables: {
        regionId,
      },
    },
    ref?.current,
  )

  useRestoreScroll(ref, 'discovery-scroll-top', !loading, /\/post\/.*/)

  useEffect(() => {
    if (feedId || regionInfo) {
      setDataForCreatePostContext?.({
        feedId,
        region: {
          id: regionInfo.id,
          name: regionInfo.name,
        },
      })
    }
  }, [regionInfo, feedId, setDataForCreatePostContext])

  const withShadow = posts.length > 1

  const onMouseEnter = (postId: string) => {
    mapServiceLocator.getDiscoveryCPMapAsync().then((mapFacade) => {
      mapFacade.focusMarker(postId)
    })
  }
  const onMouseLeave = (postId: string) => {
    mapServiceLocator.getDiscoveryCPMapAsync().then((mapFacade) => {
      mapFacade.blurMarker(postId)
    })
  }

  // TODO delete withOverflow when finish experiment with isAskingQuestion
  return (
    <Container withOverflow={!isAskingQuestion}>
      <Wrapper ref={ref} withOverflow={!isAskingQuestion}>
        {withShadow && <Shadow position={'top'} />}
        <Header regionInfo={regionInfo} />
        <LoadingState
          loading={loading}
          loadingComponent={
            <Loader withGradient={true} color={'neptune'} size={'large'} />
          }
          error={error?.message}
        >
          {posts.length ? (
            <FeedPostsList
              posts={posts}
              feedId={feedId}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              withCreatePostButton
              isHighlightCreateButton={isAskingQuestion}
            />
          ) : (
            <MockWithAction
              image={<PlaceholderQuestion />}
              title={'Feed is empty'}
              description={'Start a conversation'}
            />
          )}
        </LoadingState>
        {withShadow && <Shadow position={'bottom'} />}
      </Wrapper>
    </Container>
  )
}
const FeedPostsList = styled(FeedPostsListBase)`
  ${mobileMedia} {
    padding: 1.6rem 1.6rem 0 1.6rem;

    border-radius: 1.6rem 1.6rem 0 0;
    background: ${getColorTheme('moon')};
    transform: translateY(-20px);
  }
`
const Container = styled.div<{ withOverflow: boolean }>`
  max-height: 100%;
  z-index: 0;

  position: relative;

  background-color: ${getColorTheme('moon')};
  overflow: ${(props) => (props.withOverflow ? 'hidden' : '')};

  ${notMobileMedia} {
    border-radius: 1.2rem;
  }

  ${mobileMedia} {
    padding: 0;
  }
`
const Wrapper = styled.div<{ withOverflow: boolean }>`
  height: 100%;
  width: 100%;

  overflow: ${(props) => (props.withOverflow ? 'auto' : '')};

  display: flex;
  flex-direction: column;

  ${SCROLLBAR_DISPLAY_NONE_MIXIN};

  ${notMobileMedia} {
    padding: 1.6rem;
  }
`
const AskingQuestionContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;

  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: ${getColorTheme('moon')};

  ${notMobileMedia} {
    border-radius: 1.2rem;
  }

  ${mobileMedia} {
    padding-top: ${HEIGHT_MOBILE_HEADER}px;
    padding-bottom: ${NAVIGATION_BAR_HEIGHT}px;

    position: fixed;
    top: 0;
    bottom: 0;
  }
`
const AskingQuestionContent = styled.div`
  ${desktopMedia} {
    width: 60rem;
  }
`
