import React from 'react'
import { GetServerSideProps } from 'next'
import { ApolloError } from '@apollo/client'

import { LaunchRelocation as LaunchRelocationScreen } from '@/components/screens/LaunchRelocation'
import { QUERY_RELOCATION_PROJECT } from '@/modules/relocation-project'
import { ROUTES } from '@/modules/router'

import { ServerData } from './_app'

const LaunchRelocation: React.FC<ServerData> = () => {
  return <LaunchRelocationScreen />
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // @ts-ignore
  const apolloClient = ctx.req.apolloClient

  try {
    const { data } = await apolloClient.query({
      query: QUERY_RELOCATION_PROJECT,
    })
    if (
      data?.relocationProject?.whereFromRegionId &&
      data?.relocationProject?.whereToRegionId
    ) {
      return {
        redirect: {
          destination: ROUTES.dashboard.calcUrl(),
          permanent: false,
        },
      }
    }
    return {
      props: {},
    }
  } catch (err) {
    if (err instanceof ApolloError && err.message === 'unauthorized') {
      return {
        redirect: {
          destination: ROUTES.login.calcUrl({
            to: 'launch-relocation',
          }),
          permanent: false,
        },
      }
    }
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}

export default LaunchRelocation
