import { useEffect, useState, VFC } from 'react'
import styled from '@emotion/styled'

import { DescriptionWorkMatch } from '@/components/shared/DescriptionWorkMatch'
import { useAnalytics } from '@/modules/analytics'
import { Quiz } from '@/modules/quiz'

import { Banner as BannerBase } from './Banner'

type BannerByResultStepsProps = {
  steps?: Quiz['steps']
  quizId?: string
}

export const BannerByResultSteps: VFC<BannerByResultStepsProps> = ({
  steps,
  quizId,
}) => {
  const [isShowLearnMore, setIsShowLearnMore] = useState(true)
  const [isShowDescriptionWorkMatch, setIsShowDescriptionWorkMatch] =
    useState(false)
  const analytics = useAnalytics()
  const bannerLearnMore = (
    <>
      {isShowLearnMore && (
        <>
          <Banner
            type={'info'}
            onClose={() => {
              setIsShowLearnMore(false)
              analytics?.descriptionBannerClosed()
            }}
            onClick={() => {
              setIsShowDescriptionWorkMatch(true)
            }}
          >
            Learn more about how Where works
          </Banner>
          <DescriptionWorkMatch
            isVisible={isShowDescriptionWorkMatch}
            onRequestClose={setIsShowDescriptionWorkMatch}
          />
        </>
      )}
    </>
  )
  const someAnswer = steps ? haveSomeAnswer(steps) : false
  const propertyAnswer = steps ? havePropertyAnswer(steps) : false
  useEffect(() => {
    if (!quizId) {
      return
    }
    if (!someAnswer) {
      analytics.resultsAlert({ quizId, type: 'empty_quiz' })
    } else if (!propertyAnswer) {
      analytics.resultsAlert({ quizId, type: 'empty_property_answers' })
    }
  }, [analytics, quizId, someAnswer, propertyAnswer])

  if (!steps) {
    return bannerLearnMore
  }
  if (!someAnswer) {
    return (
      <Banner type={'warning'}>
        Enter search parameters for personalised results
      </Banner>
    )
  }
  if (!propertyAnswer) {
    return (
      <Banner type={'warning'}>
        Enter all property parameters for better results
      </Banner>
    )
  }
  return bannerLearnMore
}

export const haveSomeAnswer = (steps: Quiz['steps']): boolean => {
  return steps
    .filter((step) => step.entity !== 'place_type')
    .some(({ result }) => result !== null)
}
const havePropertyAnswer = (steps: Quiz['steps']): boolean => {
  const entityWithResult = steps.reduce((acc, { result, entity }) => {
    if (result !== null) {
      acc.push(entity)
    }
    return acc
  }, [] as string[])
  const expectEntity: Array<Quiz['steps'][number]['entity']> = [
    'bedrooms',
    'price',
    'property_type',
  ]
  return expectEntity.every((entity) => entityWithResult.includes(entity))
}

const Banner = styled(BannerBase)`
  margin-bottom: 1.8rem;
`
