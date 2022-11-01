import { FC } from 'react'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'

import { EditLocations as EditLocationsBase } from '@/components/screens/DashboardScreen/EditLocations'
import { EditTaskContextConsumer } from '@/components/screens/DashboardScreen/EditTaskContext'
import { Guides } from '@/components/screens/DashboardScreen/Guides'
import { PayWall } from '@/components/screens/DashboardScreen/PayWall'
import { RelocationTasks } from '@/components/screens/DashboardScreen/RelocationTasks'
import { useTabsContext } from '@/components/screens/DashboardScreen/TabsContext'
import { Button } from '@/components/ui-kit/Button'
import { AddTodoPlusIcon } from '@/images'
import { useCheckAccess } from '@/modules/profile/hooks/useCheckAccess'
import { QUERY_RELOCATION_PROJECT } from '@/modules/relocation-project'
import { getColorTheme } from '@/styles/themes'

import { Tabs as TabsBase } from './Tabs'

export const MobileContent: FC = () => {
  const { activeTab, setActiveTab, tabs } = useTabsContext()
  const userHasAccessToTasks = useCheckAccess('task-manager')
  const { data: relocationProjectData } = useQuery(QUERY_RELOCATION_PROJECT)

  return (
    <EditTaskContextConsumer>
      {({ showModal }) => {
        const createNewTask = () => {
          showModal({
            title: 'New task',
            type: 'create',
          })
        }

        return (
          <>
            <Container>
              <Title>My relocation</Title>
              <EditLocations />
              {userHasAccessToTasks ? (
                <>
                  <Subtitle>My tasks</Subtitle>
                  <Tabs
                    activeTab={activeTab}
                    tabs={Object.values(tabs)}
                    setActiveTab={setActiveTab}
                  />
                  <RelocationTasks onCreateNewTask={createNewTask} />
                </>
              ) : (
                <PayWall />
              )}
              <Guides />
            </Container>
            {relocationProjectData?.relocationProject?.isQuizPassed &&
            userHasAccessToTasks ? (
              <AddTaskButton
                viewType={'primary'}
                size={'medium'}
                onClick={createNewTask}
                Icon={<AddTodoPlusIcon />}
                iconPosition={'left'}
              />
            ) : null}
          </>
        )
      }}
    </EditTaskContextConsumer>
  )
}

const Subtitle = styled.div`
  margin-bottom: 1.6rem;
  padding-left: 1.6rem;

  font-style: normal;
  font-weight: 500;
  font-size: 2rem;
  line-height: 2.4rem;
  font-feature-settings: 'liga' off;
  color: ${getColorTheme('textDefaultPrimary')};
`
const Title = styled(Subtitle)`
  font-size: 2.4rem;
`
const Container = styled.div`
  padding: 2.4rem 0 5rem 0;
`
const AddTaskButton = styled(Button)`
  position: fixed;
  bottom: 6.6rem;
  right: 1.6rem;
`
const EditLocations = styled(EditLocationsBase)`
  width: calc(100% - 3.2rem);
  margin: 0 auto 2.4rem auto;
`
const Tabs = styled(TabsBase)`
  padding-left: 1.6rem;
`
