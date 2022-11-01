import { GetServerSideProps } from 'next'
import { ApolloError } from '@apollo/client'

import { DashboardScreen } from '@/components/screens/DashboardScreen'
import { QUERY_RELOCATION_PROJECT } from '@/modules/relocation-project'
import { ROUTES } from '@/modules/router'

const DashboardPage = () => {
  return <DashboardScreen />
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // @ts-ignore
  const apolloClient = ctx.req.apolloClient

  try {
    const { data } = await apolloClient.query({
      query: QUERY_RELOCATION_PROJECT,
    })
    if (
      !data?.relocationProject?.whereFromRegionId ||
      !data?.relocationProject?.whereToRegionId
    ) {
      return {
        redirect: {
          destination: ROUTES.launchRelocation.calcUrl({}),
          permanent: false,
        },
      }
    }
  } catch (err) {
    console.error(err)
    if (err instanceof ApolloError && err.message === 'unauthorized') {
      return {
        redirect: {
          destination: ROUTES.login.calcUrl({
            to: 'dashboard',
          }),
          permanent: false,
        },
      }
    }
  }

  return {
    props: {},
  }
}

export default DashboardPage
