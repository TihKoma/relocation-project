import { FC } from 'react'
import Link from 'next/link'
import styled from '@emotion/styled'

import { TodoFields } from '@/modules/relocation-project'
import { getColorTheme } from '@/styles/themes'

type Props = {
  guides: TodoFields['guides']
}
export const TaskGuides: FC<Props> = ({ guides }) => {
  return (
    <Container>
      <Title>Explore Nicity guide:</Title>
      {guides?.map((item) => {
        return (
          <Link href={item?.link ?? ''} passHref>
            <Item
              onClick={(event) => {
                event.stopPropagation()
              }}
            >
              <Image src={item?.icon ?? ''} />
              {item?.title}
            </Item>
          </Link>
        )
      })}
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  padding: 1.6rem;

  border-radius: 1.6rem;
  display: grid;
  grid-auto-flow: row;
  justify-content: start;
  gap: 0.8rem;

  border: 1px solid ${getColorTheme('strokeDefaultSecondary')};

  font-size: 1.4rem;
  line-height: 20px;
  font-weight: 500;
  font-feature-settings: 'liga' off;
`
const Title = styled.div`
  color: ${getColorTheme('textDefaultSecondary')};
`
const Item = styled.a`
  display: grid;
  grid-auto-flow: column;
  justify-content: start;
  gap: 0.8rem;

  text-decoration: underline;
`
const Image = styled.img`
  width: 2.4rem;
  height: 2.4rem;

  object-fit: contain;
`
