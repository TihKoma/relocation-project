import { FC, useState } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'

import { Copyright } from '@/components/screens/relocation-marketplace/RelocationMarketplaceScreen/Copyright'
import { HowItWorks as HowItWorksBase } from '@/components/screens/relocation-marketplace/RelocationMarketplaceScreen/HowItWorks'
import { RelocationProjectButton as RelocationProjectButtonBase } from '@/components/screens/relocation-marketplace/RelocationMarketplaceScreen/RelocationProjectButton'
import { Services as ServicesBase } from '@/components/screens/relocation-marketplace/RelocationMarketplaceScreen/Services'
import { WhyUseNicity as WhyUseNicityBase } from '@/components/screens/relocation-marketplace/RelocationMarketplaceScreen/WhyUseNicity'
import { Alert } from '@/components/shared/Alert'
import { AreaLayout } from '@/components/shared/AreaLayout'
import { NAVIGATION_BAR_HEIGHT } from '@/components/shared/layout'
import {
  HeaderOverlay as HeaderOverlayBase,
  RelocationSearchHeader as RelocationSearchHeaderBase,
} from '@/components/shared/relocation-marketplace/RelocationSearchHeader'
import { useIsMobileDevice } from '@/modules/device'
import { QUERY_RELOCATION_PROJECT } from '@/modules/relocation-project'
import { ROUTES } from '@/modules/router'
import { mobileMedia, notMobileMedia } from '@/styles/media'

import { DownloadAppBanner as DownloadAppBannerBase } from './DownloadAppBanner'
import { ScreenMeta } from './ScreenMeta'

type Props = {
  serviceNameCompleted: string
}

export const RelocationMarketplaceScreen: FC<Props> = ({
  serviceNameCompleted,
}) => {
  const isMobile = useIsMobileDevice()
  const router = useRouter()
  const [isModalVisible, setIsModalVisible] = useState(false)

  const closeAlert = () => {
    router.replace(ROUTES.relocationMarketplace.calcUrl({}), undefined, {
      shallow: true,
    })
  }

  const { data: relocationProjectData } = useQuery(QUERY_RELOCATION_PROJECT)

  return (
    <>
      <ScreenMeta />
      <AreaLayout isFixedDesktopHeader>
        <Container>
          <RelocationSearchHeader
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
          />
          {!relocationProjectData?.relocationProject && isMobile && (
            <RelocationProjectButton />
          )}
          <HeaderOverlay withOverlay={isModalVisible}>
            <Services />
            <HowItWorks />
            <WhyUseNicity />
            <DownloadAppBanner />
            {!isMobile && <Copyright />}
          </HeaderOverlay>
        </Container>
      </AreaLayout>
      {serviceNameCompleted && (
        <Alert
          isVisible
          title={'Thank you!'}
          subtitle={'Your request has been send. We will contact you soon'}
          buttonText={'See all services'}
          onClick={closeAlert}
          onRequestClose={closeAlert}
        />
      )}
    </>
  )
}

const Container = styled.div`
  ${mobileMedia} {
    padding-bottom: ${(NAVIGATION_BAR_HEIGHT + 44) / 10}rem;
  }
`

const RelocationProjectButton = styled(RelocationProjectButtonBase)`
  margin: 0 1.6rem 3.2rem;
`

const RelocationSearchHeader = styled(RelocationSearchHeaderBase)`
  ${mobileMedia} {
    margin-bottom: 2.4rem;
  }
`

const HeaderOverlay = styled(HeaderOverlayBase)`
  ${notMobileMedia} {
    padding-top: 3.6rem;
    padding-bottom: 3.6rem;
  }
`
const Services = styled(ServicesBase)`
  ${notMobileMedia} {
    margin-bottom: 10.8rem;
  }

  ${mobileMedia} {
    margin-bottom: 3.6rem;
  }
`
const HowItWorks = styled(HowItWorksBase)`
  ${notMobileMedia} {
    margin-bottom: 10.8rem;
  }

  ${mobileMedia} {
    margin-bottom: 3.6rem;
  }
`
const WhyUseNicity = styled(WhyUseNicityBase)`
  ${notMobileMedia} {
    margin-bottom: 3.6rem;
  }
  ${mobileMedia} {
    margin-bottom: 4rem;
  }
`
const DownloadAppBanner = styled(DownloadAppBannerBase)`
  ${notMobileMedia} {
    margin-bottom: 3.6rem;
  }
`
