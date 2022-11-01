import { FC, useState } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'
import { useLocalStorage } from 'react-use'

import { TabType } from '@/components/screens/where/Area/Where'
import { LAST_QUIZ_ID_STORAGE_KEY } from '@/components/screens/where/Result/Result'
import { FactorScore } from '@/components/shared/FactorScore'
import { Badge } from '@/components/shared/where/Badge'
import { Barker as BarkerBase } from '@/components/shared/where/Barker'
import { DescriptionHowWorkWhere as DescriptionHowWorkWhereBase } from '@/components/shared/where/DescriptionHowWorkWhere'
import { Button } from '@/components/ui-kit/Button'
import { Loader } from '@/components/ui-kit/Loader'
import { useAuthorizationStore } from '@/modules/authorization'
import { QUERY_QUIZ_RESULT_REGION } from '@/modules/neighbourhood'
import { QuizResultForRegion_quizResultForRegion_location_factorsScores as Factor } from '@/modules/neighbourhood/graphql/__generated__/QuizResultForRegion'
import { mobileMedia, notMobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

import { LoadingState } from '../LoadingState'

type Props = {
  quizId?: string
  regionId: string
  mini?: boolean
  className?: string
  countShowPreviewDesktop?: number
  countShowPreviewMobile?: number
  sortFactors?: (
    factors: Factor[],
    swapFactors: (
      list: Factor[],
      item: Factor,
      startIndex: number,
      endIndex: number,
    ) => void,
  ) => Factor[]
  onClickSeeMore?: (value: TabType) => void
}
export const RegionScores: FC<Props> = ({
  quizId,
  regionId,
  mini = true,
  countShowPreviewDesktop,
  countShowPreviewMobile,
  sortFactors,
  onClickSeeMore,
  ...props
}) => {
  const [{ isLoggedIn }] = useAuthorizationStore()
  const [lastQuizId] = useLocalStorage<string>(LAST_QUIZ_ID_STORAGE_KEY)

  const router = useRouter()
  const quizIdParam = quizId || (router.query.quizId as string)

  const { data, loading, error } = useQuery(QUERY_QUIZ_RESULT_REGION, {
    variables: { regionId, quizId: quizIdParam || lastQuizId },
  })
  const score = data?.quizResultForRegion?.location.score ?? 0
  const badges = data?.quizResultForRegion?.location.badges ?? []
  const factorsScores = data?.quizResultForRegion?.location.factorsScores ?? []
  const isDefaultQuiz =
    !error && (!isLoggedIn || data?.quizResultForRegion.system)

  const [isShowMore, setIsShowMore] = useState(false)

  if (score === 0) {
    return null
  }

  return (
    <Container {...props}>
      <LoadingState
        loading={loading}
        loadingComponent={<Loader color={'neptune'} size={'small'} />}
      >
        <MainScore isCompact={badges.length === 0}>
          {!isDefaultQuiz && (
            <MainScoreText>
              {score}
              <span>%</span> <span>match</span>
            </MainScoreText>
          )}
          <Badges>
            {badges.map((badge) => (
              <Badge key={badge}>{badge}</Badge>
            ))}
          </Badges>
        </MainScore>
        {isDefaultQuiz && <Barker score={score} />}
        <FactorWrapper
          isShowAll={isShowMore || !mini}
          countShowPreviewDesktop={countShowPreviewDesktop}
          countShowPreviewMobile={countShowPreviewMobile}
        >
          {(sortFactors
            ? sortFactors(factorsScores, swapFactors)
            : factorsScores
          ).map((score) => (
            <FactorScore
              key={score.name.toLowerCase().replace(/\s/g, '-')}
              onClickSeeMore={onClickSeeMore}
              {...score}
            />
          ))}
        </FactorWrapper>
        <Footer>
          {mini &&
            (isShowMore ? (
              <ButtonSeeMore
                size={'small'}
                viewType={'secondary'}
                onClick={() => setIsShowMore(false)}
              >
                See less
              </ButtonSeeMore>
            ) : (
              <ButtonSeeMore
                size={'small'}
                viewType={'secondary'}
                onClick={() => setIsShowMore(true)}
              >
                See more
              </ButtonSeeMore>
            ))}
          <DescriptionHowWorkWhere />
        </Footer>
      </LoadingState>
    </Container>
  )
}

const Container = styled.div``
const MainScore = styled.div<{ isCompact: boolean }>`
  margin-bottom: ${({ isCompact }) => (isCompact ? '0.8' : '1.6')}rem;

  display: flex;

  ${notMobileMedia} {
    align-items: baseline;

    overflow-x: auto;
  }
  ${mobileMedia} {
    flex-direction: column;
  }
`
const MainScoreText = styled.div`
  margin-right: 4rem;

  flex-shrink: 0;

  font-weight: 500;
  font-size: 4.2rem;
  line-height: 5.2rem;
  letter-spacing: -0.04em;
  color: ${getColorTheme('uranus600')};

  span {
    font-weight: 500;
    font-size: 1.8rem;
    line-height: 2.4rem;
    color: ${getColorTheme('sun1000')};
  }
  span:first-child {
    color: ${getColorTheme('uranus600')};
  }
  ${mobileMedia} {
    margin-bottom: 1.2rem;
  }
`
const COUNT_SHOW_PREVIEW_SCORES_DESKTOP = 6
const COUNT_SHOW_PREVIEW_SCORES_MOBILE = 3
const FactorWrapper = styled.div<{
  isShowAll: boolean
  countShowPreviewDesktop?: number
  countShowPreviewMobile?: number
}>`
  margin-bottom: 2.4rem;

  display: grid;
  gap: 1.2rem 2.4rem;

  ${notMobileMedia} {
    grid-template-columns: 1fr 1fr;
  }

  ${({ isShowAll, countShowPreviewDesktop, countShowPreviewMobile }) =>
    !isShowAll &&
    `
  ${notMobileMedia} {
    & :nth-of-type(n + ${
      (countShowPreviewDesktop || COUNT_SHOW_PREVIEW_SCORES_DESKTOP) + 1
    }) {
      display: none;
    }
  }
  ${mobileMedia} {
    & :nth-of-type(n + ${
      (countShowPreviewMobile || COUNT_SHOW_PREVIEW_SCORES_MOBILE) + 1
    }) {
      display: none;
    }
  }
  `}
`
const ButtonSeeMore = styled(Button)`
  ${notMobileMedia} {
    margin-right: auto;
  }
  ${mobileMedia} {
    margin-bottom: 1.8rem;
  }
`
const Footer = styled.div`
  display: flex;

  ${mobileMedia} {
    flex-direction: column;
  }
`
const DescriptionHowWorkWhere = styled(DescriptionHowWorkWhereBase)`
  ${mobileMedia} {
    &:not(:first-of-type) {
      margin: 0 auto;
    }
  }
`

const Barker = styled(BarkerBase)`
  margin-bottom: 2.4rem;
`
const Badges = styled.div`
  display: grid;
  gap: 0.5rem;
  grid-auto-columns: auto;
  grid-auto-flow: column;

  ${notMobileMedia} {
    margin-left: auto;
  }
  ${mobileMedia} {
    max-width: calc(100% + 3.2rem);
    margin: 0 -1.6rem;
    padding: 0 1.6rem;

    display: inline-flex;

    overflow-x: auto;
  }
`

const swapFactors = (
  list: Factor[],
  item: Factor,
  startIndex: number,
  endIndex: number,
) => {
  if (startIndex === endIndex) {
    return
  }

  const tmp = list[endIndex]
  list[endIndex] = item
  list[startIndex] = tmp
}
