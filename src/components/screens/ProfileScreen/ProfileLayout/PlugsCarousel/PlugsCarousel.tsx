import { VFC } from 'react'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'

import { Carousel } from '@/components/shared/Carousel'
import { QUERY_GET_USER_PROFILE } from '@/modules/profile'

import { AddAvatarPlug } from './AddAvatarPlug'
import { AddCoverPlug } from './AddCoverPlug'

export const PlugsCarousel: VFC = () => {
  const { data: { getUserProfile } = {} } = useQuery(QUERY_GET_USER_PROFILE)
  const { photoUrl, coverUrl } = getUserProfile ?? {}

  if (photoUrl && coverUrl) return null
  if (photoUrl && !coverUrl) return <AddCoverPlug />
  if (coverUrl && !photoUrl) return <AddAvatarPlug />

  return (
    <Container>
      <Carousel
        showArrows={false}
        showStatus={false}
        autoPlay
        interval={5000}
        showThumbs={false}
        swipeable
        infiniteLoop
      >
        <CarouselSlide>
          <AddAvatarPlug />
        </CarouselSlide>
        <CarouselSlide>
          <AddCoverPlug />
        </CarouselSlide>
      </Carousel>
    </Container>
  )
}

const Container = styled.div`
  max-width: 100%;
  overflow-x: hidden;
`
const CarouselSlide = styled.div`
  display: flex;
  justify-content: center;
`
