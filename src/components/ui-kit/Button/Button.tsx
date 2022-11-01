import {
  ComponentPropsWithoutRef,
  ElementType,
  forwardRef,
  ReactElement,
  ReactNode,
} from 'react'
import styled from '@emotion/styled'

import { Loader } from '@/components/ui-kit/Loader'
import { HOVER_TRANSITION_TIME } from '@/styles/const'
import { getColorTheme, PropsTheme } from '@/styles/themes'

type ViewType = 'primary' | 'secondary' | 'ghost' | 'tertiary'
type Size = 'large' | 'medium' | 'small' | 'xSmall'
type BackgroundUnderButton = 'default' | 'alt' | 'map'

type ButtonStyleProps = {
  viewType: ViewType
  size: Size
  backgroundUnderButton: BackgroundUnderButton
  fullWidth: boolean
}
type Props = {
  className?: string
  children?: ReactNode
  disabled?: boolean
  loading?: boolean
  Icon?: ReactElement
  iconPosition?: 'left' | 'right'
  as?: any
} & Partial<ButtonStyleProps> &
  ComponentPropsWithoutRef<'button'>

export const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
      viewType = 'primary',
      size = 'medium',
      backgroundUnderButton = 'default',
      className,
      children,
      Icon,
      iconPosition = 'right',
      type = 'button',
      fullWidth = false,
      loading = false,
      ...props
    },
    ref,
  ) => {
    let loaderColor: ComponentPropsWithoutRef<typeof Loader>['color'] =
      'neptune'
    if (
      (viewType === 'primary' && backgroundUnderButton === 'default') ||
      (viewType !== 'primary' && backgroundUnderButton === 'alt')
    ) {
      loaderColor = 'earth'
    }
    return (
      <Container
        ref={ref}
        viewType={viewType}
        size={size}
        backgroundUnderButton={backgroundUnderButton}
        className={className}
        round={!children}
        type={type}
        fullWidth={fullWidth}
        {...props}
      >
        {loading ? (
          <Loader withGradient size={'xSmall'} color={loaderColor} />
        ) : (
          <>
            {Icon && iconPosition === 'left' ? Icon : null}
            {children}
            {Icon && iconPosition === 'right' ? Icon : null}
          </>
        )}
      </Container>
    )
  },
)

const size = {
  large: `
    height: 7.2rem;
    width: 7.2rem;
    min-width: 7.2rem;
    padding: 0 4rem;

    border-radius: 4rem;
    font-size: 2.2rem;
  `,
  medium: `
    height: 5.6rem;
    width: 5.6rem;
    min-width: 5.6rem;
    padding: 0 2.4rem;

    border-radius: 4rem;
    font-size: 1.6rem;
  `,
  small: `
    height: 4rem;
    width: 4rem;
    min-width: 4rem;
    padding: 0 1.6rem;

    border-radius: 4rem;
    font-size: 1.6rem;
  `,
  xSmall: `
    height: 3.2rem;
    width: 3.2rem;
    min-width: 3.2rem;
    padding: 0 1.6rem;
    
    border-radius: 4rem;
    font-size: 1.4rem;
  `,
}

