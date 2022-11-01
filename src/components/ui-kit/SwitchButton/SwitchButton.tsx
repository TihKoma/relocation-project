import { FC, useEffect, useRef, useState } from 'react'
import styled from '@emotion/styled'

import { NormalizedButton } from '@/components/ui-kit/Button'
import { HOVER_TRANSITION_TIME } from '@/styles/const'
import { getColorTheme } from '@/styles/themes'

const ACTIVE_TAB_PADDING = 0.4

type TabProps = {
  name: string
  type: string
}

type Size = 'small' | 'medium' | 'large'

type Props = {
  size?: Size
  className?: string
  activeTab?: string
  tabs: Array<TabProps>
  onChange: (type: string, value?: number | string) => void
}

export const SwitchButton: FC<Props> = ({
  size = 'large',
  className,
  activeTab,
  tabs,
  onChange,
}) => {
  const [offsetLeft, setOffsetLeft] = useState(ACTIVE_TAB_PADDING)
  const activeTabRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (activeTab && activeTabRef.current && activeTab !== tabs[0].type) {
      setOffsetLeft(ACTIVE_TAB_PADDING + activeTabRef.current.offsetLeft)
    }
  }, [activeTab, tabs])

  return (
    <TabContainer className={className} size={size}>
      {tabs.map(({ name, type }) => {
        return (
          <Tab
            {...(activeTab &&
              activeTab === type && {
                ref: activeTabRef,
              })}
            key={type}
            onClick={(event) => {
              setOffsetLeft(ACTIVE_TAB_PADDING + event.currentTarget.offsetLeft)
              onChange(type)
            }}
          >
            <TabName>{name}</TabName>
          </Tab>
        )
      })}
      <Slide offsetLeft={offsetLeft} size={size} tabsLength={tabs.length} />
    </TabContainer>
  )
}

const TabContainer = styled.div<{ size: Size }>`
  width: 100%;
  height: ${({ size }) => {
    switch (size) {
      case 'large': {
        return `7.2rem`
      }
      case 'medium': {
        return `5.6rem;`
      }
      case 'small': {
        return `4rem`
      }
    }
  }};

  font-size: ${({ size }) => {
    switch (size) {
      case 'large': {
        return `2.2rem`
      }
      case 'medium':
      case 'small': {
        return `1.6rem`
      }
    }
  }};

  display: flex;
  align-items: center;

  position: relative;

  background: ${getColorTheme('sun50')};
  border-radius: 6.4rem;
`

const Tab = styled(NormalizedButton)`
  height: 100%;

  flex: 1 1 0;

  user-select: none;

  font-weight: 500;
  text-align: center;
  letter-spacing: -0.04em;

  border-radius: 3.6rem;
`

const TabName = styled.span`
  position: relative;
  z-index: 1;
`

const Slide = styled.div<{
  size: Size
  tabsLength: number
  offsetLeft: number
}>`
  width: ${({ tabsLength }) =>
    `calc((100% / ${tabsLength}) - ${ACTIVE_TAB_PADDING * 2}rem)`};
  height: ${({ size }) => {
    switch (size) {
      case 'large': {
        return `6.4rem;`
      }
      case 'medium': {
        return `4.8rem;`
      }
      case 'small': {
        return `3.2rem;`
      }
    }
  }};

  position: absolute;
  top: ${ACTIVE_TAB_PADDING}rem;
  left: ${ACTIVE_TAB_PADDING}rem;

  transform: translateX(${(props) => props.offsetLeft}px);

  background: ${getColorTheme('earth')};
  box-shadow: 0px 2px 4px rgba(18, 21, 31, 0.08),
    0px 4px 16px 1px rgba(18, 21, 31, 0.08);
  border-radius: 3.6rem;

  transition: transform ${HOVER_TRANSITION_TIME} ease;
`
