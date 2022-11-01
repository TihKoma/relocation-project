import { FC, ReactNode, useRef, useState } from 'react'
import styled from '@emotion/styled'
import { arrow, flip, limitShift, offset, shift } from '@floating-ui/react-dom'
import {
  FloatingPortal,
  safePolygon,
  useClick,
  useDismiss,
  useFloating,
  useHover,
  useInteractions,
} from '@floating-ui/react-dom-interactions'

import { MobileModal as MobileModalBase } from '@/components/shared/MobileModal'
import {
  InfoIcon as InfoIconBase,
  TooltipArrow as TooltipArrowBase,
} from '@/images'
import { useIsMobileDevice } from '@/modules/device'
import { mobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

type TitleProps = {
  className?: string
  title: string
  tooltipText?: string | ReactNode
}

export const TitleWithTooltip: FC<TitleProps> = ({
  className,
  title,
  tooltipText,
}) => {
  const [open, setOpen] = useState(false)
  const arrowRef = useRef(null)

  const {
    x,
    y,
    reference,
    floating,
    strategy,
    placement,
    context,
    middlewareData: { arrow: { y: arrowY } = {} },
  } = useFloating({
    open,
    onOpenChange: (open) => {
      setOpen(open)
    },
    strategy: 'fixed',
    middleware: [
      offset(16),
      shift({
        limiter: limitShift({
          offset: ({ rects }) => ({
            mainAxis: rects.floating.width,
          }),
        }),
      }),
      flip(),
      arrow({ element: arrowRef }),
    ],
  })

  const staticSide =
    {
      top: 'bottom',
      right: 'left',
      bottom: 'top',
      left: 'right',
    }[placement.split('-')[0]] || 'top'

  const arrowStyles = {
    left: `1.6rem`,
    top: arrowY != null ? `${arrowY}px` : '',
    right: '',
    bottom: '',
    [staticSide]: '-1rem',
    transform: `${placement === 'top' ? `scaleY(-1)` : ''}`,
  }

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useDismiss(context),
    useHover(context, {
      delay: {
        close: 300,
      },
      handleClose: safePolygon({
        buffer: 1,
      }),
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

  const isMobile = useIsMobileDevice()

  return (
    <Title className={className}>
      {title}
      {tooltipText && (
        <Info {...referenceProps}>
          <InfoIcon />
        </Info>
      )}
      <FloatingPortal>
        {open && tooltipText && isMobile && (
          <MobileModal ref={floating} onClose={() => setOpen(false)}>
            {tooltipText}
          </MobileModal>
        )}
        {open && tooltipText && !isMobile && (
          <Tooltip {...floatingProps}>
            <TooltipArrow ref={arrowRef} style={arrowStyles} />
            {tooltipText}
          </Tooltip>
        )}
      </FloatingPortal>
    </Title>
  )
}

const Title = styled.div`
  position: relative;

  display: grid;
  grid-template-columns: repeat(2, max-content);
  align-items: center;
  gap: 0.6rem;

  color: ${getColorTheme('sun')};
  font-size: 2rem;
  font-weight: 500;

  ${mobileMedia} {
    font-size: 1.8rem;
  }
`

const Info = styled.div`
  display: flex;
  align-items: center;
`

const InfoIcon = styled(InfoIconBase)`
  cursor: pointer;

  fill: ${getColorTheme('sun500')};

  transition: fill 0.3s ease;

  &:hover {
    fill: ${getColorTheme('sun1000')};
  }
`

const Tooltip = styled.div`
  max-width: 37.2rem;
  padding: 1.6rem;

  top: 0;
  left: 0;

  font-weight: 400;
  font-size: 1.6rem;
  line-height: 2.4rem;

  background: ${getColorTheme('earth')};
  border-radius: 1.6rem;

  box-shadow: 0 6px 24px 0 rgba(18, 21, 31, 0.1),
    0 2px 8px 0 rgba(18, 21, 31, 0.04);
  z-index: 99999;
`

const TooltipArrow = styled(TooltipArrowBase)`
  position: absolute;

  & > path {
    fill: ${getColorTheme('earth')};
  }
`
const MobileModal = styled(MobileModalBase)`
  padding: 2.4rem 1.6rem;
`
