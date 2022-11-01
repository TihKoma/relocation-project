import React, { FC } from 'react'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'

import { AuthForm as AuthFormBase } from '@/components/shared/AuthForm'
import { Layout } from '@/components/shared/layout'
import { LoginPageIllustration as LoginPageIllustrationBase } from '@/images'
import { useIsNotMobileDevice } from '@/modules/device'
import { NEW_YORK_SLUG } from '@/modules/mock'
import { LoginSubscriptionQuery, LoginToQuery, ROUTES } from '@/modules/router'
import { mobileMedia } from '@/styles/media'

import { LoginMeta } from './LoginMeta'

export const Login: FC = () => {
  const isNotMobile = useIsNotMobileDevice()
  const router = useRouter()

  const onSuccess = () => {
    const { to, subscription } = router.query

    if (!to && !subscription) {
      window.location.reload()
    }

    switch (to as LoginToQuery) {
      case 'where': {
        router
          .push(ROUTES.whereQuiz.calcUrl(), undefined, { shallow: true })
          .then(() => {
            window.location.reload()
          })
        return
      }
      case 'guide': {
        router.push(ROUTES.guide.calcUrl())
        return
      }
      case 'manager': {
        router.push(ROUTES.relocationMarketplace.calcUrl({}))
        return
      }
      case 'houses': {
        router.push(ROUTES.homes.calcUrl())
        return
      }
      case 'community': {
        router.push(ROUTES.area.calcUrl({ regionSlug: NEW_YORK_SLUG }))
        return
      }
      case 'launch-relocation': {
        router.push(ROUTES.launchRelocation.calcUrl({}))
        return
      }
      case 'dashboard': {
        router.push(ROUTES.dashboard.calcUrl())
        return
      }
      case 'relocation-concierge': {
        router.push(
          ROUTES.relocationMarketplaceService.calcUrl({
            serviceGroupName: 'assistants',
            serviceName: 'relocation-concierge',
          }),
        )
        return
      }
      case 'back': {
        router.back()
        return
      }
      default: {
      }
    }

    switch (subscription as LoginSubscriptionQuery) {
      case 'optimal': {
        router.push(
          ROUTES.payment.calcUrl({
            redirectTo: (router.query.paymentRedirectTo as string) || '',
            withPaymentEvent: true,
          }),
        )
        return
      }
      case 'premium': {
        router.push(
          ROUTES.relocationMarketplaceService.calcUrl({
            serviceGroupName: 'assistants',
            serviceName: 'relocation-concierge',
          }),
        )
        return
      }
      default: {
      }
    }

    window.location.reload()
  }

  return (
    <>
      <LoginMeta />
      <Layout>
        <Container>
          {isNotMobile && (
            <Section>
              <LoginPageIllustration />
            </Section>
          )}
          <Section>
            <AuthForm withMobileContextMenu onSuccess={onSuccess} />
          </Section>
        </Container>
      </Layout>
    </>
  )
}

const Container = styled.div`
  padding: 1.6rem;

  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  column-gap: 24px;
  flex-grow: 1;

  background-color: #f0f1f7;
  border-radius: 1.2rem;

  ${mobileMedia} {
    padding: 4rem 0 4.5rem 0;
    height: 100%;

    border-radius: 0;
  }
`

const Section = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-x: hidden;

  border-radius: 1.2rem;
  background-color: #ffffff;

  ${mobileMedia} {
    border-radius: 0;
  }
`
const AuthForm = styled(AuthFormBase)`
  ${mobileMedia} {
    height: 100%;
    max-width: 100%;
    justify-content: center;
  }
`

const LoginPageIllustration = styled(LoginPageIllustrationBase)`
  max-width: 45.2rem;
  max-height: 36.6rem;
`
