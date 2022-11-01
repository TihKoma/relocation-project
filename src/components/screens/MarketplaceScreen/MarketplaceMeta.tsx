import { FC } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { DEFAULT_OG_IMAGE, TWITTER_IMAGE_URL } from '@/modules/router'

type Props = {
  areaTitle: string
}
export const MarketplaceMeta: FC<Props> = ({ areaTitle }) => {
  const router = useRouter()

  const title = `Find a new home in  ${areaTitle} on Nicity`
  const description = `Find new homes for buy or sale in ${areaTitle}. Read posts from locals in ${areaTitle} near selected residence. Connect with an real estate agent in ${areaTitle} to arrange a viewing.`
  const keywords = `Buy,Rent,Home,House,${areaTitle},near me,Property,Find`
  return (
    <Head>
      <title>{title}</title>
      {description && <meta name={'description'} content={description} />}
      <meta property={'twitter:card'} content={'summary_large_image'} />
      <meta property={'twitter:site'} content={'@nicity_official'} />
      <meta property={'twitter:description'} content={description} />
      <meta property={'twitter:image'} content={TWITTER_IMAGE_URL} />
      <meta property={'og:title'} content={title} />
      <meta property={'og:type'} content={'place'} />
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
}
