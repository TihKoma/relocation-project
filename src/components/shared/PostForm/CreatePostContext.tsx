import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

export type CreatePostContextState = {
  feedId?: string
  group?: {
    id: string
    name: string
  }
  region?: {
    id: string
    name: string
  }
}
type DataForCreatePost = [
  CreatePostContextState,
  Dispatch<CreatePostContextState> | null,
]

export const DataForCreatePostContext = createContext<DataForCreatePost>([
  {
    feedId: undefined,
    group: undefined,
    region: undefined,
  },
  null,
])

export const useDataForCreatePostContext = (
  feedId: string | undefined,
  region?: {
    id: string
    name: string
  },
  group?: {
    id: string
    name: string
  },
) => {
  const [_, setDataForCreatePostContext] = useContext(DataForCreatePostContext)

  useEffect(() => {
    if (feedId || region?.id || region?.name || group) {
      setDataForCreatePostContext?.({
        feedId: feedId ?? undefined,
        region: {
          id: region?.id ?? '',
          name: region?.name ?? '',
        },
        group,
      })
    }
  }, [feedId, region?.name, region?.id, group, setDataForCreatePostContext])
}

type Props = {
  children: ReactNode
}
export const DataForCreatePostContextProvider: FC<Props> = ({ children }) => {
  const [data, setData] = useState<CreatePostContextState>({})

  return (
    <DataForCreatePostContext.Provider value={[data, setData]}>
      {children}
    </DataForCreatePostContext.Provider>
  )
}
