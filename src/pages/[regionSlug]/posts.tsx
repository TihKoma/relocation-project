import React, { FC, memo, useRef, VFC } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'

import { AreaLayout } from '@/components/shared/AreaLayout'
import { Post } from '@/components/shared/feed/Post'
import { LoadingState } from '@/components/shared/LoadingState'
import { DiscoveryCPMap } from '@/components/shared/maps/DiscoveryCPMap'
import { MockWithAction } from '@/components/shared/MockWithAction'
import {
  CreatePostFromFeedButton,
  useDataForCreatePostContext,
} from '@/components/shared/PostForm'
import { Loader } from '@/components/ui-kit/Loader'
import { PlaceholderQuestion } from '@/images'
import {
  FeedItem,
  QUERY_GET_REGION_FEED,
  useInfinityScrollFeed,
} from '@/modules/feed'
import { QUERY_GET_REGION_BY_SLUG, Region } from '@/modules/map'
import { DEFAULT_OG_IMAGE } from '@/modules/router'
import { generateTexByTemplate } from '@/modules/seo'
import { API_HOST } from '@/modules/utils/config'
import { formatNeighborhoodFullName } from '@/modules/utils/format-neighborhood-full-name'

const PostsPage = () => {
  const router = useRouter()
  const regionSlug = router.query.regionSlug as string
  const { data: { getRegionBySlug: region } = {} } = useQuery(
    QUERY_GET_REGION_BY_SLUG,
    {
      variables: { slug: regionSlug },
      ssr: true,
    },
  )

  return (
    <>
      {region && <SeoMetaTags region={region} />}
      <AreaLayout
        map={() => <DiscoveryCPMap regionSlug={regionSlug} />}
        onRequestBack={() => router.back()}
        theme={'dark'}
        subHeaderTitle={'Posts'}
      >
        {region && <Posts regionId={region.id} regionName={region.name} />}
      </AreaLayout>
    </>
  )
}

type PropsPosts = { regionId: string; regionName: string }
const Posts: FC<PropsPosts> = ({ regionId, regionName }) => {
  const ref = useRef<HTMLDivElement>(null)
  const { posts, feedId, loading, error } = useInfinityScrollFeed(
    QUERY_GET_REGION_FEED,
    {
      ssr: true,
      variables: {
        regionId,
      },
    },
    ref?.current,
  )

  useDataForCreatePostContext(feedId, {
    id: regionId,
    name: regionName,
  })

  return (
    <LoadingState
      error={error?.message}
      loading={loading}
      loadingComponent={<Loader withGradient size={'large'} />}
    >
      {posts.length ? (
        <Container>
          <CreatePostFromFeedButton />
          {(posts as FeedItem[]).map((feedItem, index) => (
            <Post
              key={feedItem.post.id}
              item={feedItem}
              feedId={feedId}
              comments={feedItem.comments}
              isLazyLoadPictures={index !== 0}
            />
          ))}
        </Container>
      ) : (
        <MockWithAction
          title={'Feed is empty'}
          description={'Start a conversation first'}
          withCreatePostButton
          image={<PlaceholderQuestion />}
        />
      )}
    </LoadingState>
  )
}

const Container = styled.div`
  padding: 1.6rem;

  display: grid;
  row-gap: 1.6rem;
`

export default PostsPage

type Props = {
  region: Region
}
export const SeoMetaTags: VFC<Props> = memo(({ region }) => {
  const router = useRouter()
  const fullArea = formatNeighborhoodFullName(region.name, region.subtitle)
  const title = generateTexByTemplate(
    'short_nbhd_title',
    region.name,
    'Nicity - What locals say about {short_nbhd_title}',
  )
  const description = generateTexByTemplate(
    'full_nbhd_title',
    fullArea,
    "Find out what all the buzz is about in {full_nbhd_title}. Whether you need relocation tips, just moved in {full_nbhd_title}, or want to stay updated about {full_nbhd_title} happenings, Nicity's customized Community Hub will help you discover what's going on in {full_nbhd_title}, from local hidden gems to neighborhood dog parks.",
  )
  const keywords = generateTexByTemplate(
    'full_nbhd_title',
    fullArea,
    `Nicity, relocation to {full_nbhd_title}, move to {full_nbhd_title}, real estate professionals in {full_nbhd_title}, agents and brokers in {full_nbhd_title}, {full_nbhd_title} neighbors, {full_nbhd_title} community, {full_nbhd_title} relocation tips, {full_nbhd_title} real estate professionals, {full_nbhd_title} relocation experts, feedback from {full_nbhd_title} neighbors`,
  )
  const image =
    region.media.find(({ type }) => type === 'IMAGE')?.src ?? DEFAULT_OG_IMAGE
  return (
    <Head>
      <title>{title}</title>
      {description && <meta name={'description'} content={description} />}
      <meta property={'og:title'} content={title} />
      <meta property={'og:description'} content={description} />
      <meta property={'og:image'} content={image} />
      <meta property={'og:site_name'} content={'Nicity'} />
      <meta property={'url'} content={`${API_HOST}${router?.asPath}`} />
      <meta property={'og:locale'} content={'en_US'} />
      <meta name={'keywords'} content={keywords} />
    </Head>
  )
})
