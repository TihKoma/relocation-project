import { FC } from 'react'
import Link from 'next/link'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'
import { Carousel as CarouselBase } from 'react-responsive-carousel'

import { ListingItem } from '@/components/shared/ListingItem'
import { Button } from '@/components/ui-kit/Button'
import { useAnalytics } from '@/modules/analytics'
import { useIsNotMobileDevice } from '@/modules/device'
import { mapServiceLocator } from '@/modules/map'
import { QUERY_GET_POPULAR_LISTINGS_BY_REGION } from '@/modules/marketplace'
import { ROUTES } from '@/modules/router'
import { mobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

type Props = {
  regionSlug: string
  regionId: string
}
export const RealEstateFeed: FC<Props> = ({ regionSlug, regionId }) => {
  const analytics = useAnalytics()
  const isNotMobile = useIsNotMobileDevice()
  const { data: { getPopularListingByRegion: realEstateObjects = [] } = {} } =
    useQuery(QUERY_GET_POPULAR_LISTINGS_BY_REGION, {
      variables: {
        limit: 4,
        offset: 0,
        regionId,
      },
      skip: !regionId,
    })
  if (realEstateObjects.length === 0) {
    return null
  }
  const realStateObjectsRendered = realEstateObjects.map((realStateObject) => (
    <ListingItem
      key={realStateObject.id}
      {...realStateObject}
      onFavoriteButtonClick={(newValue) => {
        mapServiceLocator.getAreaMapAsync().then((mapFacade) => {
          if (newValue) {
            mapFacade.addToFavoriteMarker(realStateObject.id)
          } else {
            mapFacade.removeFromFavoriteMarker(realStateObject.id)
          }
        })
      }}
    />
  ))
  return (
    <Container>
      <Title>Explore available real estate</Title>
      {isNotMobile ? (
        <RealStateObjectsDesktop>
          {realStateObjectsRendered}
        </RealStateObjectsDesktop>
      ) : (
        <CarouselMobile centerMode centerSlidePercentage={90}>
          {realStateObjectsRendered}
        </CarouselMobile>
      )}
      <Link
        href={ROUTES.areaRealEstate.calcUrl({ regionSlug })}
        passHref
        shallow
      >
        <Button
          fullWidth={!isNotMobile}
          onClick={() => {
            analytics.AreaPageFeedListingPreviewShowMoreClick()
          }}
          size={'medium'}
          viewType={'primary'}
        >
          See more options
        </Button>
      </Link>
    </Container>
  )
}
const Container = styled.div`
  padding: 1.6rem;
  margin-bottom: 1.6rem;

  background: ${getColorTheme('sun50')};
  border-radius: 2.4rem;
`
const Title = styled.div`
  margin-bottom: 1.6rem;

  font-weight: 500;
  font-size: 2.4rem;
  line-height: 2.8rem;
  letter-spacing: -0.04em;
  color: ${getColorTheme('sun1000')};

  ${mobileMedia} {
    font-size: 2rem;
    line-height: 2.4rem;
  }
`
const RealStateObjectsDesktop = styled.div`
  margin-bottom: 2.4rem;

  display: grid;
  gap: 1.6rem;

  list-style: none;
`
const CarouselMobile = styled(CarouselBase)`
  margin: 0 -1.6rem 2.4rem;

  .slide {
    padding: 0 0.6rem;
  }
  .thumbs-wrapper {
    display: none;
  }
  .control-dots {
    display: none;
  }
  .carousel-status {
    display: none;
  }
  .control-arrow {
    display: none;
  }
`
