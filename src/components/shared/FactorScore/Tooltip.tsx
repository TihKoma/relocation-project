import { FC, ReactNode, useRef, useState } from 'react'
import styled from '@emotion/styled'
import { arrow, flip, offset } from '@floating-ui/react-dom'
import {
  FloatingPortal,
  safePolygon,
  useClick,
  useDismiss,
  useFloating,
  useHover,
  useInteractions,
} from '@floating-ui/react-dom-interactions'

import { MobileModal } from '@/components/shared/MobileModal'
import { InfoIcon, TooltipArrowCentered } from '@/images'
import { useIsMobileDevice } from '@/modules/device'
import { mobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

type Props = {
  children?: ReactNode
  className?: string
}
export const Tooltip: FC<Props> = ({ children, className }) => {
  const [open, setOpen] = useState(false)
  const arrowRef = useRef<HTMLDivElement>(null)
  const {
    x,
    y,
    reference,
    floating,
    strategy,
    placement,
    context,
    middlewareData: { arrow: { y: arrowY, x: arrowX } = {} },
  } = useFloating({
    open,
    onOpenChange: (open) => {
      setOpen(open)
    },
    placement: 'right',
    middleware: [offset(9), flip(), arrow({ element: arrowRef })],
  })

  const isMobile = useIsMobileDevice()

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useDismiss(context),
    useHover(context, {
      delay: {
        close: 100,
      },
      handleClose: safePolygon({
        buffer: 1,
      }),
      enabled: !isMobile,
    }),
    useClick(context, {
      ignoreMouse: true,
    }),
  ])

  const referenceProps = getReferenceProps({ ref: reference })
  const floatingProps = {
    ...getFloatingProps({ ref: floating }),
    style: {
      position: strategy,
      top: y ?? '',
      left: x ?? '',
    },
  }

  const arrowStyles =
    placement === 'right'
      ? {
          left: 0,
          transform: `translate(calc(${arrowX || 0}px - 100%), ${
            arrowY || 0
          }px)`,
        }
      : {
          right: 0,
          transform: `translate(calc(${arrowX || 0}px + 100%), ${
            arrowY || 0
          }px) scaleX(-1)`,
        }

  return (
    <>
      <InfoIcon className={className} ref={reference} {...referenceProps} />
      <FloatingPortal>
        {open && isMobile && (
          <MobileModal ref={floating} onClose={() => setOpen(false)}>
            {children}
          </MobileModal>
        )}
        {open && !isMobile && (
          <Container ref={floating} {...(isMobile ? {} : floatingProps)}>
            {children}
            <ArrowWrapper ref={arrowRef} style={arrowStyles}>
              <TooltipArrowCentered />
            </ArrowWrapper>
          </Container>
        )}
      </FloatingPortal>
    </>
  )
}

const Container = styled.div`
  padding: 1.6rem;

  background: ${getColorTheme('earth')};
  border-radius: 1.6rem;
  filter: drop-shadow(0px 2px 8px rgba(18, 21, 31, 0.04))
    drop-shadow(0px 6px 24px rgba(18, 21, 31, 0.1));
`
const ArrowWrapper = styled.div`
  position: absolute;
  top: 0;

  ${mobileMedia} {
    display: none;
  }
`
