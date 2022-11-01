import { FC } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'

import { DiversityDonutChart } from '@/components/screens/where/Area/drillDown/charts/DiversityDonutChart'
import { MedianCommuteTimeChart } from '@/components/screens/where/Area/drillDown/charts/MedianCommuteTimeChart'
import { MedianPriceScoresWithFilters } from '@/components/screens/where/Area/drillDown/charts/MedianPriceScores/MedianPriceScoresWithFilters'
import { RentBuyRatioDonutChart } from '@/components/screens/where/Area/drillDown/charts/RentBuyRatioDonutChart'
import { SocialLifeGroupedBarChart } from '@/components/screens/where/Area/drillDown/charts/SocialLifeGroupedBarChart'
import { Proximity } from '@/components/screens/where/Area/drillDown/Transportation/Proximity'
import { TabType } from '@/components/screens/where/Area/Where'
import { Button } from '@/components/ui-kit/Button'
import { DrillDownType, QUERY_GET_DRILL_DOWNS } from '@/modules/drilldown'
import { GetDrillDownMedianPrice_getDrillDownMedianPrice_data } from '@/modules/drilldown/graphql/__generated__/GetDrillDownMedianPrice'
import {
  GetDrillDowns_getDrillDowns_DrillDownDiversityLocation,
  GetDrillDowns_getDrillDowns_DrillDownHousingLocation,
  GetDrillDowns_getDrillDowns_DrillDownPublicTransportationLocation,
  GetDrillDowns_getDrillDowns_DrillDownSocialLifeLocation,
} from '@/modules/drilldown/graphql/__generated__/GetDrillDowns'
import { QUERY_GET_DRILL_DOWN_MEDIAN_PRICE } from '@/modules/drilldown/graphql/queries'
import { ROUTES } from '@/modules/router'
import { mobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

import { ProgressBar } from './ProgressBar'
import { Tooltip as TooltipBase } from './Tooltip'

export type FactorScoreModel = {
  name: string
  image: string
  score: number
}

type Props = {
  className?: string
  onClickSeeMore?: (value: TabType) => void
} & FactorScoreModel

export const FactorScore: FC<Props> = ({
  name,
  image,
  score,
  className,
  onClickSeeMore,
}) => {
  // TODO: remove after https://nicity.atlassian.net/browse/LA-1400 is complete
  const factorName = getFactorName(name)
  const value = getFactorValue(score)
  let chart
  let title
  let tabName: TabType

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
  const { data: medianPriceResponse } = useQuery(
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
  const medianPriceData = (medianPriceResponse?.getDrillDownMedianPrice.data ??
    []) as GetDrillDownMedianPrice_getDrillDownMedianPrice_data[]

  const currentNeighborhoodDiversity = diversityData.find(
    (item) => item?.locationSlug === regionSlug,
  )
  const currentNeighborhoodSocialLife = socialLifeData.find(
    (item) => item?.locationSlug === regionSlug,
  )
  const currentNeighborhoodTransportation = transportationData.find(
    (item) => item?.locationSlug === regionSlug,
  )
  const currentNeighborhoodMedianPrice = medianPriceData.find(
    (item) => item?.locationSlug === regionSlug,
  )
  const currentNeighborhoodHousing = housingData.find(
    (item) => item?.locationSlug === regionSlug,
  )
  const medianPriceFilters =
    medianPriceResponse?.getDrillDownMedianPrice.filters

  if (name === 'Diversity' && currentNeighborhoodDiversity?.data?.length) {
    chart = <DiversityDonutChart />
    title = 'Ethnic diversity'
    tabName = 'demographics'
  }
  if (name === 'Social Life' && currentNeighborhoodSocialLife?.data?.length) {
    chart = <SocialLifeGroupedBarChart />
    title = 'Social groups'
    tabName = 'demographics'
  }
  if (
    (name === 'Public Transit' || name === 'Public Transport') &&
    currentNeighborhoodTransportation?.data?.length
  ) {
    chart = <MedianCommuteTimeChart />
    title = 'Median commute time'
    tabName = 'transportation'
  }
  if (
    name === 'Proximity' &&
    currentNeighborhoodTransportation?.proximityPoints?.length
  ) {
    chart = <Proximity isModal />
    title = 'Driving time to added locations'
    tabName = 'transportation'
  }
  if (
    name === 'Affordability' &&
    currentNeighborhoodMedianPrice &&
    medianPriceFilters
  ) {
    chart = <MedianPriceScoresWithFilters />
    title = 'Median price'
    tabName = 'housing'
  }
  if (
    name === 'Availability' &&
    currentNeighborhoodHousing &&
    currentNeighborhoodHousing?.rentAndBuyData?.length
  ) {
    chart = <RentBuyRatioDonutChart />
    title = 'Rent and buy ratio'
    tabName = 'housing'
  }

  const isOnAreaWhere = ROUTES.areaWhere.as === router.pathname

  return (
    <Container className={className}>
      <Header>
        <Icon src={image} />
        {factorName}
        <Score>{value}</Score>
        {isOnAreaWhere && chart && title && (
          <Tooltip>
            <TooltipContent>
              <TooltipTitle>{title}</TooltipTitle>
              {chart}
              <Button
                size={'small'}
                viewType={'secondary'}
                onClick={() => onClickSeeMore?.(tabName)}
              >
                See all details
              </Button>
            </TooltipContent>
          </Tooltip>
        )}
      </Header>
      <ProgressBar percent={score} />
    </Container>
  )
}

const getFactorName = (name: string) => {
  switch (name) {
    case 'Value for Money':
      return 'Affordability'
    case 'Public Transport':
      return 'Public Transit'
    default:
      return name
  }
}

const getFactorValue = (percent: number) => {
  if (percent <= 20) {
    return 'Bad'
  }
  if (percent <= 40) {
    return 'Poor'
  }
  if (percent <= 60) {
    return 'Average'
  }
  if (percent <= 80) {
    return 'Good'
  }
  return 'Outstanding'
}
const Container = styled.div``
const Header = styled.div`
  margin-bottom: 0.6rem;

  display: flex;
  align-items: center;

  font-weight: 500;
  font-size: 1.6rem;
  line-height: 2.4rem;
  color: ${getColorTheme('sun1000')};
`
const Score = styled.div`
  margin-left: auto;
  font-weight: 400;
`
const Icon = styled.img`
  margin-right: 1rem;
`
const Tooltip = styled(TooltipBase)`
  margin-left: 0.4rem;
`
const TooltipContent = styled.div`
  width: 31.8rem;

  display: grid;
  grid-auto-flow: row;
  gap: 1.6rem;

  ${mobileMedia} {
    width: 100%;
  }
`
const TooltipTitle = styled.div`
  font-weight: 500;
  color: ${getColorTheme('sun')};
  font-size: 1.8rem;

  ${mobileMedia} {
    text-align: center;
  }
`
