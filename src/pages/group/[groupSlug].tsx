import React from 'react'
import { useRouter } from 'next/router'

import { Group } from '@/components/screens/Group'
import { withXRay } from '@/modules/analytics'
import { QUERY_SEARCH_GROUPS } from '@/modules/group'
import { ROUTES } from '@/modules/router'

import { ServerData } from '../_app'

const InterestGroupPage: React.FC<ServerData> = () => {
  const router = useRouter()

  const groupSlug =
    typeof router.query.groupSlug === 'string' ? router.query.groupSlug : ''

  return <Group groupSlug={groupSlug} />
}

export const getServerSideProps = withXRay(async ({ ctx, xRay }) => {
  // @ts-ignore
  const apolloClient = ctx.req.apolloClient

  const { groupSlug: slug } = ctx.query

  let data, groupSlug
  try {
    await xRay.captureAsyncFunc('search groups', async (subsegment) => {
      data = await apolloClient.query({
        query: QUERY_SEARCH_GROUPS,
        variables: {
          input: { slug },
        },
      })
      if (!data.data.searchGroups.groups.length) {
        throw new Error('not found')
      }

      groupSlug = data.data.searchGroups.groups[0].slug
      subsegment?.close()
    })
  } catch {
    return {
      notFound: true,
      props: {},
    }
  }

  if (slug === groupSlug || !groupSlug) {
    return {
      props: {},
    }
  }

  return {
    redirect: {
      destination: encodeURI(ROUTES.group.calcUrl({ groupSlug })),
      permanent: false,
    },
  }
})

export default InterestGroupPage
