import { useEffect, VFC } from 'react'
import Link from 'next/link'
import styled from '@emotion/styled'

import {
  ChevronIcon as ChevronIconBase,
  LovePlanetAreaIcon as LovePlanetAreaIconBase,
} from '@/images'
import { useAnalytics } from '@/modules/analytics'
import { ROUTES } from '@/modules/router'
import { HOVER_TRANSITION_TIME } from '@/styles/const'
import { mobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

type Props = { className?: string; score: number }
export const Barker: VFC<Props> = ({ score, ...props }) => {
  const analytics = useAnalytics()

  useEffect(() => {
    analytics.areaPassQuizBannerShown()
  }, [analytics])

  return (
    <Link href={ROUTES.whereQuiz.calcUrl()} passHref shallow>
      <Container {...props}>
        <Wrapper>
          <Title>
            <span>{score}</span>% average user match
          </Title>
          <SubTitle>
            Take the quiz to identify your neighborhood match{' '}
            <ChevronIcon direction={'right'} />
          </SubTitle>
        </Wrapper>
        <LovePlanetAreaIcon />
      </Container>
    </Link>
  )
}

const Container = styled.a`
  display: flex;

  background: ${getColorTheme('neptune500')};
  border-radius: 1.6rem;

  transition: ${HOVER_TRANSITION_TIME};

  ${mobileMedia} {
    overflow-x: hidden;
  }
  &:hover {
    background: ${getColorTheme('neptune600')};
  }
`
const Wrapper = styled.div`
  padding: 1.2rem 0 1.2rem 1.6rem;
`
const Title = styled.div`
  margin-bottom: 0.4rem;

  font-weight: 500;
  font-size: 1.8rem;
  line-height: 2.4rem;
  letter-spacing: -0.04em;
  color: ${getColorTheme('earth')};

  span {
    font-size: 2.4rem;
    line-height: 2.8rem;
  }
`
const SubTitle = styled.div`
  display: flex;
  align-items: center;

  font-size: 1.6rem;
  line-height: 2.4rem;
  color: ${getColorTheme('earth800alpha')};

  ${mobileMedia} {
    font-size: 1.4rem;
    line-height: 2rem;
  }
`
const LovePlanetAreaIcon = styled(LovePlanetAreaIconBase)`
  margin-left: auto;
  margin-top: auto;
  margin-right: 1.6rem;

  ${mobileMedia} {
    margin-right: -4.2rem;
  }
`
const ChevronIcon = styled(ChevronIconBase)`
  margin-left: 0.9rem;
  stroke: ${getColorTheme('earth800alpha')};
  fill: ${getColorTheme('earth800alpha')};
`
