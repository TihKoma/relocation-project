import { useRouter } from 'next/router'

import { GuideArticleScreen } from '@/components/screens/GuideArticleScreen'

const GuideArticlePage = () => {
  const router = useRouter()

  const guideSlug = (router.query.guideSlug as string) || ''

  return <GuideArticleScreen guideSlug={guideSlug} />
}

export default GuideArticlePage
