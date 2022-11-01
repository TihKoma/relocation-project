import { FC } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { DEFAULT_OG_IMAGE, TWITTER_IMAGE_URL } from '@/modules/router'

type Props = {
  areaTitle: string
  propertyType: string
  homeAddress: string
  mediaUrl?: string
}
export const DetailedListingMeta: FC<Props> = ({
  areaTitle,
  homeAddress,
  propertyType,
  mediaUrl,
}) => {
  const router = useRouter()

  const title = `Read detailed information about property ${propertyType} by ${homeAddress} in ${areaTitle} on Nicity`
  const description = `Read detailed information about property in ${areaTitle} by address ${homeAddress}. Read posts from locals in ${areaTitle} near selected residence. Connect with an real estate agent in ${areaTitle} to arrange a viewing.`
  const keywords = `${homeAddress},${propertyType},Home,House,${areaTitle},near me,Property,Find,Agent`
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
      <meta property={'og:image'} content={mediaUrl || DEFAULT_OG_IMAGE} />
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
