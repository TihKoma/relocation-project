import { FC } from 'react'
import { createPortal } from 'react-dom'
import { useRouter } from 'next/router'

import { useMarkers } from '@/components/shared/maps/hooks/use-markers'
import { MapFacade } from '@/modules/map/base'
import { ROUTES } from '@/modules/router'

import { PostMarker } from './PostMarker'

type Props = {
  mapFacade: MapFacade
}

export const PostsMarkers: FC<Props> = ({ mapFacade }) => {
  const router = useRouter()

  const markers = useMarkers(mapFacade, 'post')

  return (
    <>
      {Object.entries(markers).map(([id, markerInfo]) => {
        const onClickPost = () => {
          router.push(
            ROUTES.detailedPost.calcUrl({ postSlug: id }),
            undefined,
            {
              shallow: true,
            },
          )
        }
        return createPortal(
          <PostMarker
            key={id}
            mapFacade={mapFacade}
            markerInfo={markerInfo}
            id={id}
            onClick={onClickPost}
          />,
          markerInfo.marker.getElement(),
        )
      })}
    </>
  )
}
