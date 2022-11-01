import { useCallback, VFC } from 'react'
import styled from '@emotion/styled'
import { useSwiper } from 'swiper/react'

type Props = {
  itemsAmount: number
  className?: string
}

export const GallerySlideToOverlay: VFC<Props> = ({
  itemsAmount,
  className,
}) => {
  const swiper = useSwiper()

  const handleContainerMouseLeave = useCallback(() => {
    swiper.slideTo(0, 0)
  }, [swiper])

  const handleItemMouseEnter = useCallback(
    (index: number) => () => {
      swiper.slideTo(index, 0)
    },
    [swiper],
  )

  return (
    <Wrapper className={className}>
      <Container onMouseLeave={handleContainerMouseLeave}>
        {Array(itemsAmount)
          .fill(0)
          .map((_, index) => (
            <Item key={index} onMouseEnter={handleItemMouseEnter(index)} />
          ))}
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
`
const Container = styled.div`
  display: flex;
  justify-content: stretch;

  height: 100%;
`
const Item = styled.span`
  flex-basis: 100%;
`
