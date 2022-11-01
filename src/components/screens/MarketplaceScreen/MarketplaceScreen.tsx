import { FC } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'

import { MarketplaceMeta } from '@/components/screens/MarketplaceScreen/MarketplaceMeta'
import { AreaLayout } from '@/components/shared/AreaLayout'
import { DiscoveryMPMap } from '@/components/shared/maps/DiscoveryMPMap'
import { useIsMobileDevice } from '@/modules/device'
import { QUERY_GET_REGION_BY_SLUG } from '@/modules/map'
import { ListingsBboxContextProvider } from '@/modules/marketplace'
import { ROUTES } from '@/modules/router'
import { mobileMedia, notMobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

import { ListingList } from './ListingList'
import { QuickFiltersPanel } from './QuickFiltersPanel'
import { Tutorial } from './Tutorial'

export const MarketplaceScreen: FC = () => {
  const router = useRouter()
  const areaSlug = router.query.regionSlug as string
  const quizId = router.query.quizId as string

  const isMobile = useIsMobileDevice()

  const { data: areaData } = useQuery(QUERY_GET_REGION_BY_SLUG, {
    ssr: true,
    skip: !areaSlug,
    variables: { slug: areaSlug || '' },
  })

  const areaTitle = areaData?.getRegionBySlug?.name || ''
  const regionId = areaData?.getRegionBySlug?.id || ''

  const onBack = () => {
    const isNewPage = window.history.state.idx === 0

    if (isNewPage) {
      router.push(
        ROUTES.area.calcUrl({
          regionSlug: areaSlug,
        }),
      )
    } else {
      router.back()
    }
  }

  return (
    <ListingsBboxContextProvider>
      <AreaLayout
        map={() => <DiscoveryMPMap areaSlug={areaSlug} />}
        subHeaderTitle={`${areaTitle} Real Estate`}
        onRequestBack={onBack}
        withSubNavigation={false}
        theme={isMobile ? 'light' : 'dark'}
      >
        <Tutorial />
        <MarketplaceMeta areaTitle={areaTitle} />
        <CustomQuickFiltersPanel regionId={regionId} />
        <Container>
          <HiddenTitle>Find a new home in {areaTitle}</HiddenTitle>
          <ListingList quizId={quizId} />
        </Container>
      </AreaLayout>
    </ListingsBboxContextProvider>
  )
}

const Container = styled.div`
  position: relative;

  height: 100%;
  padding: 0;

  border-radius: 1.2rem;

  ${notMobileMedia} {
    background-color: ${getColorTheme('moon')};
  }

  ${mobileMedia} {
    padding-top: 1.6rem;

    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
`

const CustomQuickFiltersPanel = styled(QuickFiltersPanel)`
  ${notMobileMedia} {
    padding-top: 1.6rem;
  }

  ${mobileMedia} {
    position: sticky;
    top: 0;
  }
`
const HiddenTitle = styled.h1`
  position: absolute;
  opacity: 0;
  pointer-events: none;
`
