import { VFC } from 'react'
import Head from 'next/head'

import { DEFAULT_OG_IMAGE } from '@/modules/router'

export const MyFeedMeta: VFC = () => {
  return (
    <Head>
      <title>Nicity feed - your favorites in one place</title>
      <meta
        name={'description'}
        content={
          'Nicity’s Community Hub serves as neighborhood social network, introducing you to your ideal neighborhood and your future neighbors. Discover what makes the area so special using the real-time community feed.'
        }
      />
      <meta property={'og:image'} content={DEFAULT_OG_IMAGE} />
      <meta
        name={'keywords'}
        content={
          'Nicity, explore, discover, chat, social network, community, real estate, resources, hot spot, hidden gem, neighborhood'
        }
      />
    </Head>
  )
}
