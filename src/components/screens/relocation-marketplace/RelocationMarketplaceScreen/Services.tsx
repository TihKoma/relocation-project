import { FC } from 'react'
import styled from '@emotion/styled'

import {
  RelocationGuidePreview,
  RelocationServicePreview,
} from '@/components/shared/relocation-marketplace'
import { PersonalRelocationProjectPreview } from '@/components/shared/relocation-marketplace/PersonalRelocationProjectPreview'
import { useIsNotMobileDevice } from '@/modules/device'
import {
  RELOCATION_MARKETPLACE_SERVICES,
  RelocationMarketplaceServiceGroupName,
} from '@/modules/relocation-marketplace'
import { ROUTES } from '@/modules/router'
import { mobileMedia, notMobileMedia } from '@/styles/media'

import { SectionTitle as SectionTitleBase } from './shared'

type Props = {
  className?: string
}
export const Services: FC<Props> = ({ className }) => {
  const isDesktop = useIsNotMobileDevice()

  return (
    <Container className={className}>
      <SectionTitle>Nicity relocation tools</SectionTitle>
      <Grid>
        {isDesktop && <PersonalRelocationProjectPreview />}
        <RelocationGuidePreview />
        {Object.entries(RELOCATION_MARKETPLACE_SERVICES).map(
          ([
            serviceGroupName,
            { title, imageDesktopSrc, imageMobileSrc, isNew },
          ]) => {
            return (
              <RelocationServicePreview
                key={serviceGroupName}
                title={title}
                imageSrc={isDesktop ? imageDesktopSrc : imageMobileSrc}
                isNew={isNew}
                url={ROUTES.relocationMarketplaceServiceGroup.calcUrl({
                  serviceGroupName:
                    serviceGroupName as RelocationMarketplaceServiceGroupName,
                })}
              />
            )
          },
        )}
      </Grid>
    </Container>
  )
}

const Container = styled.div`
  ${notMobileMedia} {
    max-width: 144rem;
    margin: auto;
    padding: 0 2.4rem;
  }

  ${mobileMedia} {
    padding: 0 1.6rem;
  }
`
const SectionTitle = styled(SectionTitleBase)`
  margin-bottom: 2.4rem;
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
    column-gap: 1.6rem;
    grid-template-columns: repeat(2, 1fr);
  }
`
