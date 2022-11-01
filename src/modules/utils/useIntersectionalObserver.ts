import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'

export const useIntersectionalObserver = ({
  root,
  rootMargin,
  threshold,
}: IntersectionObserverInit): [
  Dispatch<SetStateAction<HTMLElement | null>>,
  IntersectionObserverEntry | null,
  HTMLElement | null,
] => {
  const [ref, setRef] = useState<HTMLElement | null>(null)

  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null)

  const observer = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect()
    }
    observer.current = new IntersectionObserver(
      ([entry]) => {
        setEntry(entry)
      },
      { root, rootMargin, threshold },
    )

    const currentObserver = observer.current

    if (ref) {
      currentObserver.observe(ref)
    }
    return () => {
      currentObserver?.disconnect()
    }
  }, [ref, root, rootMargin, threshold])

  return [setRef, entry, ref]
}
