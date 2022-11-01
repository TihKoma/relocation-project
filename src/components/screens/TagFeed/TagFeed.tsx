import { FC, useRef } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'

import { TagFeedMeta } from '@/components/screens/TagFeed/TagFeedMeta'
import { AreaLayout } from '@/components/shared/AreaLayout'
import { FeedPostsList } from '@/components/shared/feed/FeedPostsList'
import { Shadow } from '@/components/shared/layout'
import { LoadingState } from '@/components/shared/LoadingState'
import { DiscoveryCPMap } from '@/components/shared/maps/DiscoveryCPMap'
import { MockWithAction } from '@/components/shared/MockWithAction'
import { NormalizedButton } from '@/components/ui-kit/Button'
import { Loader } from '@/components/ui-kit/Loader'
import { ArrowIcon, PlaceholderQuestion } from '@/images'
import {
  QUERY_GET_TAG_FEED,
  useInfinityScrollFeed,
  useRestoreScroll,
} from '@/modules/feed'
import { QUERY_DETECT_REGION } from '@/modules/neighbourhood'
import { ROUTES } from '@/modules/router'
import { mobileMedia, notMobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

type Props = {
  tag: string
}

export const TagScreen: FC<Props> = ({ tag }) => {
  return (
    <>
      <TagFeedMeta tag={tag} />
      <AreaLayout map={() => <DiscoveryCPMap />}>
        <Content tag={tag} />
      </AreaLayout>
    </>
  )
}

const Content: FC<Props> = ({ tag }) => {
  const ref = useRef<HTMLDivElement>(null)

  const { loading, posts, error, feedId } = useInfinityScrollFeed(
    QUERY_GET_TAG_FEED,
    {
      variables: {
        tag,
      },
    },
    null,
  )

  useRestoreScroll(ref, 'tag-feed-scroll-top', !loading, /\/post\/.*/)

  const capitalizedTag =
    '#' + tag.replace(/^\w/, (character) => character.toUpperCase())

  const { data: detectRegionData } = useQuery(QUERY_DETECT_REGION, {
    ssr: false,
  })

  const withBackButton =
    typeof window !== 'undefined' && window.history.state.idx === 0
  const router = useRouter()
  const onBack = () => {
    const isNewPage = window.history.state.idx === 0

    if (isNewPage) {
      router.push(
        ROUTES.area.calcUrl({
          regionSlug: detectRegionData?.detectRegion?.slug ?? '',
        }),
      )
    } else {
      router.back()
    }
  }
  return (
    <Container ref={ref}>
      <LoadingState
        loading={loading}
        error={error?.message}
        loadingComponent={
          <Loader withGradient={true} color={'neptune'} size={'large'} />
        }
      >
        {posts?.length ? (
          <>
            <Shadow position={'top'} />
            <Wrapper>
              <Header>
                <Title>{capitalizedTag}</Title>
              </Header>
              <FeedPostsList
                posts={posts}
                feedId={feedId}
                withCreatePostButton
              />
            </Wrapper>
            <Shadow position={'bottom'} />
          </>
        ) : (
          <>
            <EmptyStateWrapper>
              <Header>
                {withBackButton && (
                  <BackButton
                    onClick={onBack}
                    data-test-id={'tag-empty-state-header:back-button'}
                  >
                    <ArrowIcon direction={'left'} />
                  </BackButton>
                )}
                <Title>{capitalizedTag}</Title>
              </Header>
              <MockWithAction
                image={<PlaceholderQuestion />}
                title={'Nothing was found for this tag'}
                description={'Share something interesting'}
                withCreatePostButton
              />
            </EmptyStateWrapper>
          </>
        )}
      </LoadingState>
    </Container>
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
const EmptyStateWrapper = styled.div`
  height: 100%;

  ${notMobileMedia} {
    padding: 1.6rem;

    display: flex;
    flex-direction: column;
  }
`
const Header = styled.div`
  margin: 0 0 1.6rem 0;

  display: flex;

  background-color: #fff;
  border-radius: 12px;

  ${mobileMedia} {
    padding: 1.6rem;
  }
  ${notMobileMedia} {
    background-color: transparent;
  }
`
const Title = styled.h1`
  margin: 0;

  font-size: 2.8rem;
  font-weight: 400;

  ${notMobileMedia} {
    font-size: 3.2rem;
  }
`
const BackButton = styled(NormalizedButton)`
  width: 4rem;
  height: 4rem;
  margin-right: 0.4rem;

  cursor: pointer;
`
