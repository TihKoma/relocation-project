import { VFC } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { Region } from '@/modules/map'
import { DEFAULT_OG_IMAGE } from '@/modules/router'
import { API_HOST } from '@/modules/utils/config'

type Props = {
  region: Region
}
export const OpenGraphMetaTags: VFC<Props> = ({ region }) => {
  const firstMedia = region.media[0]
  let image = DEFAULT_OG_IMAGE
  if (firstMedia?.type === 'IMAGE') {
    image = firstMedia.src
  }

  const router = useRouter()

  return (
    <Head>
      <meta property={'og:title'} content={region.name} />
      <meta property={'og:type'} content={'place'} />
      <meta property={'og:image'} content={image} />
      <meta property={'og:url'} content={`${API_HOST}${router.asPath}`} />
      {region.description && (
        <meta property={'og:description'} content={region.description} />
      )}
      <meta property={'og:site_name'} content={'Nicity'} />
      <meta property={'og:locale'} content={'en_US'} />
    </Head>
  )
}
