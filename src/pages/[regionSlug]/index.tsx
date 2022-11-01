import { Area } from '@/components/screens/Area'
import { withXRay } from '@/modules/analytics'
import { QUERY_GET_REGION_BY_SLUG } from '@/modules/map'
import { ListingsBboxContextProvider } from '@/modules/marketplace'

const AreaPage = () => {
  return (
    <ListingsBboxContextProvider>
      <Area />
    </ListingsBboxContextProvider>
  )
}

export const getServerSideProps = withXRay(async ({ ctx, xRay }) => {
  // @ts-ignore
  const apolloClient = ctx.req.apolloClient

  const regionSlug = ctx.query.regionSlug
  let notFound = false

  try {
    await xRay.captureAsyncFunc('get region by slug', async (subsegment) => {
      await apolloClient.query({
        query: QUERY_GET_REGION_BY_SLUG,
        variables: { slug: regionSlug },
      })
      subsegment?.close()
    })
  } catch {
    notFound = true
  }

  return {
    notFound,
    props: {},
  }
})

export default AreaPage
