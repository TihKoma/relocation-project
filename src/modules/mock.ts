import {
  convertBBoxObjectToList,
  getBBoxCenterCoordinates,
} from '@/modules/map'

import { BBoxInput } from '../../__generated__/globalTypes'

export const NEW_YORK_CENTER_COORDS = {
  lng: -73.98745684686952,
  lat: 40.73193781365359,
}

export const NEW_YORK_CENTER: [number, number] = [
  NEW_YORK_CENTER_COORDS.lng,
  NEW_YORK_CENTER_COORDS.lat,
]

export const NEW_YORK_SLUG = 'new_york-a.f9x7goslwp-new_york'

export const NY_TX_FL_BBOX: BBoxInput = {
  top: 25.035794285853854,
  left: -102.98903150100439,
  bottom: 42.07302723208031,
  right: -71.47246040149108,
}

export const USA_BBOX = {
  top: 25.39979882952518,
  bottom: 71.00724803163618,
  left: -167.39580126454595,
  right: -55.57993512006125,
}

export const NY_TX_FL_BBOX_CENTER: [number, number] = getBBoxCenterCoordinates(
  convertBBoxObjectToList(NY_TX_FL_BBOX),
)

export const USA_CENTER: [number, number] = getBBoxCenterCoordinates(
  convertBBoxObjectToList(USA_BBOX),
)
