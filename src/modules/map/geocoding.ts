import {
  ApolloCache,
  ApolloClient,
  DefaultContext,
  FetchResult,
  MutationOptions,
  OperationVariables,
} from '@apollo/client'
import { FeatureCollection, Point } from 'geojson'
import queryString from 'query-string'

import { TOMTOM_API_KEY } from '@/modules/utils/config'

import { Coordinates } from './types'

type ReverseOptions = {
  coordinate: Coordinates
  limit?: number
}

type Reverse = (options: ReverseOptions) => Promise<GeocodeResponse>
const reverse: Reverse = ({
  coordinate: [longitude, latitude],
  limit: limitSource = 30,
}) => {
  const limit = Math.min(limitSource, gapLimit)
  const query = queryString.stringify(
    {
      key: TOMTOM_API_KEY,
      limit: Math.max(limitSource, gapLimit),
    } as Omit<ReverseOptions, 'coordinate'>,
    { arrayFormat: 'comma' },
  )
  return fetch(
    `https://api.tomtom.com/search/2/reverseGeocode/${latitude},${longitude}.json?${query}`,
    {
      method: 'GET',
    },
  )
    .then((x) => x.json())
    .then(mapReverseResponseServerToGeocodeResponse(limit))
}
const mapReverseResponseServerToGeocodeResponse =
  (limit: number) =>
  (response: GeocodeReversResponseServer): GeocodeResponse => {
    return {
      geoJson: {
        type: 'FeatureCollection',
        features: response.addresses.slice(0, limit).map((result) => {
          const [latitude, longitude] = result.position.split(',').map(Number)
          const properties = getPropertiesFromReverse(result)
          return {
            type: 'Feature',
            id: properties.fullAddress,
            geometry: {
              type: 'Point',
              coordinates: [longitude, latitude],
            },
            properties,
          }
        }),
      },
    }
  }
const getPropertiesFromReverse = (
  result: GeocodeReversResponseServer['addresses'][number],
): GeocodeResponseProperties => {
  const title = maybeJoin([
    result.address.streetNumber,
    result.address.streetName,
  ])
  const subTitle = maybeJoin([
    result.address.streetNumber,
    result.address.streetName,
    result.address.municipality,
    result.address.countrySubdivisionName,
    result.address.country,
  ])
  return {
    fullAddress: maybeJoin([title, subTitle]),
    title,
    subTitle,
    placeType: 'Point Address',
  }
}

type GeocodeReversResponseServer = {
  summary: {}
  addresses: Array<{
    address: AddressTomTom
    position: `${number},${number}`
  }>
}

type AddressTomTom = {
  freeformAddress?: string
  countrySubdivisionName?: string
  country?: string
  streetNumber?: string
  streetName?: string
  municipality?: string
  countrySubdivision?: string
  countrySecondarySubdivision?: string
}
type AddressesForFilter = 'countrySubdivision' | 'countrySecondarySubdivision'
type PlaceTypes = 'Geography' | 'POI' | 'Point Address'
type ForwardTomTomBase<
  TYPE extends PlaceTypes,
  ADDRESS extends Exclude<keyof AddressTomTom, AddressesForFilter>,
> = {
  type: TYPE
  id: string
  address: Pick<AddressTomTom, ADDRESS | AddressesForFilter>
  position: { lat: number; lon: number }
} & (TYPE extends 'POI'
  ? {
      poi: { name?: string }
    }
  : {})

type GeocodeResponseServerForward =
  | ForwardTomTomBase<
      'Geography',
      'freeformAddress' | 'countrySubdivisionName' | 'country'
    >
  | ForwardTomTomBase<
      'POI',
      | 'streetNumber'
      | 'streetName'
      | 'municipality'
      | 'countrySubdivisionName'
      | 'country'
    >
  | ForwardTomTomBase<
      'Point Address',
      | 'streetNumber'
      | 'streetName'
      | 'municipality'
      | 'countrySubdivisionName'
      | 'country'
    >

type GeocodeForwardResponseServer = {
  summary: {}
  results: Array<GeocodeResponseServerForward>
}

type ForwardOptions = {
  search: string
  countries?: string[]
  limit?: number
  typeahead?: boolean
  idxSet?: string[]
  entityTypeSet?: string[]
}
type GeocodeResponseProperties = {
  fullAddress: string
  title: string
  subTitle: string
  placeType: PlaceTypes
}
export type GeocodeResponse = {
  geoJson: FeatureCollection<Point, GeocodeResponseProperties>
}
export type GeocodeFeature = GeocodeResponse['geoJson']['features'][number]

