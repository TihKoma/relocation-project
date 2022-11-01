import { useCallback, useMemo, useRef } from 'react'
import { useLocalStorage } from 'react-use'

export const usePinView = () => {
  const pinViewDefault = useMemo(() => ({}), [])
  const [pinView = pinViewDefault, setBase] =
    useLocalStorage<Record<string, boolean>>('neighborhood-views')
  const pinViewRef = useRef(pinView)
  pinViewRef.current = pinView
  const set = useCallback(
    (regionId: string, isShow: boolean): void => {
      setBase({ ...pinViewRef.current, [regionId]: isShow })
    },
    [setBase],
  )
  return [pinView, set] as [typeof pinView, typeof set]
}
