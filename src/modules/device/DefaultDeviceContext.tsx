import { createContext, FC, ReactNode, useContext, useMemo } from 'react'

type Context = {
  isDesktop: boolean
  isTablet: boolean
  isMobile: boolean
}
const DefaultDeviceContext = createContext<Context>({
  isDesktop: true,
  isMobile: false,
  isTablet: false,
})

type Props = {
  userAgent: string
  children: ReactNode
}
export const DefaultDeviceContextProvider: FC<Props> = ({
  children,
  userAgent,
}) => {
  const value: Context = useMemo(() => {
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        userAgent,
      )

    return {
      isDesktop: !isMobile,
      isMobile,
      isTablet: false, // it's not our main platform
    }
  }, [userAgent])

  return (
    <DefaultDeviceContext.Provider value={value}>
      {children}
    </DefaultDeviceContext.Provider>
  )
}

export const useDefaultDevice = () => {
  return useContext(DefaultDeviceContext)
}
