import { FC } from 'react'

import { MapFacade } from '@/modules/map/base'

import { ListingsGroupMarkers } from './ListingsGroupMarkers'
import { ListingSingleMarkers } from './ListingSingleMarkers'

type Props = {
  mapFacade: MapFacade
}

export const ListingsMarkers: FC<Props> = ({ mapFacade }) => {
  return (
    <>
      <ListingSingleMarkers mapFacade={mapFacade} />
      <ListingsGroupMarkers mapFacade={mapFacade} />
    </>
  )
}
