import { VFC } from 'react'

import { MockWithAction } from '@/components/shared/MockWithAction/MockWithAction'
import { PlaceholderAuth } from '@/images'
import { useAuthorizationStore } from '@/modules/authorization'

type Props = {
  customTitle?: string
  customDescription?: string
}
export const SignInMock: VFC<Props> = ({ customTitle, customDescription }) => {
  const [, { showAuthModal }] = useAuthorizationStore()

  return (
    <MockWithAction
      image={<PlaceholderAuth />}
      buttonText={'Log in'}
      title={customTitle ?? 'Sorry, we don’t recognize you'}
      description={customDescription ?? 'Login and we will show you your feed'}
      onClick={() => showAuthModal('mock')}
    />
  )
}
