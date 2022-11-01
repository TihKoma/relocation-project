import { FC, useRef, useState } from 'react'
import { useMutation } from '@apollo/client'
import styled from '@emotion/styled'
import {
  Controller,
  ControllerRenderProps,
  FieldValues,
  useForm,
} from 'react-hook-form'

import { Alert } from '@/components/shared/Alert'
import { Button, NormalizedButton } from '@/components/ui-kit/Button'
import { FieldTextArea } from '@/components/ui-kit/form/TextArea'
import { ModalPortal } from '@/components/ui-kit/Modal'
import {
  AddTodoPlusIcon as AddTodoPlusIconBase,
  AlertIcon,
  ArrowLeftIcon,
  DeleteTaskIcon as DeleteTaskIconBase,
} from '@/images'
import { useAnalytics } from '@/modules/analytics'
import { useIsMobileDevice } from '@/modules/device'
import {
  MUTATION_RELOCATION_ADD_TODO,
  MUTATION_RELOCATION_TODO_CHANGE_STATUS,
  MUTATION_RELOCATION_UPDATE_TODO,
  QUERY_RELOCATION_PROJECT_TODOS,
} from '@/modules/relocation-project'
import { mobileMedia, notMobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

import {
  RelocationProjectTodoStatus,
  RelocationProjectTodoType,
} from '../../../../__generated__/globalTypes'
import { Subtasks, SubtasksRef } from './Subtasks'
import { SubtaskContent } from './Subtasks/Subtask'

export type FormModel = {
  title: string
  description: string
}
const TITLE_MAX_LETTERS = 150
const DESCRIPTION_MAX_LETTERS = 300

type Props = {
  onRequestClose: () => void
  initialValues?: FormModel
  title: string
  id?: string
  subtitle?: string
  parentId?: string
  titlePlaceholder?: string
  type: 'create' | 'edit'
  initialTasks?: SubtaskContent[]
  status?: RelocationProjectTodoStatus
  todoType?: RelocationProjectTodoType
}
export const EditTaskForm: FC<Props> = ({
  onRequestClose,
  status,
  todoType,
  initialValues,
  parentId,
  id,
  titlePlaceholder,
  title,
  subtitle,
  type,
  initialTasks = [],
}) => {
  const {
    handleSubmit,
    control,
    getValues,
    formState: { isSubmitting, isDirty },
  } = useForm<FormModel>({ defaultValues: initialValues })
  const subtasksRef = useRef<SubtasksRef | null>(null)
  const [isAddButtonVisible, setIsAddButtonVisible] = useState(
    !parentId && initialTasks && initialTasks.length === 0,
  )
  const [isSubtasksDirty, setIsSubtasksDirty] = useState(false)
  const [isDismissAlertVisible, setIsDismissAlertVisible] = useState(false)
  const isMobile = useIsMobileDevice()

  const analytics = useAnalytics()

  const [addTodo, { loading: isAdding }] = useMutation(
    MUTATION_RELOCATION_ADD_TODO,
    {
      onCompleted: () => {
        const { title } = getValues()
        const taskTypeForAnalytics = parentId ? 'subtask' : 'task'
        analytics.relocationMarketplaceTaskAction(
          title,
          'created',
          taskTypeForAnalytics,
        )
      },
    },
  )

  const [updateTodo, { loading: isUpdating }] = useMutation(
    MUTATION_RELOCATION_UPDATE_TODO,
    {
      onCompleted: () => {
        const { title } = getValues()
        const taskTypeForAnalytics = parentId ? 'subtask' : 'task'
        analytics.relocationMarketplaceTaskAction(
          title,
          'edited',
          taskTypeForAnalytics,
        )
      },
    },
  )

  const [changeStatusToSkipped] = useMutation(
    MUTATION_RELOCATION_TODO_CHANGE_STATUS,
    {
      variables: {
        input: {
          id: id!,
          status: RelocationProjectTodoStatus.SKIPPED,
        },
      },
      refetchQueries: [QUERY_RELOCATION_PROJECT_TODOS],
      onCompleted: () => {
        analytics.relocationMarketplaceTaskAction(title, 'dismissed', 'task')
      },
    },
  )

  const isSaveButtonDisabled =
    !(isDirty || isSubtasksDirty) || isSubmitting || isAdding || isUpdating

  return (
    <ModalPortal isVisible onRequestClose={onRequestClose}>
      <Container>
        <Header>
          <LeftPartHeader>
            {isMobile && (
              <BackButton onClick={onRequestClose}>
                <ArrowLeftIcon />
              </BackButton>
            )}
            <HeaderText>
              <Title>{title}</Title>
              {subtitle && (
                <Subtitle>
                  {subtitle.length > 50
                    ? subtitle.slice(0, 50) + '...'
                    : subtitle}
                </Subtitle>
              )}
            </HeaderText>
          </LeftPartHeader>
          <RightPartHeader>
            {type === 'edit' && (
              <DeleteTaskIcon
                onClick={() => {
                  setIsDismissAlertVisible(true)
                }}
              />
            )}
            {isDismissAlertVisible && (
              <Alert
                isVisible
                image={<AlertIcon />}
                title={'Are you sure you want to dismiss the task?'}
                onClick={async () => {
                  await changeStatusToSkipped()
                  setIsDismissAlertVisible(false)
                  onRequestClose()
                }}
                onCancel={() => {
                  setIsDismissAlertVisible(false)
                }}
                onRequestClose={() => {
                  setIsDismissAlertVisible(false)
                }}
                buttonText={'Dismiss'}
              />
            )}
          </RightPartHeader>
        </Header>
        <Form onSubmit={handleSubmit(() => {})}>
          <Body>
            <Controller
              control={control}
              name={'title'}
              rules={{ maxLength: TITLE_MAX_LETTERS }}
              render={(input) => {
                return (
                  <TaskNameInput
                    autoresize
                    withHighlightLinks
                    maxLength={TITLE_MAX_LETTERS}
                    data-test-id={'create-task'}
                    initialInputHeight={28}
                    placeholder={titlePlaceholder || 'Task name'}
                    ref={input.field.ref}
                    {...input}
                    field={
                      input.field as unknown as ControllerRenderProps<
                        FieldValues,
                        string
                      >
                    }
                  />
                )
              }}
            />
            <Controller
              control={control}
              name={'description'}
              rules={{ maxLength: DESCRIPTION_MAX_LETTERS }}
              render={(input) => {
                return (
                  <DescriptionInput
                    autoresize
                    withHighlightLinks
                    maxLength={DESCRIPTION_MAX_LETTERS}
                    data-test-id={'create-task'}
                    initialInputHeight={48}
                    placeholder={'Write something...'}
                    ref={input.field.ref}
                    {...input}
                    field={
                      input.field as unknown as ControllerRenderProps<
                        FieldValues,
                        string
                      >
                    }
                  />
                )
              }}
            />
            <Subtasks
              initialTasks={initialTasks}
              ref={subtasksRef}
              onChange={() => setIsSubtasksDirty(true)}
              onDelete={(restNumber) => {
                if (restNumber === 0) {
                  setIsAddButtonVisible(true)
                }
              }}
            />
          </Body>
          <Footer>
            {isAddButtonVisible && (
              <AddSubtaskButton
                viewType={'secondary'}
                size={'small'}
                Icon={<AddTodoPlusIcon />}
                iconPosition={'left'}
                onClick={() => {
                  analytics.relocationMarketplaceTaskCreationClick('subtask')
                  setIsAddButtonVisible(false)
                  subtasksRef.current?.addSubtask()
                }}
              >
                Add sub-task
              </AddSubtaskButton>
            )}
            <SaveButton
              type={'submit'}
              onClick={async () => {
                const { title, description } = getValues()
                const subtasks = subtasksRef.current?.getTasks().map((item) => {
                  let status = RelocationProjectTodoStatus.NOT_DONE

                  if (item.isDeleted) {
                    status = RelocationProjectTodoStatus.SKIPPED
                  } else if (item.isCompleted) {
                    status = RelocationProjectTodoStatus.DONE
                  }

                  return {
                    id: item.id,
                    title: item.title,
                    description: item.description,
                    status,
                    type: RelocationProjectTodoType.USER,
                    parentId: id,
                  }
                })
                if (type === 'create') {
                  await addTodo({
                    variables: {
                      input: {
                        id,
                        title,
                        status: RelocationProjectTodoStatus.NOT_DONE,
                        type: RelocationProjectTodoType.USER,
                        description,
                        parentId,
                        childrens: subtasks?.filter(
                          (item) =>
                            item.status !== RelocationProjectTodoStatus.SKIPPED,
                        ),
                      },
                    },
                    onCompleted: () => {
                      onRequestClose()
                    },
                    refetchQueries: () => {
                      return [QUERY_RELOCATION_PROJECT_TODOS]
                    },
                  })
                } else {
                  updateTodo({
                    variables: {
                      input: {
                        id,
                        title,
                        status: status || RelocationProjectTodoStatus.NOT_DONE,
                        type: todoType || RelocationProjectTodoType.USER,
                        description,
                        parentId,
                        childrens: subtasks,
                      },
                    },
                    onCompleted: () => {
                      onRequestClose()
                    },
                    refetchQueries: () => {
                      return [QUERY_RELOCATION_PROJECT_TODOS]
                    },
                  })
                }
              }}
              viewType={'primary'}
              size={'medium'}
              disabled={isSaveButtonDisabled}
            >
              Save
            </SaveButton>
          </Footer>
        </Form>
      </Container>
    </ModalPortal>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  background: ${getColorTheme('backgroundDefaultPrimary')};

  ${notMobileMedia} {
    width: 73.2rem;
    border-radius: 3.2rem;
    min-height: 48rem;

    position: relative;
    overflow: hidden;
  }

  ${mobileMedia} {
    width: 100%;
    height: 100%;
  }
`
const Header = styled.div`
  display: flex;
  justify-content: space-between;

  ${notMobileMedia} {
    padding: 2.6rem 2.4rem 1.6rem 2.4rem;
  }

  ${mobileMedia} {
    padding: 1.6rem 1.6rem 1.6rem 1.3rem;
  }
`
const LeftPartHeader = styled.div`
  display: flex;
`
const RightPartHeader = styled.div``
const Body = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  ${notMobileMedia} {
    padding: 0.8rem 2.4rem 0;
  }

  ${mobileMedia} {
    padding: 0.8rem 1.6rem 0;
  }
`
const Footer = styled.div`
  width: 100%;

  bottom: 0;
  z-index: 1;

  background: ${getColorTheme('backgroundDefaultPrimary')};

  ${notMobileMedia} {
    padding: 2.4rem;

    position: absolute;
  }

  ${mobileMedia} {
    padding: 1.6rem;

    position: fixed;
  }
`
const Form = styled.div`
  padding-bottom: 16rem;

  display: flex;
  flex-direction: column;
  flex-grow: 1;

  position: relative;
  overflow-y: auto;
`
const SaveButton = styled(Button)`
  width: 100%;
`
const Title = styled.div`
  font-style: normal;
  font-weight: 500;
  text-align: center;
  font-feature-settings: 'liga' off;
  color: ${getColorTheme('textDefaultPrimary')};

  ${notMobileMedia} {
    font-size: 2.8rem;
    line-height: 3.6rem;
  }

  ${mobileMedia} {
    font-size: 1.8rem;
    line-height: 2.4rem;
  }
`
const BackButton = styled(NormalizedButton)`
  margin-right: 3.2rem;
`
const AddSubtaskButton = styled(Button)`
  margin-bottom: 1.6rem;
`
const AddTodoPlusIcon = styled(AddTodoPlusIconBase)`
  & path {
    fill: ${getColorTheme('iconPrimary')};
  }
`
const TaskNameInput = styled(FieldTextArea)`
  margin-bottom: 1.2rem;

  & > textarea {
    border: none;
    outline: none;
    resize: none;

    font-style: normal;
    font-weight: 500;
    font-size: 2.4rem;
    line-height: 2.8rem;
    font-feature-settings: 'liga' off;
    color: ${getColorTheme('textDefaultPrimary')};

    ::placeholder {
      font-size: 2.4rem;
      color: ${getColorTheme('textDefaultSecondary')};
    }
  }
`
const HeaderText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;

  text-align: left;
`
const Subtitle = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 1.2rem;
  line-height: 1.6rem;
  text-align: center;
  font-feature-settings: 'liga' off;
  color: ${getColorTheme('sun500')};
`
const DescriptionInput = styled(FieldTextArea)`
  margin-bottom: 1.6rem;

  & > textarea {
    border: none;
    outline: none;
    resize: none;

    font-style: normal;
    font-weight: 400;
    font-size: 1.6rem;
    line-height: 2.4rem;
    font-feature-settings: 'liga' off;
    color: ${getColorTheme('textDefaultPrimary')};

    ::placeholder {
      font-size: 1.6rem;
      color: ${getColorTheme('textDefaultSecondary')};
    }
  }
`
const DeleteTaskIcon = styled(DeleteTaskIconBase)`
  cursor: pointer;
`
