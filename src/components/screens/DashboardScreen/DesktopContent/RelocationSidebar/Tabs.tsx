import { FC } from 'react'
import styled from '@emotion/styled'

import { getColorTheme } from '@/styles/themes'

import { RelocationProjectTodoStatus } from '../../../../../../__generated__/globalTypes'

export type TabId = 'active' | 'completed' | 'dismissed'
export type TabContent = {
  id: TabId
  title: string
  statuses: RelocationProjectTodoStatus[]
  count?: number
}

type Props = {
  tabs: TabContent[]
  activeTab: TabId
  className?: string
  setActiveTab: (id: TabId) => void
}
export const Tabs: FC<Props> = ({
  tabs,
  activeTab,
  className,
  setActiveTab,
}) => {
  return (
    <Container>
      <TitleSection>My tasks</TitleSection>
      <List className={className}>
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            isActive={tab.id === activeTab}
            onClick={() => setActiveTab(tab.id)}
          >
            <Title>{tab.title}</Title>
            {tab.count && tab.count > 0 ? (
              <Counter isActive={tab.id === activeTab}>{tab.count}</Counter>
            ) : null}
          </Tab>
        ))}
      </List>
    </Container>
  )
}

const Container = styled.div`
  background: ${getColorTheme('backgroundDefaultSecondary')};
  border-radius: 24px;
`
const TitleSection = styled.div`
  padding-top: 1.6rem;
  padding-left: 1.6rem;
  margin-bottom: 0.8rem;

  font-style: normal;
  font-weight: 500;
  font-size: 2rem;
  line-height: 2.4rem;
  font-feature-settings: 'liga' off;
  color: ${getColorTheme('textDefaultPrimary')};
`
const List = styled.ul`
  margin: 0;
  width: 100%;
  padding: 0 0.4rem 0.5rem;

  display: flex;
  flex-direction: column;

  list-style-type: none;
`
const Tab = styled.li<{ isActive?: boolean }>`
  height: 4rem;
  padding: 0 1.2rem;

  display: flex;
  align-items: center;

  border-radius: 2.4rem;
  background: ${(props) =>
    props.isActive
      ? getColorTheme('backgroundDefaultPrimary')(props)
      : 'inherit'};

  font-style: normal;
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 2.4rem;
  font-feature-settings: 'liga' off;
  color: ${(props) =>
    props.isActive
      ? getColorTheme('textAccentPrimary')(props)
      : getColorTheme('textDefaultPrimary')(props)};

  cursor: pointer;
`
const Title = styled.div`
  margin-right: 0.4rem;
`
const Counter = styled.div<{ isActive?: boolean }>`
  padding: 0 0.4rem;

  background: ${(props) =>
    props.isActive
      ? getColorTheme('backgroundAccentPrimary')(props)
      : getColorTheme('backgroundDefaultTertiary')(props)};
  border-radius: 2.4rem;

  font-style: normal;
  font-weight: 500;
  font-size: 1.2rem;
  line-height: 1.6rem;
  font-feature-settings: 'liga' off;
  color: ${(props) =>
    props.isActive
      ? getColorTheme('textDefaultQuinary')(props)
      : getColorTheme('textDefaultPrimary')(props)};
`
