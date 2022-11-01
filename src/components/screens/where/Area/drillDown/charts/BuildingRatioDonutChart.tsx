import { useMemo } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'

import { roundValue } from '@/components/screens/where/Area/drillDown/utils/roundValue'
import {
  Data as DataForDonutChart,
  DonutChart,
} from '@/components/ui-kit/DonutChart'
import ProfilePhotoMock from '@/images/avatar.svg'
import { DrillDownType, QUERY_GET_DRILL_DOWNS } from '@/modules/drilldown'
import {
  GetDrillDowns_getDrillDowns_DrillDownHousingLocation,
  GetDrillDowns_getDrillDowns_DrillDownHousingLocation_buildingsData,
} from '@/modules/drilldown/graphql/__generated__/GetDrillDowns'
import { QUERY_GET_USER_PROFILE } from '@/modules/profile'

export const BuildingRatioDonutChart = () => {
  const router = useRouter()
  const { regionSlug } = router.query

  const { data: profileQuery } = useQuery(QUERY_GET_USER_PROFILE)
  const profile = profileQuery?.getUserProfile

  const { data: housingResponse } = useQuery(QUERY_GET_DRILL_DOWNS, {
    skip: !regionSlug || typeof regionSlug !== 'string',
    variables: {
      input: {
        locationSlug: regionSlug as string,
        drillDownType: DrillDownType.HOUSING,
      },
    },
  })

  const housingData = (housingResponse?.getDrillDowns ??
    []) as GetDrillDowns_getDrillDowns_DrillDownHousingLocation[]
  const dataOfCurrentRegion = housingData.find(
    (item) => item?.locationSlug === regionSlug,
  )

  const dataForDonutChart = useMemo(() => {
    return transformDataForDonutChart(dataOfCurrentRegion?.buildingsData ?? [])
  }, [dataOfCurrentRegion])

  return (
    <DonutChart
      data={dataForDonutChart}
      avatarSrc={profile?.photoUrl || ProfilePhotoMock.src}
    />
  )
}

const transformDataForDonutChart = (
  data: GetDrillDowns_getDrillDowns_DrillDownHousingLocation_buildingsData[],
): DataForDonutChart => {
  return data.map((item) => {
    return {
      id: item.buildingType.toLowerCase().replace(/\s/g, '-'),
      value: roundValue(item.buildingPercentage),
      isSelected: item.selectedByUser,
      label: item.buildingType,
      color: item.color ?? '',
    }
  })
}
