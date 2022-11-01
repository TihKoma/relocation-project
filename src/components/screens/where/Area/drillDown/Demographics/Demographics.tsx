import { FC } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'

import { DrillDownType, QUERY_GET_DRILL_DOWNS } from '@/modules/drilldown'
import {
  GetDrillDowns_getDrillDowns_DrillDownDiversityLocation,
  GetDrillDowns_getDrillDowns_DrillDownSocialLifeLocation,
} from '@/modules/drilldown/graphql/__generated__/GetDrillDowns'

import { EthnicDiversity } from './EthnicDiversity'
import { SocialLife } from './SocialLife'

type Props = {}
export const Demographics: FC<Props> = () => {
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
  const { data: socialLifeResponse } = useQuery(QUERY_GET_DRILL_DOWNS, {
    skip: !regionSlug || typeof regionSlug !== 'string',
    variables: {
      input: {
        locationSlug: regionSlug as string,
        drillDownType: DrillDownType.SOCIAL_LIFE,
      },
    },
  })

  const diversityData = (diversityResponse?.getDrillDowns ??
    []) as GetDrillDowns_getDrillDowns_DrillDownDiversityLocation[]
  const currentNeighborhoodDiversity = diversityData.find(
    (item) => item?.locationSlug === regionSlug,
  )

  const socialLifeData = (socialLifeResponse?.getDrillDowns ??
    []) as GetDrillDowns_getDrillDowns_DrillDownSocialLifeLocation[]
  const currentNeighborhoodSocialLife = socialLifeData.find(
    (item) => item?.locationSlug === regionSlug,
  )

  return (
    <Container>
      {currentNeighborhoodDiversity?.data?.length ? <EthnicDiversity /> : null}
      {currentNeighborhoodSocialLife?.data?.length ? <SocialLife /> : null}
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-auto-flow: row;
  gap: 2.4rem;
`
