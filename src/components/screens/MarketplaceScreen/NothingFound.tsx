import { FC } from 'react'
import styled from '@emotion/styled'

import { Button as ButtonBase } from '@/components/ui-kit/Button'
import { usePropertyFilter } from '@/modules/marketplace'
import { mobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

export const NothingFound: FC = () => {
  const { resetFilters } = usePropertyFilter()

  return (
    <Container>
      <Title>Nothing Found Yet</Title>
      <SubTitle>
        Save search results to get notified <br /> when new listings appear
      </SubTitle>
      <Button viewType={'secondary'} size={'small'} onClick={resetFilters}>
        Reset all filters
      </Button>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  width: 100%;

  padding: 4rem 1.6rem;

  ${mobileMedia} {
    padding-top: 2rem;
  }
`
const Title = styled.div`
  margin-bottom: 0.8rem;

  font-size: 2.8rem;
  line-height: 3.6rem;

  color: ${getColorTheme('sun1000')};

  ${mobileMedia} {
    font-size: 2rem;
    font-weight: 500;
  }
`
const SubTitle = styled.div`
  font-size: 1.6rem;
  line-height: 2.4rem;

  text-align: center;
  margin-bottom: 1rem;

  color: ${getColorTheme('sun500')};

  ${mobileMedia} {
    margin-bottom: 1.6rem;
  }
`
const Button = styled(ButtonBase)`
  width: 30rem;

  font-size: 1.6rem;
  font-weight: 500;
  line-height: 2.4rem;

  ${mobileMedia} {
    font-size: 1.6rem;
    font-weight: 500;

    width: 100%;
  }
`
