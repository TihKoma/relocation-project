import React, { memo, VFC } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { Region } from '@/modules/map'
import { DEFAULT_OG_IMAGE } from '@/modules/router'
import { generateTexByTemplate } from '@/modules/seo'
import { API_HOST } from '@/modules/utils/config'
import { formatNeighborhoodFullName } from '@/modules/utils/format-neighborhood-full-name'

type Props = {
  region: Region
}
export const SeoMetaTags: VFC<Props> = memo(({ region }) => {
  const router = useRouter()
  const fullArea = formatNeighborhoodFullName(region.name, region.subtitle)
  const title = generateTexByTemplate(
    'short_nbhd_title',
    region.name,
    'Nicity is a hyper-local discovery platform pairing individuals with the resources needed as they prepare to relocate. Enjoy tips from real estate professionals, relocation experts, and feedback from neighbors who just made a move. Start your journey!',
  )
  const description = generateTexByTemplate(
    'full_nbhd_title',
    fullArea,
    "Find out what all the buzz is about in {full_nbhd_title}. Whether you need relocation tips, just moved in {full_nbhd_title}, or want to stay updated about {full_nbhd_title} happenings, Nicity's customized Community Hub will help you discover what's going on in {full_nbhd_title}, from local hidden gems to neighborhood dog parks.",
  )
  const keywords = generateTexByTemplate(
    'full_nbhd_title',
    fullArea,
    `Nicity, relocation to {full_nbhd_title}, move to {full_nbhd_title}, apartments in {full_nbhd_title}, real estate professionals in {full_nbhd_title}, agents and brokers in {full_nbhd_title}, {full_nbhd_title} neighbors, real estate in {full_nbhd_title}, {full_nbhd_title} community, {full_nbhd_title} relocation tips, {full_nbhd_title} real estate professionals, {full_nbhd_title} relocation experts, feedback from {full_nbhd_title} neighbors, {full_nbhd_title} real estate, crime in {full_nbhd_title}, schools in {full_nbhd_title}.`,
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
