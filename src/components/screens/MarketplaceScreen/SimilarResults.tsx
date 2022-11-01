import { FC } from 'react'
import Link from 'next/link'
import styled from '@emotion/styled'

import { ListingItem } from '@/components/shared/ListingItem'
import { Button as ButtonBase } from '@/components/ui-kit/Button'
import { mapServiceLocator } from '@/modules/map'
import { usePropertyFilter } from '@/modules/marketplace'
import { GetFilteredListingsV2_getFilteredListingsV2_similar } from '@/modules/marketplace/graphql/__generated__/GetFilteredListingsV2'
import { mapFiltersToQuery } from '@/modules/marketplace/utils'
import { ROUTES } from '@/modules/router'
import { mobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

type Props = {
  similar: GetFilteredListingsV2_getFilteredListingsV2_similar
  quizId?: string
}

export const SimilarResults: FC<Props> = ({ similar, quizId }) => {
  const items = similar.listings

  const { filter } = usePropertyFilter()
  const filtersQuery = `?${mapFiltersToQuery(filter)}`

  const highlightItem = (id: string) => {
    mapServiceLocator.getDiscoveryMPMapAsync().then((mapFacade) => {
      mapFacade.highlightMarkerById(id)
    })
  }

  const resetHighlightItem = (id: string) => {
    mapServiceLocator.getDiscoveryMPMapAsync().then((mapFacade) => {
      mapFacade.resetHighlightMarkerById(id)
    })
  }

  return (
    <Similar>
      <Title>Explore homes in the nearest area</Title>
      <SubTitle> {similar.regionName} </SubTitle>

      <List>
        {items?.map((item) => (
          <ListingItem
            key={item?.id}
            onHover={highlightItem}
            onLeave={resetHighlightItem}
            quizId={quizId}
            {...item}
            onFavoriteButtonClick={(newValue) => {
              mapServiceLocator.getDiscoveryMPMapAsync().then((mapFacade) => {
                if (newValue) {
                  mapFacade.addToFavoriteMarker(item.id)
                } else {
                  mapFacade.removeFromFavoriteMarker(item.id)
                }
              })
            }}
          />
        ))}
      </List>

      <Link
        href={ROUTES.areaRealEstate.calcUrl({
          regionSlug: similar.regionSlug,
          filters: filtersQuery,
        })}
      >
        <SeeMoreButton size={'medium'} viewType={'primary'}>
          See more options
        </SeeMoreButton>
      </Link>
    </Similar>
  )
}

const Similar = styled.div`
  width: 100%;
  padding: 1.6rem;

  border-radius: 16px 16px 0 0;

  ${mobileMedia} {
    background-color: ${getColorTheme('backgroundDefaultSecondary')};
  }
`
const List = styled.ul`
  display: grid;
  grid-row-gap: 1.6rem;

  margin: 0 0 1.6rem 0;
  padding: 0;

  list-style: none;
`
const Title = styled.div`
  margin-bottom: 0.8rem;

  font-size: 2.2rem;
  line-height: 2.8rem;
  font-weight: 500;
  color: ${getColorTheme('sun1000')};

  ${mobileMedia} {
    font-size: 2rem;
  }
`
const SubTitle = styled.div`
  margin-bottom: 1.6rem;

  font-size: 1.6rem;
  line-height: 2rem;
  color: ${getColorTheme('textDefaultSecondary')};

  ${mobileMedia} {
    margin-bottom: 1.6rem;
  }
`
const SeeMoreButton = styled(ButtonBase)`
  width: 20.6rem;
  margin-bottom: 2.1rem;

  ${mobileMedia} {
    width: 100%;
  }
`
