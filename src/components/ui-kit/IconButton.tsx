import {
  ButtonHTMLAttributes,
  FC,
  FocusEventHandler,
  MouseEventHandler,
  ReactElement,
} from 'react'
import styled from '@emotion/styled'

import { getColorTheme, PropsTheme } from '@/styles/themes'

import { NormalizedButton as NormalizedButtonBase } from './Button'

type size = 'small' | 'medium'
type viewType = 'primary' | 'secondary'

type Props = {
  Icon: ReactElement
  className?: string
  disabled?: boolean
  isLoading?: boolean
  onBlur?: FocusEventHandler
  onClick?: MouseEventHandler
  onFocus?: FocusEventHandler
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
}
type Mixin = {
  size: {
    [key in size]: string
  }
  viewType: {
    [key in viewType]: (props: PropsTheme) => string
  }
}

const IconButtonComponent: FC<Props> & Mixin = ({
  className,
  disabled = false,
  Icon = null,
  onBlur,
  isLoading = false,
  onClick,
  onFocus,
  type = 'button',
}) => {
  return (
    <Container
      type={type}
      className={className}
      disabled={disabled || isLoading}
      onClick={onClick}
      onBlur={onBlur}
      onFocus={onFocus}
    >
      {Icon}
    </Container>
  )
}
const Container = styled(NormalizedButtonBase)`
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  &:disabled {
    cursor: default;
    background-color: ${getColorTheme('mercury')};
    box-shadow: none;
  }
`
IconButtonComponent.size = {
  small: `
    height: 3.6rem;
    width: 3.6rem;
  `,
  medium: `
    height: 4rem;
    width: 4rem;
  `,
}

IconButtonComponent.viewType = {
  primary: (props) => `
    background-color: ${getColorTheme('neptune')(props)};

    svg {
      fill: ${getColorTheme('earth')(props)};
      stroke: ${getColorTheme('earth')(props)};
    }
    :hover:not(:disabled) {
      background-color: ${getColorTheme('pluto')(props)};
    }
  `,
  secondary: (props) => `
    background-color: ${getColorTheme('earth')(props)};
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.08);

    :hover:not(:disabled) {

      svg {
        fill: ${getColorTheme('mercury')(props)};
        stroke: ${getColorTheme('mercury')(props)};
      }
    }
  `,
}

export const IconButton = IconButtonComponent as typeof IconButtonComponent &
  Required<Mixin>
