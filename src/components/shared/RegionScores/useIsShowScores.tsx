import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { useLocalStorage } from 'react-use'

import { LAST_QUIZ_ID_STORAGE_KEY } from '@/components/screens/where/Result/Result'
import { QUERY_QUIZ_RESULT_REGION } from '@/modules/neighbourhood'

export const useIsShowScores = (regionId?: string, quizId?: string) => {
  const [lastQuizId] = useLocalStorage<string>(LAST_QUIZ_ID_STORAGE_KEY)

  const router = useRouter()
  const quizIdParam = quizId || (router.query.quizId as string)

  const { data } = useQuery(QUERY_QUIZ_RESULT_REGION, {
    skip: !regionId,
    variables: {
      regionId: regionId as string,
      quizId: quizIdParam || lastQuizId,
    },
  })
  const score = data?.quizResultForRegion?.location.score ?? 0

  return score > 0
}
