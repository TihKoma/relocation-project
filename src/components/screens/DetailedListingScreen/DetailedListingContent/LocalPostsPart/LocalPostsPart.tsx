import { forwardRef } from 'react'
import Link from 'next/link'
import { PointInput } from '__generated__/globalTypes'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'

import { LoadingState } from '@/components/shared/LoadingState'
import { useAnalytics } from '@/modules/analytics'
import { QUERY_GET_RADIUS_FEED } from '@/modules/listing'
import { ROUTES } from '@/modules/router'
import { getColorTheme } from '@/styles/themes'

import { PartContainer } from '../PartContainer'
import { PartTitle } from '../PartTitle'
import { PostsSlider } from './PostsSlider'

type Props = {
  point: PointInput
  regionId: string
  regionSlug: string
  radius?: number
}

export const LocalPostsPart = forwardRef<HTMLDivElement, Props>(
  (
    {
      point,
      regionId,
      regionSlug,
      radius = 1, // to get 5 top posts
    },
    ref,
  ) => {
    const analytics = useAnalytics()
    const { data: { getRadiusFeed } = {}, loading } = useQuery(
      QUERY_GET_RADIUS_FEED,
      {
        variables: {
          point,
          radius,
          regionId,
          limit: 5,
        },
      },
    )
    const sliderPosts = getRadiusFeed?.posts

    return (
      <>
        {sliderPosts && sliderPosts.length > 0 && (
          <PartContainer ref={ref}>
            <PartTitle
              title={'What Locals Say'}
              link={{
                href: ROUTES.areaFeed.calcUrl({
                  regionSlug,
                }),
                text: 'Show feed',
              }}
              onClick={() => {
                analytics.MPDetailedListingLocalsFeedShown()
              }}
            />
            <LoadingState loading={loading}>
              <PostsSlider
                posts={sliderPosts}
                metaSlide={
                  <Link
                    href={ROUTES.area.calcUrl({
                      regionSlug,
                    })}
                    passHref
                  >
                    <MetaSlide>Show feed</MetaSlide>
                  </Link>
                }
              />
            </LoadingState>
          </PartContainer>
        )}
      </>
    )
  },
)

const MetaSlide = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100%;

  padding: 1.6rem;

  background-color: ${getColorTheme('earth')};
  border-radius: 1.2rem;
  color: ${getColorTheme('neptune')};
  line-height: 2.4rem;
  cursor: pointer;

  &:hover {
    color: ${getColorTheme('pluto')};
  }
`
