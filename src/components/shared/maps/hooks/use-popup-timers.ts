import { useEffect, useRef } from 'react'

const SHOW_PREVIEW_TIMEOUT = 1000
const HIDE_PREVIEW_TIMEOUT = 300

export const usePopupTimers = (
  onEnter: () => void,
  onShow: () => void,
  onHide: () => void,
) => {
  const timerShowRef = useRef<number | null>(null)
  const timerHideRef = useRef<number | null>(null)

  useEffect(
    () => () => {
      if (timerShowRef.current) {
        clearTimeout(timerShowRef.current)
        timerShowRef.current = null
      }

      if (timerHideRef.current) {
        clearTimeout(timerHideRef.current)
        timerHideRef.current = null
      }
    },
    [],
  )

  const onMouseEnterPopup = () => {
    if (timerHideRef.current) {
      clearTimeout(timerHideRef.current)
    }
  }

  const onMouseLeavePopup = () => {
    timerHideRef.current = setTimeout(() => {
      onHide()
    }, HIDE_PREVIEW_TIMEOUT) as unknown as number
  }

  const onMouseEnterMarker = () => {
    onEnter()

    if (timerHideRef.current) {
      clearTimeout(timerHideRef.current)
    }

    timerShowRef.current = setTimeout(() => {
      onShow()
    }, SHOW_PREVIEW_TIMEOUT) as unknown as number
  }

  const onMouseLeaveMarker = () => {
    if (timerShowRef.current) {
      clearTimeout(timerShowRef.current)
    }

    timerHideRef.current = setTimeout(() => {
      onHide()
    }, HIDE_PREVIEW_TIMEOUT) as unknown as number
  }

  return {
    onMouseEnterPopup,
    onMouseLeavePopup,
    onMouseEnterMarker,
    onMouseLeaveMarker,
  }
}
