import { forwardRef, useImperativeHandle, useState } from 'react'
import styled from '@emotion/styled'
import { v4 as uuid } from 'uuid'

import { NormalizedButton } from '@/components/ui-kit/Button'
import { AddTodoPlusIcon as AddTodoPlusIconBase } from '@/images'
import { useAnalytics } from '@/modules/analytics'
import { getColorTheme } from '@/styles/themes'

import { Subtask, SubtaskContent, SubtaskRef } from './Subtask'

type Props = {
  initialTasks?: SubtaskContent[]
  onDelete?: (restNumber: number) => void
  onChange?: () => void
}

export type SubtasksRef = {
  getTasks: () => SubtaskContent[]
  addSubtask: () => void
}

export const Subtasks = forwardRef<SubtasksRef, Props>(
  ({ initialTasks = [], onDelete, onChange }, ref) => {
    const [tasks, setTasks] =
      useState<(SubtaskContent & { ref?: SubtaskRef | null })[]>(initialTasks)

    const analytics = useAnalytics()

    useImperativeHandle(
      ref,
      () => ({
        addSubtask: () => {
          setTasks([
            ...tasks,
            { localId: uuid(), title: '', isCompleted: false, description: '' },
          ])
          onChange?.()
        },
        getTasks: () => {
          return tasks
            .map((task) => {
              const values = task.ref?.getValues()

              if (values) {
                return { id: task.id, isDeleted: task.isDeleted, ...values }
              }

              return null
            })
            .filter(
              (task) => task !== null && task.title !== '',
            ) as SubtaskContent[]
        },
      }),
      [onChange, tasks],
    )

    if (!tasks.filter((item) => !item.isDeleted).length) {
      return null
    }

    return (
      <Container>
        <Title>Sub-tasks</Title>
        <Tasks>
          {tasks
            .filter((task) => !task.isDeleted)
            .map((task) => (
              <Subtask
                key={task.id || task.localId}
                initialValues={{
                  title: task.title,
                  isCompleted: task.isCompleted,
                  description: task.description,
                }}
                onChange={onChange}
                ref={(ref) => (task.ref = ref)}
                onDelete={() => {
                  analytics.relocationMarketplaceTaskAction(
                    task.title,
                    'dismissed',
                    'subtask',
                  )
                  const newTasks = tasks
                    .map((item) => {
                      if (item.id && item.id === task.id) {
                        return {
                          ...item,
                          isDeleted: true,
                        }
                      }
                      // the subtask has not been saved, so remove this subtask, instead of changing its status to dismissed
                      if (item.localId && item.localId === task.localId) {
                        return null
                      }
                      return item
                    })
                    .filter((item) => item) as (SubtaskContent & {
                    ref?: SubtaskRef | null
                  })[]
                  setTasks(newTasks)
                  onChange?.()
                  onDelete?.(newTasks.filter((item) => !item.isDeleted).length)
                }}
              />
            ))}
        </Tasks>
        <AddTaskButton
          onClick={() => {
            analytics.relocationMarketplaceTaskCreationClick('subtask')
            setTasks([
              ...tasks,
              {
                localId: uuid(),
                title: '',
                description: '',
                isCompleted: false,
              },
            ])
            onChange?.()
          }}
        >
          <AddTodoPlusIcon />
          Add sub-task
        </AddTaskButton>
      </Container>
    )
  },
)

const Container = styled.div``
const Title = styled.div`
  margin-bottom: 1.6rem;

  font-style: normal;
  font-weight: 500;
  font-size: 2rem;
  line-height: 2.4rem;
  font-feature-settings: 'liga' off;
  color: ${getColorTheme('textDefaultPrimary')};
`
const AddTodoPlusIcon = styled(AddTodoPlusIconBase)`
  margin-right: 1.8rem;

  & path {
    fill: ${getColorTheme('textAccentPrimary')};
  }
`
const Tasks = styled.div`
  margin-bottom: 1.2rem;

  display: grid;
  row-gap: 1.6rem;
`
const AddTaskButton = styled(NormalizedButton)`
  display: flex;
  align-items: center;

  font-style: normal;
  font-weight: 500;
  font-size: 1.6rem;
  line-height: 2.4rem;
  font-feature-settings: 'liga' off;
  color: ${getColorTheme('textAccentPrimary')};
`
