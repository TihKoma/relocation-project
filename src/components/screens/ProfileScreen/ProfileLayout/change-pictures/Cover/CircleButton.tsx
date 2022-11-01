import { FC, HTMLAttributes, ReactNode } from 'react'
import styled from '@emotion/styled'

import { NormalizedButton } from '@/components/ui-kit/Button'
import { ButtonRenderOptions } from '@/components/ui-kit/Dropdown'
import { getColorTheme } from '@/styles/themes'

type Props = {
  withBackground?: boolean
  children?: ReactNode
} & Partial<ButtonRenderOptions> &
  HTMLAttributes<HTMLButtonElement>

// TODO replace this button with ui-kit's circle button, when it is added
export const CircleButton: FC<Props> = ({
  isDropdownOpened = false,
  withBackground,
  referenceProps = {},
  children,
  ...props
}) => {
  return (
    <ButtonContainer
      isOpen={isDropdownOpened}
      withBackground={withBackground}
      {...props}
      {...referenceProps}
    >
      {children}
    </ButtonContainer>
  )
}

const ButtonContainer = styled(NormalizedButton)<{
  isOpen?: boolean
  withBackground?: boolean
}>`
  width: 4rem;
  height: 4rem;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  ${(props) =>
    props.withBackground
      ? `
    background-color: ${
      props.isOpen
        ? getColorTheme('moon')(props)
        : getColorTheme('earth')(props)
    };
    filter: ${
      props.isOpen
        ? 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.08)) drop-shadow(0px 3.78px 33.4221px rgba(0, 0, 0, 0.06))'
        : 'none'
    };
    
    background-color: ${getColorTheme('earth')};
    filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.08))
      drop-shadow(0px 3.78px 33.4221px rgba(0, 0, 0, 0.06));
  `
      : ''}

  cursor: pointer;
`
