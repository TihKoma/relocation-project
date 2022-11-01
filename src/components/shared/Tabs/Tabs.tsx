import { FC, MouseEventHandler, ReactElement } from 'react'
import { SerializedStyles } from '@emotion/react'
import styled from '@emotion/styled'

import { NormalizedButton } from '@/components/ui-kit/Button'
import { getColorTheme } from '@/styles/themes'

export type TabType = {
  index: string
  label: string
  icon?: ReactElement
}
type Props = {
  tabs: TabType[]
  currentTab: TabType | null
  setCurrentTab: (tab: TabType) => void
  className?: string
  tabClassName?: SerializedStyles | string
}
export const Tabs: FC<Props> = ({
  tabs,
  currentTab,
  setCurrentTab,
  className,
  tabClassName,
}) => {
  const onClickTab: MouseEventHandler<HTMLButtonElement> = (event) => {
    const tabIndex = event.currentTarget.dataset.tabId || ''
    const tab = tabs.find((item) => item.index === tabIndex)
    if (tab) {
      setCurrentTab(tab)
    }
  }
  return (
    <Container className={className} columnsCount={tabs.length}>
      {tabs.map((tab) => {
        return (
          <Tab
            key={tab.index}
            data-tab-id={tab.index}
            onClick={onClickTab}
            css={tabClassName}
            isSelected={tab.index === currentTab?.index}
          >
            <>
              {tab.icon || null}
              {tab.label}
            </>
          </Tab>
        )
      })}
    </Container>
  )
}

export const TABS_HEIGHT = '4.4rem'
const Container = styled.div<{ columnsCount: number }>`
  height: ${TABS_HEIGHT};

  position: relative;

  display: grid;
  column-gap: 1.6rem;
  grid-template-columns: repeat(${(props) => props.columnsCount}, min-content);

  overflow: auto;
`
const Tab = styled(NormalizedButton)<{ isSelected?: boolean }>`
  height: 100%;

  display: grid;
  grid-auto-flow: column;
  align-items: center;
  gap: 0.4rem;

  white-space: nowrap;
  border-bottom: 0.2rem solid transparent;

  color: ${getColorTheme('sun')};
  font-size: 1.4rem;

  ${(props) => {
    if (props.isSelected) {
      return `
        color: ${getColorTheme('neptune')(props)};
        border-color: ${getColorTheme('neptune')(props)};
        & svg {
          fill: ${getColorTheme('neptune')(props)};
          stroke: ${getColorTheme('neptune')(props)};
        }
      `
    }
  }}
  &:hover {
    color: ${getColorTheme('neptune')};
    & svg {
      fill: ${getColorTheme('neptune')};
      stroke: ${getColorTheme('neptune')};
    }
  }
`
