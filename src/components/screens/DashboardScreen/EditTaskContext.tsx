import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react'

import {
  EditTaskForm,
  FormModel,
  SubtaskContent,
} from '@/components/shared/EditTaskForm'

import {
  RelocationProjectTodoStatus,
  RelocationProjectTodoType,
} from '../../../../__generated__/globalTypes'

type Context = {
  showModal: (content: Content) => void
}

const EditTaskContext = createContext<Context>({
  showModal: () => {},
})

export const useEditTaskContext = () => {
  return useContext(EditTaskContext)
}

type Content = {
  initialValues?: FormModel
  title: string
  subtitle?: string
  todoId?: string
  titlePlaceholder?: string
  parentId?: string
  type: 'create' | 'edit'
  initialTasks?: SubtaskContent[]
  status?: RelocationProjectTodoStatus
  todoType?: RelocationProjectTodoType
}

export const EditTaskContextConsumer: FC<{
  children: (context: Context) => ReactNode
}> = ({ children }) => {
  return <EditTaskContext.Consumer>{children}</EditTaskContext.Consumer>
}

export const EditTaskContextProvider: FC<{
  children: ReactNode
}> = ({ children }) => {
  const [content, setContent] = useState<Content>({ title: '', type: 'create' })
  const [isEditTaskFormVisible, setIsEditTaskFormVisible] = useState(false)

  const value = useMemo(
    () => ({
      showModal: (content: Content) => {
        setContent(content)
        setIsEditTaskFormVisible(true)
      },
    }),
    [],
  )

  return (
    <EditTaskContext.Provider value={value}>
      {children}
      {isEditTaskFormVisible && (
        <EditTaskForm
          id={content.todoId}
          type={content.type}
          initialTasks={content.initialTasks}
          title={content.title}
          parentId={content.parentId}
          status={content.status}
          todoType={content.todoType}
          subtitle={content.subtitle}
          titlePlaceholder={content.titlePlaceholder}
          initialValues={content.initialValues}
          onRequestClose={() => {
            setIsEditTaskFormVisible(false)
          }}
        />
      )}
    </EditTaskContext.Provider>
  )
}
