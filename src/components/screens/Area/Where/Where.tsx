import { FC } from 'react'
import Link from 'next/link'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'
import { useLocalStorage } from 'react-use'

import { LAST_QUIZ_ID_STORAGE_KEY } from '@/components/screens/where/Result/Result'
import { LoadingState } from '@/components/shared/LoadingState'
import { Badge } from '@/components/shared/where/Badge'
import { Barker as BarkerBase } from '@/components/shared/where/Barker'
import { ChevronIcon as ChevronIconBase } from '@/images'
import { useAuthorizationStore } from '@/modules/authorization'
import { useIsNotMobileDevice } from '@/modules/device'
import { QUERY_QUIZ_RESULT_REGION } from '@/modules/neighbourhood'
import { ROUTES } from '@/modules/router'
import { HOVER_TRANSITION_TIME } from '@/styles/const'
import { mobileMedia, notMobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

type Props = {
  quizId?: string
  regionId: string
  regionSlug: string
  className?: string
}
export const Where: FC<Props> = ({
  regionSlug,
  quizId,
  regionId,
  className,
}) => {
  const [{ isLoggedIn }] = useAuthorizationStore()
  const [lastQuizId] = useLocalStorage<string>(LAST_QUIZ_ID_STORAGE_KEY)

  const { data, loading, error } = useQuery(QUERY_QUIZ_RESULT_REGION, {
    variables: { regionId, quizId: quizId || lastQuizId },
  })

  const score = data?.quizResultForRegion?.location.score ?? 0
  const badges = data?.quizResultForRegion?.location.badges ?? []
  const isDefaultQuiz =
    !error && (!isLoggedIn || data?.quizResultForRegion.system)
  const isNotMobile = useIsNotMobileDevice()

  if (isDefaultQuiz) {
    return <Barker score={score} />
  }
  if (score === 0) {
    return null
  }

  return (
    <Link
      href={ROUTES.areaDetail.calcUrl({ regionSlug, quizId })}
      passHref
      shallow
    >
      <Container className={className}>
        <LoadingState loading={loading}>
          <Score>
            {score}
            <span>%</span> <span>match</span>
          </Score>
          {isNotMobile ? (
            <Badges>
              {badges.map((badge) => (
                <Badge key={badge}>{badge}</Badge>
              ))}
            </Badges>
          ) : (
            <ChevronIconMobile direction={'right'} />
          )}
        </LoadingState>
      </Container>
    </Link>
  )
}
const Container = styled.a`
  padding: 1rem 1.6rem;
  min-height: 5.2rem;

  display: flex;

  border: 0.1rem solid ${getColorTheme('sun50')};

  transition: ${HOVER_TRANSITION_TIME};

  ${notMobileMedia} {
    align-items: baseline;

    background: ${getColorTheme('earth')};
    border-radius: 1.6rem;

    overflow-x: auto;

    &:hover {
      border-color: transparent;
      box-shadow: 0 2px 4px rgba(18, 21, 31, 0.08),
        0 4px 16px 1px rgba(18, 21, 31, 0.08);
    }
  }
  ${mobileMedia} {
    align-items: center;

    border-left: none;
    border-right: none;
  }
`
const Score = styled.div`
  margin-right: 4rem;

  flex-shrink: 0;

  font-weight: 500;
  font-size: 2.4rem;
  line-height: 2.8rem;
  letter-spacing: -0.04em;
  color: ${getColorTheme('uranus600')};

  span {
    font-weight: 500;
    font-size: 1.8rem;
    line-height: 2.4rem;
    color: ${getColorTheme('sun1000')};
  }
  span:first-of-type {
    color: ${getColorTheme('uranus600')};
  }
`
const Barker = styled(BarkerBase)`
  margin: 0 1.6rem 0.8rem;
`
const Badges = styled.div`
  margin-left: auto;

  display: grid;
  gap: 0.5rem;
  grid-auto-columns: auto;
  grid-auto-flow: column;
`
const ChevronIconMobile = styled(ChevronIconBase)`
  margin-left: auto;

  stroke: ${getColorTheme('sun500')};
  fill: ${getColorTheme('sun500')};
`
