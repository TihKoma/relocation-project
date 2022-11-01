import { ComponentPropsWithoutRef, forwardRef, MouseEvent } from 'react'
import styled from '@emotion/styled'

import { Loader } from '@/components/ui-kit/Loader'
import { MinusIcon, PlusIcon } from '@/images'
import { getColorTheme, PropsTheme } from '@/styles/themes'

import { NormalizedButton } from './Button'

type BackgroundUnderButton = 'default' | 'alt'
type Size = 'large' | 'medium' | 'small'

type StyleProps = {
  backgroundUnderButton: BackgroundUnderButton
  size: Size
  withIcon: boolean
  fullWidth: boolean
}
type Props = {
  subscribed: boolean
  onFollow: (event: MouseEvent<HTMLButtonElement>) => void
  onUnfollow: (event: MouseEvent<HTMLButtonElement>) => void
  loading?: boolean
} & Partial<StyleProps> &
  Omit<ComponentPropsWithoutRef<'button'>, 'onClick'>

export const FollowButton = forwardRef<HTMLButtonElement, Props>(
  (
    {
      backgroundUnderButton = 'default',
      size = 'medium',
      subscribed,
      withIcon = false,
      fullWidth = false,
      onFollow,
      onUnfollow,
      loading = false,
      ...props
    },
    ref,
  ) => {
    let content
    if (withIcon) {
      content = subscribed ? <MinusIcon /> : <PlusIcon />
    } else {
      content = subscribed ? 'Unfollow' : 'Follow'
    }

    return (
      <Button
        backgroundUnderButton={backgroundUnderButton}
        size={size}
        subscribeState={subscribed ? 'unfollow' : 'follow'}
        withIcon={withIcon}
        fullWidth={fullWidth}
        onClick={subscribed ? onUnfollow : onFollow}
        {...props}
        ref={ref}
      >
        {loading ? (
          <Loader
            withGradient
            size={'xSmall'}
            color={subscribed ? 'neptune' : 'earth'}
          />
        ) : (
          content
        )}
      </Button>
    )
  },
)

const size = {
  small: `
    width: 10rem;
    height: 4rem;
    min-width: 4rem;
    
    font-size: 1.6rem;
  `,
  medium: `
    width: 10rem;
    height: 5.6rem;
    min-width: 5.6rem;
    
    font-size: 1.6rem;
  `,
  large: `
    width: 14.6rem;
    height: 7.2rem;
    min-width: 7.2rem;

    font-size: 2.2rem;
  `,
}
const getButtonColors = ({
  backgroundUnderButton,
  subscribeState,
  ...props
}: StyleProps & { subscribeState: 'follow' | 'unfollow' } & PropsTheme) => {
  return {
    default: {
      follow: `
        background: ${getColorTheme('neptune')(props)};
        color: ${getColorTheme('earth')(props)};
        border-color: transparent;
        
        &:hover {
          background: ${getColorTheme('neptune500')(props)};
        }

        &:disabled {
          background: ${getColorTheme('sun50')(props)};
          color: ${getColorTheme('sun500')(props)};
        }
      `,
      unfollow: `
        background: transparent;
        color: ${getColorTheme('sun500')(props)};
        border-color: ${getColorTheme('sun200')(props)};
        
        &:hover {
          color: ${getColorTheme('sun800alpha')(props)};
        }
        
        &:disabled {
          background: ${getColorTheme('sun50')(props)};
          color: ${getColorTheme('sun500')(props)};
          border-color: transparent;
        }
      `,
    },
    alt: {
      follow: `
        background: ${getColorTheme('sun')(props)};
        color: ${getColorTheme('neptune')(props)};
        border-color: transparent;
        
        &:hover {
          background: ${getColorTheme('sun200')(props)};
        }
        
        &:hover {
          background: ${getColorTheme('sun50')(props)};
          color: ${getColorTheme('sun500')(props)};
        }
      `,
      unfollow: `
        background: transparent;
        color: ${getColorTheme('earth500alpha')(props)};
        border-color: currentColor;
        
        &:hover {
          color: ${getColorTheme('earth')(props)};
        }
        
        &:disabled {
          background: ${getColorTheme('earth500alpha')(props)};
          color: ${getColorTheme('earth500alpha')(props)};
        }
      `,
    },
  }[backgroundUnderButton][subscribeState]
}

const Button = styled(NormalizedButton)<
  StyleProps & { subscribeState: 'follow' | 'unfollow' }
>`
  ${(props) => size[props.size]};
  ${getButtonColors};

  ${(props) =>
    props.withIcon
      ? `
    padding: 0;
    width: unset;
  `
      : `
    min-width: unset;
  `};

  ${(props) => (props.fullWidth ? 'width: 100%;' : '')}

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 4rem;
  border-style: solid;
  border-width: 0.2rem;

  & svg {
    fill: currentColor;
    stroke: currentColor;
  }

  &:disabled {
    cursor: default;
  }
`
