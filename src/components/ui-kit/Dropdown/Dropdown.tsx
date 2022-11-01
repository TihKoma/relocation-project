import { FC, MouseEvent, useEffect } from 'react'
import styled from '@emotion/styled'
import { Placement } from '@floating-ui/react-dom'
import { FloatingPortal } from '@floating-ui/react-dom-interactions'

import { useDropdown } from './use-dropdown'

export type ButtonRenderOptions = {
  isDropdownOpened: boolean
  referenceProps: Record<string, unknown>
}

type Props = {
  className?: string
  onOpenChange?: (open: boolean) => void
  offset?: [number, number]
  buttonRender: (options: ButtonRenderOptions) => JSX.Element
  children?: (options: {
    closeDropdown: () => void
  }) => JSX.Element | JSX.Element[]
  onClick?: (event: MouseEvent) => void
  isPortal?: boolean
  isShowPopupOnHover?: boolean
  placement?: Placement
}

export const Dropdown: FC<Props> = ({
  children,
  className,
  offset,
  onOpenChange,
  isPortal,
  buttonRender,
  onClick,
  isShowPopupOnHover,
  placement,
}) => {
  const {
    isDropdownOpened,
    closeDropdown,
    floatingProps,
    referenceProps,
    middlewareData,
  } = useDropdown(onOpenChange, offset, placement, isShowPopupOnHover)

  const popup = (
    <Popup {...floatingProps}>{children?.({ closeDropdown })}</Popup>
  )

  const popupWrapper = isPortal ? (
    <FloatingPortal>{popup}</FloatingPortal>
  ) : (
    popup
  )
  useEffect(() => {
    if (middlewareData.hide?.referenceHidden) closeDropdown()
  }, [middlewareData.hide?.referenceHidden, closeDropdown])

  return (
    <Container className={className} onClick={onClick}>
      {buttonRender({
        isDropdownOpened,
        referenceProps,
      })}
      {isDropdownOpened && popupWrapper}
    </Container>
  )
}

const Container = styled.div``
const Popup = styled.div`
  padding: 0;

  display: flex;
  flex-direction: column;

  z-index: 99;

  background: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08),
    0 3.78px 33.4221px rgba(0, 0, 0, 0.06);
  border-radius: 1.2rem;
  overflow: hidden;
`
