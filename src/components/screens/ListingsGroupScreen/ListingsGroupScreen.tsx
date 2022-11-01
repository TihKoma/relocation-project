import { FC, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'

import { AreaLayout } from '@/components/shared/AreaLayout'
import { DiscoveryMPMap } from '@/components/shared/maps/DiscoveryMPMap'
import { useIsMobileDevice } from '@/modules/device'
import { mapServiceLocator, QUERY_GET_REGION_BY_SLUG } from '@/modules/map'
import { QUERY_GET_FILTERED_LISTINGS } from '@/modules/marketplace'
import { ROUTES } from '@/modules/router'
import { notMobileMedia } from '@/styles/media'

import {
  ListingBathrooms,
  ListingBedrooms,
  ListingTransactionType,
} from '../../../../__generated__/globalTypes'
import { ListingsGroupMeta } from './ListingsGroupMeta'
import { ListingsList as ListingsListBase } from './ListingsList'

type Props = {
  addressSlug: string
  areaSlug: string
}
export const ListingsGroupScreen: FC<Props> = ({ areaSlug, addressSlug }) => {
  const router = useRouter()
  const { address, point } = useAddress(addressSlug)
  const isMobile = useIsMobileDevice()

  useEffect(() => {
    if (point) {
      mapServiceLocator.getDiscoveryMPMapAsync().then((mapFacade) => {
        mapFacade.flyTo([point.long, point.lat], 16)
        mapFacade.highlightMarkerById(addressSlug)
      })
    }
  }, [addressSlug, point])

  const onBack = () => {
    const isNewPage = window.history.state.idx === 0

    if (isNewPage) {
      router.push(
        ROUTES.areaRealEstate.calcUrl({
          regionSlug: areaSlug,
        }),
      )
    } else {
      router.back()
    }
  }

  return (
    <>
      <ListingsGroupMeta areaTitle={''} address={address} />
      <InvisibleHeader>Homes by {address}</InvisibleHeader>
      <AreaLayout
        map={() => <DiscoveryMPMap />}
        subHeaderTitle={address}
        onRequestBack={onBack}
        withSubNavigation={false}
        theme={isMobile ? 'light' : 'dark'}
      >
        <ListingsList addressSlug={addressSlug} />
      </AreaLayout>
    </>
  )
}

const ListingsList = styled(ListingsListBase)`
  ${notMobileMedia} {
    padding-top: 1.6rem;
    padding-bottom: 1.6rem;
  }
`
const InvisibleHeader = styled.h1`
  opacity: 0;
  margin: 0;
  padding: 0;
  height: 0;
  width: 0;
`

const useAddress = (addressSlug: string) => {
  const router = useRouter()
  const { data: { getRegionBySlug: region } = {}, loading: regionLoading } =
    useQuery(QUERY_GET_REGION_BY_SLUG, {
      variables: { slug: router.query.regionSlug as string },
      ssr: true,
    })

  const { data: listings, loading: isLoadingAddress } = useQuery(
    QUERY_GET_FILTERED_LISTINGS,
    {
      skip: regionLoading,
      ssr: true,
      fetchPolicy: 'no-cache',
      variables: {
        filter: {
          transactionType: ListingTransactionType.FOR_SALE,
          bedrooms: ListingBedrooms.ROOMS_ANY,
          bathrooms: ListingBathrooms.ROOMS_ANY,
          addressSlug,
        },
        regionId: region?.id as string,
        limit: 1,
        position: 0,
      },
    },
  )

  let address = ''
  let point = null

  if (listings?.getFilteredListings?.length) {
    address = listings?.getFilteredListings?.[0].listingInfo.address || ''
    point = listings?.getFilteredListings?.[0].point || null
  }

  return {
    address,
    point,
    isLoadingAddress,
  }
}
