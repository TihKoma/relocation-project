import { VFC } from 'react'
import Link from 'next/link'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'

import { useAnalytics } from '@/modules/analytics'
import { useIsMobileDevice } from '@/modules/device'
import {
  QUERY_GET_POPULAR_LISTINGS_BY_REGION,
  QUERY_GET_TOTAL_LISTINGS_BY_REGION,
} from '@/modules/marketplace'
import { ROUTES } from '@/modules/router'
import { formatPrice } from '@/modules/utils/formatPrice'
import { HOVER_TRANSITION_TIME } from '@/styles/const'
import { getColorTheme } from '@/styles/themes'

import { Card } from './shared/Card'

type Props = { regionSlug: string; regionId: string }
export const RealEstate: VFC<Props> = ({ regionSlug, regionId, ...props }) => {
  const analytics = useAnalytics()
  const { data: realEstateTotal } = useQuery(
    QUERY_GET_TOTAL_LISTINGS_BY_REGION,
    {
      variables: { regionId },
      skip: !regionId,
    },
  )
  const { data: { getPopularListingByRegion: realEstateObjects = [] } = {} } =
    useQuery(QUERY_GET_POPULAR_LISTINGS_BY_REGION, {
      variables: {
        limit: 4,
        regionId,
        offset: 0,
      },
      skip: !regionId,
    })
  const isMobile = useIsMobileDevice()
  const total = realEstateTotal?.getTotalListingsByRegion || 0
  if (total === 0 || realEstateObjects.length === 0 || isMobile) {
    return null
  }
  return (
    <Link href={ROUTES.areaRealEstate.calcUrl({ regionSlug })} passHref shallow>
      <Container
        {...props}
        onClick={() => {
          analytics.AreaPageRealEstateCountBanner()
        }}
      >
        <Header>
          <b>{total}</b> homes
        </Header>
        <RealEstateObjects>
          {realEstateObjects.map(({ id, media, listingInfo }) => {
            return (
              <RealEstateObject
                key={id}
                title={<>${formatPrice(listingInfo.price)}</>}
                description={
                  <>
                    {listingInfo.bedrooms > 0 && (
                      <>
                        <b>{listingInfo.bedrooms}</b> bed
                      </>
                    )}
                    {Boolean(listingInfo.livingAreaSquareFeet) && (
                      <>
                        {' '}
                        <b>{listingInfo.livingAreaSquareFeet}</b> sqft
                      </>
                    )}
                  </>
                }
                photoUrl={media?.[0]?.url}
              />
            )
          })}
        </RealEstateObjects>
      </Container>
    </Link>
  )
}

const Container = styled.a`
  padding: 1.2rem 0;

  display: block;

  border: 1px solid ${getColorTheme('sun50')};

  transition: ${HOVER_TRANSITION_TIME};

  background: ${getColorTheme('earth')};
  border-radius: 1.6rem;

  &:hover {
    border-color: transparent;
    box-shadow: 0 2px 4px rgba(18, 21, 31, 0.08),
      0 4px 16px 1px rgba(18, 21, 31, 0.08);
  }
`
const Header = styled.div`
  padding: 0 1.6rem;
  margin-bottom: 1.2rem;

  font-weight: 500;
  font-size: 1.8rem;
  line-height: 2.4rem;
  letter-spacing: -0.04em;
  color: ${getColorTheme('sun1000')};

  b {
    font-weight: 500;
    font-size: 2.4rem;
    line-height: 2.8rem;
  }
`
const RealEstateObjects = styled.div`
  padding: 0 1.6rem;

  display: flex;

  overflow-x: auto;
`
const RealEstateObject = styled(Card)`
  &:not(:last-child) {
    margin-right: 1.6rem;
  }
`
