import { VFC } from 'react'
import styled from '@emotion/styled'

import { IS_HIGHLIGHT_MARKER_PROPERTY } from '@/modules/map/base'
import { getColorTheme } from '@/styles/themes'

import { Coordinates, MarkerInfo } from '../../../../../../modules/map/types'

type Props = {
  id: string
  markerInfo: MarkerInfo
  onClick: (clusterId: number, coordinates: Coordinates) => void
}

type PointerSize = 'medium' | 'large'

export const ClusterMarker: VFC<Props> = ({ markerInfo, id, onClick }) => {
  if (!markerInfo.cluster) {
    return null
  }

  const pointerSize: PointerSize =
    markerInfo.cluster.count > 12 ? 'large' : 'medium'

  const onClusterClick = () => {
    const { lng, lat } = markerInfo.marker.getLngLat()

    onClick(Number(id), [lng, lat])
  }

  return (
    <GeneralMarkerPointer
      pointerSize={pointerSize}
      onClick={onClusterClick}
      isHighlight={markerInfo.properties[IS_HIGHLIGHT_MARKER_PROPERTY]}
    >
      <InvisibleArea
        data-test-id={'invisible-area'}
        pointerSize={pointerSize}
      />
    </GeneralMarkerPointer>
  )
}

const GeneralMarkerPointer = styled.div<{
  pointerSize: PointerSize
  isHighlight: boolean
}>`
  ${(props) => {
    let size: number

    switch (props.pointerSize) {
      default:
      case 'medium': {
        size = 2.4
        break
      }
      case 'large': {
        size = 3.6
        break
      }
    }

    return `
      width: ${size}rem;
      height: ${size}rem;
    `
  }}
  position: relative;
  background-color: ${(props) =>
    props.isHighlight
      ? getColorTheme('uranus')(props)
      : getColorTheme('pluto')(props)};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.08),
    0px 3.78px 33.4221px rgba(0, 0, 0, 0.0503198),
    0px 41.7776px 33.4221px rgba(0, 0, 0, 0.0503198);
  border-radius: 2.5rem;

  transition: transform 0.5s;
`

const InvisibleArea = styled.div<{ pointerSize: PointerSize }>`
  ${(props) => {
    let size: number
    let translateX: number
    let translateY: number

    switch (props.pointerSize) {
      default:
      case 'medium': {
        size = 3.4
        translateX = -0.5
        translateY = -0.5
        break
      }
      case 'large': {
        size = 4.6
        translateX = -0.5
        translateY = -0.5
        break
      }
    }

    return `
      width: ${size}rem;
      height: ${size}rem;
      transform: translate(${translateX}rem, ${translateY}rem);
    `
  }}

  cursor: pointer;
  position: absolute;
  border-radius: 2.5rem;
`
