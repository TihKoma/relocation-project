import React, { FC } from 'react'
import Head from 'next/head'

import { DEFAULT_OG_IMAGE } from '@/modules/router'

type Props = {
  address: string
  areaTitle: string
}
export const ListingsGroupMeta: FC<Props> = ({ address, areaTitle }) => {
  const title = `Homes by ${address} in ${areaTitle} on Nicity`
  const description = `Find available homes for sale and rent by ${address} in ${areaTitle} on Nicity`
  const keywords = `${address},Home,House,${areaTitle},near me,Property,Find,Agent,Apartments,Buy,Rent`

  return (
    <Head>
      <title>{title}</title>
      <meta name={'description'} content={description} />
      <meta property={'og:image'} content={DEFAULT_OG_IMAGE} />
      <meta name={'keywords'} content={keywords} />
    </Head>
  )
}
