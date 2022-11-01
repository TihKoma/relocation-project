import { VFC } from 'react'
import styled from '@emotion/styled'

import { NormalizedButton } from '@/components/ui-kit/Button'
import { Dropdown } from '@/components/ui-kit/Dropdown'
import { ArrowDownIcon } from '@/images'
import { getColorTheme } from '@/styles/themes'

const DROPDOWN_OFFSET: [number, number] = [8, 0]
type Size = 'small' | 'xSmall'
// Design system: https://www.figma.com/file/VbeQSkYd8FIii8BzOL6F12/%E2%9D%96-Core?node-id=5001%3A52534
type Props = {
  title: string
  isSelected?: boolean
  className?: string
  icon?: JSX.Element
  withArrow?: boolean
  onOpenChange?: (open: boolean) => void
  isOnlyIcon?: boolean
  onClick?: () => void
  children?: (options: {
    closeDropdown: () => void
  }) => JSX.Element | JSX.Element[]
  isPopupPortal?: boolean
  size?: Size
}
export const DropdownButton: VFC<Props> = ({
  title,
  children,
  className,
  isSelected,
  icon,
  isOnlyIcon,
  onClick,
  withArrow,
  onOpenChange,
  isPopupPortal,
  size = 'small',
}) => {
  return (
    <Dropdown
      onOpenChange={onOpenChange}
      offset={DROPDOWN_OFFSET}
      isPortal={isPopupPortal}
      buttonRender={({ isDropdownOpened, referenceProps }) => (
        <Container
          size={size}
          isOnlyIcon={isOnlyIcon}
          isSelected={isSelected}
          className={className}
          isFocused={isDropdownOpened}
          {...referenceProps}
          onClick={(e) => {
            if (
              referenceProps &&
              typeof referenceProps.onClick === 'function'
            ) {
              referenceProps.onClick(e)
            }
            onClick?.()
          }}
        >
          {icon && (
            <IconContainer isOnlyIcon={isOnlyIcon}>{icon}</IconContainer>
          )}
          {!isOnlyIcon && title}
          {withArrow && !isOnlyIcon && (
            <ArrowIcon isOpened={isDropdownOpened} />
          )}
        </Container>
      )}
    >
      {children}
    </Dropdown>
  )
}

const Container = styled(NormalizedButton)<{
  isFocused: boolean
  isOnlyIcon?: boolean
  isSelected?: boolean
  size: Size
}>`
  height: ${(props) => (props.size === 'small' ? '4rem' : '3.2rem')};
  ${(props) => (props.isOnlyIcon ? 'width: 4rem;' : 'padding: 1rem 1.2rem;')}

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${getColorTheme('earth')};
  border: 2px solid ${getColorTheme('sun200')};
  border-radius: 40px;
  white-space: nowrap;

  transition: border 0.3s, color 0.3s;

  border-color: ${(props) => {
    if (props.isSelected && props.isFocused) {
      return getColorTheme('pluto')(props)
    }
    if (props.isSelected || props.isFocused) {
      return getColorTheme('neptune')(props)
    }
    return getColorTheme('sun200')(props)
  }};
  color: ${(props) => {
    if (props.isFocused) {
      return getColorTheme('neptune')(props)
    }
    return getColorTheme('sun')(props)
  }};
  ${(props) => {
    if (props.isFocused) {
      return `
        ${ArrowIcon} path {
            fill: ${getColorTheme('neptune')(props)};
          }
      `
    }
  }}

  &:hover {
    ${(props) => {
      if (props.isSelected) {
        return `
          border-color: ${getColorTheme('pluto')(props)};
          color: ${getColorTheme('neptune')(props)};
          ${ArrowIcon} path {
            fill: ${getColorTheme('neptune')(props)};
          }
        `
      }
      return `
        border-color: ${getColorTheme('neptune')(props)};
        color: ${getColorTheme('neptune')(props)};
      `
    }}
`
const IconContainer = styled.div<{ isOnlyIcon?: boolean }>`
  ${(props) =>
    props.isOnlyIcon
      ? ''
      : `
      margin-right: 0.8rem;
      margin-left: 0.4rem;
    `}

  display: flex;
  align-items: center;
`
const ArrowIcon = styled(ArrowDownIcon)<{ isOpened: boolean }>`
  margin-right: 0.3rem;
  margin-left: 0.7rem;

  display: flex;
  align-items: center;

  transform: ${(props) => (props.isOpened ? 'rotate(180deg)' : 'rotate(0)')};
`
