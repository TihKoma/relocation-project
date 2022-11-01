import React, { createContext, FC, useContext } from 'react'
import styled from '@emotion/styled'

type Props = {
  activeTabId: string | null
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLUListElement>,
  HTMLUListElement
>

export const Tabs: FC<Props> = ({ activeTabId, ...props }) => {
  return (
    <ActiveTabContext.Provider value={activeTabId}>
      <TabsStyled {...props} />
    </ActiveTabContext.Provider>
  )
}

const TabsStyled = styled.ul`
  margin: -20px -14px;
  padding: 20px 14px;

  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 4px;
  list-style-type: none;
  justify-content: start;

  overflow-x: auto;
`

type TabProps = {
  tabId: string
} & React.DetailedHTMLProps<
  React.LiHTMLAttributes<HTMLLIElement>,
  HTMLLIElement
>

export const Tab: FC<TabProps> = ({ tabId, ...props }) => {
  const currentTabId = useContext(ActiveTabContext)
  return <TabStyled isActive={tabId === currentTabId} {...props} />
}

const TabStyled = styled.li<{ isActive?: boolean }>`
  font-size: 16px;
  padding: 10px 16px 12px;
  white-space: nowrap;
  border-radius: 22px;
  letter-spacing: -0.06em;
  cursor: pointer;

  border: 2px solid ${({ isActive }) => (isActive ? '#F0F1F5' : '#fafbff')};
`

const ActiveTabContext = createContext<null | string>(null)
