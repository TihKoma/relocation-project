import { ForwardedRef, RefCallback } from 'react'

type Ref<T> = RefCallback<T> | ForwardedRef<T>

export const composeRefs =
  <T>(refs: Array<Ref<T>>) =>
  (newRef: T): void =>
    refs.forEach((ref) => {
      if (ref == null) {
        return
      }
      if (typeof ref === 'function') {
        ref(newRef)
      } else {
        ref.current = newRef
      }
    })
