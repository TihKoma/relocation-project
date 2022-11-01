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
  GetDrillDowns_getDrillDowns_DrillDownPublicTransportationLocation,
  GetDrillDowns_getDrillDowns_DrillDownPublicTransportationLocation_data,
} from '@/modules/drilldown/graphql/__generated__/GetDrillDowns'
import { QUERY_GET_USER_PROFILE } from '@/modules/profile'

export const TransportationDonutChart = () => {
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

  const dataForDonutChart = transformDataForDonutChart(
    (dataOfCurrentRegion?.data ??
      []) as GetDrillDowns_getDrillDowns_DrillDownPublicTransportationLocation_data[],
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
  data: GetDrillDowns_getDrillDowns_DrillDownPublicTransportationLocation_data[],
): DataForDonutChart => {
  return data
    .map((item) => {
      return {
        id: item.transportFactor.toLowerCase().replace(/\s/g, '-'),
        value: roundValue(item.percentageUsePT),
        isSelected: item.selectedByUser,
        label: item.transportFactor,
        color: item.color ?? '',
      }
    })
    .sort((itemA, itemB) => itemB.value - itemA.value)
}
