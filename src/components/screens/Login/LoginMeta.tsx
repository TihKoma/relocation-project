import React, { VFC } from 'react'
import Head from 'next/head'

import { DEFAULT_OG_IMAGE } from '@/modules/router'

export const LoginMeta: VFC = () => {
  return (
    <Head>
      <title>
        Nicity Login - Relocation Tools, Resources, and Recommendations
      </title>
      <meta
        name={'description'}
        content={
          'Connecting people and neighborhoods with data-driven technology. Log in to learn where your next Nice City is. Join in the conversation, share your experiences, or find reliable tools and resources...all in one place. Now that...is nice!'
        }
      />
      <meta property={'og:image'} content={DEFAULT_OG_IMAGE} />
      <meta
        name={'keywords'}
        content={
          'Nicity, relocation, relocation tips, real estate professionals, relocation experts, feedback from neighbors, real estate, relocation community'
        }
      />
    </Head>
  )
}
