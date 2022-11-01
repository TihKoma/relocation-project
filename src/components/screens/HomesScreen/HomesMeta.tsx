import React, { FC } from 'react'
import Head from 'next/head'

import {
  DEFAULT_OG_IMAGE,
  DEFAULT_PAGE_DESCRIPTION,
  DEFAULT_PAGE_TITLE,
} from '@/modules/router'

type Props = {}
export const HomesMeta: FC<Props> = () => {
  return (
    <Head>
      <title>{DEFAULT_PAGE_TITLE}</title>
      <meta name={'description'} content={DEFAULT_PAGE_DESCRIPTION} />
      <meta property={'og:image'} content={DEFAULT_OG_IMAGE} />
    </Head>
  )
}
