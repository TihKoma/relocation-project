import { FC } from 'react'
import { useRouter } from 'next/router'

import { ProfileScreen } from '@/components/screens/ProfileScreen'
import { withXRay } from '@/modules/analytics'
import { QUERY_GET_PUBLIC_PROFILE } from '@/modules/profile'

import { ServerData } from '../_app'

const ProfilePage: FC<ServerData> = () => {
  const router = useRouter()

  const userName =
    typeof router.query.userName === 'string' ? router.query.userName : ''

  return <ProfileScreen userName={userName} />
}

export const getServerSideProps = withXRay(async ({ ctx, xRay }) => {
  // @ts-ignore
  const apolloClient = ctx.req.apolloClient

  const userName = ctx.query.userName
  let notFound = false

  try {
    await xRay.captureAsyncFunc('get public profile', async (subsegment) => {
      await apolloClient.query({
        query: QUERY_GET_PUBLIC_PROFILE,
        variables: { userName },
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

export default ProfilePage
