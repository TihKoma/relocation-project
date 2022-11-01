import { forwardRef, useMemo, useRef } from 'react'
import Link from 'next/link'
import styled from '@emotion/styled'
import { FloatingPortal, Strategy } from '@floating-ui/react-dom-interactions'
import { useClickAway } from 'react-use'

import { ModalPortal } from '@/components/ui-kit/Modal'
import { ArrowDownIcon, CrossIcon } from '@/images'
import { useIsMobileDevice } from '@/modules/device'
import {
  RELOCATION_MARKETPLACE_SERVICES,
  RelocationMarketplaceServiceGroupName,
} from '@/modules/relocation-marketplace'
import { ROUTES } from '@/modules/router'
import { mobileMedia, notMobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

type Props = {
  onRequestClose: () => void
  style?: {
    position: Strategy
    top: string | number
    left: string | number
    width: string
    maxWidth: string
  }
}
export const SearchServicesModal = forwardRef<HTMLDivElement, Props>(
  ({ onRequestClose, style }, ref) => {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const isMobile = useIsMobileDevice()

    useClickAway(containerRef, () => {
      onRequestClose()
    })

    const services = useMemo(() => {
      if (isMobile) {
        return [Object.entries(RELOCATION_MARKETPLACE_SERVICES)]
      } else {
        const allServices = Object.entries(RELOCATION_MARKETPLACE_SERVICES)
        return [
          allServices.slice(0, 3),
          allServices.slice(3, 6),
          allServices.slice(6),
        ]
      }
    }, [isMobile])

    const content = (
      <Grid ref={containerRef}>
        {services.map((row, index) => {
          return (
            <Row key={index}>
              {row.map(([serviceGroupName, serviceGroup]) => (
                <Group key={serviceGroupName}>
                  <Link
                    href={ROUTES.relocationMarketplaceServiceGroup.calcUrl({
                      serviceGroupName:
                        serviceGroupName as RelocationMarketplaceServiceGroupName,
                    })}
                  >
                    <a>
                      <GroupTitle onClick={onRequestClose}>
                        {serviceGroup.title}
                      </GroupTitle>
                    </a>
                  </Link>
                  <ServicesList>
                    {serviceGroup.services.map((service) => (
                      <Link
                        href={service.url}
                        passHref
                        key={service.serviceName}
                      >
                        <ServiceItem onClick={onRequestClose}>
                          <ServiceTitle>{service.title}</ServiceTitle>
                          {isMobile && <ArrowIcon />}
                        </ServiceItem>
                      </Link>
                    ))}
                  </ServicesList>
                </Group>
              ))}
            </Row>
          )
        })}
      </Grid>
    )

    return isMobile ? (
      <ModalPortal isVisible onRequestClose={onRequestClose}>
        <Container>
          <MobileHeader>
            <HeaderTitle>Services</HeaderTitle>
            <CrossIcon onClick={onRequestClose} />
          </MobileHeader>
          {content}
        </Container>
      </ModalPortal>
    ) : (
      <FloatingPortal>
        <Container ref={ref} style={style}>
          {content}
        </Container>
      </FloatingPortal>
    )
  },
)

const Container = styled.div`
  ${notMobileMedia} {
    z-index: 100;

    box-shadow: 0px 2px 12px rgba(18, 21, 31, 0.02),
      0px 8px 32px rgba(18, 21, 31, 0.12);
    border-radius: 1.6rem;
  }

  ${mobileMedia} {
    height: 100%;
    width: 100%;

    overflow-y: auto;
  }

  background: ${getColorTheme('backgroundDefaultPrimary')};
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
const Grid = styled.div`
  ${notMobileMedia} {
    padding: 1.6rem 3.2rem;
  }

  ${mobileMedia} {
    padding: 2.4rem 1.6rem 2.8rem;
  }
`
const Row = styled.div`
  ${notMobileMedia} {
    padding-top: 1.6rem;
    padding-bottom: 2.1rem;

    display: grid;
    grid-template-columns: repeat(3, 1fr);

    :not(:last-child) {
      border-bottom: 1px solid ${getColorTheme('dividerPrimary')};
    }
  }
`
const ArrowIcon = styled(ArrowDownIcon)`
  transform: rotate(-90deg);

  & > path {
    fill: ${getColorTheme('iconSecondary')};
  }
`
const Group = styled.div`
  ${mobileMedia} {
    :not(:last-child) {
      margin-bottom: 2.4rem;
    }
  }
`
const GroupTitle = styled.div`
  font-weight: 500;
  font-size: 1.8rem;
  line-height: 2.4rem;
  font-feature-settings: 'liga' off;
  color: ${getColorTheme('textDefaultPrimary')};

  ${notMobileMedia} {
    margin-bottom: 1.7rem;
  }

  ${mobileMedia} {
    margin-bottom: 0.8rem;
  }
`
const ServicesList = styled.div``
const ServiceItem = styled.a`
  ${notMobileMedia} {
    display: block;

    :not(:last-child) {
      margin-bottom: 1.4rem;
    }
  }

  ${mobileMedia} {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 0.8rem 1.2rem 0.8rem 0;

    border-bottom: 1px solid ${getColorTheme('dividerPrimary')};
  }
`
const ServiceTitle = styled.div`
  font-style: normal;
  font-weight: 400;
  line-height: 2rem;
  font-feature-settings: 'liga' off;
  color: ${getColorTheme('textDefaultPrimary')};

  ${notMobileMedia} {
    font-size: 1.6rem;
  }

  ${mobileMedia} {
    font-size: 1.4rem;
  }
`
