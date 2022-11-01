import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'

import { DrillDownType, QUERY_GET_DRILL_DOWNS } from '@/modules/drilldown'
import { GetDrillDowns_getDrillDowns_DrillDownHousingLocation } from '@/modules/drilldown/graphql/__generated__/GetDrillDowns'
import { QUERY_GET_DRILL_DOWN_MEDIAN_PRICE } from '@/modules/drilldown/graphql/queries'

import {
  HousingPropertyType,
  HousingRooms,
  HousingTransactionType,
} from '../../../../../../../__generated__/globalTypes'

export const useIsShowAffordability = () => {
  const router = useRouter()
  const { regionSlug } = router.query

  const { data } = useQuery(QUERY_GET_DRILL_DOWN_MEDIAN_PRICE, {
    variables: {
      input: {
        locationSlug: typeof regionSlug === 'string' ? regionSlug : '',
        propertyType: HousingPropertyType.APARTMENTS,
        roomsType: HousingRooms.ONE_BEDROOM,
        transactionType: HousingTransactionType.RENT,
      },
    },
  })

  const medianPriceData = data?.getDrillDownMedianPrice?.data

  return medianPriceData?.length
}

export const useIsShowAvailability = () => {
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

  const housingData = (housingResponse?.getDrillDowns ??
    []) as GetDrillDowns_getDrillDowns_DrillDownHousingLocation[]

  const currentNeighborhoodHousing = housingData.find(
    (item) => item?.locationSlug === regionSlug,
  )

  return !!currentNeighborhoodHousing
}

export const useIsShowHousing = () => {
  const showAffordability = useIsShowAffordability()
  const showAvailability = useIsShowAvailability()

  return showAffordability || showAvailability
}
