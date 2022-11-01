import { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'

import { QUERY_GET_REGIONS_BY_POINT } from '@/modules/map'

export type Region = {
  id: string | number
  name: string
  slug: string
}

export const useUserRegion = () => {
  const [loading, setLoading] = useState(false)
  const [region, setRegion] = useState<Region | null>(null)
  const [isGeoDisabled, setIsGeoDisabled] = useState(false)
  const [coordinates, setCoordinates] = useState<{
    long: number
    lat: number
  } | null>(null)

  const [fetchRegionByPoints] = useLazyQuery(QUERY_GET_REGIONS_BY_POINT, {
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      setLoading(false)
      const feature = data?.getRegionsByPoint?.features?.[0]
      if (!feature || !feature.id) {
        return
      }
      setRegion({
        id: feature.id,
        name: feature.properties.name,
        slug: feature.properties.slug,
      })
    },
  })

  useEffect(() => {
    if (coordinates?.long && coordinates?.lat) {
      fetchRegionByPoints({
        variables: {
          point: coordinates,
          zoomLevel: 10,
        },
      })
    }
  }, [coordinates, fetchRegionByPoints])

  const detectGeolocation = () => {
    setIsGeoDisabled(false)
    if (region) {
      setRegion(region)
      return
    }
    setLoading(true)
    navigator.geolocation.getCurrentPosition(
      (geoPosition) => {
        const coordinates = geoPosition.coords
        setCoordinates({
          long: coordinates.longitude,
          lat: coordinates.latitude,
        })
      },
      (error) => {
        // eslint-disable-next-line no-console
        console.error(error)
        setLoading(false)
        setIsGeoDisabled(true)
      },
    )
  }

  return {
    detectGeolocation,
    region,
    coordinates,
    loading,
    isGeoDisabled,
  }
}
