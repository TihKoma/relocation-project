import { VFC } from 'react'
import Link from 'next/link'
import styled from '@emotion/styled'

import { Button } from '@/components/ui-kit/Button'
import { SignUp } from '@/images'
import { useAuthorizationStore } from '@/modules/authorization'
import { ROUTES } from '@/modules/router'

import { Menu } from './Menu'
import { NotificationButton } from './NotificationButton'
import { SupportChatButton } from './SupportChatButton'

type Props = {
  className?: string
}
export const Toolbar: VFC<Props> = ({ className }) => {
  const [{ isLoggedIn }] = useAuthorizationStore()

  return (
    <Container className={className}>
      <SupportChatButton />
      {isLoggedIn && <NotificationButton />}
      {!isLoggedIn && (
        <Link href={ROUTES.login.calcUrl({})} passHref>
          <Button
            size={'small'}
            Icon={<SignUp />}
            iconPosition={'right'}
            as={'a'}
          >
            Sign up
          </Button>
        </Link>
      )}
      <Menu />
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: 1.6rem;
`
