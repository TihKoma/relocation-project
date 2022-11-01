import { useMemo } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'

import { roundValue } from '@/components/screens/where/Area/drillDown/utils/roundValue'
import {
  AreaType,
  BarChart,
  Data as DataForBarChart,
} from '@/components/ui-kit/BarChart'
import ProfilePhotoMock from '@/images/avatar.svg'
import { DrillDownType, QUERY_GET_DRILL_DOWNS } from '@/modules/drilldown'
import { GetDrillDowns_getDrillDowns_DrillDownDiversityLocation } from '@/modules/drilldown/graphql/__generated__/GetDrillDowns'
import { QUERY_GET_USER_PROFILE } from '@/modules/profile'

export const DiversityGroupedBarChart = () => {
  const router = useRouter()
  const { regionSlug } = router.query

  const { data: profileQuery } = useQuery(QUERY_GET_USER_PROFILE)
  const profile = profileQuery?.getUserProfile
  const { data: drillDownData } = useQuery(QUERY_GET_DRILL_DOWNS, {
    skip: !regionSlug || typeof regionSlug !== 'string',
    variables: {
      input: {
        locationSlug: regionSlug as string,
        drillDownType: DrillDownType.DIVERSITY,
      },
    },
  })

  const dataForBarChart = useMemo(() => {
    if (drillDownData?.getDrillDowns) {
      return transformDataForBarChart(
        drillDownData?.getDrillDowns as GetDrillDowns_getDrillDowns_DrillDownDiversityLocation[],
        regionSlug as string,
      )
    }
    return []
  }, [drillDownData?.getDrillDowns, regionSlug])

  return (
    <BarChart
      title={'Comparison'}
      data={dataForBarChart}
      avatarSrc={profile?.photoUrl || ProfilePhotoMock.src}
    />
  )
}

const transformDataForBarChart = (
  data: GetDrillDowns_getDrillDowns_DrillDownDiversityLocation[],
  currentLocationSlug: string,
): DataForBarChart => {
  return data
    .reduce<DataForBarChart>((accumulator, regionItem) => {
      const category = {
        id: regionItem.locationSlug,
        label: regionItem.locationName,
        type: regionItem.locationType as AreaType,
        isCurrentCategory: regionItem.locationSlug === currentLocationSlug,
      }
      const list: DataForBarChart =
        regionItem?.data?.map((item) => {
          const group = {
            id: item.race.toLowerCase().replace(/\s/g, '-'),
            label: item.race,
            color: item.color ?? '',
            isSelected: item.selectedByUser,
          }
          return {
            id: category.id + group.id,
            value: roundValue(item.percentEthnicCategory),
            category,
            group,
          }
        }) ?? []
      return [...accumulator, ...list]
    }, [])
    .sort((itemA, itemB) => {
      if (itemA.category.isCurrentCategory) {
        return itemB.value - itemA.value
      }
      return 0
    })
}
