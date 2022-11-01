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
  GetDrillDowns_getDrillDowns_DrillDownDiversityLocation,
  GetDrillDowns_getDrillDowns_DrillDownDiversityLocation_data,
} from '@/modules/drilldown/graphql/__generated__/GetDrillDowns'
import { QUERY_GET_USER_PROFILE } from '@/modules/profile'

export const DiversityDonutChart = () => {
  const router = useRouter()
  const { regionSlug } = router.query

  const { data: profileQuery } = useQuery(QUERY_GET_USER_PROFILE, {
    ssr: false,
  })
  const profile = profileQuery?.getUserProfile
  const { data } = useQuery(QUERY_GET_DRILL_DOWNS, {
    skip: !regionSlug || typeof regionSlug !== 'string',
    variables: {
      input: {
        locationSlug: regionSlug as string,
        drillDownType: DrillDownType.DIVERSITY,
      },
    },
  })

  const drillDowns = (data?.getDrillDowns ??
    []) as GetDrillDowns_getDrillDowns_DrillDownDiversityLocation[]
  const dataOfCurrentRegion = drillDowns.find(
    (item) => item?.locationSlug === regionSlug,
  )

  const dataForDonutChart = useMemo(
    () => transformDataForDonutChart(dataOfCurrentRegion?.data ?? []),
    [dataOfCurrentRegion?.data],
  )

  return (
    <DonutChart
      title={'Overview'}
      maxOuterDiameter={200}
      data={dataForDonutChart}
      avatarSrc={profile?.photoUrl || ProfilePhotoMock.src}
    />
  )
}

const transformDataForDonutChart = (
  data: GetDrillDowns_getDrillDowns_DrillDownDiversityLocation_data[],
): DataForDonutChart => {
  return data
    .map((item) => {
      return {
        id: item.race.toLowerCase().replace(/\s/g, '-'),
        value: roundValue(item.percentEthnicCategory),
        isSelected: item.selectedByUser,
        label: item.race,
        color: item.color ?? '',
      }
    })
    .sort((itemA, itemB) => itemB.value - itemA.value)
}
