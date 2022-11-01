import { FC } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'
import capitalize from 'lodash/capitalize'

import { TitleWithTooltip as TitleWithTooltipBase } from '@/components/screens/where/Area/drillDown/TitleWithTooltip'
import { DrillDownType, QUERY_GET_DRILL_DOWNS } from '@/modules/drilldown'
import { GetDrillDowns_getDrillDowns_DrillDownHousingLocation } from '@/modules/drilldown/graphql/__generated__/GetDrillDowns'
import { QUERY_GET_DRILL_DOWN_MEDIAN_PRICE } from '@/modules/drilldown/graphql/queries'

import { BuildingRatioDonutChart } from '../charts/BuildingRatioDonutChart'
import { MedianPriceScoresWithSelectors } from '../charts/MedianPriceScores/MedianPriceScoresWithSelectors'
import { RentBuyRatioDonutChart } from '../charts/RentBuyRatioDonutChart'
import { ScoreWithEmoji } from '../ScoreWithEmoji'
import {
  BREAKPOINT_TO_SWITCH_INTO_DESKTOP_VIEW,
  ChartContainer as ChartContainerBase,
} from '../styles'

type Props = {}
export const Housing: FC<Props> = () => {
  const router = useRouter()
  const { regionSlug } = router.query

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

  const housingData = (housingResponse?.getDrillDowns ??
    []) as GetDrillDowns_getDrillDowns_DrillDownHousingLocation[]

  const currentNeighborhoodHousing = housingData.find(
    (item) => item?.locationSlug === regionSlug,
  )

  return (
    <Container>
      <TitleWithTooltipBase title={'Affordability & availability'} />
      <ScoresWithEmojiWrapper>
        {currentNeighborhoodHousing?.availabilityGrade && (
          <ScoreWithEmoji
            title={`${capitalize(
              currentNeighborhoodHousing.availabilityGrade,
            )} availability`}
            subtitle={currentNeighborhoodHousing.availabilityGradeText ?? ''}
            grade={currentNeighborhoodHousing.availabilityGrade}
          />
        )}
        {currentNeighborhoodHousing?.valueForMoneyGrade && (
          <ScoreWithEmoji
            title={`${capitalize(
              currentNeighborhoodHousing.valueForMoneyGrade,
            )} affordability`}
            subtitle={
              currentNeighborhoodHousing.valueForMoneyGradeGradeText ?? ''
            }
            grade={currentNeighborhoodHousing.valueForMoneyGrade}
          />
        )}
      </ScoresWithEmojiWrapper>
      {medianPriceData?.getDrillDownMedianPrice?.data?.length ? (
        <MedianPriceScoresWithSelectors />
      ) : null}
      <ChartsWrapper>
        {currentNeighborhoodHousing?.buildingsData?.length ? (
          <ChartContainerBase>
            <TitleWithTooltipSmall
              title={'Type of building ratio'}
              tooltipText={
                'Breakdown of building types in the area based on available listings. Areas with higher number of building types relevant to you get a higher availability score.'
              }
            />
            <BuildingRatioDonutChart />
          </ChartContainerBase>
        ) : null}
        {currentNeighborhoodHousing?.rentAndBuyData?.length ? (
          <ChartContainerBase>
            <TitleWithTooltipSmall
              title={'Rent and buy ratio'}
              tooltipText={'Ratio between rent and buy listings in the area.'}
            />
            <RentBuyRatioDonutChart />
          </ChartContainerBase>
        ) : null}
      </ChartsWrapper>
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-auto-flow: row;
  gap: 2.4rem;
`
const ChartsWrapper = styled.div`
  display: grid;
  grid-auto-flow: row;
  gap: 1.6rem;

  ${BREAKPOINT_TO_SWITCH_INTO_DESKTOP_VIEW} {
    grid-auto-flow: column;
    grid-template-columns: 1fr 1fr;
  }
`
const TitleWithTooltipSmall = styled(TitleWithTooltipBase)`
  justify-self: start;
  font-size: 1.8rem;
`
const ScoresWithEmojiWrapper = styled.div`
  display: grid;
  grid-auto-flow: row;
  gap: 1.2rem;

  ${BREAKPOINT_TO_SWITCH_INTO_DESKTOP_VIEW} {
    grid-auto-flow: column;
    gap: 1.6rem;
  }
`
