import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useRouter } from 'next/router'
import { useApolloClient } from '@apollo/client'

import { QUERY_GET_USER_PROFILE } from '@/modules/profile'
import { ROUTES } from '@/modules/router'

type ProfileFormType = 'full' | 'images'

type Context = {
  isVisible: boolean
  showModal: (type: ProfileFormType) => void
  hideModal: (isSuccess: boolean) => Promise<void>
  type: ProfileFormType
}

const EditProfileModalContext = createContext<Context>({
  isVisible: false,
  showModal: () => {},
  hideModal: () => Promise.resolve(),
  type: 'full',
})

type Props = {
  children: ReactNode
}
export const EditProfileModalContextProvider: FC<Props> = ({ children }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const isRedirectToProfileRef = useRef(false)
  const [type, setType] = useState<ProfileFormType>('full')
  const router = useRouter()
  const apolloClient = useApolloClient()

  const redirectToProfile = useCallback(async () => {
    const result = await apolloClient.query({
      query: QUERY_GET_USER_PROFILE,
      fetchPolicy: 'no-cache',
    })

    const userName = result.data?.getUserProfile?.userName

    if (userName) {
      router.push(ROUTES.publicProfile.calcUrl({ userName }), undefined, {
        shallow: false,
      })
    }
  }, [router, apolloClient])

  useEffect(() => {
    if (!isVisible && isRedirectToProfileRef.current) {
      isRedirectToProfileRef.current = false
      redirectToProfile()
    }
  }, [isVisible, redirectToProfile])

  const value = useMemo(
    () => ({
      isVisible,
      showModal: (type: ProfileFormType) => {
        setType(type)
        setIsVisible(true)
      },
      hideModal: async (isSuccess: boolean) => {
        setIsVisible(false)

        if (isSuccess) {
          isRedirectToProfileRef.current = true
        }
      },
      type,
    }),
    [isVisible, setIsVisible, type, setType],
  )

  return (
    <EditProfileModalContext.Provider value={value}>
      {children}
    </EditProfileModalContext.Provider>
  )
}

export const useEditProfileModal = (): Context => {
  return useContext(EditProfileModalContext)
}
