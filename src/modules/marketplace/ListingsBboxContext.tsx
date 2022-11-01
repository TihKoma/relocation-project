import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useState,
} from 'react'
import { BBoxInput } from '__generated__/globalTypes'

type ListingsBboxContextType = {
  bbox: BBoxInput | undefined
  setBbox: Dispatch<SetStateAction<BBoxInput | undefined>>
}

export const ListingsBboxContext = createContext<ListingsBboxContextType>({
  bbox: undefined,
  setBbox: () => {},
})

type ListingsBboxContextProviderProps = {
  children: ReactNode
}

export const ListingsBboxContextProvider: FC<
  ListingsBboxContextProviderProps
> = ({ children }) => {
  const [bbox, setBbox] = useState<BBoxInput>()

  return (
    <ListingsBboxContext.Provider value={{ bbox, setBbox }}>
      {children}
    </ListingsBboxContext.Provider>
  )
}
