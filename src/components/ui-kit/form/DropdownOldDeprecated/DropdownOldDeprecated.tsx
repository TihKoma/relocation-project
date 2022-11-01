import { ReactNode, useCallback, useEffect, useState } from 'react'
import { CSSObject } from '@emotion/styled'
import { SerializedStyles } from '@emotion/utils'
import { Placement } from '@popperjs/core'

import {
  DropdownComponentsProps,
  DropdownControlled,
} from './DropdownControlled'

export type DropdownProps = {
  className?: string
  button: (props: DropdownComponentsProps) => ReactNode
  popup: (props: DropdownComponentsProps) => ReactNode
  containerCss?: SerializedStyles | CSSObject
  showArrowIcon?: boolean
  placement?: Placement
  disabled?: boolean
  isShowPopupOnHover?: boolean
  offset?: [number, number]
  arrowIconSize?: 'large' | 'small'
  hideForSession?: () => void
  onOpened?: () => void
}

export const DropdownOldDeprecated = ({
  button,
  popup,
  className,
  containerCss,
  showArrowIcon,
  placement,
  disabled,
  onOpened,
  isShowPopupOnHover,
  offset,
  arrowIconSize,
  hideForSession,
}: DropdownProps) => {
  const [open, setOpen] = useState(false)

  const onOpen = useCallback(() => {
    if (!disabled) {
      setOpen(true)
      onOpened?.()
    }
  }, [disabled, onOpened])

  const onClose = useCallback(() => {
    hideForSession?.()
    setOpen(false)
  }, [hideForSession])

  useEffect(() => {
    return () => {
      setOpen(false)
    }
  }, [])

  return (
    <DropdownControlled
      //@ts-ignore
      css={containerCss}
      className={className}
      isOpen={open}
      onOpen={onOpen}
      onClose={onClose}
      button={button}
      placement={placement}
      popup={popup}
      showArrowIcon={showArrowIcon}
      isShowPopupOnHover={isShowPopupOnHover}
      offset={offset}
      arrowIconSize={arrowIconSize}
    />
  )
}
