import { FC, MouseEventHandler } from 'react'
import { SerializedStyles } from '@emotion/react'
import styled from '@emotion/styled'

import { NormalizedButton } from '@/components/ui-kit/Button'
import { getColorTheme } from '@/styles/themes'

type TabProps = {
  tabs: string[]
  currentTab: string
  setCurrentTab: (tab: string) => void
  className?: string
  tabClassName?: SerializedStyles | string
}
export const Tabs: FC<TabProps> = ({
  tabs,
  currentTab,
  setCurrentTab,
  className,
  tabClassName,
}) => {
  const onClickTab: MouseEventHandler<HTMLButtonElement> = (event) => {
    const name = event.currentTarget.dataset.tabId || ''
    setCurrentTab(name)
  }
  return (
    <Container className={className} columnsCount={tabs.length}>
      {tabs.map((tab) => {
        return (
          <Tab
            key={tab}
            data-tab-id={tab}
            onClick={onClickTab}
            css={tabClassName}
          >
            {tab}
          </Tab>
        )
      })}
      <Marker column={tabs.indexOf(currentTab) + 1} />
    </Container>
  )
}

const Container = styled.div<{ columnsCount: number }>`
  position: relative;

  display: grid;
  column-gap: 1.6rem;
  grid-template-columns: repeat(${(props) => props.columnsCount}, min-content);
`
const Tab = styled(NormalizedButton)`
  padding: 0.6rem 0;

  white-space: nowrap;
  color: ${getColorTheme('mercury')};

  font-size: 1.4rem;

  &:hover {
    color: ${getColorTheme('sun')};
  }
`
const Marker = styled.div<{ column: number }>`
  height: 2px;
  grid-column-start: ${(props) => props.column};

  background: ${getColorTheme('neptune')};
  border-radius: 1px;
`
