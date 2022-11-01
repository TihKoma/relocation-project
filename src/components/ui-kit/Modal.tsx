import React, { FC, ReactNode, SyntheticEvent, useEffect } from 'react'
import { createPortal } from 'react-dom'
import styled from '@emotion/styled'

import { NormalizedButton } from '@/components/ui-kit/Button'
import { ReactComponent as CloseIcon } from '@/images/close.svg'
import { isServer } from '@/modules/utils/is-server'
import { mobileMedia } from '@/styles/media'

export type ModalController = {
  isVisible: boolean
  onRequestClose: (value: false) => void
}
type ModalProps = {
  isUnskippable?: boolean
  className?: string
  children: ReactNode
  onClick?: (event: SyntheticEvent<HTMLDivElement>) => void
} & ModalController

let counterOpenModal = 0
const useModal = (
  isVisible: ModalController['isVisible'],
  onRequestClose: ModalController['onRequestClose'],
) => {
  const onRequestCloseRef = React.useRef(onRequestClose)
  onRequestCloseRef.current = onRequestClose
  useEffect(() => {
    const handlerKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onRequestCloseRef.current(false)
      }
    }
    document.addEventListener('keyup', handlerKeyDown)
    return () => document.removeEventListener('keyup', handlerKeyDown)
  }, [])
  useEffect(() => {
    if (isVisible) {
      counterOpenModal++
      document.body.style.overflow = 'hidden'
      return () => {
        counterOpenModal--
        if (counterOpenModal === 0) {
          document.body.style.removeProperty('overflow')
        }
      }
    }
  }, [isVisible])
  return {
    onBackgroundClick: ({ target, currentTarget }: React.MouseEvent): void => {
      target === currentTarget && onRequestCloseRef.current(false)
    },
  }
}
export const ModalPortal: FC<ModalProps> = ({
  isUnskippable,
  isVisible,
  onRequestClose,
  children,
  className,
  onClick,
}) => {
  const { onBackgroundClick } = useModal(isVisible, onRequestClose)
  if (isServer || !isVisible) {
    return null
  }
  return createPortal(
    <Container
      onClick={(event) => {
        if (!isUnskippable) {
          onBackgroundClick(event)
        }
        onClick?.(event)
      }}
      className={className}
    >
      {children}
    </Container>,
    document.querySelector('#modalRoot') as HTMLElement,
  )
}

const ContainerCommon = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 1000;

  display: flex;

  overflow: auto;

  background: rgba(18, 21, 31, 0.7);
`
const Container = styled(ContainerCommon)`
  & > * {
    margin: auto;
  }
`

export const ModalLocal: FC<ModalProps> = ({
  isVisible,
  onRequestClose,
  children,
  className,
  onClick,
}) => {
  const { onBackgroundClick } = useModal(isVisible, onRequestClose)
  return (
    <>
      {isVisible && (
        <>
          <ContainerLocal
            onClick={(event) => {
              onBackgroundClick(event)
              onClick?.(event)
            }}
            className={className}
          />
          {children}
        </>
      )}
    </>
  )
}

const ContainerLocal = styled(ContainerCommon)`
  & + * {
    z-index: 100;
  }
`

const Wrapper = styled.div`
  max-width: 516px;

  position: relative;

  background: #ffffff;
  box-sizing: border-box;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.08),
    0 3.78px 33.4221px rgba(0, 0, 0, 0.0503198),
    0 41.7776px 33.4221px rgba(0, 0, 0, 0.0503198);
  border-radius: 32px;
`

const Button = styled(NormalizedButton)`
  padding: 8px;

  position: absolute;
  top: 34px;
  ${mobileMedia} {
    top: 28px;
  }
`
const ButtonCancel = styled(Button)`
  right: 34px;
  ${mobileMedia} {
    right: 14px;
  }
`

export const ModalContainer: FC<{
  className?: string
  onRequestClose?: ModalController['onRequestClose']
  children: ReactNode
  withCancelButton?: boolean
}> = ({ className, children, onRequestClose, withCancelButton = true }) => {
  return (
    <Wrapper className={className}>
      {children}
      {withCancelButton && onRequestClose && (
        <ButtonCancel onClick={() => onRequestClose(false)}>
          <CloseIcon />
        </ButtonCancel>
      )}
    </Wrapper>
  )
}
