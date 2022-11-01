import { FC } from 'react'
import Link from 'next/link'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'

import { LoadingState } from '@/components/shared/LoadingState'
import { Button } from '@/components/ui-kit/Button'
import { Loader as LoaderBase } from '@/components/ui-kit/Loader'
import { LogoIcon } from '@/images/logo'
import { QUERY_QUIZZES } from '@/modules/quiz'
import { ROUTES } from '@/modules/router'
import { mobileMedia, notMobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

import { Region } from '../types'
import { Search } from './Search'

type Props = {
  selectRegion: (region: Region) => void
  selectedRegion: Region | null
}
export const WhereToStepContent: FC<Props> = ({
  selectRegion,
  selectedRegion,
}) => {
  const {
    data: { userCalculatedQuizzes: quizzes } = {},
    loading: quizzesLoading,
  } = useQuery(QUERY_QUIZZES)

  return (
    <>
      <FormWrapper>
        <Search selectRegion={selectRegion} selectedRegion={selectedRegion} />
      </FormWrapper>
      <LoadingState
        loading={quizzesLoading}
        loadingComponent={<Loader withGradient />}
      >
        {quizzes?.[0] ? (
          <>
            <Or>Or</Or>
            <Link
              href={ROUTES.whereResult.calcUrl({ id: quizzes?.[0].id })}
              passHref
            >
              <a>
                <Button size={'small'} fullWidth>
                  Show your last quiz results
                </Button>
              </a>
            </Link>
          </>
        ) : (
          <>
            <QuizTitle>
              <LogoIcon />
              Not sure where to go?
            </QuizTitle>
            <QuizDescription>
              Get personalised recommendations with Nicity Where.
            </QuizDescription>
            <Link href={ROUTES.whereQuiz.calcUrl()} passHref>
              <a>
                <Button fullWidth size={'small'}>
                  Pass the quiz
                </Button>
              </a>
            </Link>
          </>
        )}
      </LoadingState>
    </>
  )
}

const FormWrapper = styled.div`
  width: 100%;
  margin-bottom: 0.8rem;

  position: relative;

  ${notMobileMedia} {
    height: 5.6rem;
  }

  ${mobileMedia} {
    height: 4rem;
  }
`
const Or = styled.div`
  margin-bottom: 0.8rem;

  justify-self: center;

  color: ${getColorTheme('textDefaultSecondary')};
`
const QuizTitle = styled.div`
  margin-bottom: 0.8rem;
  padding-top: 2.4rem;

  display: grid;
  grid-auto-flow: column;
  gap: 0.8rem;
  justify-content: start;
  align-items: center;
  align-self: start;

  color: ${getColorTheme('neptune')};
  font-size: 1.8rem;
  font-weight: 500;
`
const QuizDescription = styled.div`
  margin-bottom: 1.6rem;

  align-self: start;

  line-height: 2.4rem;
  font-size: 1.6rem;
`
const Loader = styled(LoaderBase)`
  padding-top: 0.8rem;
`
