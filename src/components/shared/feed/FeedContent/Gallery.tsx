import { useMemo, VFC } from 'react'
import styled from '@emotion/styled'

import { useImageDimensionsByDevice } from '@/modules/device'
import { FeedItem } from '@/modules/feed'
import { withImageLazyLoading } from '@/modules/utils/images-lazy-loading'

import { MediaType } from '../../../../../__generated__/globalTypes'

type Props = {
  className?: string
  media: FeedItem['post']['media']
  isLazy?: boolean
}
export const Gallery: VFC<Props> = ({ className, media, isLazy }) => {
  const picture = useMemo(
    () =>
      media
        ? media.find((file) => file.type === MediaType.IMAGE) || media[0]
        : null,
    [media],
  )

  const pictureUrl = useImageDimensionsByDevice(picture?.url || '', {
    desktop: '640x650',
    desktopRetina: '1280x1300',
    tablet: '640x650',
    mobile: '640x650',
  })

  return (
    <Media className={className}>
      {isLazy ? (
        <LazyPicture
          loading={'lazy'}
          isMapPreview={picture?.type === MediaType.MAP}
          data-src={pictureUrl}
          alt={'Post picture'}
        />
      ) : (
        <Picture src={pictureUrl} width={'100%'} height={'100%'} />
      )}
    </Media>
  )
}

const Media = styled.div`
  display: flex;
  justify-content: flex-start;

  border-radius: 16px;
`
const LazyPicture = withImageLazyLoading(styled.img<{ isMapPreview: boolean }>`
  max-width: 100%;
  width: auto;
  height: auto;
  max-height: 65rem;

  object-fit: cover;
  border-radius: 16px;

  ${(props) => (props.isMapPreview ? 'cursor: pointer;' : '')}
`)
const Picture = styled.img`
  max-width: 100%;
  width: auto;
  height: auto;
  max-height: 65rem;

  object-fit: cover;
  border-radius: 16px;
`
