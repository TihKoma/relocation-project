import React, { ReactNode } from 'react'
import { useQuery } from '@apollo/client'

import { useAnalytics } from '@/modules/analytics'
import { SignInFormOpenFrom } from '@/modules/analytics'
import { useCookieController } from '@/modules/cookie'
import { QUERY_GET_USER_PROFILE } from '@/modules/profile'

import { logOut } from './api'

export type State = {
  isLoggedIn: boolean
  isAuthModalVisible: boolean
  isFillProfileModalVisible: boolean
}
type Actions = {
  logout: () => void
  loginSuccess: () => void
  showAuthModal: (from: SignInFormOpenFrom) => void
  hideAuthModal: () => void
  showFillProfileModal: () => void
  hideFillProfileModal: () => void
}
type Store = [State, Actions]

const StoreContext = React.createContext<Store | null>(null)

export const useAuthGlobalModals = (
  from: SignInFormOpenFrom,
): [boolean, () => void] => {
  const { data: profileQuery } = useQuery(QUERY_GET_USER_PROFILE, {
    ssr: false,
  })
  const profile = profileQuery?.getUserProfile
  const [{ isLoggedIn }, { showFillProfileModal, showAuthModal }] =
    useAuthorizationStore()

  if (!isLoggedIn) {
    return [true, () => showAuthModal(from)]
  } else if (!profile?.isFilled) {
    return [true, showFillProfileModal]
  }

  return [false, () => {}]
}

export const useAuthorizationStore = () => {
  const store = React.useContext(StoreContext)
  if (store === null) {
    throw new Error('auth store no defined')
  }
  return store
}

type Props = {
  defaultStore: State
  children: ReactNode
}

export const AuthStoreProvider: React.FC<Props> = ({
  defaultStore,
  ...props
}) => {
  const [state, setState] = React.useState<State>(defaultStore)
  const analytics = useAnalytics()
  const merge = (newState: Partial<State>) => (state: State) => ({
    ...state,
    ...newState,
  })

  const cookie = useCookieController()

  const actions = React.useMemo(
    (): Actions => ({
      logout: async () => {
        await logOut()
        cookie.remove('user_id')
        cookie.remove('user_segment_filter')
        setState(merge({ isLoggedIn: false }))
        // TODO remove reload https://nicity.atlassian.net/browse/CP-646
        window.location.reload()
      },
      loginSuccess: () => {
        setState(merge({ isLoggedIn: true }))
      },
      showAuthModal: (from: SignInFormOpenFrom) => {
        analytics?.openSignInForm(from)
        setState(merge({ isAuthModalVisible: true }))
      },
      hideAuthModal: () => {
        analytics?.closeSignInForm()
        setState(merge({ isAuthModalVisible: false }))
      },
      showFillProfileModal: () => {
        setState(merge({ isFillProfileModalVisible: true }))
      },
      hideFillProfileModal: () => {
        setState(merge({ isFillProfileModalVisible: false }))
      },
    }),
    [analytics, cookie],
  )

  const newState = React.useMemo(
    (): Store => [state, actions],
    [actions, state],
  )

  return <StoreContext.Provider value={newState} {...props} />
}
