import { ButtonHTMLAttributes, FC } from 'react'
import styled from '@emotion/styled'

import { NormalizedButton } from '@/components/ui-kit/Button'
import { getColorTheme } from '@/styles/themes'

type Props = {
  icon?: JSX.Element
  isSelected?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Option: FC<Props> = ({ children, icon, ...props }) => {
  return (
    <OptionContainer {...props}>
      {icon}
      <Text>{children}</Text>
    </OptionContainer>
  )
}

const Text = styled.div`
  height: 100%;

  display: flex;
  align-items: center;
  flex-grow: 1;

  font-weight: normal;
  font-size: 1.6rem;
  line-height: 2rem;
  white-space: nowrap;
`
const OptionContainer = styled(NormalizedButton)<{ isSelected?: boolean }>`
  height: 4rem;
  width: 100%;
  min-width: 10.4rem;
  padding: 0.8rem 1.6rem;

  display: flex;
  align-items: center;

  transition: 225ms;

  color: ${getColorTheme('sun')};

  ${(props) => {
    if (props.isSelected) {
      return `
        background-color: ${getColorTheme('neptune')(props)};
        color: ${getColorTheme('earth')(props)};
      `
    }
  }}

  svg {
    margin-right: 0.8rem;
  }
  &:hover {
    background: ${getColorTheme('moon')};
    color: ${getColorTheme('sun')};
  }
  &:disabled {
    color: ${getColorTheme('textDefaultSecondary')};
    pointer-events: none;
  }
`
