import { useEffect, useMemo, useRef } from 'react'
import debounce from 'lodash/debounce'

export const useDebounce = <F extends (...args: any[]) => any>(
  f: F,
  time: number,
) => {
  const cacheF = useRef(f)
  cacheF.current = f
  const debouncedFunction = useMemo(
    () => debounce(((...args) => cacheF.current(...args)) as F, time),
    [time],
  )
  useEffect(() => debouncedFunction.cancel, [debouncedFunction])

  return debouncedFunction
}

export const AVERAGE_TYPING_TIME = 350
