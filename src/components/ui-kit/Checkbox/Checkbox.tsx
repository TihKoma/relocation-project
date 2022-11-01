import { FC, MouseEvent } from 'react'
import styled from '@emotion/styled'

import { CheckmarkIcon } from '@/images'
import { getColorTheme } from '@/styles/themes'

type Props = {
  isChecked: boolean
  onChange: (value: boolean, e: MouseEvent) => void
  isError?: boolean
  isDisabled?: boolean
  className?: string
}
export const Checkbox: FC<Props> = ({
  isChecked,
  onChange,
  isDisabled,
  isError,
  className,
}) => {
  return (
    <Container
      className={className}
      onClick={(e) => !isDisabled && onChange(!isChecked, e)}
      isChecked={isChecked}
      isDisabled={isDisabled}
      isError={isError}
    >
      {isChecked && <CheckmarkIcon />}
      <HiddenInput />
    </Container>
  )
}

const Container = styled.div<{
  isChecked: boolean
  isError?: boolean
  isDisabled?: boolean
}>`
  min-width: 2.4rem;
  min-height: 2.4rem;
  max-width: 2.4rem;
  max-height: 2.4rem;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 0.6rem;
  cursor: ${(props) => (props.isDisabled ? 'default' : 'pointer')};

  ${(props) => {
    if (props.isDisabled) {
      return `
          background: ${
            props.isChecked
              ? getColorTheme('backgroundDefaultQuaternary')(props)
              : getColorTheme('backgroundDefaultSecondary')(props)
          };
          border: .2rem solid ${getColorTheme('strokeDefaultSecondary')(props)};
        `
    }

    if (props.isChecked) {
      return `
        background: ${getColorTheme('backgroundAccentPrimary')(props)};
        
        &:hover {
          background: ${getColorTheme('backgroundAccentSecondary')(props)};
        }
      `
    }

    return `
      background: inherit;
      border: .2rem solid ${getColorTheme('strokeDefaultSecondary')(props)};
      
      &:hover {
        border: .2rem solid ${getColorTheme('strokeAccentPrimary')(props)};
      }
    `
  }}
`
const HiddenInput = styled.input`
  display: none;
`
