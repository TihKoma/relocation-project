import React, { FC } from 'react'
import Head from 'next/head'

import { DEFAULT_OG_IMAGE } from '@/modules/router'

type Props = {
  title: string
  description?: string
  keywords?: string
}

export const MetaTags: FC<Props> = ({ title, description, keywords }) => {
  return (
    <Head>
      <title>{title}</title>
      {description && <meta name={'description'} content={description} />}
      <meta property={'og:image'} content={DEFAULT_OG_IMAGE} />
      {keywords && <meta name={'keywords'} content={keywords} />}
    </Head>
  )
}
