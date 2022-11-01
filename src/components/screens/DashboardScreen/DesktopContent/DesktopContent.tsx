import { FC } from 'react'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'

import { RelocationSidebar } from '@/components/screens/DashboardScreen/DesktopContent/RelocationSidebar'
import { EditTaskContextConsumer } from '@/components/screens/DashboardScreen/EditTaskContext'
import { PayWall } from '@/components/screens/DashboardScreen/PayWall'
import { RelocationTasks } from '@/components/screens/DashboardScreen/RelocationTasks'
import { useTabsContext } from '@/components/screens/DashboardScreen/TabsContext'
import { Button } from '@/components/ui-kit/Button'
import { AddTodoPlusIcon as AddTodoPlusIconBase } from '@/images'
import { useCheckAccess } from '@/modules/profile/hooks/useCheckAccess'
import { QUERY_RELOCATION_PROJECT } from '@/modules/relocation-project'
import { getColorTheme } from '@/styles/themes'

export const DesktopContent: FC = () => {
  const { activeTab, tabs } = useTabsContext()
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
              <RelocationSidebar />
              <Content>
                {userHasAccessToTasks ? (
                  <>
                    <Subtitle>{tabs[activeTab].title} tasks</Subtitle>
                    {relocationProjectData?.relocationProject?.isQuizPassed &&
                    userHasAccessToTasks ? (
                      <AddTaskButton
                        viewType={'secondary'}
                        size={'medium'}
                        onClick={createNewTask}
                        Icon={<AddTodoPlusIcon />}
                        iconPosition={'left'}
                      >
                        Create a new task
                      </AddTaskButton>
                    ) : null}
                    <RelocationTasks onCreateNewTask={createNewTask} />
                  </>
                ) : (
                  <PayWall />
                )}
              </Content>
            </Container>
          </>
        )
      }}
    </EditTaskContextConsumer>
  )
}

const Container = styled.div`
  padding: 2.4rem;

  display: grid;
  grid-column-gap: 8.4rem;
  grid-template-columns: auto 1fr;
  justify-content: start;
`
const Subtitle = styled.div`
  margin-bottom: 1.6rem;

  font-style: normal;
  font-weight: 500;
  font-size: 2.4rem;
  line-height: 2.8rem;
  font-feature-settings: 'liga' off;
  color: ${getColorTheme('textDefaultPrimary')};
`
const Content = styled.div`
  max-width: 68.4rem;
`
const AddTodoPlusIcon = styled(AddTodoPlusIconBase)`
  & path {
    fill: ${getColorTheme('iconPrimary')};
  }
`
const AddTaskButton = styled(Button)`
  width: 100%;
  margin-bottom: 1.6rem;

  justify-content: start;
  border: 1px solid ${getColorTheme('strokeDefaultSecondary')};
  border-radius: 1.6rem;

  color: ${getColorTheme('textAccentPrimary')};
`
