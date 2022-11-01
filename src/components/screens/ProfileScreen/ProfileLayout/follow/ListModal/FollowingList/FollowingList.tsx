import { FC, useState } from 'react'
import styled from '@emotion/styled'

import type { Tab } from '../types'
import { GroupsList } from './GroupsList'
import { RegionsList } from './RegionsList'
import { Tabs as TabsBase } from './Tabs'
import { UsersList } from './UsersList'

const TABS: Tab[] = ['People', 'Neighborhoods', 'Groups']

type Props = {
  userId: string
  userName: string
}
export const FollowingList: FC<Props> = ({ userId, userName }) => {
  const [currentTab, setCurrentTab] = useState('People')

  return (
    <>
      <Tabs tabs={TABS} currentTab={currentTab} setCurrentTab={setCurrentTab} />
      {
        {
          People: <UsersList userId={userId} userName={userName} />,
          Neighborhoods: <RegionsList userId={userId} userName={userName} />,
          Groups: <GroupsList userId={userId} userName={userName} />,
        }[currentTab]
      }
    </>
  )
}

const Tabs = styled(TabsBase)`
  margin-bottom: 1.6rem;
`
