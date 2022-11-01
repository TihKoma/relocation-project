import { FC, useEffect } from 'react'
import styled from '@emotion/styled'

import { TaskItem } from '@/components/screens/DashboardScreen/RelocationTasks/TaskItem/TaskItem'
import { useAnalytics } from '@/modules/analytics'
import { TodoFields } from '@/modules/relocation-project'
import { notMobileMedia } from '@/styles/media'

type Props = {
  todos: TodoFields[] | null
  className?: string
  tabName: string
}

export const TasksList: FC<Props> = ({ todos, className, tabName }) => {
  const analytics = useAnalytics()

  useEffect(() => {
    if (tabName === 'active') {
      analytics.relocationMarketplaceStep('tasks_shown')
    }
  }, [analytics, tabName])

  return todos ? (
    <Container className={className}>
      {todos.map((todo) => (
        <TaskItem key={todo.id} todo={todo} />
      ))}
    </Container>
  ) : null
}

const Container = styled.ul`
  padding: 0;
  margin: 0;

  display: grid;

  list-style-type: none;

  ${notMobileMedia} {
    grid-row-gap: 1.6rem;
  }
`
