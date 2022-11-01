import { forwardRef, ReactNode } from 'react'
import styled from '@emotion/styled'

import AvatarMock from '@/images/avatar.svg'
import AvatarColorizedMock from '@/images/avatar-colorized.svg'
import { useImageDimensionsByDevice } from '@/modules/device'
import { withImageLazyLoading } from '@/modules/utils/images-lazy-loading'
import { HOVER_TRANSITION_TIME } from '@/styles/const'
import { getColorTheme } from '@/styles/themes'

type AvatarSize = 'xSmall' | 'small' | 'medium' | 'large'
type AvatarState = 'zero' | 'default'
type AvatarShape = 'round' | 'square'

const imageSizeMap: Record<AvatarSize, number> = {
  xSmall: 2.4,
  small: 3.2,
  medium: 4,
  large: 6,
}

type Props = {
  size?: AvatarSize
  src?: string
  state?: AvatarState
  withStroke?: boolean
  withShadow?: boolean
  withBorderAnimate?: boolean
  badge?: ReactNode
  className?: string
  style?: any
  onClick?: () => void
  profileName?: string
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  shape?: AvatarShape
  isLazyLoad?: boolean
}

export const Avatar = forwardRef<HTMLDivElement, Props>(
  (
    {
      className: customClassName,
      size = 'medium',
      state = 'default',
      src = null,
      withShadow,
      withStroke,
      withBorderAnimate,
      badge,
      isLazyLoad,
      profileName,
      style: customStyle,
      onClick,
      onMouseEnter,
      onMouseLeave,
      shape = 'round',
    },
    ref,
  ) => {
    const sidesSizes = `${imageSizeMap[size] * 30}x${imageSizeMap[size] * 30}`

    const pictureUrl = useImageDimensionsByDevice(src || '', {
      desktop: sidesSizes,
      desktopRetina: sidesSizes,
      tablet: sidesSizes,
      mobile: sidesSizes,
    })

    const altTitle = profileName ? `Avatar of ${profileName}` : 'Avatar'

    return (
      <Container
        ref={ref}
        shape={shape}
        isMockImage={!pictureUrl}
        withStroke={withStroke}
        withShadow={withShadow}
        withBorderAnimate={withBorderAnimate}
        className={customClassName}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
      >
        {isLazyLoad ? (
          <LazyImage
            size={size}
            alt={altTitle}
            width={imageSizeMap[size]}
            height={imageSizeMap[size]}
            src={
              pictureUrl ||
              (state === 'zero' ? AvatarMock.src : AvatarColorizedMock.src)
            }
            data-src={
              pictureUrl ||
              (state === 'zero' ? AvatarMock.src : AvatarColorizedMock.src)
            }
            style={customStyle}
            loading={'lazy'}
            shape={shape}
          />
        ) : (
          <Image
            size={size}
            alt={altTitle}
            width={imageSizeMap[size]}
            height={imageSizeMap[size]}
            src={
              pictureUrl ||
              (state === 'zero' ? AvatarMock.src : AvatarColorizedMock.src)
            }
            style={customStyle}
            shape={shape}
          />
        )}
        {badge && <BadgeWrapper shape={shape}>{badge}</BadgeWrapper>}
      </Container>
    )
  },
)

const Container = styled.div<{
  shape: AvatarShape
  isMockImage: boolean | undefined
  withStroke: boolean | undefined
  withShadow: boolean | undefined
  withBorderAnimate: boolean | undefined
}>`
  display: inline-block;

  position: relative;

  &::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;

    border-radius: ${(props) => (props.shape === 'round' ? '50%' : '1.2rem')};
    background: ${getColorTheme('sun')};
    opacity: 0;

    content: '';

    transition: ${HOVER_TRANSITION_TIME};
  }

  &:hover::after {
    opacity: ${({ shape }) => (shape === 'round' ? '0.2' : '0')};
  }

  &::before {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 2;

    border-radius: 50%;
    opacity: 1;

    content: '';

    ${(props) =>
      props.withShadow &&
      `box-shadow: 0px 4px 16px 1px rgba(18, 21, 31, 0.08),
                   0px 2px 4px 0px rgba(18, 21, 31, 0.08);`};
    ${(props) =>
      props.withStroke
        ? `border: 0.2rem solid ${getColorTheme('earth')(props)}`
        : ''};
    ${({ withBorderAnimate }) => withBorderAnimate && 'border-width: 0.4rem'};
  }
`

const Image = styled.img<{
  size: AvatarSize
  src: string | null
  shape: AvatarShape
}>`
  display: inline-block;

  background-size: cover;
  background-position: center;
  border-radius: ${(props) => (props.shape === 'round' ? '50%' : '1.2rem')};

  position: relative;

  vertical-align: middle;
  overflow: hidden;
  object-fit: cover;
  ${(props) => {
    const size = imageSizeMap[props.size]

    return `
    min-height: ${size}rem;
    min-width: ${size}rem;
    max-height: ${size}rem;
    max-width: ${size}rem;
  `
  }}
`

const BadgeWrapper = styled.div<{ shape: AvatarShape }>`
  position: absolute;

  ${({ shape }) =>
    shape === 'round'
      ? `
      right: -0.8rem;
      bottom: -0.8rem;`
      : `
      right: 0;
      bottom: 0;`};
`

const LazyImage = withImageLazyLoading(Image)
