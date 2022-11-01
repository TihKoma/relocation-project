import { FC } from 'react'
import Link from 'next/link'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'
import { Carousel as CarouselBase } from 'react-responsive-carousel'

import { ListingItem as ListingItemBase } from '@/components/shared/ListingItem'
import { Button } from '@/components/ui-kit/Button'
import { useIsMobileDevice } from '@/modules/device'
import { mapServiceLocator } from '@/modules/map'
import {
  QUERY_GET_POPULAR_LISTINGS_BY_QUIZ,
  useSearchFiltersByQuizId,
} from '@/modules/marketplace'
import { ROUTES } from '@/modules/router'
import { mobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

type Props = {
  regionSlug: string
  regionId: string
  quizId?: string
}
export const RealEstateFeed: FC<Props> = ({ regionSlug, regionId, quizId }) => {
  const isMobile = useIsMobileDevice()
  const { data: { getPopularListingsByQuiz: realEstateObjects = [] } = {} } =
    useQuery(QUERY_GET_POPULAR_LISTINGS_BY_QUIZ, {
      variables: {
        quizId: quizId || '',
        limit: 4,
        regionId,
        offset: 0,
      },
      skip: !regionId || !quizId,
    })
  const filters = useSearchFiltersByQuizId()
  if (realEstateObjects.length === 0) {
    return null
  }
  const realStateObjectsRendered = realEstateObjects.map((realStateObject) => (
    <ListingItem
      key={realStateObject.id}
      quizId={quizId}
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
      {isMobile ? (
        <CarouselMobile centerMode centerSlidePercentage={90}>
          {realStateObjectsRendered}
        </CarouselMobile>
      ) : (
        <RealStateObjectsDesktop>
          {realStateObjectsRendered}
        </RealStateObjectsDesktop>
      )}
      <Link
        href={ROUTES.areaRealEstate.calcUrl({ regionSlug, filters })}
        passHref
        shallow
      >
        <Button
          viewType={'primary'}
          size={'medium'}
          as={'a'}
          fullWidth={isMobile}
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
const ListingItem = styled(ListingItemBase)``

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
