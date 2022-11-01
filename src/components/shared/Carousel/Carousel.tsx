import { FC } from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import styled from '@emotion/styled'
import {
  Carousel as ReactCarouselBase,
  CarouselProps,
} from 'react-responsive-carousel'

import { Indicator } from './Indicator'

export const Carousel: FC<Partial<CarouselProps>> = ({
  children,
  ...props
}) => {
  return (
    <ReactCarousel
      {...props}
      renderIndicator={(clickHandler, isSelected, index, label) => (
        <Indicator
          onClick={clickHandler}
          isSelected={isSelected}
          index={index}
          label={label}
        />
      )}
    >
      {children}
    </ReactCarousel>
  )
}

const ReactCarousel = styled(ReactCarouselBase)`
  .slider-wrapper {
    overflow: visible;
  }

  .carousel-slider {
    display: flex;
    flex-direction: column-reverse;
  }

  .control-dots {
    display: flex;
    justify-content: center;

    position: static;

    margin-top: 16px;
    margin-bottom: 0;
    padding: 0;
  }
`
