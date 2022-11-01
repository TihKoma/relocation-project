import { FC } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'
import capitalize from 'lodash/capitalize'

import { MedianCommuteTimeChart } from '@/components/screens/where/Area/drillDown/charts/MedianCommuteTimeChart'
import { TransportationDonutChart } from '@/components/screens/where/Area/drillDown/charts/TransportationDonutChart'
import { TransportationGroupedBarChart } from '@/components/screens/where/Area/drillDown/charts/TransportationGroupedBarChart'
import { ChartContainer } from '@/components/screens/where/Area/drillDown/styles'
import { TitleWithTooltip } from '@/components/screens/where/Area/drillDown/TitleWithTooltip'
import { Proximity } from '@/components/screens/where/Area/drillDown/Transportation/Proximity'
import { QUERY_GET_DRILL_DOWNS } from '@/modules/drilldown'
import { GetDrillDowns_getDrillDowns_DrillDownPublicTransportationLocation } from '@/modules/drilldown/graphql/__generated__/GetDrillDowns'
import { mobileMedia } from '@/styles/media'

import {
  DrillDownGrade,
  DrillDownType,
} from '../../../../../../../__generated__/globalTypes'
import { ChartsWrapper } from '../ChartsWrapper'
import { ScoreWithEmoji } from '../ScoreWithEmoji'

type Props = {}
export const TransportAndProximity: FC<Props> = () => {
  const router = useRouter()
  const { regionSlug } = router.query

  const { data } = useQuery(QUERY_GET_DRILL_DOWNS, {
    skip: !regionSlug || typeof regionSlug !== 'string',
    variables: {
      input: {
        locationSlug: regionSlug as string,
        drillDownType: DrillDownType.PUBLIC_TRANSPORTATION,
      },
    },
    ssr: false,
  })

  const drillDowns = (data?.getDrillDowns ??
    []) as GetDrillDowns_getDrillDowns_DrillDownPublicTransportationLocation[]
  const dataOfCurrentRegion = drillDowns.find(
    (item) => item?.locationSlug === regionSlug,
  ) as GetDrillDowns_getDrillDowns_DrillDownPublicTransportationLocation

  const transportationGrade =
    dataOfCurrentRegion?.transportationGrade as DrillDownGrade
  const proximityGrade = dataOfCurrentRegion?.proximityGrade as DrillDownGrade

  const proximityPoints = dataOfCurrentRegion?.proximityPoints

  return (
    <Container>
      {proximityPoints && proximityPoints.length > 0 && (
        <>
          <TitleWithTooltip
            title={'Proximity'}
            tooltipText={
              <span>
                The score for how close landmarks, desirable infrastructure or
                work is to the neighborhood proposed by the Where engine is
                based on the estimated travel time from a neighborhood to up to
                four designated locations that you have added. Travel times are
                estimated for transit by car and do not take traffic into
                account.
              </span>
            }
          />
          {proximityGrade ? (
            <ScoreWithEmoji
              grade={proximityGrade}
              title={`${capitalize(proximityGrade)} proximity`}
              subtitle={dataOfCurrentRegion?.proximityGradeText ?? ''}
            />
          ) : null}
          <ProximityChartContainer>
            <SubTitle title={'Driving time to added landmarks'} />
            <Proximity />
          </ProximityChartContainer>
        </>
      )}
      <TitleWithTooltip
        title={'Public transport'}
        tooltipText={
          <span>
            The Public Transport score determines how well is the public
            transport is developed in an area. It is based on share of residents
            using public transit, median commute times and density of relevant
            infrastructure such as public transport lines and stops.
            <br />
            Data in Overview and Comparison represents % of workers using public
            transport for their commute (above 16 years old not working from
            home).
          </span>
        }
      />
      {transportationGrade ? (
        <ScoreWithEmoji
          grade={transportationGrade}
          title={`${capitalize(transportationGrade)} public transport`}
          subtitle={dataOfCurrentRegion?.transportationGradeText ?? ''}
        />
      ) : null}
      <ChartsWrapper
        tabs={[
          {
            name: 'Overview',
            type: 'overview',
            chart: <TransportationDonutChart />,
          },
          {
            name: 'Comparison',
            type: 'comparison',
            chart: <TransportationGroupedBarChart />,
          },
        ]}
      />
      <MedianCommuteTimeContainer>
        <SubTitle
          title={'Median commute time'}
          tooltipText={`Median travel time to work among workers above 16 years old not working from home.`}
        />
        <MedianCommuteTimeChart />
      </MedianCommuteTimeContainer>
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-auto-flow: row;
  gap: 1.6rem;
`

const ProximityChartContainer = styled(ChartContainer)`
  gap: 1.6rem;
`

const MedianCommuteTimeContainer = styled(ChartContainer)`
  width: 50%;

  ${mobileMedia} {
    width: 100%;
  }
`

const SubTitle = styled(TitleWithTooltip)`
  width: 100%;

  font-size: 1.8rem;
`
