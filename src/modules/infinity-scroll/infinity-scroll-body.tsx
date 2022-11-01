import { FC, ReactNode, useEffect } from 'react'

import { useOnScrollProvider, withInfinityScroll } from './core'

type Props = {
  children: ReactNode
}
export const InfinityScrollBodyProvider: FC<Props> = withInfinityScroll(
  ({ children }) => {
    useScrollOnBody()
    return <>{children}</>
  },
)

const useScrollOnBody = () => {
  const infinityScroll = useOnScrollProvider()
  useEffect(() => {
    document.addEventListener('scroll', infinityScroll)
    return () => document.removeEventListener('scroll', infinityScroll)
  }, [infinityScroll])
}
