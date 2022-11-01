import { FC } from 'react'
import styled from '@emotion/styled'

import { getColorTheme } from '@/styles/themes'

type Place = 'header' | 'body'
type Props = {
  badges: string[]
  className?: string
  max?: number
  place: Place
}

export const Badges: FC<Props> = ({ badges, className, max = 3, place }) => {
  if (badges.length === 0) {
    return null
  }
  const items = badges.slice(0, max)
  const restItemsCount = badges.slice(max).length || 0

  return (
    <Container className={className}>
      <Wrapper>
        {items.map((badge) => (
          <Badge key={badge} place={place}>
            {badge}
          </Badge>
        ))}
        {restItemsCount > 0 ? (
          <Badge key={'other'} place={place}>
            +{restItemsCount}
          </Badge>
        ) : null}
      </Wrapper>
    </Container>
  )
}
const Container = styled.div``
const Wrapper = styled.div`
  margin: 0 -0.6rem -0.6rem 0;

  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
`
const Badge = styled.div<{ place: Place }>`
  padding: 0.2rem 0.8rem;

  background-color: ${(props) =>
    props.place === 'body'
      ? getColorTheme('moon')(props)
      : getColorTheme('earth')(props)};
  border-radius: 1.2rem;

  font-size: 1.2rem;
  line-height: 1.6rem;

  white-space: nowrap;

  &:not(:first-of-type) {
    overflow: hidden;
    text-overflow: ellipsis;
  }
`
