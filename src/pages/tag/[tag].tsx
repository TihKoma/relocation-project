import { FC } from 'react'
import { useRouter } from 'next/router'

import { TagScreen } from '@/components/screens/TagFeed'

import { ServerData } from '../_app'

type Props = ServerData & {
  isMobile: boolean
}

const TagPage: FC<Props> = () => {
  const router = useRouter()

  const tag = router.query.tag as string

  return <TagScreen tag={tag} />
}

export default TagPage