const getButtonColors = ({
  backgroundUnderButton,
  viewType,
  ...props
}: PropsTheme & ButtonStyleProps) => {
  return {
    default: {
      primary: `
        background-color: ${getColorTheme('neptune')(props)};
        border-color: transparent;
        color: ${getColorTheme('earth')(props)};
        & svg {
          fill: currentColor;
          stroke: currentColor;
        }
        @media (hover: hover) {
          &:hover {
            background-color: ${getColorTheme('pluto')(props)};
          }
        }
        &:disabled {
          background-color: ${getColorTheme('sun50')(props)};
          border-color: transparent;
          color: ${getColorTheme('sun500')(props)};
        }
      `,
      secondary: `
        background-color: transparent;
        border-color: ${getColorTheme('sun200')(props)};
        color: ${getColorTheme('sun')(props)};
        & svg {
          fill: currentColor;
          stroke: currentColor;
        }
        @media (hover: hover) {
          &:hover {
            border-color: ${getColorTheme('neptune')(props)};
            color: ${getColorTheme('neptune')(props)};
            & svg {
              fill: ${getColorTheme('sun')(props)};
              stroke: ${getColorTheme('sun')(props)};
            }
          }
        }
        &:disabled {
          background-color: ${getColorTheme('earth')(props)};
          border-color: ${getColorTheme('sun200')(props)};
          color: ${getColorTheme('sun500')(props)};
        }
      `,
      ghost: `
        background-color: transparent;
        border-color: transparent;
        color: ${getColorTheme('neptune')(props)};
        & svg {
          fill: ${getColorTheme('sun')(props)};
          stroke: ${getColorTheme('sun')(props)};
        }
        @media (hover: hover) {
          &:hover {
            background-color: ${getColorTheme('sun50')(props)};
          }
        }
        &:disabled {
          color: ${getColorTheme('sun500')(props)};
          & svg {
            fill: currentColor;
            stroke: currentColor;
          }
        }
      `,
      tertiary: `
        background-color: ${getColorTheme('sun50')(props)};
        border-color: ${getColorTheme('sun50')(props)};
        color: ${getColorTheme('sun')(props)};
        & svg {
          fill: currentColor;
          stroke: currentColor;
        }
      `,
    },
    alt: {
      primary: `
        background-color: ${getColorTheme('earth')(props)};
        border-color: transparent;
        color: ${getColorTheme('neptune')(props)};
        & svg {
          fill: currentColor;
          stroke: currentColor;
        }
        @media (hover: hover) {
          &:hover {
            background-color: ${getColorTheme('sun200')(props)};
          }
        }
        &:disabled {
          color: ${getColorTheme('sun500')(props)};
        }
      `,
      secondary: `
        background-color: transparent;
        border-color: ${getColorTheme('earth500alpha')(props)};
        color: ${getColorTheme('earth')(props)};
        & svg {
          fill: currentColor;
          stroke: currentColor;
        }
        @media (hover: hover) {
          &:hover {
            background-color: ${getColorTheme('earth500alpha')(props)};
            border-color: ${getColorTheme('earth')(props)};
          }
        }
        &:disabled {
          color: ${getColorTheme('earth500alpha')(props)};
        }
      `,
      ghost: `
        background-color: transparent;
        border-color: transparent;
        color: ${getColorTheme('earth')(props)};
        & svg {
          fill: currentColor;
          stroke: currentColor;
        }
        @media (hover: hover) {
          &:hover {
            background-color: ${getColorTheme('earth500alpha')(props)};
          }
        }
        &:disabled {
          color: ${getColorTheme('earth500alpha')(props)};
        }
      `,
      tertiary: ``,
    },
    map: {
      primary: `
        background-color: ${getColorTheme('earth')(props)};;
        border-color: transparent;
        color: ${getColorTheme('neptune')(props)};
        box-shadow: 0px 2px 4px rgba(18, 21, 31, 0.08), 0px 4px 16px 1px rgba(18, 21, 31, 0.08);
        & svg {
          fill: currentColor;
          stroke: currentColor;
        }
        @media (hover: hover) {
          &:hover {
            background-color: ${getColorTheme('sun200')(props)};
          }
        }
        &:disabled {
          color: ${getColorTheme('sun500')(props)};
        }
      `,
      secondary: `
        background-color: ${getColorTheme('earth800alpha')(props)};;
        border-color: transparent;
        color: ${getColorTheme('sun')(props)};
        & svg {
          fill: currentColor;
          stroke: currentColor;
        }
        @media (hover: hover) {
          &:hover {
            background-color: ${getColorTheme('earth')(props)};
          }
        }
        &:disabled {
          color: ${getColorTheme('sun500')(props)};
        }
      `,
      tertiary: ``,
    },
  }[backgroundUnderButton][viewType]
}

export const NormalizedButton = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<'button'> & { as?: ElementType<any> }
>(({ type = 'button', ...props }, ref) => {
  return <NormalizedButtonStyle ref={ref} type={type} {...props} />
})

export const NormalizedButtonStyle = styled.button`
  padding: 0;

  appearance: none;
  background: none;
  border: 0;
  cursor: pointer;
  outline: none;
  overflow: visible;

  color: inherit;
  font: inherit;
  line-height: normal;
`

const Container = styled(NormalizedButtonStyle)<
  ButtonStyleProps & { round: boolean }
>`
  ${(props) => size[props.size]}
  ${getButtonColors};

  ${(props) =>
    props.round
      ? 'padding: 0'
      : `
    width: unset;
    min-width: unset;
  `};

  ${(props) =>
    props.fullWidth
      ? `
    width: 100%;
  `
      : ''}

  ${(props) =>
    props.round && props.backgroundUnderButton === 'map'
      ? `
    &:not(:disabled) svg {
      fill: ${getColorTheme('sun')(props)};
      stroke: ${getColorTheme('sun')(props)};
    }
  `
      : ''}

  display: inline-grid;
  gap: 0.8rem;
  align-items: center;
  justify-content: center;
  grid-auto-flow: column;

  border-width: 0.2rem;
  border-style: solid;

  white-space: nowrap;

  transition: color ${HOVER_TRANSITION_TIME} ease,
    background-color ${HOVER_TRANSITION_TIME} ease,
    border-color ${HOVER_TRANSITION_TIME} ease;

  &::before {
    margin-right: 100%;
  }
  &:disabled {
    pointer-events: none;
  }
`
