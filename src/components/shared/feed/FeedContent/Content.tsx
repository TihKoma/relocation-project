import { FC, useContext, useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'

import { ViewModeContext } from '@/components/shared/layout/ViewModeContext'
import { LocationView } from '@/components/shared/Location'
import { TextCollapse as TextCollapseBase } from '@/components/ui-kit/TextCollapse'
import { FeedItem } from '@/modules/feed'
import { Coordinates, GeocodeFeature, mapServiceLocator } from '@/modules/map'
import { linkifyText } from '@/modules/utils/text/linkify-text'

import { Gallery as GalleryBase } from './Gallery'

type Props = {
  content?: string
  media?: FeedItem['post']['media']
  geoData?: GeocodeFeature
  className?: string
  isOnDetailedPage?: boolean
  linkToDetailedPage?: string
  withLinksInText?: boolean
  isLazyLoadPictures?: boolean
  variant?: 'default' | 'short'
}

export const Content: FC<Props> = ({
  content = '',
  media,
  geoData,
  className,
  isOnDetailedPage = false,
  withLinksInText,
  linkToDetailedPage,
  isLazyLoadPictures,
  variant = 'default',
}) => {
  const router = useRouter()

  const withMediaContent = !!(media && media.length)
  const isShort = variant === 'short'

  const [_, setViewModeData] = useContext(ViewModeContext)
  const onClickLocation = () => {
    setViewModeData?.('map', true)
    if (!isOnDetailedPage && geoData?.geometry.coordinates) {
      mapServiceLocator
        .getDiscoveryCPMapAsync()
        .then((mapFacade) =>
          mapFacade.easeToPost(geoData.geometry.coordinates as Coordinates, 18),
        )
    }
  }

  const openDetailedPage = () => {
    if (linkToDetailedPage) {
      router.push(linkToDetailedPage, undefined, { shallow: true })
    }
  }

  const formatContent = useMemo(() => {
    if (withLinksInText) {
      return linkifyText(content).map((item) => {
        if (typeof item === 'string') {
          return item
        }
        return (
          <Link href={item.url} passHref key={item.index + item.text}>
            <StyledLink
              target={item.schema === '#' ? '' : '__blank'}
              onClick={(event) => {
                event.stopPropagation()
              }}
            >
              {item.text}
            </StyledLink>
          </Link>
        )
      })
    }
    return content
  }, [content, withLinksInText])

  return (
    <Container className={className}>
      {linkToDetailedPage ? (
        <TextCollapse
          countRow={3}
          onClickText={openDetailedPage}
          isExpandButtonVisible={!isShort}
        >
          {formatContent}
        </TextCollapse>
      ) : (
        <Text>{formatContent}</Text>
      )}
      {withMediaContent && (
        <Gallery
          isLazy={isLazyLoadPictures}
          withPaddingTop={!!formatContent?.length}
          media={media}
        />
      )}
      {!isShort && (
        <LocationView
          value={geoData}
          isShowImage={!withMediaContent}
          onClickLocation={onClickLocation}
        />
      )}
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-auto-flow: row;
  gap: 8px;
`
const TextCollapse = styled(TextCollapseBase)`
  font-size: 1.4rem;
  line-height: 140%;
  letter-spacing: -0.05em;
`
const Text = styled.div`
  overflow: hidden;

  font-size: 1.4rem;
  line-height: 140%;
  letter-spacing: -0.05em;
  white-space: pre-line;
  overflow-wrap: break-word;
  hyphens: auto;
`
const Gallery = styled(GalleryBase)<{ withPaddingTop: boolean }>`
  padding-top: ${(props) => (props.withPaddingTop ? '1.6rem' : 0)};
`
const StyledLink = styled.a`
  overflow: hidden;
  background: inherit;
  cursor: pointer;

  color: #3f37c9;
  text-overflow: ellipsis;

  &:hover {
    text-decoration: underline;
  }
`
