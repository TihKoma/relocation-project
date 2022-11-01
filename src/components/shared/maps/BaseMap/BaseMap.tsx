import { FC, ReactNode, useEffect, useRef, useState } from 'react'
import styled from '@emotion/styled'
import debounce from 'lodash/debounce'
import throttle from 'lodash/throttle'

import { useZoomMap } from '@/components/shared/maps/BaseMap/zoom-map-context'
import { ZoomLevelsButtons } from '@/components/shared/maps/BaseMap/ZoomButtons/ZoomLevelsButtons'
import { useIsNotMobileDevice } from '@/modules/device'
import { Coordinates } from '@/modules/map'
import { MapAdapter, MapEvents, MapFacade } from '@/modules/map/base'
import { MapEvent, Markers } from '@/modules/map/types'

import { ButtonDetectLocation } from './ButtonDetectLocation'

const MIN_ZOOM_DEFAULT = 1
const INITIAL_ZOOM_DEFAULT = 1
const INITIAL_CENTER_DEFAULT: [number, number] = [0, 0]

const MAP_COORDS_STORAGE_KEY = 'discovery-map-coords'
const MAP_ZOOM_STORAGE_KEY = 'discovery-map-zoom'

const DRAG_DEBOUNCE = 500
const ZOOM_DEBOUNCE = 1000
const MOUSE_MOVE_THROTTLE = 300

export const ZOOM_LEVEL_NEIGHBORHOOD = 12
export const ZOOM_LEVEL_CITY = 9
export const ZOOM_LEVEL_STATE = 5
export const ZOOM_LEVEL_WORLD = 3

type SharedKey = 'general'

const sharedMaps: Record<
  SharedKey,
  {
    mapAdapter: MapAdapter
    mapEvents: MapEvents
    element: HTMLDivElement
    width?: number
    height?: number
  } | null
> = {
  general: null,
}

type Props = {
  className?: string
  onMountMap: (mapAdapter: MapAdapter, mapEvents: MapEvents) => MapFacade
  onInitMap?: () => void
  onMouseMove?: (event: MapEvent) => void
  onDestroyMap?: () => void
  onDragMap?: (event: MapEvent) => void
  onZoomMap?: (event: MapEvent) => void
  onClickMap?: (event: MapEvent) => void
  onMarkersDrawn?: (markersOnScreen: Markers) => void
  initialZoom?: number
  minZoom?: number
  initialCenter?: Coordinates
  children?: ReactNode
  onDragMapStart?: (event: MapEvent) => void
  onDragMapEnd?: (event: MapEvent) => void
  withPaddingLeft?: boolean
  sharedKey?: SharedKey
}

