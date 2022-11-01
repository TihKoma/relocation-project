import { createContext, FC, ReactNode, useState } from 'react'

export type ViewMode = 'feed' | 'map' | null

type ViewModeData = {
  viewMode?: ViewMode
  withBackButtonOnMap?: boolean
}
type ViewModeState = [
  ViewModeData,
  ((viewMode: ViewMode, withBackButtonOnMap?: boolean) => void) | null,
]

export const ViewModeContext = createContext<ViewModeState>([{}, null])
type ContextProviderProps = {
  initialViewMode: ViewMode
  children: ReactNode
}
export const ViewModeContextProvider: FC<ContextProviderProps> = ({
  initialViewMode,
  children,
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>(initialViewMode)
  const [withBackButtonOnMap, setWithBackButtonOnMap] = useState(false)

  const setData: (viewMode: ViewMode, withBackButtonOnMap?: boolean) => void = (
    viewMode,
    withBackButtonOnMap = false,
  ) => {
    setViewMode(viewMode)
    setWithBackButtonOnMap(viewMode === 'map' ? withBackButtonOnMap : false)
  }

  return (
    <ViewModeContext.Provider
      value={[{ viewMode, withBackButtonOnMap }, setData]}
    >
      {children}
    </ViewModeContext.Provider>
  )
}
