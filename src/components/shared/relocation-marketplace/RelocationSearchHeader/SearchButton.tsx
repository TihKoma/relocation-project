import { forwardRef } from 'react'
import styled from '@emotion/styled'

import { SearchServicesIcon } from '@/images'
import { mobileMedia, notMobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

type Props = {
  className?: string
  setIsModalVisible: (value: boolean) => void
}
export const SearchButton = forwardRef<HTMLDivElement, Props>(
  ({ className, setIsModalVisible }, ref) => {
    return (
      <Container
        className={className}
        onClick={() => setIsModalVisible(true)}
        ref={ref}
      >
        <Icon>
          <SearchServicesIcon />
        </Icon>
        <Content>
          <Title>How can we help you?</Title>
          <Subtitle>Find a service</Subtitle>
        </Content>
      </Container>
    )
  },
)

const Container = styled.div`
  margin: auto;
  padding-left: 1.8rem;

  display: flex;
  align-items: center;

  border: 0.2rem solid ${getColorTheme('strokeDefaultSecondary')};
  cursor: pointer;

  ${notMobileMedia} {
    height: 6.6rem;

    border-radius: 1.6rem;
  }

  ${mobileMedia} {
    height: 6.4rem;

    border-radius: 1.2rem;
  }
`

const Icon = styled.div`
  position: relative;
  top: 0.2rem;

  ${notMobileMedia} {
    margin-right: 1.8rem;
  }

  ${mobileMedia} {
    margin-right: 1.6rem;
  }
`

const Content = styled.div``

const Title = styled.div`
  font-style: normal;
  font-weight: 500;
  font-feature-settings: 'liga' off;
  color: ${getColorTheme('textDefaultPrimary')};
  line-height: 2.4rem;

  ${notMobileMedia} {
    font-size: 1.8rem;
  }

  ${mobileMedia} {
    font-size: 1.6rem;
  }
`

const Subtitle = styled.div`
  font-style: normal;
  font-weight: 400;
  font-feature-settings: 'liga' off;
  color: ${getColorTheme('textDefaultSecondary')};
  line-height: 2.4rem;

  ${notMobileMedia} {
    font-size: 1.6rem;
  }

  ${mobileMedia} {
    font-size: 1.4rem;
  }
`
