import React from 'react'
import { GetServerSideProps } from 'next'

import { QUERY_RELOCATION_PROJECT } from '@/modules/relocation-project'
import { ROUTES } from '@/modules/router'

import { ServerData } from './_app'

const RedirectPage: React.FC<ServerData> = () => {
  return <div />
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // @ts-ignore
  const apolloClient = ctx.req.apolloClient
  try {
    const { data } = await apolloClient.query({
      query: QUERY_RELOCATION_PROJECT,
    })
    if (data?.relocationProject) {
      return {
        redirect: {
          destination: ROUTES.dashboard.calcUrl(),
          permanent: false,
        },
      }
    }
  } catch (error) {
    console.error(error)
  }
  return {
    redirect: {
      destination: ROUTES.relocationMarketplace.calcUrl({}),
      permanent: false,
    },
  }
}

export default RedirectPage
