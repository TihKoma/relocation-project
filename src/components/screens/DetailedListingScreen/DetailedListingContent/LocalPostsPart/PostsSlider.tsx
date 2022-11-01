import {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
  VFC,
  WheelEvent,
} from 'react'
import styled from '@emotion/styled'
import throttle from 'lodash/throttle'

import { ShortPost as ShortPostBase } from '@/components/shared/feed/Post/ShortPost'
import { useAnalytics } from '@/modules/analytics'
import { FeedPost } from '@/modules/listing'
import { mobileMedia, tabletMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

type Direction = 'left' | 'right'
type Props = {
  posts: FeedPost[]
  className?: string
  metaSlide?: ReactNode
}

export const PostsSlider: VFC<Props> = ({
  posts,
  metaSlide: MetaSlide,
  className,
}) => {
  const analytics = useAnalytics()
  const { onSliderButtonClick, contentRef } = useSliderButtons(posts)
  const { onScrollAreaMouseEnter, onScrollAreaMouseLeave } = useScrollArea(
    contentRef.current,
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onScroll = useCallback(
    throttle((e: WheelEvent<HTMLDivElement>) => {
      e.preventDefault()
      analytics.MPDetailedListingLocalsScrolling()
    }, 1000),
    [],
  )

  return (
    <Wrapper className={className}>
      <LeftSliderButton onClick={() => onSliderButtonClick('left')} />
      <LeftScrollArea
        onMouseEnter={() => onScrollAreaMouseEnter('left')}
        onMouseLeave={onScrollAreaMouseLeave}
      />
      <Content onScroll={onScroll} ref={contentRef}>
        {posts.length > 0 &&
          posts.map((post) => (
            <PostWrapper data-short-post-id={post.post.id}>
              <ShortPost
                item={post}
                isLazyLoadPictures
                key={post.post.id}
                onContainerClick={() => {
                  analytics.MPDetailedListingLocalsSaysOpen()
                }}
              />
            </PostWrapper>
          ))}
        <MetaSlideWrapper>{MetaSlide}</MetaSlideWrapper>
      </Content>
      <RightScrollArea
        onMouseEnter={() => onScrollAreaMouseEnter('right')}
        onMouseLeave={onScrollAreaMouseLeave}
      />
      <RightSliderButton onClick={() => onSliderButtonClick('right')} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin: 0 -1.6rem;

  display: grid;

  position: relative;
`
const Content = styled.div`
  display: flex;
  gap: 1.6rem;

  width: 100%;

  overflow-y: auto;
  scroll-behavior: smooth;
`
const PostWrapper = styled.div`
  flex-shrink: 0;
  width: calc(100% - 11.8rem);
  height: 100%;

  &:first-of-type {
    margin-left: 1.6rem;
  }
  &:last-of-type {
    margin-right: 1.6rem;
  }

  ${tabletMedia} {
    width: calc(100% - 5.8rem);
  }

  ${mobileMedia} {
    width: calc(100% - 4.3rem);
  }
`
const InvisibleControls = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 2;
`
const SliderButton = styled(InvisibleControls)`
  width: 3rem;

  cursor: pointer;
`
const LeftSliderButton = styled(SliderButton)`
  left: 0;
`
const RightSliderButton = styled(SliderButton)`
  right: 0;
`
const ScrollArea = styled(InvisibleControls)`
  width: 3rem;
`
const LeftScrollArea = styled(ScrollArea)`
  left: 3rem;
`
const RightScrollArea = styled(ScrollArea)`
  right: 3rem;
`
const ShortPost = styled(ShortPostBase)`
  height: 100%;

  border: 1px solid ${getColorTheme('sun200')};
`
const MetaSlideWrapper = styled.div`
  flex-shrink: 0;

  max-width: 19rem;
  width: 100%;

  margin-right: 1.6rem;

  border: 1px solid ${getColorTheme('sun200')};
  border-radius: 1.2rem;
`

const useSliderButtons = (posts: FeedPost[]) => {
  const contentRef = useRef<HTMLDivElement | null>(null)
  const [currentPostIndex, setCurrentPostIndex] = useState(0)
  const postsRefs = useRef<HTMLDivElement[] | null>(null)

  useEffect(() => {
    if (contentRef.current && postsRefs.current?.length) {
      if (currentPostIndex === 0) {
        contentRef.current.scrollTo({
          left: 0,
        })
        return
      }

      if (currentPostIndex === posts.length) {
        contentRef.current.scrollTo({
          left: contentRef.current.scrollWidth,
        })
        return
      }

      const currentPostRef = postsRefs.current[currentPostIndex]

      if (currentPostRef) {
        const { width } = currentPostRef.getBoundingClientRect()

        contentRef.current.scrollTo({
          left: width * currentPostIndex + 8 * currentPostIndex,
        })
      }
    }
  }, [currentPostIndex, posts.length])

  const onSliderButtonClick = (direction: Direction) => {
    if (contentRef.current) {
      postsRefs.current = [].slice.call(
        document.querySelectorAll('[data-short-post-id]'),
      )

      setCurrentPostIndex((state) => {
        const delta = direction === 'right' ? 1 : -1
        const result = state + delta

        if (result >= 0 && result <= posts.length) {
          return result
        } else {
          return state
        }
      })
    }
  }

  return {
    onSliderButtonClick,
    contentRef,
  }
}

const SPEED_SCROLL = 50
const useScrollArea = (element: HTMLDivElement | null) => {
  const [moveDirection, setMoveDirection] = useState<Direction | null>(null)
  const timerRef = useRef<number | null>(null)

  const onScrollAreaMouseEnter = (direction: Direction) => {
    setMoveDirection(direction)
  }
  const onScrollAreaMouseLeave = () => {
    setMoveDirection(null)
  }

  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    if (!element) {
      return
    }

    if (moveDirection === 'left') {
      timerRef.current = setInterval(() => {
        element.scrollTo({ left: element.scrollLeft - 50 })
      }, SPEED_SCROLL) as unknown as number
    }

    if (moveDirection === 'right') {
      timerRef.current = setInterval(() => {
        element.scrollTo({ left: element.scrollLeft + 50 })
      }, SPEED_SCROLL) as unknown as number
    }
  }, [moveDirection, element])

  return {
    onScrollAreaMouseEnter,
    onScrollAreaMouseLeave,
  }
}
