import { FC, useContext } from 'react'
import { useQuery } from '@apollo/client'
import { Controller, ControllerRenderProps, FieldValues } from 'react-hook-form'

import { FieldChoiceGeoPoint } from '@/components/shared/Location'
import { useCheckRegion } from '@/components/shared/Location/features/ChoiceGeoPoint/use-check-region'
import { PostFormStageContext } from '@/components/shared/PostForm/post-form-stage-context'
import {
  BBoxList,
  Coordinates,
  GeocodeFeature,
  getBBoxCenterCoordinates,
  QUERY_GET_REGION,
} from '@/modules/map'
import { NEW_YORK_CENTER_COORDS } from '@/modules/mock'

type Props = {
  regionId?: string
  onChange?: (geoData: GeocodeFeature) => void
}
export const LocationStage: FC<Props> = ({ regionId, onChange }) => {
  const [_, setFormStage] = useContext(PostFormStageContext)
  const { coords, isLoading } = useRegionCenter(regionId)

  const [locationError, checkIsRegion] = useCheckRegion()

  return !isLoading ? (
    <Controller
      name={'geoData'}
      render={(input) => (
        <FieldChoiceGeoPoint
          {...input}
          field={input.field as ControllerRenderProps<FieldValues, string>}
          locationError={locationError}
          checkIsRegion={checkIsRegion}
          withCheckRegion
          onChange={(feature) => feature && onChange?.(feature)}
          title={'Select Location'}
          onRequestClose={() => setFormStage('main')}
          regionCenter={coords}
          onBack={() => setFormStage('main')}
        />
      )}
    />
  ) : null
}

const useRegionCenter = (
  regionId?: string,
): { coords: Coordinates; isLoading: boolean } => {
  const { data: region, loading: isLoading } = useQuery(QUERY_GET_REGION, {
    skip: !regionId,
    variables: { id: regionId as string },
    ssr: false,
  })

  const coords: Coordinates = region?.getRegion?.geometry.bbox
    ? getBBoxCenterCoordinates(region?.getRegion.geometry.bbox as BBoxList)
    : ([NEW_YORK_CENTER_COORDS.lng, NEW_YORK_CENTER_COORDS.lat] as Coordinates)

  return {
    isLoading,
    coords,
  }
}
