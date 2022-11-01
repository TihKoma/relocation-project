import { FC } from 'react'
import { useRouter } from 'next/router'

import { Discovery } from '@/components/screens/Discovery'
import { withXRay } from '@/modules/analytics'
import { QUERY_GET_REGION_BY_SLUG } from '@/modules/map'
import { ROUTES } from '@/modules/router'

import { ServerData } from '../_app'

// TODO add route by regionId - now it's for demo
const DiscoveryScreen: FC<ServerData> = () => {
  const router = useRouter()

  const regionSlug =
    typeof router.query.regionSlug === 'string' ? router.query.regionSlug : ''

  return <Discovery regionSlug={regionSlug} isAskingQuestion={true} />
}

export const getServerSideProps = withXRay(async ({ ctx, xRay }) => {
  // @ts-ignore
  const apolloClient = ctx.req.apolloClient

  const regionSlug = ctx.query.regionSlug
  let notFound = false

  const askQuestion = ctx.query.askQuestion
  if (askQuestion !== 'true') {
    return {
      redirect: {
        destination: encodeURI(
          ROUTES.area.calcUrl({ regionSlug: regionSlug as string }),
        ),
        permanent: false,
      },
    }
  }

  try {
    await xRay.captureAsyncFunc('get region', async (subsegment) => {
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

export default DiscoveryScreen
