import { FC, useState } from 'react'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'

import { AreaLayout } from '@/components/shared/AreaLayout'
import { RelocationServicePreview } from '@/components/shared/relocation-marketplace'
import {
  HeaderOverlay as HeaderOverlayBase,
  RelocationSearchHeader,
} from '@/components/shared/relocation-marketplace/RelocationSearchHeader'
import { ArrowLeftIcon } from '@/images'
import { useIsMobileDevice } from '@/modules/device'
import {
  RELOCATION_MARKETPLACE_SERVICES,
  RelocationMarketplaceServiceGroupName,
} from '@/modules/relocation-marketplace'
import { ROUTES } from '@/modules/router'
import { mobileMedia, notMobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

import { ScreenMeta } from './ScreenMeta'

type Props = {
  serviceGroupName: RelocationMarketplaceServiceGroupName
}
export const RelocationMarketplaceGroupScreen: FC<Props> = ({
  serviceGroupName,
}) => {
  const router = useRouter()
  const isMobile = useIsMobileDevice()
  const [isModalVisible, setIsModalVisible] = useState(false)

  return (
    <>
      <ScreenMeta
        serviceGroupTitle={
          RELOCATION_MARKETPLACE_SERVICES[serviceGroupName]?.title || ''
        }
      />
      <AreaLayout isFixedDesktopHeader>
        {isMobile ? (
          <MobileHeader>
            <ArrowIcon
              onClick={() => {
                router.push(ROUTES.relocationMarketplace.calcUrl({}))
              }}
            />
            <Title>
              {RELOCATION_MARKETPLACE_SERVICES[serviceGroupName]?.title}
            </Title>
          </MobileHeader>
        ) : (
          <RelocationSearchHeader
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
          />
        )}
        <HeaderOverlay withOverlay={isModalVisible && !isMobile}>
          <Content>
            {!isMobile && (
              <Title>
                {RELOCATION_MARKETPLACE_SERVICES[serviceGroupName]?.title}
              </Title>
            )}
            <Grid>
              {RELOCATION_MARKETPLACE_SERVICES[serviceGroupName].services.map(
                ({
                  serviceName,
                  title,
                  url,
                  imageMobileSrc,
                  imageDesktopSrc,
                  isNew,
                }) => {
                  return (
                    <RelocationServicePreview
                      key={serviceName}
                      url={url}
                      title={title}
                      imageSrc={isMobile ? imageMobileSrc : imageDesktopSrc}
                      isNew={isNew}
                    />
                  )
                },
              )}
            </Grid>
          </Content>
        </HeaderOverlay>
      </AreaLayout>
    </>
  )
}

const MobileHeader = styled.div`
  margin-bottom: 2.4rem;
  padding: 1.6rem;

  display: flex;

  ${mobileMedia} {
    box-shadow: 0px -2px 12px rgba(18, 21, 31, 0.02),
      0px -8px 32px rgba(18, 21, 31, 0.12);
  }
`
const Content = styled.div`
  ${notMobileMedia} {
    max-width: 144rem;
    margin: auto;
  }
`
const ArrowIcon = styled(ArrowLeftIcon)`
  margin-right: 3.6rem;

  cursor: pointer;
`
const Title = styled.h2`
  margin: 0;

  font-weight: 500;
  font-feature-settings: 'liga' off;
  color: ${getColorTheme('textDefaultPrimary')};

  ${notMobileMedia} {
    margin-bottom: 2.4rem;

    font-size: 2.8rem;
    line-height: 3.6rem;
  }

  ${mobileMedia} {
    font-size: 1.8rem;
    line-height: 2.4rem;
    text-align: center;
  }
`
const Grid = styled.div`
  display: grid;
  row-gap: 3.6rem;
  justify-items: center;

  ${notMobileMedia} {
    column-gap: 2.4rem;
    grid-template-columns: repeat(3, 1fr);
  }

  ${mobileMedia} {
    padding: 0 1.6rem 7rem;

    column-gap: 1.6rem;
    grid-template-columns: repeat(2, 1fr);
  }
`
const HeaderOverlay = styled(HeaderOverlayBase)<{ withOverlay: boolean }>`
  ${notMobileMedia} {
    padding: 3.6rem 3.2rem;

    ${(props) => (props.withOverlay ? 'height: 100%;' : '')}
  }
`
