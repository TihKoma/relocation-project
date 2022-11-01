import React, { FC } from 'react'
import Head from 'next/head'

import { DEFAULT_OG_IMAGE } from '@/modules/router'
import { formatNeighborhoodFullName } from '@/modules/utils/format-neighborhood-full-name'

type Props = {
  groupName: string
  regionName: string
  regionSubtitle: string
}
export const GroupMeta: FC<Props> = ({
  groupName,
  regionName,
  regionSubtitle,
}) => {
  const fullRegionName = formatNeighborhoodFullName(regionName, regionSubtitle)
  return (
    <Head>
      <title>
        {groupName} {fullRegionName} on Nicity
      </title>
      <meta
        name={'description'}
        content={`Join ${groupName} on Nicity in ${fullRegionName}`}
      />
      <meta property={'og:image'} content={DEFAULT_OG_IMAGE} />
      <meta
        name={'keywords'}
        content={`Nicity, relocation to ${fullRegionName}, move to ${fullRegionName}, apartments in ${fullRegionName}, real estate professionals in ${fullRegionName}, agents and brokers in ${fullRegionName}, ${fullRegionName} neighbors, real estate in ${fullRegionName}, ${fullRegionName} community., ${fullRegionName} relocation tips, ${fullRegionName} real estate professionals, ${fullRegionName} relocation experts, feedback from ${fullRegionName} neighbors, ${fullRegionName} real estate.`}
      />
    </Head>
  )
}
