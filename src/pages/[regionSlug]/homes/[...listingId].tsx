import { FC, useEffect } from 'react'
import { GetServerSideProps } from 'next'

import { DetailedListingScreen } from '@/components/screens/DetailedListingScreen'
import { useAnalytics } from '@/modules/analytics'
import { QUERY_GET_DETAILED_LISTING } from '@/modules/listing'

import { ServerData } from '../../_app'

const DetailedListingPage: FC<ServerData> = () => {
  const analytics = useAnalytics()

  useEffect(() => {
    analytics.MPDetailedListingOpened()
  }, [analytics])

  return <DetailedListingScreen />
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // @ts-ignore
  const apolloClient = ctx.req.apolloClient

  const listingId = ctx.query.listingId?.[
    ctx.query?.listingId.length - 1
  ] as string

  let notFound = false

  try {
    await apolloClient.query({
      query: QUERY_GET_DETAILED_LISTING,
      variables: { id: listingId },
    })
  } catch {
    notFound = true
  }

  return {
    notFound,
    props: {},
  }
}

export default DetailedListingPage
