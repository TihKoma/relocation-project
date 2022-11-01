import { FC, useState } from 'react'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import styled from '@emotion/styled'

import { useEditTaskContext } from '@/components/screens/DashboardScreen/EditTaskContext'
import { SubtaskItem } from '@/components/screens/DashboardScreen/RelocationTasks/SubtaskItem'
import { SubtaskContent } from '@/components/shared/EditTaskForm'
import { LoadingState } from '@/components/shared/LoadingState'
import { Button } from '@/components/ui-kit/Button'
import { Checkbox as CheckboxBase } from '@/components/ui-kit/Checkbox'
import { Loader } from '@/components/ui-kit/Loader'
import {
  ArrowDownIcon as ArrowDownIconBase,
  ReturnToActiveIcon,
} from '@/images'
import { useAnalytics } from '@/modules/analytics'
import {
  MUTATION_RELOCATION_TODO_CHANGE_STATUS,
  TodoFields,
} from '@/modules/relocation-project'
import { mobileMedia, notMobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

import { RelocationProjectTodoStatus } from '../../../../../../__generated__/globalTypes'
import { TaskGuides } from './TaskGuides'

type Props = {
  todo: TodoFields
}
export const TaskItem: FC<Props> = ({ todo }) => {
  const [changeStatus, { loading: isStatusChanging }] = useMutation(
    MUTATION_RELOCATION_TODO_CHANGE_STATUS,
  )
  const { showModal } = useEditTaskContext()
  const router = useRouter()
  const isNeedDescriptionExpand =
    todo.description && todo.description.length > 250
  const [isSubtasksVisible, setIsSubtasksVisible] = useState(true)
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(
    !isNeedDescriptionExpand,
  )
  const [isDismissedSubtasksVisible, setIsDismissedSubtasksVisible] =
    useState(false)

  const activeSubtasks =
    todo.children?.filter(
      (item) => item?.status !== RelocationProjectTodoStatus.SKIPPED,
    ) || []
  const dismissedTasks =
    todo.children?.filter(
      (item) => item?.status === RelocationProjectTodoStatus.SKIPPED,
    ) || []

  const changeStatusAndUpdateCache = (
    id: string,
    status: RelocationProjectTodoStatus,
  ) => {
    changeStatus({
      variables: {
        input: {
          id,
          status,
        },
      },
      update: (cache) => {
        cache.modify({
          id: `RelocationProjectTodo:${id}`,
          fields: {
            status: () => {
              return status
            },
          },
        })
      },
      onCompleted: () => {
        const eventType =
          status === RelocationProjectTodoStatus.DONE
            ? 'completed'
            : 'un_completed'
        analytics.relocationMarketplaceTaskAction(todo.title, eventType, 'task')
      },
    })
  }

  const analytics = useAnalytics()

  return (
    <Item key={todo.id}>
      <Body
        hasChildren={activeSubtasks.length > 0}
        onClick={() => {
          analytics.relocationMarketplaceTaskAction(
            todo.title,
            'details_opened',
            'task',
          )
          showModal({
            title: 'Edit task',
            type: 'edit',
            status: todo.status,
            todoType: todo.type,
            todoId: todo.id,
            initialValues: {
              title: todo.title,
              description: todo.description || '',
            },
            initialTasks: activeSubtasks.map((task) => ({
              isCompleted: task!.status === RelocationProjectTodoStatus.DONE,
              id: task!.id,
              title: task!.title,
              description: task!.description,
            })) as SubtaskContent[],
          })
        }}
      >
        <Checkbox
          isDisabled={todo.status === RelocationProjectTodoStatus.SKIPPED}
          isChecked={todo.status === RelocationProjectTodoStatus.DONE}
          onChange={(value: boolean, e) => {
            e.stopPropagation()
            const newStatus = value
              ? RelocationProjectTodoStatus.DONE
              : RelocationProjectTodoStatus.NOT_DONE
            changeStatusAndUpdateCache(todo.id, newStatus)
          }}
        />
        <LoadingState loading={isStatusChanging} loadingComponent={<Loader />}>
          <Content>
            <Title
              isCompleted={todo.status === RelocationProjectTodoStatus.DONE}
            >
              {todo.title}
            </Title>
            {todo.description && (
              <Description>
                <DescriptionText isMore={isDescriptionExpanded}>
                  {todo.description}
                </DescriptionText>{' '}
                {isNeedDescriptionExpand && (
                  <ExpandDescriptionButton
                    onClick={(e) => {
                      e.stopPropagation()
                      setIsDescriptionExpanded((state) => !state)
                    }}
                  >
                    {isDescriptionExpanded ? 'Less' : 'More'}
                  </ExpandDescriptionButton>
                )}
              </Description>
            )}
            {todo.status === RelocationProjectTodoStatus.SKIPPED ? (
              <Button
                size={'small'}
                viewType={'secondary'}
                Icon={<ReturnToActiveIcon />}
                iconPosition={'left'}
                onClick={(e) => {
                  e.stopPropagation()

                  changeStatusAndUpdateCache(
                    todo.id,
                    RelocationProjectTodoStatus.NOT_DONE,
                  )
                }}
              >
                Return to active
              </Button>
            ) : (
              <>
                {todo.guides?.length ? (
                  <TaskGuides guides={todo.guides} />
                ) : null}
                {todo.cta && todo.cta.length > 0 && (
                  <Actions>
                    {todo.cta?.map(
                      (cta) =>
                        cta?.link && (
                          <Button
                            key={cta?.title}
                            viewType={'tertiary'}
                            size={'small'}
                            onClick={() => {
                              router.push(cta.link!)
                            }}
                          >
                            {cta?.title}
                          </Button>
                        ),
                    )}
                  </Actions>
                )}
              </>
            )}
          </Content>
        </LoadingState>
      </Body>
      {activeSubtasks.length > 0 && (
        <ToggleSubtasks
          onClick={() => {
            setIsSubtasksVisible((state) => !state)
          }}
        >
          Progress{' '}
          {
            activeSubtasks.filter(
              (task) => task?.status === RelocationProjectTodoStatus.DONE,
            ).length
          }
          /{activeSubtasks.length}
          <ArrowDownIcon isUp={isSubtasksVisible} />
        </ToggleSubtasks>
      )}
      {activeSubtasks.length > 0 && isSubtasksVisible && (
        <Subtasks>
          {activeSubtasks.map((subtask, index, list) => {
            const lastIndex = index === list.length - 1
            return (
              subtask && (
                <>
                  <SubtaskItem
                    todo={subtask}
                    parentId={todo.id}
                    parentTitle={todo.title}
                  />
                  {!lastIndex && <SubtaskDivider />}
                </>
              )
            )
          })}
        </Subtasks>
      )}
      {dismissedTasks.length > 0 && (
        <ToggleSubtasks
          onClick={() => {
            setIsDismissedSubtasksVisible((state) => !state)
          }}
        >
          {dismissedTasks.length} dismissed sub-task
          <ArrowDownIcon isUp={isDismissedSubtasksVisible} />
        </ToggleSubtasks>
      )}
      {dismissedTasks.length > 0 && isDismissedSubtasksVisible && (
        <Subtasks>
          {dismissedTasks.map((subtask, index, list) => {
            const lastIndex = index === list.length - 1
            return (
              subtask && (
                <>
                  <SubtaskItem
                    todo={subtask}
                    parentId={todo.id}
                    parentTitle={todo.title}
                  />
                  {!lastIndex && <SubtaskDivider />}
                </>
              )
            )
          })}
        </Subtasks>
      )}
    </Item>
  )
}

const Item = styled.li`
  padding: 1.6rem;
  overflow: hidden;

  ${notMobileMedia} {
    border-radius: 1.6rem;
    border: 1px solid ${getColorTheme('backgroundDefaultTertiary')};
  }

  ${mobileMedia} {
    border-bottom: 0.1rem solid ${getColorTheme('strokeDefaultSecondary')};
  }
`
const Subtasks = styled.ul`
  list-style: none;
  padding-left: 4rem;
`
const Body = styled.div<{ hasChildren?: boolean }>`
  display: flex;
  flex-direction: row;

  cursor: pointer;
`
const Content = styled.div`
  position: relative;

  flex-grow: 1;
`
const Title = styled.div<{ isCompleted: boolean }>`
  font-style: normal;
  font-weight: 500;
  font-size: 1.8rem;
  line-height: 2.4rem;
  font-feature-settings: 'liga' off;
  color: ${(props) =>
    props.isCompleted
      ? getColorTheme('textDefaultSecondary')(props)
      : getColorTheme('textDefaultPrimary')(props)};
`
const Description = styled.div`
  margin-bottom: 0.8rem;
  margin-top: 0.8rem;

  font-style: normal;
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 2rem;
  font-feature-settings: 'liga' off;
  color: ${getColorTheme('textDefaultPrimary')};
`
const Checkbox = styled(CheckboxBase)`
  margin-right: 1.6rem;
`
const ToggleSubtasks = styled.div`
  padding: 0.8rem 0 0 4rem;

  display: flex;
  align-items: center;

  cursor: pointer;

  font-style: normal;
  font-weight: 500;
  font-size: 1.6rem;
  line-height: 2.4rem;
  font-feature-settings: 'liga' off;
  color: ${getColorTheme('textDefaultSecondary')};
`
const ArrowDownIcon = styled(ArrowDownIconBase)<{ isUp: boolean }>`
  margin-left: 0.8rem;

  transform: rotate(${(props) => (props.isUp ? '180deg' : '0deg')});

  & path {
    fill: ${getColorTheme('iconSecondary')};
  }
`
const SubtaskDivider = styled.hr`
  margin: 0;

  border: none;
  border-bottom: 1px solid ${getColorTheme('backgroundDefaultTertiary')};
`
const ExpandDescriptionButton = styled.div`
  margin-top: 0.8rem;

  cursor: pointer;

  font-style: normal;
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 2rem;
  font-feature-settings: 'liga' off;
  color: ${getColorTheme('sun500')};
`
const DescriptionText = styled.div<{ isMore: boolean }>`
  ${({ isMore }) =>
    isMore
      ? ''
      : `
    display: -webkit-box;
  `}

  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`
const Actions = styled.div`
  margin-top: 1.6rem;
`
