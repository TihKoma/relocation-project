import { VFC } from 'react'
import styled from '@emotion/styled'

import { ArrowIcon as ArrowIconBase } from '@/images'
import { HomesIcon as HomesIconBase } from '@/images/description-work-match'
import { mobileMedia, notMobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

import {
  Paragraph,
  SubTitle as SubTitleBase,
  Title as TitleBase,
  Wrapper as WrapperBase,
} from './shared'

type Props = { className?: string }
export const Header: VFC<Props> = ({ className }) => {
  return (
    <Container className={className}>
      <Wrapper>
        <Title>What is Where?</Title>
        <SubTitle>
          Nicity is the future of turnkey search for residential housing.
        </SubTitle>
        <Paragraph>
          Tired of trying to gather hard to get information about housing,
          people, and neighborhood resources to find an area that’s right for
          you? Nicity’s Where engine is the tool you need to find a neighborhood
          based on your budget, lifestyle and preferences.
          <br />
          <br />
          Nicity has done all the hard work of gathering data about locations
          from public sources, partners, and locals to evaluate neighbourhoods
          with 10 critical area features. The final result - the Match Score -
          is calculated by combining individual feature scores with weights
          determined by Nicity proprietary algorithm based on your preferences.
        </Paragraph>
        <HomesIcon />
      </Wrapper>
      <TipScrollDown>
        <ArrowIcon direction={'left'} />
        Scroll down
      </TipScrollDown>
    </Container>
  )
}

const Container = styled.div`
  padding-top: 72px;
  padding-bottom: 110px;

  position: relative;

  background: linear-gradient(
    0.0292124667rad,
    transparent 32px,
    ${getColorTheme('hydra')} 32px
  );

  ${mobileMedia} {
    padding-top: 44px;
    padding-bottom: 72px;
  }
`
const Title = styled(TitleBase)`
  margin-bottom: 24px;
`
const SubTitle = styled(SubTitleBase)`
  margin-bottom: 24px;

  ${mobileMedia} {
    margin-bottom: 16px;
  }
`
const Wrapper = styled(WrapperBase)`
  display: grid;

  ${notMobileMedia} {
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 20px;
  }
`
const HomesIcon = styled(HomesIconBase)`
  width: 100%;

  ${notMobileMedia} {
    grid-row: 1 / 3 span;
    grid-column: 2 / 3;
    align-self: center;
  }
  ${mobileMedia} {
    margin-bottom: 32px;

    grid-row: 2 / 3;
  }
`
const TipScrollDown = styled.div`
  position: absolute;
  right: 0;
  bottom: 32px;

  display: flex;
  align-items: center;

  transform: translateX(calc(100% - 29px)) rotate(-90deg);
  transform-origin: left bottom;

  ${mobileMedia} {
    display: none;
  }
`
const ArrowIcon = styled(ArrowIconBase)`
  margin-right: 16px;

  display: block;
`
