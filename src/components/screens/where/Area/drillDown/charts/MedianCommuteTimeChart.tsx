import { FC } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import capitalize from 'lodash/capitalize'

import { roundValue } from '@/components/screens/where/Area/drillDown/utils/roundValue'
import { ScoresComponent } from '@/components/shared/where/Scores'
import { ScoreType } from '@/components/shared/where/Scores/ScoresComponent'
import { DrillDownType, QUERY_GET_DRILL_DOWNS } from '@/modules/drilldown'
import { GetDrillDowns_getDrillDowns_DrillDownPublicTransportationLocation } from '@/modules/drilldown/graphql/__generated__/GetDrillDowns'

type Props = {
  className?: string
}

export const MedianCommuteTimeChart: FC<Props> = () => {
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

  const dataForScoreChart = drillDowns
    ? transformDataForScoreChart(
        drillDowns as GetDrillDowns_getDrillDowns_DrillDownPublicTransportationLocation[],
        typeof regionSlug === 'string' ? regionSlug : '',
      )
    : []

  return <ScoresComponent scores={dataForScoreChart} type={'time'} />
}

const transformDataForScoreChart = (
  data: GetDrillDowns_getDrillDowns_DrillDownPublicTransportationLocation[],
  currentLocationSlug: string,
): ScoreType[] => {
  return data.map((item) => {
    const regionData = item.data?.find(
      ({ transportFactor }) => transportFactor === 'Public transport',
    )
    const isCurrentRegion = item.locationSlug === currentLocationSlug
    const name =
      item.locationType === 'neighborhood' || item.locationType === 'country'
        ? item.locationName
        : `${item.locationName} ${capitalize(item.locationType)}`
    return {
      id: item.locationType.toLowerCase().replace(/\s/g, '-'),
      name,
      value: roundValue(regionData?.medianCommute || 0),
      color: isCurrentRegion ? '#B59AF8' : '#E2E5EC',
    }
  })
}
