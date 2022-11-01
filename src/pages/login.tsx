import { VFC } from 'react'

import { Login } from '@/components/screens/Login'
import { withXRay } from '@/modules/analytics'
import { ROUTES } from '@/modules/router'

import { ServerData } from './_app'

const LoginPage: VFC<ServerData> = () => {
  return <Login />
}

export const getServerSideProps = withXRay(async ({ ctx }) => {
  // @ts-ignore
  const userName: string = ctx.req.userName

  if (userName) {
    return {
      redirect: {
        destination: ROUTES.redirect.calcUrl(),
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
})

export default LoginPage
