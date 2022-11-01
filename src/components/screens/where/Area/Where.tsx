import { FC, useState } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'

import { TransportAndProximity } from '@/components/screens/where/Area/drillDown/Transportation'
import { Gallery } from '@/components/shared/Gallery'
import { RegionScores } from '@/components/shared/RegionScores'
import { TextCollapse } from '@/components/ui-kit/TextCollapse'
import {
  DemographicsIcon,
  DescriptionIcon,
  HousePricingIcon,
  MediaIcon,
  ScoresIcon,
  TransportAndProximityIcon,
} from '@/images'
import { useAnalytics } from '@/modules/analytics'
import { DrillDownType, QUERY_GET_DRILL_DOWNS } from '@/modules/drilldown'
import {
  GetDrillDowns_getDrillDowns_DrillDownDiversityLocation,
  GetDrillDowns_getDrillDowns_DrillDownHousingLocation,
  GetDrillDowns_getDrillDowns_DrillDownPublicTransportationLocation,
  GetDrillDowns_getDrillDowns_DrillDownSocialLifeLocation,
} from '@/modules/drilldown/graphql/__generated__/GetDrillDowns'
import { QUERY_GET_DRILL_DOWN_MEDIAN_PRICE } from '@/modules/drilldown/graphql/queries'
import { Region } from '@/modules/map'
import { QUERY_QUIZ_RESULT_REGION } from '@/modules/neighbourhood'
import { HOVER_TRANSITION_TIME } from '@/styles/const'
import { mobileMedia, notMobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

import { Demographics } from './drillDown/Demographics'
import { Housing } from './drillDown/Housing'

export type TabType =
  | 'scores'
  | 'gallery'
  | 'description'
  | 'demographics'
  | 'transportation'
  | 'housing'
type Props = { region: Region; quizId?: string; className?: string }
export const Where: FC<Props> = ({ region, quizId, ...props }) => {
  const [tab, setTab] = useState<
    | 'scores'
    | 'gallery'
    | 'description'
    | 'demographics'
    | 'transportation'
    | 'housing'
  >('scores')
  const analytics = useAnalytics()
  const { data } = useQuery(QUERY_QUIZ_RESULT_REGION, {
    variables: { regionId: region.id, quizId },
  })

  const router = useRouter()
  const { regionSlug } = router.query
  const { data: diversityResponse } = useQuery(QUERY_GET_DRILL_DOWNS, {
    skip: !regionSlug || typeof regionSlug !== 'string',
    variables: {
      input: {
        locationSlug: regionSlug as string,
        drillDownType: DrillDownType.DIVERSITY,
      },
    },
  })
  const { data: socialLifeResponse } = useQuery(QUERY_GET_DRILL_DOWNS, {
    skip: !regionSlug || typeof regionSlug !== 'string',
    variables: {
      input: {
        locationSlug: regionSlug as string,
        drillDownType: DrillDownType.SOCIAL_LIFE,
      },
    },
  })
  const { data: transportationResponse } = useQuery(QUERY_GET_DRILL_DOWNS, {
    skip: !regionSlug || typeof regionSlug !== 'string',
    variables: {
      input: {
        locationSlug: regionSlug as string,
        drillDownType: DrillDownType.PUBLIC_TRANSPORTATION,
      },
    },
  })
  const { data: housingResponse } = useQuery(QUERY_GET_DRILL_DOWNS, {
    skip: !regionSlug || typeof regionSlug !== 'string',
    variables: {
      input: {
        locationSlug: regionSlug as string,
        drillDownType: DrillDownType.HOUSING,
      },
    },
  })
  const { data: medianPriceData } = useQuery(
    QUERY_GET_DRILL_DOWN_MEDIAN_PRICE,
    {
      variables: {
        input: {
          locationSlug: typeof regionSlug === 'string' ? regionSlug : '',
        },
      },
    },
  )

  const diversityData = (diversityResponse?.getDrillDowns ??
    []) as GetDrillDowns_getDrillDowns_DrillDownDiversityLocation[]
  const socialLifeData = (socialLifeResponse?.getDrillDowns ??
    []) as GetDrillDowns_getDrillDowns_DrillDownSocialLifeLocation[]
  const transportationData = (transportationResponse?.getDrillDowns ??
    []) as GetDrillDowns_getDrillDowns_DrillDownPublicTransportationLocation[]
  const housingData = (housingResponse?.getDrillDowns ??
    []) as GetDrillDowns_getDrillDowns_DrillDownHousingLocation[]

  const currentNeighborhoodDiversity = diversityData.find(
    (item) => item?.locationSlug === regionSlug,
  )
  const currentNeighborhoodSocialLife = socialLifeData.find(
    (item) => item?.locationSlug === regionSlug,
  )
  const currentNeighborhoodTransportation = transportationData.find(
    (item) => item?.locationSlug === regionSlug,
  )
  const currentNeighborhoodHousing = housingData.find(
    (item) => item?.locationSlug === regionSlug,
  )

  const showDemographicsTab =
    currentNeighborhoodDiversity?.data?.length ||
    currentNeighborhoodSocialLife?.data?.length
  const showTransportationTab = currentNeighborhoodTransportation?.data?.length
  const showHousingTab =
    currentNeighborhoodHousing?.rentAndBuyData?.length ||
    currentNeighborhoodHousing?.buildingsData?.length ||
    medianPriceData?.getDrillDownMedianPrice?.data?.length

  const score = data?.quizResultForRegion.location.score ?? 0
  if (!(score !== 0 || region.media.length > 0 || region.description)) {
    return null
  }
  const onClickSeeMore = (tab: TabType) => {
    setTab(tab)
  }

  return (
    <Container {...props}>
      <Title>About</Title>
      {/*  TODO: probably move ui-kit. question to Artur */}
      <Tabs>
        {score !== 0 && (
          <Tab
            onClick={() => {
              setTab('scores')
              analytics.areaPageAboutTabClick('match_scores')
            }}
            isActive={tab === 'scores'}
          >
            <ScoresIcon />
            Match scores
          </Tab>
        )}
        {region.media.length > 0 && (
          <Tab
            onClick={() => {
              setTab('gallery')
              analytics.areaPageAboutTabClick('photo_and_video')
            }}
            isActive={tab === 'gallery'}
          >
            <MediaIcon />
            Photo and video
          </Tab>
        )}
        {region.description && (
          <Tab
            onClick={() => {
              setTab('description')
              analytics.areaPageAboutTabClick('description')
            }}
            isActive={tab === 'description'}
          >
            <DescriptionIcon />
            Description
          </Tab>
        )}
        {showDemographicsTab ? (
          <Tab
            onClick={() => {
              setTab('demographics')
              analytics.areaPageAboutTabClick('demographics')
            }}
            isActive={tab === 'demographics'}
          >
            <DemographicsIcon />
            Demographics
          </Tab>
        ) : null}
        {showHousingTab ? (
          <Tab
            onClick={() => {
              setTab('housing')
              analytics.areaPageAboutTabClick('housing')
            }}
            isActive={tab === 'housing'}
          >
            <HousePricingIcon />
            Housing
          </Tab>
        ) : null}
        {showTransportationTab ? (
          <Tab
            onClick={() => {
              setTab('transportation')
              analytics.areaPageAboutTabClick('transportation')
            }}
            isActive={tab === 'transportation'}
          >
            <TransportAndProximityIcon />
            Transport & Proximity
          </Tab>
        ) : null}
      </Tabs>
      {tab === 'scores' && (
        <RegionScores
          regionId={region.id}
          quizId={quizId}
          onClickSeeMore={onClickSeeMore}
        />
      )}
      {tab === 'gallery' && <Gallery gallery={region.media} withSwiper />}
      {tab === 'description' && (
        <TextCollapse countRow={7}>{region.description}</TextCollapse>
      )}
      {tab === 'demographics' && <Demographics />}
      {tab === 'transportation' && <TransportAndProximity />}
      {tab === 'housing' && <Housing />}
    </Container>
  )
}

const Container = styled.div`
  padding: 1.6rem 1.6rem 0;

  ${mobileMedia} {
    padding-top: 0;
  }
  ${notMobileMedia} {
    border-top: 1px solid ${getColorTheme('sun50')};
  }
`
const Title = styled.div`
  margin-bottom: 2rem;

  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  letter-spacing: -0.04em;
  color: ${getColorTheme('sun1000')};

  ${mobileMedia} {
    margin-bottom: 1.6rem;
  }
`
const Tabs = styled.div`
  margin: 0 -1.6rem 1.6rem;
  padding: 0 1.6rem;

  display: flex;

  overflow-x: auto;
`
const activeTab = (props: any) => `
  border-bottom-color: ${getColorTheme('neptune600')(props)};

  color: ${getColorTheme('neptune600')(props)};

  svg {
    stroke: ${getColorTheme('neptune600')(props)};
    fill: ${getColorTheme('neptune600')(props)};
  }
  `
const Tab = styled.div<{ isActive: boolean }>`
  padding-bottom: 1.2rem;

  display: flex;
  align-items: center;

  border-bottom: 2px solid transparent;

  cursor: pointer;

  font-size: 14px;
  line-height: 20px;
  white-space: nowrap;

  transition: ${HOVER_TRANSITION_TIME};

  svg {
    margin-right: 0.6rem;
  }
  &:not(:last-child) {
    margin-right: 1.8rem;
  }
  &:hover {
    ${activeTab}
  }
  ${(props) => (props.isActive ? activeTab(props) : '')}
`
