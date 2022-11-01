import { GetServerSideProps } from 'next'

import { PaymentScreen } from '@/components/screens/PaymentScreen'
import { ROUTES } from '@/modules/router'

const PaymentPage = () => {
  return <PaymentScreen />
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // @ts-ignore
  const userId = ctx.req.userId

  const search = ctx.req.url?.split('?')[1]

  let redirectTo
  if (search) {
    const queries = search.split('&').map((item) => item.split('='))

    queries.forEach(([key, value]) => {
      switch (key) {
        case 'redirectTo': {
          redirectTo = value
          break
        }
      }
    })
  }

  if (!userId) {
    return {
      redirect: {
        destination: ROUTES.login.calcUrl({
          subscription: 'optimal',
          paymentRedirectTo: redirectTo,
        }),
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}

export default PaymentPage
