import { useMemo } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { AreaLayout } from '@/components/shared/AreaLayout'
import { HubspotConfig, HubspotFrame } from '@/components/shared/HubspotFrame'
import { useAuthorizationStore } from '@/modules/authorization'
import { useCheckAccess } from '@/modules/profile/hooks/useCheckAccess'
import { ROUTES } from '@/modules/router'

const CTA_BUTTON_NAME = 'cta'
const MARKETPLACE_LINK_NAME = 'marketplace-link'
const FREE_PLAN_BUTTON_NAME = 'free-plan'
const OPTIMAL_PLAN_BUTTON_NAME = 'optimal-plan'
const PREMIUM_PLAN_BUTTON_NAME = 'premium-plan'

export const RelocationManagerScreen = () => {
  const router = useRouter()
  const [{ isLoggedIn }] = useAuthorizationStore()
  const isTaskManagerAccess = useCheckAccess('task-manager')
  const hubspotConfig: HubspotConfig = useMemo(
    () =>
      ({
        handlers: [
          {
            type: 'click-button',
            name: CTA_BUTTON_NAME,
            selector: '#order-service-cta',
          },
          {
            type: 'click-button',
            name: MARKETPLACE_LINK_NAME,
            selector: '#marketplace-link',
          },
          {
            type: 'click-button',
            name: FREE_PLAN_BUTTON_NAME,
            selector: 'a[href="#free-plan"]',
          },
          {
            type: 'click-button',
            name: OPTIMAL_PLAN_BUTTON_NAME,
            selector: 'a[href="#optimal-plan"]',
          },
          {
            type: 'click-button',
            name: PREMIUM_PLAN_BUTTON_NAME,
            selector: 'a[href="#premium-plan"]',
          },
        ],
      } as HubspotConfig),
    [],
  )

  return (
    <>
      <Head>
        <title>
          Nicity Virtual Relocation Assistant - Take control of all moving tasks
        </title>
      </Head>
      <AreaLayout isFixedHeightMobileContent>
        <HubspotFrame
          withHash
          type={'landing'}
          config={hubspotConfig}
          slug={'relocation-manager'}
          prefixUrl={'en-us/en'}
          onButtonClick={(name) => {
            if (name === CTA_BUTTON_NAME) {
              if (isTaskManagerAccess) {
                router.push(ROUTES.dashboard.calcUrl())
              } else {
                router.push(
                  ROUTES.payment.calcUrl({
                    redirectTo:
                      (router.query.paymentRedirectTo as string) || '',
                    withPaymentEvent: true,
                  }),
                )
              }
            }
            if (name === MARKETPLACE_LINK_NAME) {
              router.push(ROUTES.relocationMarketplace.calcUrl({}))
            }
            if (name === FREE_PLAN_BUTTON_NAME) {
              if (isTaskManagerAccess) {
                router.push(ROUTES.dashboard.calcUrl())
              } else {
                router.push(ROUTES.login.calcUrl({}))
              }
            }
            if (name === OPTIMAL_PLAN_BUTTON_NAME) {
              if (isTaskManagerAccess) {
                router.push(ROUTES.dashboard.calcUrl())
              } else {
                router.push(
                  ROUTES.payment.calcUrl({
                    redirectTo:
                      (router.query.paymentRedirectTo as string) || '',
                    withPaymentEvent: true,
                  }),
                )
              }
            }
            if (name === PREMIUM_PLAN_BUTTON_NAME) {
              if (isLoggedIn) {
                router.push(
                  ROUTES.relocationMarketplaceService.calcUrl({
                    serviceGroupName: 'assistants',
                    serviceName: 'relocation-concierge',
                  }),
                )
              } else {
                router.push(
                  ROUTES.login.calcUrl({
                    to: 'relocation-concierge',
                  }),
                )
              }
            }
          }}
        />
      </AreaLayout>
    </>
  )
}
