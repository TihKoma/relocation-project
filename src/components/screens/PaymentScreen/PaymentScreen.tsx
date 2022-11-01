import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import styled from '@emotion/styled'

import { AreaLayout } from '@/components/shared/AreaLayout'
import { LoadingState } from '@/components/shared/LoadingState'
import { showErrorToast } from '@/components/shared/Toast'
import { Loader } from '@/components/ui-kit/Loader'
import {
  MUTATION_CREATE_PAYMENTS_SUBSCRIPTION,
  PAYMENTS_PLANS,
} from '@/modules/payment'
import { ROUTES } from '@/modules/router'

const getRedirectTo = (url: string, withPaymentEvent?: boolean) => {
  if (!url) {
    return ''
  }
  if (withPaymentEvent) {
    const separator = url.indexOf('?') === -1 ? '?' : '&'
    return `${url}${separator}withPaymentEvent=${withPaymentEvent}`
  }
  return url
}
export const PaymentScreen = () => {
  const [createSubscription] = useMutation(
    MUTATION_CREATE_PAYMENTS_SUBSCRIPTION,
  )
  const router = useRouter()

  useEffect(() => {
    const redirectTo = getRedirectTo(
      (router.query.redirectTo as string) ?? '',
      Boolean(router.query.withPaymentEvent),
    )

    createSubscription({
      variables: {
        priceId: PAYMENTS_PLANS.optimal,
        redirectTo: redirectTo || null,
      },
    })
      .then((result) => {
        if (result.data?.createPaymentsSubscription?.sessionUrl) {
          window.location.href =
            result.data.createPaymentsSubscription.sessionUrl
        }
      })
      .catch((error) => {
        console.error(error)
        // eslint-disable-next-line no-console
        console.log(error.message)
        showErrorToast(error.message, {
          autoClose: 3000,
          onClose: () => {
            router.push(
              (router.query.redirectTo as string) ||
                ROUTES.relocationManager.calcUrl({ toPlans: true }),
            )
          },
        })
      })
  }, [createSubscription, router])

  return (
    <AreaLayout>
      <Container>
        <LoadingState loading loadingComponent={<Loader />}>
          <div />
        </LoadingState>
      </Container>
    </AreaLayout>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`
