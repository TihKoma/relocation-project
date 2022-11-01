import { FC, useEffect, useState } from 'react'
import { Global } from '@emotion/react'

import { Alert } from '@/components/shared/Alert'
import { Button } from '@/components/ui-kit/Button'
import { Loader } from '@/components/ui-kit/Loader'
import { GeoIcon, PlaceholderGear } from '@/images'
import { MapFacade } from '@/modules/map/base'
import { LightTheme } from '@/styles/themes'

const GEOLOCATION_ZOOM = 15

type Props = {
  className?: string
  mapFacade: MapFacade
}
export const ButtonDetectLocation: FC<Props> = ({ className, mapFacade }) => {
  const [currentGeolocationCoordinates, setCurrentGeolocationCoordinates] =
    useState<GeolocationCoordinates>()
  const [loading, setLoading] = useState(false)
  const [isDisabledLocationAlertVisible, setIsDisabledLocationAlertVisible] =
    useState(false)

  useEffect(() => {
    const handlers = [
      mapFacade.onGeoControl('geolocate', (event) => {
        const { coords } = event as GeolocationPosition
        mapFacade.flyTo([coords.longitude, coords.latitude], GEOLOCATION_ZOOM)
        setCurrentGeolocationCoordinates(coords)
      }),
      mapFacade.onGeoControl('error', () => {
        setLoading(false)
        setIsDisabledLocationAlertVisible(true)
      }),
    ]

    return () => handlers.forEach((unsubscribe) => unsubscribe())
  }, [mapFacade])

  useEffect(() => {
    if (currentGeolocationCoordinates) {
      setLoading(false)
    }
  }, [currentGeolocationCoordinates])

  const onClick = () => {
    if (!currentGeolocationCoordinates) {
      setLoading(true)
    }
    mapFacade?.triggerCurrentGeoPosition()
  }

  const closeAlert = () => {
    setIsDisabledLocationAlertVisible(false)
  }

  return (
    <>
      <Button
        viewType={'primary'}
        size={'small'}
        backgroundUnderButton={'map'}
        className={className}
        onClick={onClick}
        Icon={
          loading ? <Loader size={'xSmall'} withGradient={true} /> : <GeoIcon />
        }
      />
      <Alert
        title={'Allow Nicity to use your location'}
        isVisible={isDisabledLocationAlertVisible}
        subtitle={'Turn on location permissions to see your position'}
        image={<PlaceholderGear />}
        buttonText={'Ok'}
        onClick={closeAlert}
        onRequestClose={closeAlert}
      />
      <Global
        styles={{
          '.mapboxgl-ctrl-geolocate': {
            display: 'none !important',
          },
          '.mapboxgl-user-location-dot': {
            width: '1.2rem',
            height: '1.2rem',
            backgroundColor: LightTheme.uranus,
          },
          '.mapboxgl-user-location-dot:before': {
            display: 'none !important',
          },
          '.mapboxgl-user-location-dot:after': {
            width: '1.6rem',
            height: '1.6rem',
          },
        }}
      />
    </>
  )
}
