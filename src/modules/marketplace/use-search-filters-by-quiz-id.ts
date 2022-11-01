import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'

import { mapQuizStepsToFilters } from '@/modules/marketplace/utils'
import { QUERY_QUIZ } from '@/modules/quiz'

export const useSearchFiltersByQuizId = () => {
  const router = useRouter()
  const quizId = router.query.quizId as string
  const { data } = useQuery(QUERY_QUIZ, {
    variables: { id: quizId, position: 0, limit: 1 },
    skip: !quizId,
    fetchPolicy: 'no-cache',
  })

  if (!quizId || !data?.quiz?.steps) {
    return ''
  }

  const filters = [
    ...mapQuizStepsToFilters(data.quiz.steps),
    ['quizId', quizId],
  ]

  return `?${filters.map(([key, value]) => `${key}=${value}`).join('&')}`
}
