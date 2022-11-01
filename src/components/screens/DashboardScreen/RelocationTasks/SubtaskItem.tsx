import { FC, useState } from 'react'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import styled from '@emotion/styled'

import { useEditTaskContext } from '@/components/screens/DashboardScreen/EditTaskContext'
import { TaskGuides } from '@/components/screens/DashboardScreen/RelocationTasks/TaskItem/TaskGuides'
import { LoadingState } from '@/components/shared/LoadingState'
import { Button, NormalizedButton } from '@/components/ui-kit/Button'
import { Checkbox as CheckboxBase } from '@/components/ui-kit/Checkbox'
import { Loader } from '@/components/ui-kit/Loader'
import {
  ChevronSmallIcon as ChevronSmallIconBase,
  ReturnToActiveIcon,
} from '@/images'
import { useAnalytics } from '@/modules/analytics'
import {
  MUTATION_RELOCATION_TODO_CHANGE_STATUS,
  TodoFields,
} from '@/modules/relocation-project'
import { getColorTheme } from '@/styles/themes'

import { RelocationProjectTodoStatus } from '../../../../../__generated__/globalTypes'

type Props = {
  todo: Omit<TodoFields, 'children'>
  parentId: string
  parentTitle: string
}
export const SubtaskItem: FC<Props> = ({ todo, parentId, parentTitle }) => {
  const isNeedDescriptionExpand =
    todo.description && todo.description.length > 250
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(
    !isNeedDescriptionExpand,
  )

  const [isDetailsOfDoneSubtaskVisible, setDetailsOfDoneSubtaskVisible] =
    useState(false)

  const router = useRouter()
  const analytics = useAnalytics()

  const { showModal } = useEditTaskContext()

  const [changeStatus, { loading: isStatusChanging }] = useMutation(
    MUTATION_RELOCATION_TODO_CHANGE_STATUS,
    {
      update: (cache, _, context) => {
        cache.modify({
          id: `RelocationProjectTodo:${context.variables?.input.id}`,
          fields: {
            status: () => {
              return context.variables?.input.status
            },
          },
        })
      },
    },
  )

  const subtaskContent = (
    <>
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
      {(todo.cta && todo.cta.length > 0) ||
      (todo.guides && todo.guides.length > 0) ? (
        <Actions>
          {todo.guides?.length ? <TaskGuides guides={todo.guides} /> : null}
          {todo.cta?.map(
            (cta) =>
              cta?.link && (
                <Button
                  key={cta?.title}
                  viewType={'tertiary'}
                  size={'small'}
                  onClick={(event) => {
                    router.push(cta.link!)
                    event.stopPropagation()
                  }}
                >
                  {cta?.title}
                </Button>
              ),
          )}
        </Actions>
      ) : null}
    </>
  )

  return (
    <Item
      key={todo.id}
      onClick={() => {
        analytics.relocationMarketplaceTaskAction(
          todo.title,
          'details_opened',
          'subtask',
        )
        showModal({
          todoId: todo.id,
          title: 'Edit sub-task',
          type: 'edit',
          status: todo.status,
          todoType: todo.type,
          subtitle: parentTitle,
          parentId,
          initialValues: {
            title: todo.title,
            description: todo.description || '',
          },
        })
      }}
    >
      <Checkbox
        isChecked={todo.status === RelocationProjectTodoStatus.DONE}
        onChange={(value: boolean, e) => {
          e.stopPropagation()
          const newStatus = value
            ? RelocationProjectTodoStatus.DONE
            : RelocationProjectTodoStatus.NOT_DONE
          changeStatus({
            variables: {
              input: {
                id: todo.id,
                status: newStatus,
              },
            },
            onCompleted: () => {
              const actionType =
                newStatus === RelocationProjectTodoStatus.DONE
                  ? 'completed'
                  : 'un_completed'
              analytics.relocationMarketplaceTaskAction(
                todo.title,
                actionType,
                'subtask',
              )
            },
          })
        }}
      />
      <LoadingState
        loading={isStatusChanging}
        loadingComponent={<Loader withGradient size={'xSmall'} />}
      >
        <Content>
          <Title disabled={todo.status === RelocationProjectTodoStatus.DONE}>
            {todo.title}
          </Title>
          {[
            RelocationProjectTodoStatus.DONE,
            RelocationProjectTodoStatus.SKIPPED,
          ].includes(todo.status) &&
          (todo.description || todo.guides?.length || todo.cta?.length) ? (
            <>
              <ToggleDetails
                onClick={(event) => {
                  event.stopPropagation()
                  setDetailsOfDoneSubtaskVisible((state) => !state)
                }}
              >
                See details
                <ChevronSmallIcon
                  direction={isDetailsOfDoneSubtaskVisible ? 'top' : 'bottom'}
                />
              </ToggleDetails>
              {isDetailsOfDoneSubtaskVisible && subtaskContent}
            </>
          ) : (
            subtaskContent
          )}
          {todo.status === RelocationProjectTodoStatus.SKIPPED && (
            <ReturnToActiveButton
              size={'small'}
              viewType={'secondary'}
              Icon={<ReturnToActiveIcon />}
              iconPosition={'left'}
              onClick={async (e) => {
                e.stopPropagation()
                await changeStatus({
                  variables: {
                    input: {
                      id: todo.id,
                      status: RelocationProjectTodoStatus.NOT_DONE,
                    },
                  },
                  onCompleted: () => {
                    analytics.relocationMarketplaceTaskAction(
                      todo.title,
                      'un_dismissed',
                      'subtask',
                    )
                  },
                })
              }}
            >
              Return to active
            </ReturnToActiveButton>
          )}
        </Content>
      </LoadingState>
    </Item>
  )
}

const Item = styled.li`
  padding: 1.6rem 0;

  display: flex;
  flex-direction: row;

  cursor: pointer;

  &:last-of-type {
    padding: 1.6rem 0 0 0;
  }
`
const Content = styled.div`
  position: relative;

  flex-grow: 1;
`
const Title = styled.div<{ disabled: boolean }>`
  font-style: normal;
  font-weight: 500;
  font-size: 1.6rem;
  line-height: 2.4rem;
  font-feature-settings: 'liga' off;
  color: ${(props) =>
    props.disabled
      ? getColorTheme('textDefaultSecondary')(props)
      : getColorTheme('textDefaultPrimary')(props)};
`
const Description = styled.div`
  padding-top: 0.8rem;

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

  display: grid;
  grid-auto-flow: row;
  gap: 0.8rem;
  justify-items: start;
`
const ToggleDetails = styled(NormalizedButton)`
  padding: 0.8rem 0 0 0;

  display: grid;
  grid-auto-flow: column;
  gap: 0.4rem;
  align-items: center;

  cursor: pointer;

  font-style: normal;
  font-size: 1.4rem;
  line-height: 2rem;
  font-feature-settings: 'liga' off;
  color: ${getColorTheme('textDefaultSecondary')};
`
const ChevronSmallIcon = styled(ChevronSmallIconBase)`
  fill: ${getColorTheme('iconSecondary')};
  stroke: ${getColorTheme('iconSecondary')};
`
const ReturnToActiveButton = styled(Button)`
  margin-top: 1.6rem;
`
