import { FC } from 'react'
import Link from 'next/link'
import styled from '@emotion/styled'

import { Button } from '@/components/ui-kit/Button'
import { NothingFoundImg } from '@/images'
import { ROUTES } from '@/modules/router'
import { mobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

export const NoSavedSearches: FC = () => {
  return (
    <Container>
      <NothingFoundImg />
      <Title>You haven't saved any searches yet</Title>
      <SubTitle>
        Get notifications when new homes that match your criteria hit the market
      </SubTitle>
      <Link href={ROUTES.homes.calcUrl()}>
        <Button>Search Homes</Button>
      </Link>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: calc(100vh - 190px);

  ${mobileMedia} {
    height: calc(100vh - 130px);
  }
`

const Title = styled.div`
  margin-bottom: 0.8rem;

  font-size: 2rem;
  line-height: 2.4rem;
  color: ${getColorTheme('sun1000')};
`
const SubTitle = styled.div`
  max-width: 36rem;
  margin-bottom: 2.4rem;

  font-size: 1.6rem;
  line-height: 2.4rem;
  text-align: center;
  color: ${getColorTheme('sun500')};
`
