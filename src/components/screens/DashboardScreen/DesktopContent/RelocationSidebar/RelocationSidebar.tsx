import Link from 'next/link'
import styled from '@emotion/styled'

import { useTabsContext } from '@/components/screens/DashboardScreen/TabsContext'
import { RelocationGuideIcon, WhatLocalsSayIcon } from '@/images'
import { ROUTES } from '@/modules/router'
import { getColorTheme } from '@/styles/themes'

import { EditLocations as EditLocationsBase } from '../../EditLocations'
import { Tabs } from './Tabs'

export const RelocationSidebar = () => {
  const { activeTab, setActiveTab, tabs } = useTabsContext()

  return (
    <Container>
      <Content>
        <Title>My relocation</Title>
        <EditLocations />
        <Controls>
          <Tabs
            activeTab={activeTab}
            tabs={Object.values(tabs)}
            setActiveTab={setActiveTab}
          />
          <Link href={ROUTES.guide.calcUrl()} passHref>
            <LinkButton>
              <RelocationGuideIcon />
              <ButtonText>Relocation guide</ButtonText>
            </LinkButton>
          </Link>
          <Link href={'https://t.me/+DQL41xFLWTUxNzVk'} passHref>
            <LinkButton target={'_blank'}>
              <WhatLocalsSayIcon />
              <ButtonText>What locals say</ButtonText>
            </LinkButton>
          </Link>
        </Controls>
      </Content>
    </Container>
  )
}

const Container = styled.div`
  width: 27.4rem;
  position: relative;
`
const Content = styled.div`
  width: 27.4rem;

  position: fixed;
`
const EditLocations = styled(EditLocationsBase)`
  margin-bottom: 2.4rem;
`
const Title = styled.div`
  margin-bottom: 0.8rem;

  font-style: normal;
  font-weight: 500;
  font-size: 2.8rem;
  line-height: 3.6rem;
  font-feature-settings: 'liga' off;
  color: ${getColorTheme('textDefaultPrimary')};
`
const Controls = styled.div`
  display: grid;
  grid-auto-flow: row;
  row-gap: 1.6rem;
`
const LinkButton = styled.a`
  height: 4rem;
  width: 100%;
  padding-left: 1.8rem;

  display: flex;
  align-items: center;

  background: ${getColorTheme('backgroundDefaultSecondary')};
  border-radius: 2.4rem;
`
const ButtonText = styled.div`
  margin-left: 1rem;

  font-style: normal;
  font-weight: 500;
  font-size: 1.6rem;
  line-height: 2.4rem;
  font-feature-settings: 'liga' off;
  color: ${getColorTheme('textDefaultPrimary')};
`
