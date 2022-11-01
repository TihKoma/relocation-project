import { FC } from 'react'
import styled from '@emotion/styled'

import { getColorTheme } from '@/styles/themes'

import { RelocationProjectTodoStatus } from '../../../../../__generated__/globalTypes'

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
    <Container className={className}>
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
    </Container>
  )
}

const Container = styled.ul`
  padding: 0;
  margin: 0;

  display: grid;
  column-gap: 1.6rem;
  grid-auto-flow: column;
  justify-content: start;

  list-style-type: none;
`
const Tab = styled.li<{ isActive?: boolean }>`
  height: 4.4rem;

  display: flex;
  align-items: center;

  font-style: normal;
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 2rem;
  font-feature-settings: 'liga' off;
  color: ${(props) =>
    props.isActive
      ? getColorTheme('textAccentPrimary')(props)
      : getColorTheme('textDefaultPrimary')(props)};

  cursor: pointer;
  border-bottom: 0.1rem solid transparent;

  ${(props) => (props.isActive ? `border-color: currentColor;` : '')}
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
