import { VFC } from 'react'
import Head from 'next/head'

import { DEFAULT_OG_IMAGE } from '@/modules/router'

type Props = {
  query: string
}
export const SearchMeta: VFC<Props> = ({ query }) => {
  return (
    <Head>
      <title>Nicity - {query}</title>
      <meta name={'description'} content={`${query} on Nicity`} />
      <meta property={'og:image'} content={DEFAULT_OG_IMAGE} />
      <meta
        name={'keywords'}
        content={`${query}, Nicity, relocation, relocation tips, real estate professionals, relocation experts, feedback from neighbors, real estate, relocation community`}
      />
    </Head>
  )
}
