import { useCallback, useState } from 'react'
import { autoUpdate, hide, shift } from '@floating-ui/react-dom'
import {
  offset,
  Placement,
  safePolygon,
  useClick,
  useDismiss,
  useFloating,
  useHover,
  useInteractions,
} from '@floating-ui/react-dom-interactions'

export const useDropdown = (
  onOpenChange?: (open: boolean) => void,
  offsetValue?: [number, number],
  placement: Placement = 'bottom',
  isShowPopupOnHover?: boolean,
) => {
  const [open, setOpen] = useState(false)
  const { x, y, reference, floating, strategy, context, middlewareData } =
    useFloating({
      placement,
      open,
      onOpenChange: (open) => {
        setOpen(open)
        onOpenChange?.(open)
      },
      whileElementsMounted: autoUpdate,
      middleware: [
        offset(
          offsetValue
            ? {
                mainAxis: offsetValue[0],
                crossAxis: offsetValue[1],
              }
            : 16,
        ),
        shift({ padding: 5 }),
        hide({ padding: { top: 30, bottom: 0, right: 50, left: 50 } }),
      ],
      strategy: 'fixed',
    })

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useDismiss(context, {
      ancestorScroll: true,
    }),
    useClick(context, {
      enabled: true,
      toggle: true,
    }),
    useHover(context, {
      enabled: !!isShowPopupOnHover,
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

  const openDropdown = useCallback(() => {
    setOpen(true)
  }, [])
  const closeDropdown = useCallback(() => {
    setOpen(false)
  }, [])

  return {
    isDropdownOpened: open,
    openDropdown,
    closeDropdown,
    referenceProps,
    floatingProps,
    middlewareData,
  }
}
