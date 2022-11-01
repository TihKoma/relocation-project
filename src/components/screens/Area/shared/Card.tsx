import { ReactNode, VFC } from 'react'
import styled from '@emotion/styled'

import { useImageDimensionsByDevice } from '@/modules/device'
import { getColorTheme } from '@/styles/themes'

type Props = {
  title: ReactNode
  description: ReactNode
  photoUrl?: string
  className?: string
}
export const Card: VFC<Props> = ({
  title,
  description,
  photoUrl,
  ...props
}) => {
  const pictureUrl = useImageDimensionsByDevice(photoUrl || '', {
    desktop: '40x40',
    desktopRetina: '80x80',
    tablet: '80x80',
    mobile: '80x80',
  })

  return (
    <Container {...props}>
      {/* TODO: add placeholder*/}
      <Photo src={pictureUrl} />
      <Title>{title}</Title>
      <Description>{description}</Description>
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0 0.4rem;
`
const Photo = styled.img`
  width: 4rem;
  height: 4rem;

  grid-row: 2 span;

  border-radius: 0.8rem;
`
const Title = styled.div`
  width: max-content;
  max-width: 13.4rem;

  font-weight: 500;
  font-size: 1.4rem;
  line-height: 2rem;
  letter-spacing: -0.04em;
  color: ${getColorTheme('sun1000')};

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
const Description = styled.div`
  font-weight: 400;
  font-size: 1.2rem;
  line-height: 1.6rem;
  color: ${getColorTheme('sun500')};
  white-space: nowrap;

  b {
    font-weight: 500;
  }
`
