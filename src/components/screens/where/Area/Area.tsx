import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'

import { SMALL_HEADER_SIZE } from '@/components/screens/Group/Header'
import { AreaLayout, RegionHeader } from '@/components/shared/AreaLayout'
import { AreaMap } from '@/components/shared/maps/AreaMap'
import { QUERY_GET_REGION_BY_SLUG } from '@/modules/map'
import { ROUTES } from '@/modules/router'
import { useSurvey } from '@/modules/survey/SurveyContext'
import { mobileMedia } from '@/styles/media'

import { Feed } from './Feed'
import { RealEstateFeed } from './RealEstateFeed'
import { SeoMetaTags } from './SeoMetaTags'
import { Where as WhereBase } from './Where'

const SURVEY_DELAY_TIME = 10000

export const Area = () => {
  const router = useRouter()
  const regionSlug = router.query.regionSlug as string
  const quizId = router.query.quizId as string | undefined
  const { data: { getRegionBySlug: region } = {} } = useQuery(
    QUERY_GET_REGION_BY_SLUG,
    {
      variables: { slug: regionSlug },
      ssr: true,
    },
  )
  const onRequestBack = quizId
    ? () => router.push(ROUTES.whereResult.calcUrl({ id: quizId }))
    : undefined

  const { isReadyForSurvey, setIsReadyForSurvey } = useSurvey()

  useEffect(() => {
    setTimeout(() => {
      setIsReadyForSurvey(true)
    }, SURVEY_DELAY_TIME)
  }, [isReadyForSurvey, setIsReadyForSurvey])

  return (
    <>
      {region && <SeoMetaTags region={region} />}
      <AreaLayout
        isShowBackButtonDesktop={false}
        onRequestBack={onRequestBack}
        withSubNavigation
        map={() => (
          <Map
            regionSlug={regionSlug}
            hrefOnClickByRegion={(newRegionSlug) =>
              ROUTES.areaWhere.calcUrl({
                regionSlug: newRegionSlug,
                quizId,
              })
            }
          />
        )}
      >
        {region && (
          <Container>
            <RegionHeader
              region={region}
              regionSlug={regionSlug}
              onRequestBack={onRequestBack}
            />
            <Where region={region} quizId={quizId} />
            <RealEstateFeed
              regionSlug={regionSlug}
              regionId={region.id}
              quizId={quizId}
            />
            <Feed regionId={region.id} regionName={region.name} />
          </Container>
        )}
      </AreaLayout>
    </>
  )
}

const Container = styled.div`
  margin-top: -${SMALL_HEADER_SIZE};

  position: relative;

  ${mobileMedia} {
    margin-top: 0;
  }
`

const Where = styled(WhereBase)`
  margin-bottom: 3.2rem;

  ${mobileMedia} {
    margin-bottom: 3.4rem;
  }
`
const Map = styled(AreaMap)`
  position: initial;
`