export const BaseMap: FC<Props> = ({
  className,
  children,
  onDestroyMap,
  onMountMap,
  initialZoom,
  minZoom,
  onMouseMove,
  initialCenter,
  onInitMap,
  onDragMap,
  onZoomMap,
  onMarkersDrawn,
  onClickMap,
  onDragMapStart,
  onDragMapEnd,
  withPaddingLeft = true,
  sharedKey,
}) => {
  const isNotMobile = useIsNotMobileDevice()
  const refElement = useRef<HTMLDivElement>(null)
  const mapFacadeRef = useRef<MapFacade | null>(null)
  const [mapFacade, setMapFacade] = useState<MapFacade | null>(null)
  const eventsListenersRef = useRef<Array<() => void>>([])
  const { setCurrentZoomLevel } = useZoomMap()

  useEffect(() => {
    if (refElement.current === null) {
      return
    }

    mountMap(refElement.current)

    return () => {
      eventsListenersRef.current.forEach((unsubscribe) => unsubscribe())
      eventsListenersRef.current = []

      if (sharedKey && sharedMaps[sharedKey]) {
        const canvas = sharedMaps[sharedKey]!.element.querySelector(
          '.mapboxgl-canvas',
        ) as HTMLCanvasElement

        sharedMaps[sharedKey]!.width = canvas?.width
        sharedMaps[sharedKey]!.height = canvas?.height
      }

      onDestroyMap?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const subscribeEvents = (mapEvents: MapEvents, mapFacade: MapFacade) => {
    eventsListenersRef.current = [
      onInitMap
        ? mapEvents.on('initMap', () => {
            onInitMap()
          })
        : () => {},
      onClickMap ? mapEvents.on('click', onClickMap) : () => {},
      onDragMapStart ? mapEvents.on('dragstart', onDragMapStart) : () => {},
      onDragMapEnd ? mapEvents.on('dragend', onDragMapEnd) : () => {},
      mapEvents.on(
        'drag',
        debounce((e) => {
          sessionStorage.setItem(
            MAP_COORDS_STORAGE_KEY,
            mapFacade.getPosition().center.join(','),
          )
          onDragMap?.(e)
        }, DRAG_DEBOUNCE),
      ),
      onMouseMove
        ? mapEvents.on(
            'mousemove',
            throttle((e) => {
              onMouseMove(e)
            }, MOUSE_MOVE_THROTTLE),
          )
        : () => {},
      mapEvents.on(
        'zoom',
        debounce(async (e) => {
          const { zoom } = mapFacade.getPosition()
          sessionStorage.setItem(MAP_ZOOM_STORAGE_KEY, zoom.toString())
          setCurrentZoomLevel(zoom)
          onZoomMap?.(e)
        }, ZOOM_DEBOUNCE),
      ),
      onMarkersDrawn
        ? mapFacade.onMarkersDrawn((markersOnScreen: Markers) => {
            onMarkersDrawn(markersOnScreen)
          })
        : () => {},
    ]
  }

  const getCoordsAndZoom = () => {
    const coordsStorage = sessionStorage
      .getItem(MAP_COORDS_STORAGE_KEY)
      ?.split(',')
      .map((item) => +item) as Coordinates
    const center =
      initialCenter || (coordsStorage && coordsStorage.length === 2)
        ? coordsStorage
        : INITIAL_CENTER_DEFAULT
    const isNotDefaultCoordinates =
      center &&
      center[0] !== INITIAL_CENTER_DEFAULT[0] &&
      center[1] !== INITIAL_CENTER_DEFAULT[1]

    const zoomStorage = sessionStorage.getItem(MAP_ZOOM_STORAGE_KEY)
    const zoomStorageNumber = zoomStorage !== null ? +zoomStorage : null

    const zoom = isNotDefaultCoordinates
      ? initialZoom || zoomStorageNumber || INITIAL_ZOOM_DEFAULT
      : INITIAL_ZOOM_DEFAULT

    return { zoom, center }
  }

  const mountMap = async (element: HTMLDivElement) => {
    let mapAdapter: MapAdapter
    let mapEvents: MapEvents

    if (sharedKey && sharedMaps[sharedKey] !== null) {
      mapAdapter = sharedMaps[sharedKey]!.mapAdapter
      mapEvents = sharedMaps[sharedKey]!.mapEvents

      const canvas = sharedMaps[sharedKey]!.element.querySelector(
        '.mapboxgl-canvas',
      ) as HTMLCanvasElement

      // When resize the window on the page without a map, the canvas is changing width and height
      if (
        canvas &&
        canvas.width === sharedMaps[sharedKey]!.width &&
        canvas.height === sharedMaps[sharedKey]!.height
      ) {
        element.replaceWith(sharedMaps[sharedKey]!.element)
      } else {
        sharedMaps[sharedKey] = null
        // launch again but without cache
        mountMap(element)
        return
      }
    } else {
      mapAdapter = new MapAdapter()
      mapEvents = new MapEvents(mapAdapter)

      if (sharedKey) {
        sharedMaps[sharedKey] = {
          mapAdapter,
          mapEvents,
          element,
        }
      }

      const { center, zoom } = getCoordsAndZoom()

      await mapAdapter.init(element, {
        center,
        zoom,
        minZoom: minZoom || MIN_ZOOM_DEFAULT,
        withPaddingLeft,
      })
    }

    const mapFacade = onMountMap(mapAdapter, mapEvents)

    setMapFacade(mapFacade) // for update react element
    mapFacadeRef.current = mapFacade // for event handlers

    subscribeEvents(mapEvents, mapFacade)

    mapFacade.emitInitMap()
  }

  return (
    <Container className={className}>
      <MapStyled ref={refElement} />
      {isNotMobile && (
        <Controls>
          {mapFacade && <ZoomLevelsButtons />}
          {mapFacade && <ButtonDetectLocation mapFacade={mapFacade} />}
        </Controls>
      )}
      {children}
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  height: 100%;
`
const MapStyled = styled.div`
  width: 100%;
  height: 100%;

  position: absolute;
  left: 0;
  top: 0;

  & canvas {
    outline: none;
  }
`

const Controls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  position: absolute;
  right: 1.6rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
`
