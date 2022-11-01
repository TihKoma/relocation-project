import { FC } from 'react'
import styled from '@emotion/styled'

import { useAnalytics } from '@/modules/analytics'
import { getColorTheme } from '@/styles/themes'

import { Desktop } from './Desktop'
import { Mobile } from './Mobile'
import { FactorsScoreProps } from './shared'

type CommonProps = 'onOpen'
type Props = {
  className?: string
  isShowWarningNoHaveSearchParameters: boolean
  neighborhoodId: string
  quizId: string
  source: 'map' | 'list'
  onOpen: () => void
  onClose: () => void
  isPreview?: boolean
  onInfoOpen?: () => void
  totalSessionsCount?: number
} & Omit<FactorsScoreProps, CommonProps>

export const FactorsScore: FC<Props> = ({
  isShowWarningNoHaveSearchParameters,
  className,
  neighborhoodId,
  quizId,
  source,
  onOpen,
  onClose,
  isPreview,
  onInfoOpen,
  totalSessionsCount,
  ...props
}) => {
  const analytics = useAnalytics()
  const openScores = () => {
    onOpen()
    analytics?.resultsRegionScoreDetailsViewed({
      regionId: neighborhoodId,
      quizId,
      source,
    })
  }
  return (
    <Container className={className}>
      {isShowWarningNoHaveSearchParameters ? (
        <ScoreWrapper>
          <Score>90% average user match</Score>
          <Warning>Enter search parameters for personalization</Warning>
        </ScoreWrapper>
      ) : (
        <Wrapper>
          <Desktop
            {...props}
            onOpen={openScores}
            onClose={onClose}
            isPreview={isPreview}
            onInfoOpen={onInfoOpen}
            totalSessionsCount={totalSessionsCount}
          />
          <Mobile
            {...props}
            onOpen={openScores}
            isPreview={isPreview}
            onInfoOpen={onInfoOpen}
            totalSessionsCount={totalSessionsCount}
          />
        </Wrapper>
      )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
`

const ScoreWrapper = styled.div``

const Wrapper = styled.div`
  display: flex;
  gap: 1rem;
`

const Score = styled.div`
  font-weight: 500;
  font-size: 1.6rem;
  line-height: 2.4rem;
  letter-spacing: -0.04em;
  color: ${getColorTheme('sun')};
`
const Warning = styled.div`
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 2rem;
  color: ${getColorTheme('saturn')};
`
