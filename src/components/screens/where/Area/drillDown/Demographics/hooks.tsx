import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'

import { DrillDownType, QUERY_GET_DRILL_DOWNS } from '@/modules/drilldown'
import {
  GetDrillDowns_getDrillDowns_DrillDownDiversityLocation,
  GetDrillDowns_getDrillDowns_DrillDownSocialLifeLocation,
} from '@/modules/drilldown/graphql/__generated__/GetDrillDowns'

export const useIsShowEthnicDiversity = () => {
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

  const diversityData = (diversityResponse?.getDrillDowns ??
    []) as GetDrillDowns_getDrillDowns_DrillDownDiversityLocation[]

  const currentNeighborhoodDiversity = diversityData.find(
    (item) => item?.locationSlug === regionSlug,
  )

  return currentNeighborhoodDiversity?.data?.length
}

export const useIsShowSocialLife = () => {
  const router = useRouter()
  const { regionSlug } = router.query

  const { data: socialLifeResponse } = useQuery(QUERY_GET_DRILL_DOWNS, {
    skip: !regionSlug || typeof regionSlug !== 'string',
    variables: {
      input: {
        locationSlug: regionSlug as string,
        drillDownType: DrillDownType.SOCIAL_LIFE,
      },
    },
  })

  const socialLifeData = (socialLifeResponse?.getDrillDowns ??
    []) as GetDrillDowns_getDrillDowns_DrillDownSocialLifeLocation[]

  const currentNeighborhoodSocialLife = socialLifeData.find(
    (item) => item?.locationSlug === regionSlug,
  )

  return currentNeighborhoodSocialLife?.data?.length
}

export const useIsShowDemographics = () => {
  const showEthnicDiversity = useIsShowEthnicDiversity()
  const showSocialLife = useIsShowSocialLife()

  return showEthnicDiversity || showSocialLife
}
