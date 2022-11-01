import { FC } from 'react'
import Link from 'next/link'
import styled from '@emotion/styled'

import { ROUTES } from '@/modules/router'
import { getColorTheme } from '@/styles/themes'

type Props = {
  id: string
  title: string
  imageSrc: string
}
export const GuideCard: FC<Props> = ({ title, id, imageSrc }) => {
  return (
    <Link href={ROUTES.guideArticle.calcUrl({ guideSlug: id })} passHref>
      <Container>
        <ImageWrapper>
          <Image src={imageSrc} />
        </ImageWrapper>
        <Title>{title}</Title>
      </Container>
    </Link>
  )
}

const Container = styled.a`
  width: 31.6rem;
  height: 7.2rem;
  padding: 1.6rem;

  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1.6rem;
  align-items: center;

  border: 1px solid ${getColorTheme('strokeDefaultSecondary')};
  border-radius: 1.6rem;
  box-shadow: 0px 2px 8px rgba(18, 21, 31, 0.04),
    0px 6px 24px rgba(18, 21, 31, 0.1);
  cursor: pointer;
`
const ImageWrapper = styled.div`
  width: 4rem;
  height: 4rem;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;
  background: ${getColorTheme('backgroundDefaultSecondary')};
`
const Image = styled.img`
  width: 2.8rem;
  height: 2.8rem;
`
const Title = styled.div``
