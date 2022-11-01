import { FC, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'
import { Widget as WidgetBase } from '@typeform/embed-react'

import { AreaLayout } from '@/components/shared/AreaLayout'
import { CrossIcon } from '@/images'
import { useAnalytics } from '@/modules/analytics'
import { useIsMobileDevice } from '@/modules/device'
import {
  RELOCATION_MARKETPLACE_SERVICES,
  RelocationMarketplaceServiceGroupName,
  RelocationMarketplaceServiceName,
} from '@/modules/relocation-marketplace'
import { ROUTES } from '@/modules/router'
import { NODE_DEVELOPMENT } from '@/modules/utils/config'
import { getColorTheme } from '@/styles/themes'

import { ScreenMeta } from './ScreenMeta'

type Props = {
  serviceName: RelocationMarketplaceServiceName
  serviceGroupName: RelocationMarketplaceServiceGroupName
}
export const RelocationMarketplaceFormScreen: FC<Props> = ({
  serviceName,
  serviceGroupName,
}) => {
  const [isTypeformLoaded, setIsTypeformLoaded] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const router = useRouter()
  const isMobile = useIsMobileDevice()
  const analytics = useAnalytics()

  const isWebView = router.query.isWebView === 'true'

  const hiddenFields = {}

  useEffect(() => {
    if (
      RELOCATION_MARKETPLACE_SERVICES[serviceGroupName].services.find(
        (service) => service.serviceName === serviceName,
      )?.typeformId
    ) {
      setIsTypeformLoaded(true)
    } else {
      router.push(ROUTES.relocationMarketplace.calcUrl({}), undefined, {
        shallow: true,
      })
    }
  }, [serviceGroupName, serviceName, router])

  const service = useMemo(() => {
    return RELOCATION_MARKETPLACE_SERVICES[serviceGroupName].services.find(
      (service) => service.serviceName === serviceName,
    )
  }, [serviceGroupName, serviceName])

  const typeformId = service?.typeformId || ''

  const serviceTitle = service?.title || ''

  return (
    <>
      <ScreenMeta serviceTitle={serviceTitle} />
      <AreaLayout withoutNavigationBar>
        <Container>
          {isMobile && (
            <MobileHeader>
              <HeaderTitle>{serviceTitle}</HeaderTitle>
              {!isWebView && (
                <CrossIcon
                  onClick={() => {
                    router.push(
                      ROUTES.relocationMarketplaceServiceGroup.calcUrl({
                        serviceGroupName,
                      }),
                      undefined,
                      { shallow: true },
                    )
                  }}
                />
              )}
            </MobileHeader>
          )}
          {isTypeformLoaded && !isSubmitted && (
            <Widget
              id={typeformId}
              inlineOnMobile
              hidden={hiddenFields}
              enableSandbox={NODE_DEVELOPMENT}
              onEndingButtonClick={() => {}}
              onSubmit={() => {
                analytics.MPServicesQuizLeadSended(serviceName)
                setIsSubmitted(true)

                if (isWebView) {
                  const nativeAppCallbacks = (window as any).nativeAppCallbacks
                  nativeAppCallbacks.postMessage({
                    type: 'typeform_completed',
                    payload: {
                      name: serviceName,
                      typeformId,
                    },
                  })
                } else {
                  router.push(
                    ROUTES.relocationMarketplace.calcUrl({
                      serviceNameCompleted: serviceName,
                    }),
                  )
                }
              }}
            />
          )}
        </Container>
      </AreaLayout>
    </>
  )
}

const Container = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;

  overflow-y: hidden;
`
const Widget = styled(WidgetBase)`
  width: 100%;
  flex-grow: 1;
`
const MobileHeader = styled.div`
  height: 5.6rem;
  width: 100%;
  padding-left: 1.6rem;
  padding-right: 2rem;

  position: sticky;
  top: 0;
  z-index: 1;

  display: flex;
  justify-content: space-between;
  align-items: center;

  background: ${getColorTheme('backgroundDefaultPrimary')};
  box-shadow: 0px -2px 12px rgba(18, 21, 31, 0.02),
    0px -8px 32px rgba(18, 21, 31, 0.12);
`
const HeaderTitle = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 1.8rem;
  line-height: 2.4rem;
  text-align: center;
  font-feature-settings: 'liga' off;
  color: ${getColorTheme('textDefaultPrimary')};
`
