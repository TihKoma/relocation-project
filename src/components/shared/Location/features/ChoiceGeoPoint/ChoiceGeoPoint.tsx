import { FC, useRef, useState } from 'react'
import styled from '@emotion/styled'
import isEqual from 'lodash/isEqual'
import { UseControllerReturn } from 'react-hook-form/dist/types/controller'

import { Location, LocationRef } from '@/components/shared/Location'
import { SearchItem, SearchItemTitle } from '@/components/shared/Location'
import { ChoicePointMap as MapBase } from '@/components/shared/maps/ChoicePointMap'
import { ModalController } from '@/components/ui-kit/Modal'
import { Coordinates, Geocode } from '@/modules/map'
import { useDebounce } from '@/modules/utils/useDebounce'
import { mobileMedia, notMobileMedia } from '@/styles/media'

import { PointInput } from '../../../../../../__generated__/globalTypes'
import { Value } from '../../Location'
import { CommonLocationFeatureProps } from '../../types'

const SEARCH_DEBOUNCE = 500

type Props = {
  regionCenter?: Coordinates
  onSubmit: (feature: Value) => void
  value?: Value
  withCheckRegion?: boolean
  choicePoints?: PointInput[]
  locationError: string
  checkIsRegion: (choicePoints: PointInput[]) => Promise<boolean>
} & CommonLocationFeatureProps &
  Pick<ModalController, 'onRequestClose'>

export const ChoiceGeoPoint: FC<Props> = ({
  regionCenter,
  withCheckRegion,
  error,
  onBack,
  onRequestClose,
  value,
  onSubmit,
  title,
  choicePoints,
  locationError,
  checkIsRegion,
}) => {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null)
  const locationApiRef = useRef<LocationRef | null>(null)

  const reverseGeocode = async (coordinate: Coordinates) => {
    const [long, lat] = coordinate
    const isRegionChecked = await checkIsRegion([
      ...(choicePoints ?? []),
      { long, lat },
    ])
    const withLocationError = withCheckRegion && !isRegionChecked

    if (withLocationError) {
      locationApiRef.current?.setPlacesSearch([])
      locationApiRef.current?.setValue('search', '', { shouldDirty: true })
      locationApiRef.current?.setValue('location', null, { shouldDirty: true })
      return
    }

    await Geocode.reverse({
      coordinate,
    }).then(({ geoJson }) => {
      if (!coordinates || !isEqual(coordinates, coordinate)) {
        setCoordinates(coordinate)
      }

      locationApiRef.current?.setPlacesSearch(geoJson.features)

      const currentPlace = geoJson.features[0]

      if (!currentPlace) {
        locationApiRef.current?.setValue('search', '', {
          shouldDirty: true,
        })
        locationApiRef.current?.setValue('location', null, {
          shouldDirty: true,
        })
      }

      if (currentPlace.properties.fullAddress) {
        locationApiRef.current?.setValue(
          'search',
          currentPlace.properties.fullAddress,
          {
            shouldDirty: true,
          },
        )
        locationApiRef.current?.setValue('location', currentPlace, {
          shouldDirty: true,
        })
      }
    })
  }

  const onSearch = useDebounce((search: string) => {
    Geocode.forward({ search }).then(({ geoJson }) => {
      return locationApiRef.current?.setPlacesSearch(geoJson.features)
    })
  }, SEARCH_DEBOUNCE)

  const onSearchItemClick =
    (item: Value, closeSearchResult: () => void) => () => {
      if (item) {
        locationApiRef.current?.setValue('search', item.properties.title, {
          shouldDirty: true,
        })
        locationApiRef.current?.setValue('location', item, {
          shouldDirty: true,
        })
        // TODO: fix
        setCoordinates(item.geometry.coordinates as Coordinates)
      }
      closeSearchResult()
    }

  const onFormSubmit = (feature: Value) => {
    if (feature) {
      onSubmit(feature)
    }
  }

  return (
    <Location
      title={title}
      onBack={onBack}
      onSubmit={onFormSubmit}
      buttonText={'Add'}
      error={locationError || error}
      onRequestClose={onRequestClose}
      ref={locationApiRef}
      value={value}
      onSearch={onSearch}
      description={'Slide the map to point a place'}
      withCloseButton
      renderSearchItem={(item, closeSearchResult) =>
        item && (
          <SearchItem onClick={onSearchItemClick(item, closeSearchResult)}>
            <SearchItemTitle>{item.properties.title}</SearchItemTitle>
            {item.properties.subTitle}
          </SearchItem>
        )
      }
      renderMap={(input) => (
        <Map
          onMoveEnd={reverseGeocode}
          coordinates={coordinates}
          initialCenter={
            input.field.value?.geometry.coordinates || regionCenter
          }
        />
      )}
    />
  )
}

export const FieldChoiceGeoPoint: FC<
  {
    onChange?: (geoData: Value) => void
  } & UseControllerReturn &
    Omit<Props, 'onSubmit' | 'choicePoints'>
> = ({ field, onChange, ...props }) => {
  return (
    <ChoiceGeoPoint
      {...field}
      {...props}
      onSubmit={(value) => {
        field.onChange(value)
        onChange?.(value)
      }}
    />
  )
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
