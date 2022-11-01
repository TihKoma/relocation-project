import React from 'react'

import { withXRay } from '@/modules/analytics'
import { QUERY_GET_DETAILED_LISTING } from '@/modules/listing'
import { ROUTES } from '@/modules/router'

import { ServerData } from '../_app'

const ListingIdPage: React.FC<ServerData> = () => {
  return <div />
}

export const getServerSideProps = withXRay(async ({ ctx }) => {
  // @ts-ignore
  const apolloClient = ctx.req.apolloClient

  const listingId = ctx.query.listingId
  let notFound = false

  try {
    const { data } = await apolloClient.query({
      query: QUERY_GET_DETAILED_LISTING,
      variables: { id: listingId },
    })

    return {
      redirect: {
        destination: ROUTES.detailedListing.calcUrl({
          listingId: listingId as string,
          areaSlug: data?.getDetailedListing?.slug || '',
        }),
        permanent: true,
      },
    }
  } catch {
    notFound = true
  }

  return {
    notFound,
    props: {},
  }
})

export default ListingIdPage
