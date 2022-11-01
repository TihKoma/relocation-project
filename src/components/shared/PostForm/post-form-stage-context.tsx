import { createContext, FC, ReactNode, useState } from 'react'

export type PostFormStage = 'main' | 'location' | 'neighborhood' | 'group'

export const PostFormStageContext = createContext<
  [PostFormStage, (value: PostFormStage) => void]
>(['main', () => {}])

type Props = {
  initialStage?: PostFormStage
  children: ReactNode
}

export const PostFormStageContextProvider: FC<Props> = ({
  children,
  initialStage = 'main',
}) => {
  const value = useState<PostFormStage>(initialStage)

  return (
    <PostFormStageContext.Provider value={value}>
      {children}
    </PostFormStageContext.Provider>
  )
}
