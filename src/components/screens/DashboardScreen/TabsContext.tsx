import {
  ComponentProps,
  createContext,
  FC,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react'

import {
  TabContent,
  TabId,
} from '@/components/screens/DashboardScreen/MobileContent/Tabs'
import { EmptyState } from '@/components/screens/DashboardScreen/RelocationTasks/EmptyState'
import { CheckMarkInCircleIcon, EditGradientIcon, TrashCanIcon } from '@/images'

import { RelocationProjectTodoStatus } from '../../../../__generated__/globalTypes'

type TabContentForEmptyState = Omit<
  ComponentProps<typeof EmptyState>,
  'className' | 'onCreateNewTask'
>
type Tabs = Record<TabId, TabContent & { emptyState: TabContentForEmptyState }>

const INITIAL_TAB = 'active'

type Context = {
  tabs: Tabs
  activeTab: TabId
  setActiveTab: (tabId: TabId) => void
}
const DEFAULT_TABS_STATE: Tabs = {
  active: {
    id: 'active',
    title: 'Active',
    statuses: [
      RelocationProjectTodoStatus.NOT_DONE,
      RelocationProjectTodoStatus.IN_PROGRESS,
    ],
    emptyState: {
      text: 'You don’t have active tasks',
      image: <EditGradientIcon />,
      withCreateTaskButton: true,
    },
  },
  completed: {
    id: 'completed',
    title: 'Completed',
    statuses: [RelocationProjectTodoStatus.DONE],
    emptyState: {
      text: 'Your completed tasks will appear here',
      image: <CheckMarkInCircleIcon />,
    },
  },
  dismissed: {
    id: 'dismissed',
    title: 'Dismissed',
    statuses: [RelocationProjectTodoStatus.SKIPPED],
    emptyState: {
      text: 'Your dismissed tasks will appear here',
      image: <TrashCanIcon />,
    },
  },
}

const TabsContext = createContext<Context>({
  tabs: DEFAULT_TABS_STATE,
  activeTab: INITIAL_TAB,
  setActiveTab: () => {},
})

type Props = {
  children: ReactNode
}
export const TabsContextProvider: FC<Props> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<TabId>(INITIAL_TAB)

  const tabs: Tabs = useMemo(
    () => ({
      active: {
        ...DEFAULT_TABS_STATE.active,
      },
      completed: {
        ...DEFAULT_TABS_STATE.completed,
      },
      dismissed: {
        ...DEFAULT_TABS_STATE.dismissed,
      },
    }),
    [],
  )

  const value = useMemo(
    () => ({
      tabs,
      setActiveTab,
      activeTab,
    }),
    [tabs, setActiveTab, activeTab],
  )

  return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>
}

export const useTabsContext = () => {
  return useContext(TabsContext)
}
