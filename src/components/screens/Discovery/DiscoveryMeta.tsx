import React, { VFC } from 'react'
import Head from 'next/head'

import { DEFAULT_OG_IMAGE } from '@/modules/router'
import { formatNeighborhoodFullName } from '@/modules/utils/format-neighborhood-full-name'

type Props = {
  name: string
  subtitle: string
}
export const DiscoveryMeta: VFC<Props> = ({ name, subtitle }) => {
  const fullName = formatNeighborhoodFullName(name, subtitle)
  return (
    <Head>
      <title>Nicity - Discover {name} on Nicity</title>
      <meta
        name={'description'}
        content={`Find out what all the buzz is about in ${fullName}. Whether you need relocation tips, just moved in ${fullName}, or want to stay updated about ${fullName} happenings, Nicity's customized Community Hub will help you discover what's going on in ${fullName}, from local hidden gems to neighborhood dog parks.`}
      />
      <meta property={'og:image'} content={DEFAULT_OG_IMAGE} />
      <meta
        name={'keywords'}
        content={`Nicity, relocation to ${fullName}, move to ${fullName}, apartments in ${fullName}, real estate professionals in ${fullName}, agents and brokers in ${fullName}, ${fullName} neighbors, real estate in ${fullName}, ${fullName} community., ${fullName} relocation tips, ${fullName} real estate professionals, ${fullName} relocation experts, feedback from ${fullName} neighbors, ${fullName} real estate.`}
      />
    </Head>
  )
}
