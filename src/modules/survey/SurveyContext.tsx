import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react'

type Context = {
  isReadyForSurvey: boolean
  setIsReadyForSurvey: Dispatch<SetStateAction<boolean>>
}

const SurveyContext = createContext<Context>({
  isReadyForSurvey: false,
  setIsReadyForSurvey: () => {},
})

type Props = {
  children: ReactNode
}

export const SurveyProvider: FC<Props> = ({ children }) => {
  const [isReadyForSurvey, setIsReadyForSurvey] = useState(false)

  return (
    <SurveyContext.Provider value={{ isReadyForSurvey, setIsReadyForSurvey }}>
      {children}
    </SurveyContext.Provider>
  )
}

export const useSurvey = () => {
  return useContext(SurveyContext)
}
