import { FC, useMemo } from 'react'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'

import { useTabsContext } from '@/components/screens/DashboardScreen/TabsContext'
import { LoadingState } from '@/components/shared/LoadingState'
import { Loader } from '@/components/ui-kit/Loader'
import {
  QUERY_RELOCATION_PROJECT,
  QUERY_RELOCATION_PROJECT_TODOS,
} from '@/modules/relocation-project'

import { EmptyState } from './EmptyState'
import { StartBanner as StartBannerBase } from './StartBanner'
import { TasksList as TasksListBase } from './TasksList'

type Props = {
  onCreateNewTask: () => void
}
export const RelocationTasks: FC<Props> = ({ onCreateNewTask }) => {
  const { activeTab, tabs } = useTabsContext()

  const { data: relocationProjectData, loading: relocationProjectLoading } =
    useQuery(QUERY_RELOCATION_PROJECT, {
      fetchPolicy: 'cache-and-network',
      ssr: false,
    })

  const { data: todosData, loading: isTodosLoading } = useQuery(
    QUERY_RELOCATION_PROJECT_TODOS,
    {
      ssr: false,
      fetchPolicy: 'network-only',
      variables: {
        input: {
          limit: 50,
          offset: 0,
          statuses: tabs[activeTab].statuses,
        },
      },
    },
  )

  const todos = useMemo(() => {
    return (
      todosData?.relocationProjectTodos?.filter((item) => {
        return tabs[activeTab].statuses.includes(item.status)
      }) ?? []
    )
  }, [todosData, tabs, activeTab])

  return (
    <LoadingState
      loading={relocationProjectLoading}
      loadingComponent={<Loader />}
    >
      {relocationProjectData?.relocationProject?.isQuizPassed ? (
        <Container>
          <LoadingState loading={isTodosLoading} loadingComponent={<Loader />}>
            {todos.length ? (
              <TasksList todos={todos || []} tabName={activeTab} />
            ) : (
              <EmptyState
                {...tabs[activeTab].emptyState}
                onCreateNewTask={onCreateNewTask}
              />
            )}
          </LoadingState>
        </Container>
      ) : (
        <StartBanner />
      )}
    </LoadingState>
  )
}

const Container = styled.div`
  margin-bottom: 1.6rem;
`
const TasksList = styled(TasksListBase)`
  margin-bottom: 2.4rem;
`
const StartBanner = styled(StartBannerBase)`
  width: calc(100% - 3.2rem);
  margin: 0 auto 1.6rem auto;
`
