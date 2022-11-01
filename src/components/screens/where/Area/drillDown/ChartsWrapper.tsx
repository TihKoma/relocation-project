import { FC, ReactNode, useState } from 'react'
import styled from '@emotion/styled'

import { SwitchButton as SwitchButtonBase } from '@/components/ui-kit/SwitchButton'
import { HOVER_TRANSITION_TIME } from '@/styles/const'
import { getColorTheme } from '@/styles/themes'

import { BREAKPOINT_TO_SWITCH_INTO_DESKTOP_VIEW } from './styles'

type Tab = {
  name: string
  type: string
  chart: ReactNode
}
type Props = {
  tabs: [Tab, Tab]
}
type Side = 'left' | 'right'
export const ChartsWrapper: FC<Props> = ({ tabs }) => {
  const [currentTab, setCurrentTab] = useState(tabs[0].type)

  return (
    <Container doubled={tabs.length === 2}>
      <SwitchButton
        tabs={tabs}
        onChange={(type) => {
          setCurrentTab(type as Side)
        }}
        size={'small'}
      />
      <Slider>
        <Slides offset={currentTab === tabs[0].type ? '0' : '-100%'}>
          <Wrapper>
            <Title>{tabs[0].name}</Title>
            {tabs[0].chart}
          </Wrapper>
          <Divider />
          <Wrapper>
            <Title>{tabs[1].name}</Title>
            {tabs[1].chart}
          </Wrapper>
        </Slides>
      </Slider>
    </Container>
  )
}

export const Container = styled.div<{ doubled: boolean }>`
  width: 100%;
  padding: 1.6rem;

  display: grid;
  grid-auto-flow: row;
  justify-items: center;
  gap: 1.6rem;

  border-radius: 1.6rem;
  border: 0.1rem solid ${getColorTheme('sun200')};
`
const Divider = styled.div`
  height: 100%;
  width: 0.1rem;
  margin: 0 1.6rem;

  display: none;

  background: ${getColorTheme('sun200')};
  ${BREAKPOINT_TO_SWITCH_INTO_DESKTOP_VIEW} {
    display: block;
  }
`
const SwitchButton = styled(SwitchButtonBase)`
  ${BREAKPOINT_TO_SWITCH_INTO_DESKTOP_VIEW} {
    display: none;
  }
`
const Slider = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  overflow: hidden;
`
const Slides = styled.div<{ offset: string }>`
  width: 100%;

  display: grid;
  flex-direction: row;
  grid-auto-flow: column;
  grid-template-columns: 100% 100%;

  transform: translateX(${(props) => props.offset});
  transition: transform ${HOVER_TRANSITION_TIME} ease;

  ${BREAKPOINT_TO_SWITCH_INTO_DESKTOP_VIEW} {
    transform: unset;
    grid-template-columns: 1fr auto 1fr;
  }
`
const Wrapper = styled.div`
  max-width: 100%;
  min-width: 100%;

  display: grid;
  grid-auto-flow: row;
  gap: 0.8rem;

  ${BREAKPOINT_TO_SWITCH_INTO_DESKTOP_VIEW} {
    grid-template-rows: auto 1fr;
  }
`
const Title = styled.div`
  display: none;

  color: ${getColorTheme('sun')};
  font-weight: 500;
  font-size: 1.8rem;

  ${BREAKPOINT_TO_SWITCH_INTO_DESKTOP_VIEW} {
    display: block;
  }
`
