import { FC, useState } from 'react'
import styled from '@emotion/styled'

import { DescriptionWorkMatch } from '@/components/shared/DescriptionWorkMatch'
import { NormalizedButton } from '@/components/ui-kit/Button'
import { InfoIcon as InfoIconBase } from '@/images'
import { HOVER_TRANSITION_TIME } from '@/styles/const'
import { notMobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

type Props = { className?: string }
export const DescriptionHowWorkWhere: FC<Props> = (props) => {
  const [isShowDescriptionWorkMatch, setIsShowDescriptionWorkMatch] =
    useState(false)
  return (
    <>
      <Button onClick={() => setIsShowDescriptionWorkMatch(true)} {...props}>
        <InfoIcon />
        <span>Learn more about how Where works</span>
      </Button>
      <DescriptionWorkMatch
        isVisible={isShowDescriptionWorkMatch}
        onRequestClose={setIsShowDescriptionWorkMatch}
      />
    </>
  )
}

const Button = styled(NormalizedButton)`
  display: flex;
  align-items: center;

  font-size: 1.4rem;
  line-height: 2rem;
  color: ${getColorTheme('neptune')};

  span {
    border-bottom: 0.1rem solid #3f37c9;
  }
  &,
  span,
  svg {
    transition: ${HOVER_TRANSITION_TIME};
  }
  &:hover {
    span {
      border-color: ${getColorTheme('neptune500')};
    }
    svg {
      fill: ${getColorTheme('neptune500')};
      stroke: ${getColorTheme('neptune500')};
    }
    color: ${getColorTheme('neptune500')};
  }
  ${notMobileMedia} {
    font-weight: 500;
  }
`
const InfoIcon = styled(InfoIconBase)`
  margin-right: 0.6rem;
`
