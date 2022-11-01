import React, {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import throttle from 'lodash/throttle'

import { Emitter } from '@/modules/event-emitter'

const SCROLL_OFFSET = 100

export const useOnScrollProvider = () => {
  const emitter = useContext(EmitterContext)
  const emitterCache = useRef(emitter)
  emitterCache.current = emitter

  if (emitterCache.current === null) {
    throw new Error('Infinity scroll: have not Provider')
  }
  return useInfinityScroll(() => emitterCache.current?.emit())
}

export const useInfinityScroll = (
  handler: () => void,
): ((event: any) => void) => {
  // const wasAtEnd = useRef(false)
  const handlerCache = useRef(handler)
  handlerCache.current = handler

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(
    throttle((event) => {
      let isEnd: boolean
      if (event.target instanceof Document) {
        isEnd =
          document.body.scrollHeight <= window.scrollY + window.innerHeight
      } else {
        isEnd =
          event.target.scrollHeight <=
          event.target.scrollTop + event.target.clientHeight + SCROLL_OFFSET
      }

      // TODO: refactor where result page
      if (isEnd) {
        handlerCache.current()
        /*if (!wasAtEnd.current) {
          handlerCache.current()
        }
      } else {
        wasAtEnd.current = false*/
      }
    }, 500),
    [],
  )
}

export const withInfinityScroll = function <T>(Component: FC<T>): FC<T> {
  return (props) => (
    <InfinityScrollProvider>
      <Component {...props} />
    </InfinityScrollProvider>
  )
}

type Props = {
  children: ReactNode
}
export const InfinityScrollProvider: FC<Props> = (props) => {
  const [emitter] = useState(() => new Emitter<never>())
  const Provider = EmitterContext.Provider
  return <Provider value={emitter} {...props} />
}

export const useInfinityScrollProvider = (handler: () => void) => {
  const emitter = useContext(EmitterContext)
  if (emitter === null) {
    throw new Error('Infinity scroll: have not Provider')
  }
  const handlerCache = useRef(handler)
  handlerCache.current = handler
  useEffect(() => {
    return emitter?.addListener(() => {
      handlerCache.current()
    })
  }, [emitter])
}

const EmitterContext = createContext<Emitter<never> | null>(null)
