import React, { FC, memo } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { DEFAULT_OG_IMAGE } from '@/modules/router'
import { TWITTER_IMAGE_URL } from '@/modules/seo'

export const ScreenMeta: FC = memo(() => {
  const router = useRouter()
  const title = `Nicity - Marketplace For Relocation: find near you vetted local agents, inspectors, appraisals, moving companies, visa support, jobs, schools, and all you need for relocation.`
  const description = `Nicity is a hyper-local discovery platform pairing individuals with the resources needed as they prepare to relocate. Enjoy tips from real estate professionals, relocation experts, and feedback from neighbors who just made a move. Search for new homes for rent or buy, find vetted local real estate agents, home inspectors near you, appraisals, moving companies, get legal advice, relocation concierge service, and find a relocation guide. Nicity helps to find jobs and schools and settle in a new place.`
  const keywords = `Nicity, relocation, marketplace, homes, properties, real, estate, agents, home inspectors, near you, appraisals, moving, companies, legal advice, relocation concierge service, relocation guide, find jobs, schools, settle`

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
      <meta name={'keywords'} content={keywords} />
    </Head>
  )
})
