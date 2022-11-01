import React, { FC, memo } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { DEFAULT_OG_IMAGE } from '@/modules/router'
import { TWITTER_IMAGE_URL } from '@/modules/seo'

type Props = {
  title: string
  description: string
}
export const ScreenMeta: FC<Props> = memo(({ title, description }) => {
  const router = useRouter()

  return (
    <Head>
      <title>{title}</title>
      <meta name={'description'} content={description} />
      <meta property={'twitter:card'} content={'summary_large_image'} />
      <meta property={'twitter:site'} content={'@nicity_official'} />
      <meta property={'twitter:description'} content={description} />
      <meta property={'twitter:image'} content={TWITTER_IMAGE_URL} />
      <meta property={'og:title'} content={title} />
      <meta property={'og:type'} content={'website'} />
      <meta property={'og:description'} content={description} />
      <meta property={'og:image'} content={DEFAULT_OG_IMAGE} />
      <meta property={'og:site_name'} content={'Nicity'} />
      <meta
        property={'url'}
        content={`${process.env.NEXT_PUBLIC_API_HOST}${router?.asPath}`}
      />
      <meta property={'og:locale'} content={'en_US'} />
    </Head>
  )
})
