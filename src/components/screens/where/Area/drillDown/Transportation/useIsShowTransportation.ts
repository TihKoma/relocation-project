import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'

import { DrillDownType, QUERY_GET_DRILL_DOWNS } from '@/modules/drilldown'
import { GetDrillDowns_getDrillDowns_DrillDownPublicTransportationLocation } from '@/modules/drilldown/graphql/__generated__/GetDrillDowns'

export const useIsShowTransportation = () => {
  const router = useRouter()
  const { regionSlug } = router.query

  const { data: transportationResponse } = useQuery(QUERY_GET_DRILL_DOWNS, {
    skip: !regionSlug || typeof regionSlug !== 'string',
    variables: {
      input: {
        locationSlug: regionSlug as string,
        drillDownType: DrillDownType.PUBLIC_TRANSPORTATION,
      },
    },
  })

  const transportationData = (transportationResponse?.getDrillDowns ??
    []) as GetDrillDowns_getDrillDowns_DrillDownPublicTransportationLocation[]

  const currentNeighborhoodTransportation = transportationData.find(
    (item) => item?.locationSlug === regionSlug,
  )

  return currentNeighborhoodTransportation?.data?.length
}
