import Link from 'next/link'
import styled from '@emotion/styled'

import RELOCATION_GUIDE_IMAGE_DESKTOP from '@/images/relocation-marketplace/relocation-guide-desktop.jpeg'
import { useAuthorizationStore } from '@/modules/authorization'
import { useIsMobileDevice } from '@/modules/device'
import { ROUTES } from '@/modules/router'
import { mobileMedia, notMobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

import { Item, Label, ServiceName } from '../shared'

export const RelocationGuidePreview = () => {
  const isMobile = useIsMobileDevice()
  const [{ isLoggedIn }] = useAuthorizationStore()

  return (
    <Link
      href={
        isLoggedIn
          ? ROUTES.guide.calcUrl()
          : 'https://lp.nicity.com/us-relocation-guide'
      }
      passHref
      key={'guide'}
    >
      <Item target={isLoggedIn ? '_self' : '_blank'}>
        <Card>
          <FreeLabel>Free</FreeLabel>
          <GuideItemTitle>
            Relocation
            <br />
            guide
          </GuideItemTitle>
        </Card>
        {isMobile ? (
          <ServiceName isInverted>See guide</ServiceName>
        ) : (
          <ServiceName>Get your free relocation guide</ServiceName>
        )}
      </Item>
    </Link>
  )
}

const FreeLabel = styled(Label)`
  background-color: ${getColorTheme('backgroundSuccess')};
`
const Card = styled.div`
  width: 100%;
  height: 100%;

  position: relative;

  background-color: ${getColorTheme('backgroundDefaultSecondary')};
  border-radius: 1.6rem;

  ${notMobileMedia} {
    background-image: url(${RELOCATION_GUIDE_IMAGE_DESKTOP.src});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }

  ${mobileMedia} {
    margin-bottom: 1.2rem;
  }
`
const GuideItemTitle = styled.div`
  position: absolute;
  bottom: 1.2rem;
  left: 1.2rem;

  font-style: normal;
  font-weight: 500;
  font-size: 1.4rem;
  line-height: 2rem;
  font-feature-settings: 'liga' off;
  color: ${getColorTheme('textDefaultPrimary')};

  ${notMobileMedia} {
    display: none;
  }
`
