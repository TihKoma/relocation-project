import React, { RefObject, useEffect, useRef } from 'react'

import { Emitter } from '@/modules/event-emitter'

export const RootClickEmitter = new Emitter<
  React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
>()

// TODO: tmp solution, need work
export const useOutsideClick = <T extends HTMLElement = HTMLElement>(
  handler: (
    event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
  ) => any,
): RefObject<T> => {
  const ref = useRef<T>(null)
  const savedHandler = useRef(handler)

  useEffect(() => {
    savedHandler.current = handler
  })

  useEffect(() => {
    return RootClickEmitter.addListener((event) => {
      const modalRoot = document.querySelector('#modalRoot')
      if (
        event &&
        event.target !== null &&
        // @ts-ignore
        !modalRoot?.contains(event.target) &&
        ref.current &&
        !ref.current.contains(event.target as Element)
      ) {
        savedHandler.current(event)
      }
    })
  }, [])

  return ref
}
