import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  forwardRef,
  LegacyRef,
} from 'react'
import styled from '@emotion/styled'

import { FactorScoreModel } from '@/components/shared/FactorScore'
import { NormalizedButton } from '@/components/ui-kit/Button'
import { InfoIcon as InfoIconBase } from '@/images'
import { mobileMedia, notMobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

type TotalButtonProps = {
  totalSessionsCount?: number
  isPreview?: boolean
}

type Props = Pick<FactorsScoreProps, 'total'> &
  DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > &
  TotalButtonProps

export const TotalButton = forwardRef(
  (
    { total, totalSessionsCount, isPreview, ...props }: Props,
    ref: LegacyRef<HTMLButtonElement> | undefined,
  ) => {
    return (
      <Text
        // @ts-ignore
        ref={ref}
        total={total}
        isPreview={isPreview}
        {...props}
      >
        <ScoreText>match</ScoreText>
        <span>{total}%</span>
        {(!totalSessionsCount || totalSessionsCount <= 5) && !isPreview && (
          <InfoIcon />
        )}
      </Text>
    )
  },
)

const Text = styled(NormalizedButton)<{
  total: number
  isPreview: boolean | undefined
}>`
  padding: 1.2rem 1rem 1.4rem;

  ${notMobileMedia} {
    ${({ isPreview }) =>
      isPreview
        ? `
        padding-top: 2.6rem;
        
        border-radius: 0 0 0 1.6rem;`
        : ''}
  }

  ${mobileMedia} {
    padding-top: 3rem;

    border-radius: 0 0 0 1.6rem;
  }

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  font-weight: 500;
  font-size: 1.6rem;
  line-height: 2.2rem;
  letter-spacing: -0.04em;
  color: ${getColorTheme('earth')};

  background: ${({ total }) => {
    if (total < 20) {
      return getColorTheme('mars')
    }
    if (total < 30) {
      return getColorTheme('titan')
    }
    if (total < 40) {
      return getColorTheme('saturn')
    }
    if (total < 50) {
      return getColorTheme('tethys')
    }
    if (total < 60) {
      return getColorTheme('rhea')
    }
    if (total < 75) {
      return getColorTheme('metis')
    }
    return getColorTheme('jupiter')
  }};
  border-radius: 0 1.6rem;
`

const ScoreText = styled.span`
  font-weight: 400;
  font-size: 1.2rem;
  line-height: 1.6rem;
`

const InfoIcon = styled(InfoIconBase)`
  margin: 0.6rem auto 0;

  & > path {
    fill: rgba(255, 255, 255, 0.8);
  }
`

export type FactorsScoreProps = {
  total: number
  scores: FactorScoreModel[]
  neighborhood: string
  onOpen: () => void
  isPreview?: boolean
  onInfoOpen?: () => void
  totalSessionsCount?: number
  onClose: () => void
}
