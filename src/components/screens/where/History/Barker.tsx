import { FC } from 'react'
import Link from 'next/link'
import styled from '@emotion/styled'

import { Button } from '@/components/ui-kit/Button'
import { PlanetGeoLocationIcon as PlanetGeoLocationIconBase } from '@/images'
import { useAnalytics } from '@/modules/analytics'
import { useIsMobileDevice } from '@/modules/device'
import { ROUTES } from '@/modules/router'
import { mobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

type Props = { className?: string }
export const Barker: FC<Props> = (props) => {
  const analytics = useAnalytics()
  const isMobile = useIsMobileDevice()
  return (
    <Container {...props}>
      <Wrapper>
        <Text>Want to try Where again?</Text>
        <Link href={ROUTES.whereQuiz.calcUrl()} passHref shallow>
          <Button
            viewType={'primary'}
            backgroundUnderButton={'alt'}
            size={isMobile ? 'small' : 'medium'}
            as={'a'}
            onClick={() => {
              analytics.newQuizStart({ source: 'quiz_history' })
            }}
          >
            Start new quiz
          </Button>
        </Link>
      </Wrapper>
      <PlanetGeoLocationIcon />
    </Container>
  )
}

const Container = styled.div`
  display: flex;

  background: ${getColorTheme('pluto')};
  border-radius: 12px;

  ${mobileMedia} {
    overflow: hidden;
  }
`

const Wrapper = styled.div`
  padding: 1.6rem 0.2rem 1.6rem 1.6rem;
`
const Text = styled.div`
  margin-bottom: 1.6rem;

  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: -0.04em;
  color: ${getColorTheme('earth')};

  ${mobileMedia} {
    margin-bottom: 1.2rem;

    font-size: 1.6rem;
  }
`
const PlanetGeoLocationIcon = styled(PlanetGeoLocationIconBase)`
  margin-left: auto;
  margin-top: auto;
  margin-right: 2.4rem;

  ${mobileMedia} {
    margin-right: -6.2rem;
    margin-bottom: -1.8rem;
  }
`
