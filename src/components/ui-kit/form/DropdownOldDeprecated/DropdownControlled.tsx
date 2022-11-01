import { ReactNode, useCallback, useRef, useState, VFC } from 'react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Placement } from '@popperjs/core'
import { usePopper } from 'react-popper'
import { useClickAway } from 'react-use'

import { ArrowDownIcon } from '@/images'

export type DropdownComponentsProps = {
  isOpen: boolean
  onOpen?: () => void
  onClose?: () => void
}

export type DropdownControlledProps = {
  className?: string
  isOpen: boolean
  button: (props: DropdownComponentsProps) => ReactNode
  popup: (props: DropdownComponentsProps) => ReactNode
  popupClassName?: string
  showArrowIcon?: boolean
  arrowIconSize?: 'large' | 'small'
  onOpen?: () => void
  onClose?: () => void
  hasBackdrop?: boolean
  isPopupExpand?: boolean
  placement?: Placement
  isShowPopupOnHover?: boolean
  offset?: [number, number]
}

const containerStyle = css`
  position: relative;
  display: inline-block;
`

const ButtonContainer = styled.div<{ showIcon: boolean; size: string }>`
  padding-right: ${(props) =>
    props.showIcon ? (props.size === 'large' ? '2.8rem' : '2rem') : '0'};

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  user-select: none;
`

const Backdrop = styled.div`
  background: rgba(128, 128, 128, 0.33);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
`

const PopupWrapper = styled.div<{ isPopupExpand: boolean }>`
  transform-origin: top left;
  ${(props) => (props.isPopupExpand ? 'width: 100%' : '')};
`

const PopupStyle = styled.div`
  position: relative;
  z-index: 200;
  transform-origin: top left;
`

const IconWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  pointer-events: none;
`

const Icon = styled(ArrowDownIcon, { shouldForwardProp: () => false })<{
  isOpen: boolean
  size: string
}>`
  height: ${(props) => (props.size === 'large' ? '2.4rem' : '1.6rem')};
  width: ${(props) => (props.size === 'large' ? '2.4rem' : '1.6rem')};
  transform: rotate(${(props) => (props.isOpen ? '180deg' : '0deg')});
  transition: transform 0.1s linear;
`

export const DropdownControlled: VFC<DropdownControlledProps> = ({
  className,
  isOpen,
  button,
  popup,
  onOpen,
  onClose = () => {},
  showArrowIcon = true,
  arrowIconSize = 'small',
  popupClassName,
  hasBackdrop = false,
  placement = 'bottom-start',
  isPopupExpand = false,
  isShowPopupOnHover,
  offset = [0, 12],
}) => {
  const containerRef = useRef(null)
  const [buttonElement, setButtonElement] = useState<HTMLDivElement | null>(
    null,
  )
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null,
  )

  const [isMobile, setIsMobile] = useState(false)

  const { styles, attributes } = usePopper(buttonElement, popperElement, {
    placement,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: offset,
        },
      },
    ],
  })

  useClickAway(containerRef, () => {
    isOpen && onClose()
  })

  const onButtonClick = useCallback(() => {
    if (isOpen) {
      onClose && onClose()
    } else {
      onOpen && onOpen()
    }
  }, [isOpen, onOpen, onClose])

  const onMouseEnter = () => {
    if (isShowPopupOnHover && !isOpen && !isMobile) {
      onOpen?.()
    }
  }
  const onMouseLeave = () => {
    if (isShowPopupOnHover && isOpen && !isMobile) {
      onClose?.()
    }
    if (isMobile) {
      setIsMobile(false)
    }
  }

  return (
    <div ref={containerRef} css={containerStyle} className={className}>
      <ButtonContainer
        ref={setButtonElement}
        onClick={onButtonClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onTouchStart={() => setIsMobile(true)}
        showIcon={showArrowIcon}
        size={arrowIconSize}
      >
        {button({ isOpen })}
        {isOpen && hasBackdrop && <Backdrop onClick={onClose} />}
        {isOpen && (
          <PopupStyle>
            <PopupWrapper
              isPopupExpand={isPopupExpand}
              className={popupClassName}
              ref={setPopperElement}
              style={styles.popper}
              {...attributes.popper}
            >
              {popup({ isOpen, onClose })}
            </PopupWrapper>
          </PopupStyle>
        )}
      </ButtonContainer>
      {showArrowIcon && (
        <IconWrapper>
          <Icon isOpen={isOpen} size={arrowIconSize} />
        </IconWrapper>
      )}
    </div>
  )
}
