import { useEffect, useRef, useState, VFC } from 'react'
import { useApolloClient, useLazyQuery, useQuery } from '@apollo/client'
import styled from '@emotion/styled'
import { UseControllerReturn } from 'react-hook-form/dist/types/controller'

import { Location, LocationRef } from '@/components/shared/Location'
import { SearchItem, SearchItemTitle } from '@/components/shared/Location'
import { CommonLocationFeatureProps } from '@/components/shared/Location/types'
import { ChoiceNeighborhoodMap as MapBase } from '@/components/shared/maps/ChoiceNeighborhoodMap'
import { MapRef } from '@/components/shared/maps/ChoiceNeighborhoodMap/ChoiceNeighborhoodMap'
import { BasicSourceData } from '@/components/shared/PostForm/types'
import { ModalController } from '@/components/ui-kit/Modal'
import { useAnalytics } from '@/modules/analytics'
import {
  BBoxList,
  Coordinates,
  getBBoxCenterCoordinates,
  QUERY_GET_REGION,
  QUERY_GET_SUGGESTIONS,
  SearchType,
} from '@/modules/map'
import { GeoFeature } from '@/modules/map/types'
import { useDebounce } from '@/modules/utils/useDebounce'
import { mobileMedia, notMobileMedia } from '@/styles/media'

const SEARCH_DEBOUNCE = 300

type Props = {
  value: string
  neighborhoodCenter?: Coordinates
  onSubmit: (region: { id: string; name: string }) => void
  description?: string | null
} & CommonLocationFeatureProps &
  Pick<ModalController, 'onRequestClose'>

export const ChoiceNeighborhood: VFC<Props> = ({
  neighborhoodCenter,
  value,
  onSubmit,
  onBack,
  onRequestClose,
  title,
  description,
}) => {
  const locationApiRef = useRef<LocationRef | null>(null)
  const mapRef = useRef<MapRef | null>(null)
  const [activeRegion, setActiveRegion] = useState<GeoFeature | null>(null)
  const apolloClient = useApolloClient()
  const analytics = useAnalytics()

  const searchRegion = async (regionId: string) => {
    const result = await apolloClient.query({
      query: QUERY_GET_REGION,
      variables: { id: regionId },
    })

    setActiveRegion(result.data.getRegion || null)
    analytics?.addressInputSuccess({ source: 'post' })
  }

  const { initialCenter, defaultRegionSlug } = useInitialState({
    value,
    neighborhoodCenter,
    searchRegion,
  })

  useChangeState({
    region: activeRegion,
    mapApi: mapRef.current,
    locationApi: locationApiRef.current,
  })

  const { onSearch } = useSearch({
    locationApi: locationApiRef.current,
  })

  const handleSearch = (value: string) => {
    onSearch(value)
    if (value.length === 1) {
      analytics.addressInputTry({ source: 'post' })
    }
  }

  const onSubmitFields = () => {
    if (activeRegion?.id) {
      onSubmit({
        id: String(activeRegion.id),
        name: activeRegion.properties.name,
      })
    }
  }

  const onReset = () => {
    setActiveRegion(null)
    mapRef.current?.reset()
  }

  return (
    <Location
      title={title}
      description={description}
      onBack={onBack}
      onReset={onReset}
      buttonText={'Choose'}
      onRequestClose={onRequestClose}
      ref={locationApiRef}
      onSearch={handleSearch}
      onSubmit={onSubmitFields}
      renderSearchItem={(item, closeSearchResult) =>
        item && (
          <SearchItem
            onClick={() => {
              // TODO ad-hoc to prevent empty areas when flyTo https://nicity.atlassian.net/browse/CP-1382
              onReset()
              // TODO: fix as
              searchRegion(item.id as string)
              closeSearchResult()
            }}
          >
            <SearchItemTitle>{item.properties.title}</SearchItemTitle>
            {item.properties.subTitle}
          </SearchItem>
        )
      }
      renderMap={() => (
        <Map
          ref={mapRef}
          initialCenter={initialCenter}
          defaultRegionSlug={defaultRegionSlug}
          onClick={searchRegion}
        />
      )}
    />
  )
}

export const FieldChoiceNeighborhood: VFC<
  {
    onChange?: (region: BasicSourceData) => void
  } & UseControllerReturn &
    Omit<Props, 'onSubmit'>
> = ({ field, onChange, ...props }) => {
  return (
    <ChoiceNeighborhood
      {...field}
      {...props}
      onSubmit={(region) => {
        field.onChange(region)
        onChange?.(region)
      }}
    />
  )
}

const useInitialState = ({
  value,
  neighborhoodCenter,
  searchRegion,
}: {
  value: string
  neighborhoodCenter?: Coordinates
  searchRegion: (regionId: string) => void
}) => {
  const { data: defaultRegionData } = useQuery(QUERY_GET_REGION, {
    variables: {
      id: value,
    },
  })

  const initialCenter = defaultRegionData?.getRegion?.geometry.bbox
    ? getBBoxCenterCoordinates(
        defaultRegionData.getRegion.geometry.bbox as BBoxList,
      )
    : neighborhoodCenter

  const defaultRegionSlug = defaultRegionData?.getRegion?.properties.slug

  useEffect(() => {
    if (value) {
      searchRegion(value)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    initialCenter,
    defaultRegionSlug,
  }
}

const useChangeState = ({
  region,
  locationApi,
  mapApi,
}: {
  region?: GeoFeature | null
  locationApi: LocationRef | null
  mapApi: MapRef | null
  initialValue?: string
}) => {
  useEffect(() => {
    if (region && locationApi && mapApi) {
      locationApi.setValue('search', region.properties.name, {
        shouldDirty: true,
      })
      locationApi.setValue(
        'location',
        {
          type: 'Feature',
          id: region.id as string,
          geometry: {
            type: 'Point',
            coordinates: getBBoxCenterCoordinates(
              region.geometry.bbox as [number, number, number, number],
            ),
          },
          properties: {
            title: region.properties.name,
            subTitle: '',
            fullAddress: region.properties.name,
            placeType: 'POI',
          },
        },
        {
          shouldDirty: true,
        },
      )
      mapApi.highlightRegionBySlug(region.properties.slug)
    }
  }, [region, locationApi, mapApi])
}

const useSearch = ({ locationApi }: { locationApi: LocationRef | null }) => {
  const [getSuggestions, { data: suggestions }] = useLazyQuery(
    QUERY_GET_SUGGESTIONS,
  )

  useEffect(() => {
    if (locationApi && suggestions?.getSuggestions) {
      locationApi.setPlacesSearch(
        suggestions.getSuggestions.map((item) => ({
          type: 'Feature',
          id: item.entityId,
          geometry: {
            type: 'Point',
            coordinates: [0, 0],
          },
          properties: {
            title: item.suggestion,
            subTitle: '',
            fullAddress: item.suggestion,
            placeType: 'POI',
          },
        })),
      )
    }
  }, [locationApi, suggestions?.getSuggestions])

  const onSearch = useDebounce((value: string) => {
    getSuggestions({
      variables: { searchType: SearchType.REGION, query: value },
    })
  }, SEARCH_DEBOUNCE)

  return {
    onSearch,
  }
}

const Map = styled(MapBase)`
  ${mobileMedia} {
    flex-grow: 1;
  }
  ${notMobileMedia} {
    aspect-ratio: 1 / 0.66;
    min-height: 20rem;
  }
`
