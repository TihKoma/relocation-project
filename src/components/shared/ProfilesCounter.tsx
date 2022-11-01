import { VFC } from 'react'
import styled from '@emotion/styled'

import { Avatar as AvatarBase } from '@/components/ui-kit/Avatar'
import ProfilePhotoMock from '@/images/avatar.svg'
import { getColorTheme } from '@/styles/themes'

type Props = {
  imagesSrc?: string[]
  count: number
  label: string
  pluralLabel: string
  className?: string
  onClick?: () => void
}
export const ProfilesCounter: VFC<Props> = ({
  imagesSrc,
  count,
  label,
  pluralLabel,
  className,
  onClick,
}) => {
  return (
    <Container className={className} onClick={onClick} clickable={!!onClick}>
      <div>
        {count === 0 ? (
          <Avatar
            size={'small'}
            src={ProfilePhotoMock.src}
            isLazyLoad
            withStroke
          />
        ) : (
          Array(Math.min(3, count))
            .fill(undefined)
            .map((_, index) => {
              return (
                <Avatar
                  key={index}
                  size={'small'}
                  src={imagesSrc?.[index]}
                  withStroke
                  isLazyLoad
                />
              )
            })
        )}
      </div>
      <Counter>
        {/*  TODO: add function label when (count: number) => string and remove pluralLabel and add function for plural */}
        <Number>{count}</Number> <span>{count > 1 ? pluralLabel : label}</span>
      </Counter>
    </Container>
  )
}

const Container = styled.div<{ clickable: boolean }>`
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  gap: 0.8rem;

  cursor: ${(props) => (props.clickable ? 'pointer' : 'default')};
  color: ${getColorTheme('sun')};
`

const Avatar = styled(AvatarBase)`
  &:nth-of-type(n + 2) {
    margin-left: -16px;
  }

  &:nth-of-type(1) {
    z-index: 4;
  }

  &:nth-of-type(2) {
    z-index: 3;
  }

  &:hover::after {
    opacity: 0;
  }
`
const Counter = styled.div`
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.04em;
`
const Number = styled.span`
  font-weight: 500;
`
