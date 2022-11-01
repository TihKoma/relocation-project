import { forwardRef, useMemo } from 'react'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'
import { FloatingPortal } from '@floating-ui/react-dom-interactions'

import { MediaType, QUERY_GET_POST_BY_ID } from '@/modules/post'

import { MapPostContent } from './MapPostContent'

type Props = {
  postId: string
  onMouseLeave: () => void
  onMouseEnter: () => void
  onClick: () => void
  style: { position: 'absolute' | 'fixed'; left: number | ''; top: number | '' }
}

export const MapPostPopup = forwardRef<HTMLDivElement, Props>(
  ({ postId, style, onMouseEnter, onMouseLeave, onClick }, ref) => {
    const { loading, data, error } = useQuery(QUERY_GET_POST_BY_ID, {
      variables: { id: postId },
      ssr: false,
    })

    const media = data?.getPostById.post.media

    const withMediaContent = !!(media && media.length)

    const picture = useMemo(
      () =>
        withMediaContent
          ? media.find((file) => file.type === MediaType.IMAGE) || media[0]
          : null,
      [withMediaContent, media],
    )

    if (loading || error) {
      return null
    } else if (data) {
      const { reactions, post, user, comments } = data.getPostById
      const userName = `${user.firstName} ${user.lastName}`

      return (
        <FloatingPortal>
          <Container
            onMouseLeave={onMouseLeave}
            onMouseEnter={onMouseEnter}
            style={style}
            ref={ref}
          >
            <MapPostContent
              text={post.content}
              userName={userName}
              reactions={reactions}
              onClick={onClick}
              mediaSrc={picture?.url}
              commentsCounter={comments?.length}
            />
          </Container>
        </FloatingPortal>
      )
    }

    return null
  },
)

const Container = styled.div``
