import { FC } from 'react'
import Link from 'next/link'
import styled from '@emotion/styled'

import { mobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

type Props = {
  title: string
  link?: {
    href: string
    text: string
  }
  onClick?: () => void
}

export const PartTitle: FC<Props> = ({ title, link, onClick }) => {
  return (
    <Container>
      <Title>{title}</Title>
      {link && (
        <Link href={link.href} passHref>
          <PartTitleLink onClick={onClick}>{link.text}</PartTitleLink>
        </Link>
      )}
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr max-content;
  justify-content: space-between;
  align-items: end;
  column-gap: 20px;
`
export const Title = styled.span`
  display: block;

  font-size: 2.4rem;
  line-height: 3rem;
  letter-spacing: -0.04em;

  ${mobileMedia} {
    font-size: 2rem;
    line-height: 2.4rem;
  }
`
const PartTitleLink = styled.a`
  color: ${getColorTheme('neptune')};
  line-height: 2.4rem;

  &:hover {
    color: ${getColorTheme('pluto')};
  }
`
