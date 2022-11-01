import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'

import { SMALL_HEADER_SIZE } from '@/components/screens/Group/Header'
import { AreaLayout } from '@/components/shared/AreaLayout'
import { RegionHeader } from '@/components/shared/AreaLayout'
import { AreaMap } from '@/components/shared/maps/AreaMap'
import { useCookieController } from '@/modules/cookie'
import { useIsNotMobileDevice } from '@/modules/device'
import { QUERY_GET_REGION_BY_SLUG } from '@/modules/map'
import { mobileMedia, notMobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

import { Feed } from './Feed'
import { Groups } from './Groups'
import { RealEstate } from './RealEstate'
import { SeoMetaTags } from './SeoMetaTags'
import { Where as WhereBase } from './Where'

export const Area = () => {
  const router = useRouter()
  const regionSlug = router.query.regionSlug as string
  const isNotMobile = useIsNotMobileDevice()
  const quizId = router.query.quizId as string | undefined
  const { data: { getRegionBySlug: region } = {} } = useQuery(
    QUERY_GET_REGION_BY_SLUG,
    {
      variables: { slug: regionSlug },
      ssr: true,
    },
  )
  useLastDiscoveryArea(regionSlug)

  return (
    <>
      {region && <SeoMetaTags region={region} />}
      <AreaLayout
        map={() => <AreaMap regionSlug={regionSlug} />}
        withSubNavigation
      >
        {region && (
          <Container>
            <RegionHeader region={region} regionSlug={regionSlug} />
            <Where
              regionId={region.id}
              quizId={quizId}
              regionSlug={regionSlug}
            />
            <Wrapper>
              {isNotMobile && (
                <RealEstate regionSlug={regionSlug} regionId={region.id} />
              )}
              <Groups regionSlug={regionSlug} regionId={region.id} />
            </Wrapper>
            <Feed
              regionId={region.id}
              regionSlug={regionSlug}
              regionName={region.name}
            />
          </Container>
        )}
      </AreaLayout>
    </>
  )
}

const useLastDiscoveryArea = (slug: string) => {
  const cookieController = useCookieController()
  useEffect(() => {
    if (slug) {
      cookieController.set('last_discovery_region_slug', slug)
    }
  }, [slug, cookieController])
}

const Container = styled.div`
  margin-top: -${SMALL_HEADER_SIZE};

  position: relative;

  ${mobileMedia} {
    margin-top: 0;
  }
`

const Where = styled(WhereBase)`
  ${notMobileMedia} {
    margin: 0 1.6rem 0.8rem;
  }
  ${mobileMedia} {
    border-bottom: none;
  }
`
const Wrapper = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: 0.8rem;
  grid-auto-columns: minmax(0, 1fr);

  ${notMobileMedia} {
    margin: 0 1.6rem 2.4rem;
  }
  ${mobileMedia} {
    margin-bottom: 0.4rem;
    &:empty {
      margin-bottom: 0;
    }
    &:not(:empty) {
      border-top: 0.1rem solid ${getColorTheme('sun50')};
    }
  }
`
