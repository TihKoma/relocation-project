import { FC, ReactNode, useState } from 'react'
import styled from '@emotion/styled'
import { offset } from '@floating-ui/react-dom'
import {
  FloatingPortal,
  safePolygon,
  useDismiss,
  useFloating,
  useHover,
  useInteractions,
} from '@floating-ui/react-dom-interactions'

import {
  APPROXIMATE_HEIGHT_HEADER,
  BUTTON_INDENT_FROM_HEADER,
  HEIGHT_BACK_BUTTON,
  polyfillVh,
  ZOOM_BUTTON_INDENT_FROM_SHEET,
} from '@/components/shared/AreaLayout/shared'
import { NAVIGATION_BAR_HEIGHT } from '@/components/shared/layout'
import {
  ZOOM_LEVEL_CITY,
  ZOOM_LEVEL_NEIGHBORHOOD,
  ZOOM_LEVEL_STATE,
  ZOOM_LEVEL_WORLD,
} from '@/components/shared/maps/BaseMap/BaseMap'
import { useZoomMap } from '@/components/shared/maps/BaseMap/zoom-map-context'
import {
  useBottomSheet,
  useBottomSheetActions,
} from '@/components/ui-kit/BottomSheet/BottomSheetContext'
import { NormalizedButton } from '@/components/ui-kit/Button'
import {
  TooltipArrowCentered as TooltipArrowCenteredBase,
  ZoomCityIcon,
  ZoomNeighborhoodIcon,
  ZoomStateIcon,
  ZoomWorldIcon,
} from '@/images'
import { useIsMobileDevice } from '@/modules/device'
import { useCurrentBackgroundMap } from '@/modules/map'
import { mobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

export type ZoomLevel = 'neighborhood' | 'city' | 'state' | 'world'

type Props = {
  className?: string
}
export const ZoomLevelsButtons: FC<Props> = ({ className }) => {
  const { isOpen: isBottomSheetOpen } = useBottomSheet()
  const zoomButtons = [
    {
      zoomLevel: 'neighborhood',
      zoom: ZOOM_LEVEL_NEIGHBORHOOD,
      icon: <ZoomNeighborhoodIcon />,
      tooltipText: 'Show neighborhoods',
    },
    {
      zoomLevel: 'city',
      zoom: ZOOM_LEVEL_CITY,
      icon: <ZoomCityIcon />,
      tooltipText: 'Show cities',
    },
    {
      zoomLevel: 'state',
      zoom: ZOOM_LEVEL_STATE,
      icon: <ZoomStateIcon />,
      tooltipText: 'Show states',
    },
    {
      zoomLevel: 'world',
      zoom: ZOOM_LEVEL_WORLD,
      icon: <ZoomWorldIcon />,
      tooltipText: 'Show countries',
    },
  ]

  return (
    <Container className={className} isBottomSheetOpen={isBottomSheetOpen}>
      {zoomButtons.map(({ zoomLevel, zoom, icon, tooltipText }) => (
        <ZoomLevelButton
          isBottomSheetOpen={isBottomSheetOpen}
          zoomLevel={zoomLevel as ZoomLevel}
          zoom={zoom}
          icon={icon}
          tooltipText={tooltipText}
        />
      ))}
    </Container>
  )
}

type ZoomLevelButtonProps = {
  isBottomSheetOpen: boolean
  zoomLevel: ZoomLevel | null
  zoom: number
  icon: ReactNode
  tooltipText: string
}

const ZoomLevelButton: FC<ZoomLevelButtonProps> = ({
  isBottomSheetOpen,
  zoomLevel,
  zoom,
  icon,
  tooltipText,
}) => {
  const mapFacade = useCurrentBackgroundMap()
  const bottomSheetActions = useBottomSheetActions()
  const isMobile = useIsMobileDevice()
  const { zoomLevel: currentZoomLevel, setZoomLevel } = useZoomMap()
  const [open, setOpen] = useState(false)

  const { x, y, reference, floating, strategy, context } = useFloating({
    open,
    onOpenChange: (open) => {
      setOpen(open)
    },
    placement: 'left',
    strategy: 'fixed',
    middleware: [offset({ mainAxis: 14 })],
  })

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

  return (
    <>
      <ZoomButton
        {...referenceProps}
        onClick={() => {
          if (isMobile) {
            setOpen(false)
            bottomSheetActions.snapToBottom()
          }
          mapFacade?.zoomTo(zoom)
          setZoomLevel(zoomLevel as ZoomLevel)
        }}
        isBottomSheetOpen={isBottomSheetOpen}
        isActive={currentZoomLevel === zoomLevel}
      >
        {icon}
      </ZoomButton>
      <FloatingPortal>
        {open && (
          <Tooltip {...floatingProps}>
            <TooltipArrowCentered />
            {tooltipText}
          </Tooltip>
        )}
      </FloatingPortal>
    </>
  )
}

const Container = styled.div<{ isBottomSheetOpen: boolean }>`
  width: 4rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.1rem;

  border-radius: 2rem;
  background-color: ${getColorTheme('moon')};

  box-shadow: 0 0.2rem 0.4rem rgba(18, 21, 31, 0.08),
    0 0.4rem 1.6rem 0.1rem rgba(18, 21, 31, 0.08);

  ${mobileMedia} {
    position: fixed;
    bottom: 0;
    right: 1.6rem;

    --INDENT_TOP_SCREEN: calc(
      ${APPROXIMATE_HEIGHT_HEADER} + ${BUTTON_INDENT_FROM_HEADER} +
        ${HEIGHT_BACK_BUTTON} + ${NAVIGATION_BAR_HEIGHT}px
    );
    transform: translateY(
      calc(
        -1 * min((var(${polyfillVh}) - var(--INDENT_TOP_SCREEN)), (var(
                  --rsbs-overlay-h
                ) + ${ZOOM_BUTTON_INDENT_FROM_SHEET}))
      )
    );
    z-index: -1;
  }
`
const ZoomButton = styled(NormalizedButton)<{
  isActive: boolean
  isBottomSheetOpen: boolean
}>`
  width: 100%;
  height: 4.8rem;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${getColorTheme('earth')};

  cursor: pointer;

  &:first-of-type {
    border-radius: 2rem 2rem 0 0;
  }

  &:last-of-type {
    border-radius: 0 0 2rem 2rem;
  }
  
  
  ${mobileMedia} {
    &:first-of-type {
      border-radius: ${({ isBottomSheetOpen }) =>
        isBottomSheetOpen ? '50%' : '2rem 2rem 0 0'};
    }

    &:last-of-type {
      border-radius: ${({ isBottomSheetOpen }) =>
        isBottomSheetOpen ? '50%' : '0 0 2rem 2rem'};
    }
  }

  ${(props) =>
    props.isActive &&
    `
    & > svg > path {
      fill: ${getColorTheme('strokeAccentPrimary')(props)};
    }`};

  ${mobileMedia} {
    width: 4rem;
    height: 4rem;

    ${({ isBottomSheetOpen }) => isBottomSheetOpen && `border-radius: 50%`};
    
    ${({ isBottomSheetOpen, isActive }) =>
      isBottomSheetOpen && !isActive && 'display: none'};
`

const Tooltip = styled.div`
  padding: 0.4rem 0.8rem;

  top: 0;
  left: 0;

  font-weight: 400;
  font-size: 1.6rem;
  line-height: 2.4rem;

  background: ${getColorTheme('earth')};
  border-radius: 0.8rem;

  box-shadow: 0 0.4rem 1.6rem 0.1rem rgba(18, 21, 31, 0.08);
  z-index: 99999;
`

const TooltipArrowCentered = styled(TooltipArrowCenteredBase)`
  position: absolute;
  top: 50%;
  left: 100%;
  transform: translateY(-50%) scale(-1, -1);
`
