import { FC, useState } from 'react'
import styled from '@emotion/styled'

import { DescriptionWorkMatch } from '@/components/shared/DescriptionWorkMatch'
import { FactorScore as FactorScoreBase } from '@/components/shared/FactorScore'
import { Button } from '@/components/ui-kit/Button'
import { ModalPortal } from '@/components/ui-kit/Modal'
import { CrossIcon, InfoIcon } from '@/images'
import { notMobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

import { FactorsScoreProps, TotalButton as TotalButtonBase } from './shared'

export const Mobile: FC<Omit<FactorsScoreProps, 'onClose'>> = ({
  neighborhood,
  total,
  scores,
  onOpen,
  isPreview,
  totalSessionsCount,
}) => {
  const [isOpenScores, setIsOpenScores] = useState(false)
  const [isShowDescriptionWorkMatch, setIsShowDescriptionWorkMatch] =
    useState(false)
  const closeScores = () => setIsOpenScores(false)
  const openScores = () => {
    setIsOpenScores(true)
    onOpen()
  }

  return (
    <>
      <TotalButton
        total={total}
        onClick={(event) => {
          event.stopPropagation()
          event.preventDefault()
          openScores()
        }}
        totalSessionsCount={totalSessionsCount}
        isPreview={isPreview}
      />
      <ModalPortal
        isVisible={isOpenScores}
        onRequestClose={closeScores}
        onClick={(event) => event.stopPropagation()}
      >
        <Container>
          <Header>
            <Neighborhood>{neighborhood}</Neighborhood>
            <CrossButton
              size={'small'}
              viewType={'ghost'}
              onClick={closeScores}
              Icon={<CrossIcon />}
            />
          </Header>
          <TotalText>
            <TotalPercent>
              {total}
              <span>%</span>
            </TotalPercent>
            <span>match with you</span>
          </TotalText>
          <FactorsWrapper>
            {scores.map((score) => (
              <Factor key={score.name} {...score} />
            ))}
          </FactorsWrapper>
          <LearnMoreBanner
            onClick={() => {
              setIsShowDescriptionWorkMatch(true)
            }}
          >
            <InfoIcon />
            Learn more about how Match works
          </LearnMoreBanner>
        </Container>
        <DescriptionWorkMatch
          isVisible={isShowDescriptionWorkMatch}
          onRequestClose={setIsShowDescriptionWorkMatch}
        />
      </ModalPortal>
    </>
  )
}

const Container = styled.div`
  padding: 16px 16px 40px;
  min-height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;

  background-color: white;
`
const Header = styled.div`
  margin-bottom: 1.6rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
`
const Neighborhood = styled.div`
  font-weight: 500;
  font-size: 1.8rem;
  line-height: 2.4rem;
  letter-spacing: -0.04em;

  color: ${getColorTheme('sun1000')};
`
const FactorsWrapper = styled.div`
  margin-bottom: 2.6rem;

  display: flex;
  flex-direction: column;
  gap: 1.4rem;
`
const Factor = styled(FactorScoreBase)``
const TotalText = styled.div`
  margin-bottom: 1rem;

  display: flex;
  align-items: baseline;
  gap: 0.6rem;

  font-weight: 500;
  font-size: 1.6rem;
  line-height: 2.4rem;
  letter-spacing: -0.04em;
  color: ${getColorTheme('sun1000')};
`
const TotalPercent = styled.span`
  font-weight: 500;
  font-size: 4.2rem;
  line-height: 5.2rem;

  color: ${getColorTheme('uranus600')};

  & > span {
    font-size: 1.6rem;
    line-height: 2.4rem;
  }
`
const TotalButton = styled(TotalButtonBase)`
  ${notMobileMedia} {
    display: none;
  }
`
const LearnMoreBanner = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;

  font-size: 1.4rem;
  line-height: 2rem;
  color: ${getColorTheme('neptune600')};
`
const CrossButton = styled(Button)`
  margin-left: auto;
`
