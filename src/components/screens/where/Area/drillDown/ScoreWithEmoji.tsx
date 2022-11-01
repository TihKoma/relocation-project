import { FC } from 'react'
import styled from '@emotion/styled'

import {
  AverageScoreEmoji,
  BadScoreEmoji,
  GoodScoreEmoji,
  OutstandingScoreEmoji,
  PoorScoreEmoji,
} from '@/images'

// import { DrillDownGrade } from '../../../../../../__generated__/globalTypes'

enum DrillDownGrade {
  BAD = 'BAD',
  POOR = 'POOR',
  AVERAGE = 'AVERAGE',
  GOOD = 'GOOD',
  OUTSTANDING = 'OUTSTANDING',
}

type Props = {
  grade: DrillDownGrade
  title: string
  subtitle: string
}
export const ScoreWithEmoji: FC<Props> = ({ grade, title, subtitle }) => {
  const emoji = getEmoji(grade)

  return (
    <Container>
      {emoji}
      <TextWrapper>
        <Title>{title}</Title>
        <Description>{subtitle}</Description>
      </TextWrapper>
    </Container>
  )
}

const getEmoji = (grade: DrillDownGrade) => {
  switch (grade) {
    case DrillDownGrade.BAD:
      return <BadScoreEmoji />
    case DrillDownGrade.POOR:
      return <PoorScoreEmoji />
    case DrillDownGrade.AVERAGE:
      return <AverageScoreEmoji />
    case DrillDownGrade.GOOD:
      return <GoodScoreEmoji />
    case DrillDownGrade.OUTSTANDING:
      return <OutstandingScoreEmoji />
  }
}

const Container = styled.div`
  display: grid;
  grid-auto-flow: column;
  justify-content: start;
  gap: 1.2rem;
`
const TextWrapper = styled.div`
  display: grid;
  gap: 0.4rem;
`
const Title = styled.div`
  font-size: 1.6rem;
  font-weight: 500;
`
const Description = styled.div`
  font-size: 1.4rem;
  line-height: 2rem;
`
