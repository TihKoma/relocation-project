import { FC } from 'react'

import { SavedSearchesScreen } from '@/components/screens/SavedSearchesScreen'
import { withXRay } from '@/modules/analytics'
import { QUERY_SAVED_LISTINGS_SEARCHES } from '@/modules/listing/graphql/queries'

import { ServerData } from '../_app'

const SavedSearchesPage: FC<ServerData> = () => {
  return <SavedSearchesScreen />
}

export const getServerSideProps = withXRay(async ({ ctx, xRay }) => {
  // @ts-ignore
  const apolloClient = ctx.req.apolloClient

  let notFound = false

  try {
    await xRay.captureAsyncFunc(
      'get saved listings searches',
      async (subsegment) => {
        await apolloClient.query({
          query: QUERY_SAVED_LISTINGS_SEARCHES,
          variables: { limit: 10, offset: 0 },
        })

        subsegment?.close()
      },
    )
  } catch {
    notFound = true
  }

  return {
    notFound,
    props: {},
  }
})

export default SavedSearchesPage
