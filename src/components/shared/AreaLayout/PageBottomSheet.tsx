import { forwardRef, MouseEvent, useEffect, useRef, useState } from 'react'
import styled from '@emotion/styled'

import {
  BottomSheet as BottomSheetBase,
  BottomSheetProps,
  BottomSheetRef,
  useSetBottomSheetActions,
} from '@/components/ui-kit/BottomSheet/'
import { useBottomSheet } from '@/components/ui-kit/BottomSheet/BottomSheetContext'
import { useIsMobileDevice } from '@/modules/device'
import { composeRefs } from '@/modules/utils/composeRefs'
import { getColorTheme } from '@/styles/themes'

type PageBottomSheetProps = Omit<
  BottomSheetProps,
  'open' | 'blocking' | 'defaultSnap' | 'snapPoints'
>

const PAGE_BOTTOM_SHEET_MIN_SNAP_POINT = 73
const PAGE_OFFSET = 48

export const PageBottomSheet = forwardRef<BottomSheetRef, PageBottomSheetProps>(
  (
    { children, isBottomSheetDown, setBottomSheetDown, withOffset, ...props },
    forwardedRef,
  ) => {
    const { isOpen, setIsOpen } = useBottomSheet()
    const [isOpenFull, setIsOpenFull] = useState(false) // TODO add to blocking
    const bottomSheetRef = useRef<BottomSheetRef>(null)
    // TODO get max point in other way
    const pageBottomSheetMaxSnapPointRef = useRef<number>()
    const isMobile = useIsMobileDevice()
    const setActions = useSetBottomSheetActions()

    useEffect(() => {
      setActions({
        snapToBottom: () => {
          bottomSheetRef.current?.snapTo(PAGE_BOTTOM_SHEET_MIN_SNAP_POINT)
        },
      })
    }, [setActions])

    const handleActivateBottomSheetButtonClick = (
      e: MouseEvent<HTMLButtonElement>,
    ) => {
      if (!isOpen) {
        e.stopPropagation()
        bottomSheetRef?.current?.snapTo(({ maxHeight }) => maxHeight * 0.6)
        setIsOpen(true)
      }
    }

    const handleBottomSheetDismiss = () => {
      setIsOpen(false)
      setIsOpenFull(false)
      bottomSheetRef?.current?.snapTo(PAGE_BOTTOM_SHEET_MIN_SNAP_POINT)
      props?.onDismiss?.()
    }

    useEffect(() => {
      if (isBottomSheetDown) {
        setIsOpen(false)
        setIsOpenFull(false)
        bottomSheetRef?.current?.snapTo(PAGE_BOTTOM_SHEET_MIN_SNAP_POINT)
      }
    }, [isBottomSheetDown, setIsOpen])

    const offset = withOffset ? PAGE_OFFSET : 0

    return (
      <>
        <BottomSheet
          isOpenFull={isOpenFull}
          expandOnContentDrag
          scrollLocking={false}
          {...props}
          open={isMobile}
          blocking={false}
          ref={composeRefs([bottomSheetRef, forwardedRef])}
          defaultSnap={({ maxHeight }) => {
            pageBottomSheetMaxSnapPointRef.current = maxHeight - 24
            return maxHeight * 0.6
          }}
          snapPoints={({ maxHeight }) => [
            PAGE_BOTTOM_SHEET_MIN_SNAP_POINT,
            maxHeight * 0.6,
            (pageBottomSheetMaxSnapPointRef.current || maxHeight) - offset,
          ]}
          onDismiss={handleBottomSheetDismiss}
          onSpringEnd={(e) => {
            if (
              bottomSheetRef.current?.height ===
              PAGE_BOTTOM_SHEET_MIN_SNAP_POINT
            ) {
              setIsOpen(false)
              if (setBottomSheetDown) {
                setBottomSheetDown(true)
              }
            }

            if (
              bottomSheetRef.current?.height ===
                pageBottomSheetMaxSnapPointRef.current ||
              bottomSheetRef.current?.height ===
                // @ts-ignore
                pageBottomSheetMaxSnapPointRef.current - offset
            ) {
              setIsOpenFull(true)
            } else {
              setIsOpenFull(false)
            }

            props?.onSpringEnd?.(e)
          }}
          onSpringStart={(e) => {
            if (e.type === 'SNAP' && e.source === 'dragging') {
              setIsOpen(true)
              if (setBottomSheetDown) {
                setBottomSheetDown(false)
              }
            }
            if (
              bottomSheetRef.current?.height !==
                pageBottomSheetMaxSnapPointRef.current ||
              bottomSheetRef.current?.height !==
                // @ts-ignore
                pageBottomSheetMaxSnapPointRef.current - offset
            ) {
              setIsOpenFull(false)
            }
            props?.onSpringStart?.(e)
          }}
        >
          {children}
          {!isOpen && (
            <ActivateBottomSheetButton
              onClick={handleActivateBottomSheetButtonClick}
            />
          )}
        </BottomSheet>
      </>
    )
  },
)

const BottomSheet = styled(BottomSheetBase)<{ isOpenFull: boolean }>`
  ${(props) =>
    props.isOpenFull
      ? `
          &::before {
            content: '';
        
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
        
            z-index: 1;
            background: ${getColorTheme('sun800')(props)};
          }`
      : ''}
`

const ActivateBottomSheetButton = styled.button`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 9;

  width: 100%;

  border: none;
  background: transparent;
`
