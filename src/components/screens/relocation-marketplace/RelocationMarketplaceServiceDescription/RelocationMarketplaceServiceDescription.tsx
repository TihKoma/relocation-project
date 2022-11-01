import { FC, useMemo } from 'react'
import { useRouter } from 'next/router'

import { ScreenMeta } from '@/components/screens/relocation-marketplace/RelocationMarketplaceServiceDescription/ScreenMeta'
import { AreaLayout } from '@/components/shared/AreaLayout'
import { HubspotConfig, HubspotFrame } from '@/components/shared/HubspotFrame'
import {
  RELOCATION_MARKETPLACE_SERVICES,
  RelocationMarketplaceServiceGroupName,
  RelocationMarketplaceServiceName,
} from '@/modules/relocation-marketplace'
import {
  DEFAULT_PAGE_DESCRIPTION,
  DEFAULT_PAGE_TITLE,
  ROUTES,
} from '@/modules/router'

const CTA_BUTTON_NAME = 'cta'

type Props = {
  serviceName: RelocationMarketplaceServiceName
  serviceGroupName: RelocationMarketplaceServiceGroupName
}
export const RelocationMarketplaceServiceDescription: FC<Props> = ({
  serviceGroupName,
  serviceName,
}) => {
  const router = useRouter()

  const isWebView = router.query.isWebView === 'true'

  const service = useMemo(
    () =>
      RELOCATION_MARKETPLACE_SERVICES[serviceGroupName].services.find(
        (group) => group.serviceName === serviceName,
      ),
    [serviceName, serviceGroupName],
  )

  const hubspotSlug = service?.hubspotSlug || ''
  const serviceTitle = service?.title || ''
  const hubspotTitle = service?.hubspotTitle || DEFAULT_PAGE_TITLE
  const hubspotDescription =
    service?.hubspotDescription || DEFAULT_PAGE_DESCRIPTION

  const hubspotConfig: HubspotConfig = useMemo(
    () =>
      ({
        handlers: [
          {
            type: 'click-button',
            name: CTA_BUTTON_NAME,
            selector: '#order-the-service',
          },
        ],
      } as HubspotConfig),
    [],
  )

  return (
    <>
      <ScreenMeta
        hubspotTitle={hubspotTitle}
        hubspotDescription={hubspotDescription}
        serviceTitle={serviceTitle}
      />
      <AreaLayout isFixedHeightMobileContent withoutNavigationBar={isWebView}>
        <HubspotFrame
          slug={hubspotSlug}
          type={'landing'}
          config={hubspotConfig}
          onButtonClick={(name) => {
            if (name === CTA_BUTTON_NAME) {
              router.push(
                ROUTES.relocationMarketplaceService.calcUrl({
                  serviceGroupName,
                  serviceName,
                  isWebView,
                }),
              )
            }
          }}
        />
      </AreaLayout>
    </>
  )
}
