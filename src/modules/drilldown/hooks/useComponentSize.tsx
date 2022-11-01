import { useCallback, useLayoutEffect, useState } from 'react'
import type { MutableRefObject } from 'react'

const getSize = (element?: HTMLElement | null) => {
  return {
    height: element ? element.offsetHeight : 0,
    width: element ? element.offsetWidth : 0,
  }
}

const useComponentSize = (
  ref: MutableRefObject<HTMLElement | null | undefined>,
) => {
  const [size, setSize] = useState(() => {
    return getSize(ref.current)
  })

  const resize = useCallback(() => {
    if (ref.current) {
      setSize(() => {
        return getSize(ref.current)
      })
    }
  }, [ref])

  useLayoutEffect(() => {
    if (ref?.current == null) {
      return
    }
    resize()
    if (typeof ResizeObserver === 'function') {
      const resizeObserver = new ResizeObserver(() => {
        resize()
      })
      resizeObserver.observe(ref.current)
      return () => {
        resizeObserver.disconnect()
      }
    } else {
      window.addEventListener('resize', resize)
      return () => {
        window.removeEventListener('resize', resize)
      }
    }
  }, [ref, resize])

  return size
}

export default useComponentSize
