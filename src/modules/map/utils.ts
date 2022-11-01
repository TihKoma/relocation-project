import memoize from 'lodash/memoize'

import { mobile } from '@/styles/media'

import {
  BBoxList,
  BBoxObject,
  Coordinates,
  GeoFeaturePoint,
  MarkerFeature,
  MarkerPointerType,
  Position,
} from './types'

export const isBoxContainBox = (
  outsideBox: BBoxObject,
  insideBox: BBoxObject,
): boolean => {
  return (
    outsideBox.left < insideBox.left &&
    outsideBox.right > insideBox.right &&
    outsideBox.bottom < insideBox.bottom &&
    outsideBox.top > insideBox.top
  )
}

export const isBoxContainCoordinates = (
  outsideBox: BBoxObject,
  coordinates: Coordinates,
): boolean => {
  const [long, lat] = coordinates
  return (
    outsideBox.left < long &&
    outsideBox.right > long &&
    outsideBox.bottom < lat &&
    outsideBox.top > lat
  )
}

export const getBBoxCenterCoordinates = (bbox: BBoxList): Coordinates => {
  const box = convertBBoxListToObject(bbox)
  const width = getWidthBox(box)
  const height = getHeightBox(box)

  return [box.left + width / 2, box.bottom + height / 2]
}

// origin is center
export const getWidthBox = (box: BBoxObject) => box.right - box.left
export const getHeightBox = (box: BBoxObject) => box.top - box.bottom
export const scaleBox = (scale: number, box: BBoxObject): BBoxObject => {
  const kIndent = scale / 2
  const indentWidth = getWidthBox(box) * kIndent
  const indentHeight = getHeightBox(box) * kIndent
  return {
    left: box.left - indentWidth,
    right: box.right + indentWidth,
    bottom: box.bottom - indentHeight,
    top: box.top + indentHeight,
  }
}

export const calcPaddingForLayout = memoize((): Position => {
  const isDesktop = !window.matchMedia(`(max-width: ${mobile - 1}px)`).matches

  if (isDesktop) {
    const padding = 24
    const gap = 24
    const maxWithContent = 684
    const widthDocument = document.body.clientWidth
    let left = widthDocument / 2 - gap / 2
    if (left > maxWithContent) {
      left = maxWithContent + padding
    }
    return { left, top: 0, bottom: 0, right: 0 }
  } else {
    return { left: 0, top: 0, bottom: 0, right: 0 }
  }
})

export const getRegionSlugFromUrl = (): string | undefined => {
  const elUrl = window.location.pathname.split('/').filter((x) => x)
  if (
    elUrl[0]?.length > 0 &&
    ![
      'feed',
      'following',
      'search',
      'login',
      'where',
      'post',
      'u',
      'tag',
      'homes',
      'mp',
    ].includes(elUrl[0])
  ) {
    return decodeURI(elUrl[0])
  }
}

export const convertGeoFeaturesToMarkersFeatures = (
  features: GeoFeaturePoint[],
  type: MarkerPointerType,
): MarkerFeature[] => {
  return features.map((feature) => {
    return {
      ...feature,
      properties: {
        ...feature.properties,
        type,
      },
    }
  })
}

export const convertBBoxListToObject = (bbox: BBoxList) => {
  return {
    left: bbox[0],
    bottom: bbox[1],
    right: bbox[2],
    top: bbox[3],
  }
}

export const convertBBoxObjectToList = (bbox: Position): BBoxList => [
  bbox.left,
  bbox.bottom,
  bbox.right,
  bbox.top,
]

const FACTOR_MATCH_MARKERS = 10
const FACTOR_CONVERT_INTEGER = 1e5

export const diversifyFeaturesCoordinates = (
  features: MarkerFeature[],
): MarkerFeature[] => {
  return features.reduce((acc, feature) => {
    const coords = feature.geometry.coordinates

    const isCoordinatesMatch = acc.some((previousFeature) => {
      const prevCoordinates = previousFeature.geometry.coordinates
      if (coords === undefined || prevCoordinates === undefined) {
        return false
      }
      return (
        prevCoordinates[0] === coords[0] && prevCoordinates[1] === coords[1]
      )
    })

    let correctCoords = coords

    if (isCoordinatesMatch) {
      const randomFactor = Math.floor(Math.random() * FACTOR_MATCH_MARKERS) + 2
      correctCoords = [
        (coords[0] * FACTOR_CONVERT_INTEGER - randomFactor) /
          FACTOR_CONVERT_INTEGER,
        (coords[1] * FACTOR_CONVERT_INTEGER - randomFactor) /
          FACTOR_CONVERT_INTEGER,
      ]
    }

    return [
      ...acc,
      {
        ...feature,
        geometry: { ...feature.geometry, coordinates: correctCoords },
      },
    ]
  }, [] as MarkerFeature[])
}
