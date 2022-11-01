import React, { memo, VFC } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { PostItem } from '@/modules/feed'
import { DEFAULT_OG_IMAGE } from '@/modules/router'
import { TWITTER_IMAGE_URL } from '@/modules/seo'
import { formatNeighborhoodFullName } from '@/modules/utils/format-neighborhood-full-name'

type Props = {
  item: PostItem
}

const shortenText = (text: string, length: number) => {
  if (text.length > length) {
    return text.slice(0, length) + '...'
  }
  return text
}

const getWordsArray = (text: string) => {
  return text
    .replace(/\W/g, ' ')
    .trim()
    .split(' ')
    .filter((data) => data)
}

export const PostMeta: VFC<Props> = memo(({ item }) => {
  const router = useRouter()
  const sentencesRegexp = /\(?[^\.\?\!]+[\.!\?]*\)?/g
  const sentences = item.post.content.match(sentencesRegexp) ?? []
  const postImage = item.post.media
    ?.filter((item) => item.type === 'IMAGE')?.[0]
    ?.url.replace('1000x1000', '500x500')

  const ogDescription = sentences.slice(0, 2).join(' ')

  const name = `${item.user.firstName} ${item.user.lastName}`
  const neighborhoodFullName = formatNeighborhoodFullName(
    item.region.name,
    item.region.subtitle,
  )
  const title = shortenText(
    `${name} on Nicity in ${item.region.name}: ${item.post.content}`,
    150,
  )
  const description = shortenText(
    `${name} on Nicity in ${neighborhoodFullName}: ${item.post.content}`,
    150,
  )
  const keywords = `${name}, Nicity, ${neighborhoodFullName}, ${getWordsArray(
    item.post.content,
  )
    .slice(0, 20)
    .join(', ')}`

  return (
    <Head>
      <title>{title}</title>
      {description && <meta name={'description'} content={description} />}
      <meta property={'twitter:card'} content={'summary_large_image'} />
      <meta property={'twitter:site'} content={'@nicity_official'} />
      <meta property={'twitter:description'} content={ogDescription} />
      <meta
        property={'twitter:image'}
        content={postImage ?? TWITTER_IMAGE_URL}
      />
      <meta property={'og:title'} content={sentences[0]} />
      <meta property={'og:type'} content={'article'} />
      <meta property={'article:published_time'} content={item.post.createdAt} />
      <meta property={'og:description'} content={ogDescription} />
      <meta property={'og:image'} content={postImage || DEFAULT_OG_IMAGE} />
      <meta property={'og:site_name'} content={'Nicity'} />
      <meta
        property={'url'}
        content={`${process.env.NEXT_PUBLIC_API_HOST}${router?.asPath}`}
      />
      <meta property={'og:locale'} content={'en_US'} />
      <meta name={'keywords'} content={keywords} />
    </Head>
  )
})