type Forward = (
  options: Pick<ForwardOptions, 'limit' | 'search'>,
) => Promise<GeocodeResponse>
const forward: Forward = ({ search, limit: limitSource = 30 }) => {
  const limit = Math.min(limitSource, gapLimit)
  const query = queryString.stringify(
    {
      key: TOMTOM_API_KEY,
      limit: Math.max(limitSource, gapLimit),
      idxSet: ['Geo', 'PAD', 'POI'],
      countrySet: ['US'],
      typeahead: true,
    } as Omit<ForwardOptions, 'search'>,
    { arrayFormat: 'comma' },
  )
  return fetch(
    `https://api.tomtom.com/search/2/search/${search}.json?${query}`,
    {
      method: 'GET',
    },
  )
    .then((x) => x.json())
    .then(mapForwardResponseServerToGeocodeResponse(limit))
}

const mapForwardResponseServerToGeocodeResponse =
  (limit: number) =>
  (response: GeocodeForwardResponseServer): GeocodeResponse => {
    return {
      geoJson: {
        type: 'FeatureCollection',
        features: response.results.slice(0, limit).map((result) => {
          return {
            type: 'Feature',
            id: result.id,
            geometry: {
              type: 'Point',
              coordinates: [result.position.lon, result.position.lat],
            },
            properties: getPropertiesFromForward(result),
          }
        }),
      },
    }
  }

const getPropertiesFromForward = (
  result: GeocodeResponseServerForward,
): GeocodeResponseProperties => {
  const placeType = result.type
  switch (result.type) {
    case 'POI': {
      const title = maybeJoin([result.poi.name])
      const subTitle = maybeJoin([
        result.address.streetNumber,
        result.address.streetName,
        result.address.municipality,
        result.address.countrySubdivisionName,
        result.address.country,
      ])
      return {
        fullAddress: maybeJoin([title, subTitle]),
        title,
        subTitle,
        placeType,
      }
    }
    case 'Geography': {
      const title = maybeJoin([result.address.freeformAddress])
      const subTitle = maybeJoin([
        result.address.countrySubdivisionName,
        result.address.country,
      ])
      return {
        fullAddress: maybeJoin([title, subTitle]),
        title,
        subTitle,
        placeType,
      }
    }
    case 'Point Address':
      const title = maybeJoin([
        result.address.streetNumber,
        result.address.streetName,
      ])
      const subTitle = maybeJoin([
        result.address.municipality,
        result.address.countrySubdivisionName,
        result.address.country,
      ])
      return {
        fullAddress: maybeJoin([title, subTitle]),
        title,
        subTitle,
        placeType,
      }
    default:
      return {
        title: '',
        subTitle: '',
        fullAddress: '',
        placeType,
      }
  }
}

export const Geocode = {
  forward,
  reverse,
}
const gapLimit = 100

const maybeJoin = (array: Array<string | null | undefined>): string =>
  array.filter((subTitle) => subTitle).join(', ')

export class AdapterGeoJsonFromMapboxToTomTomApolloClient<
  TCacheShape,
> extends ApolloClient<TCacheShape> {
  mutate<
    TData = any,
    TVariables = OperationVariables,
    TContext = DefaultContext,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    TCache extends ApolloCache<any> = ApolloCache<any>,
  >(
    options: MutationOptions<TData, TVariables, TContext>,
  ): Promise<FetchResult<TData>> {
    if (
      'variables' in options &&
      options.variables &&
      'input' in options.variables &&
      // @ts-ignore
      options.variables.input
    ) {
      // @ts-ignore
      if ('geoData' in options.variables.input) {
        // @ts-ignore
        return super.mutate({
          ...options,
          variables: {
            ...options.variables,
            input: {
              // @ts-ignore
              ...options.variables.input,
              // @ts-ignore
              geoData: options.variables.input.geoData && {
                place_type:
                  // @ts-ignore
                  [options.variables.input.geoData.properties.placeType],
                // @ts-ignore
                ...options.variables.input.geoData,
                place_name:
                  // @ts-ignore
                  options.variables.input.geoData.properties.fullAddress,
                address:
                  // @ts-ignore
                  options.variables.input.geoData.properties.fullAddress,
                properties: {
                  // @ts-ignore
                  ...options.variables.input.geoData.properties,
                  placeType: [
                    // @ts-ignore
                    options.variables.input.geoData.properties.placeType,
                  ],
                  placeName:
                    // @ts-ignore
                    options.variables.input.geoData.properties.fullAddress,
                },
              },
            },
          },
        })
      }
    }
    return super.mutate(options)
  }
}
