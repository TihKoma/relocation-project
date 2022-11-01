import { VFC } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { API_HOST } from '@/modules/utils/config'

type Props = {
  firstName: string
  lastName: string
  userName: string
  photoUrl: string
}
export const ProfileMeta: VFC<Props> = ({
  firstName,
  lastName,
  userName,
  photoUrl,
}) => {
  const router = useRouter()

  const text = `${firstName} ${lastName} on Nicity`

  return (
    <Head>
      <title>{text}</title>
      <meta name={'description'} content={text} />
      <meta name={'keywords'} content={`${firstName} ${lastName}`} />
      <meta property={'og:image'} content={photoUrl} />
      <meta property={'og:url'} content={`${API_HOST}${router.asPath}`} />
      <meta property={'og:title'} content={`${firstName} ${lastName}`} />
      <meta property={'og:description'} content={text} />
      <meta property={'og:site_name'} content={'Nicity'} />
      <meta property={'og:locale'} content={'en_US'} />
      <meta property={'og:type'} content={'profile'} />
      <meta property={'profile:first_name'} content={firstName} />
      <meta property={'profile:last_name'} content={lastName} />
      <meta property={'profile:username'} content={userName} />
    </Head>
  )
}
