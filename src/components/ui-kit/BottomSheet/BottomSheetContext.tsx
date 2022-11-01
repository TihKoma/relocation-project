import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react'

type Actions = {
  snapToBottom: () => void
}
type SetActions = (actions: Actions) => void
type Context = {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  actions: Actions
  setActions: SetActions
}
const BottomSheetContext = createContext<Context>({
  isOpen: false,
  setIsOpen: () => {},
  actions: {
    snapToBottom: () => {},
  },
  setActions: () => {},
})

type Props = {
  children: ReactNode
}
export const BottomSheetContextProvider: FC<Props> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true)
  const [actions, setActions] = useState<Actions>({ snapToBottom: () => {} })
  const value = useMemo(
    () => ({ actions, setActions, isOpen, setIsOpen }),
    [actions, isOpen],
  )

  return (
    <BottomSheetContext.Provider value={value}>
      {children}
    </BottomSheetContext.Provider>
  )
}

export const useBottomSheet = () => {
  return useContext(BottomSheetContext)
}

export const useBottomSheetActions = (): Actions => {
  return useContext(BottomSheetContext).actions
}

export const useSetBottomSheetActions = (): SetActions => {
  return useContext(BottomSheetContext).setActions
}
