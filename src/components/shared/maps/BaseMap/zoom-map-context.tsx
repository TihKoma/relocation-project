import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import {
  ZOOM_LEVEL_CITY,
  ZOOM_LEVEL_STATE,
  ZOOM_LEVEL_WORLD,
} from '@/components/shared/maps/BaseMap/BaseMap'
import { ZoomLevel } from '@/components/shared/maps/BaseMap/ZoomButtons/ZoomLevelsButtons'
import { useCurrentBackgroundMap } from '@/modules/map'

type Context = {
  zoomLevel: ZoomLevel | null
  setZoomLevel: (zoomLevel: ZoomLevel | null) => void
  setCurrentZoomLevel: (zoom: number) => void
}

const ZoomMapContext = createContext<Context>({
  zoomLevel: 'world',
  setZoomLevel: () => {},
  setCurrentZoomLevel: () => {},
})

type Props = {
  children: ReactNode
}
export const ZoomMapContextProvider: FC<Props> = ({ children }) => {
  const [zoomLevel, setZoomLevel] = useState<ZoomLevel | null>(null)
  const mapFacade = useCurrentBackgroundMap()

  const setCurrentZoomLevel = (zoom: number) => {
    if (zoom <= ZOOM_LEVEL_WORLD) {
      setZoomLevel('world')
    }
    if (zoom > ZOOM_LEVEL_WORLD && zoom <= ZOOM_LEVEL_STATE) {
      setZoomLevel('state')
    }
    if (zoom > ZOOM_LEVEL_STATE && zoom <= ZOOM_LEVEL_CITY) {
      setZoomLevel('city')
    }
    if (zoom > ZOOM_LEVEL_CITY) {
      setZoomLevel('neighborhood')
    }
  }

  useEffect(() => {
    if (mapFacade) {
      const { zoom } = mapFacade.getPosition()
      if (zoom) {
        setCurrentZoomLevel(zoom)
      }
    }
  }, [mapFacade])

  const value = useMemo(
    () => ({ zoomLevel, setZoomLevel, setCurrentZoomLevel }),
    [zoomLevel],
  )

  return (
    <ZoomMapContext.Provider value={value}>{children}</ZoomMapContext.Provider>
  )
}

export const useZoomMap = (): Context => {
  return useContext(ZoomMapContext)
}
