import { FC } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'
import capitalize from 'lodash/capitalize'

import { SocialLifeGroupedBarChart } from '@/components/screens/where/Area/drillDown/charts/SocialLifeGroupedBarChart'
import { DrillDownType, QUERY_GET_DRILL_DOWNS } from '@/modules/drilldown'
import { GetDrillDowns_getDrillDowns_DrillDownSocialLifeLocation } from '@/modules/drilldown/graphql/__generated__/GetDrillDowns'
import { getColorTheme } from '@/styles/themes'

import { ScoreWithEmoji } from '../ScoreWithEmoji'
import {
  BREAKPOINT_TO_SWITCH_INTO_DESKTOP_VIEW,
  ChartContainer as ChartContainerBase,
} from '../styles'
import { TitleWithTooltip } from '../TitleWithTooltip'

export const SocialLife: FC = () => {
  const router = useRouter()
  const { regionSlug } = router.query
  const { data } = useQuery(QUERY_GET_DRILL_DOWNS, {
    skip: !regionSlug || typeof regionSlug !== 'string',
    variables: {
      input: {
        locationSlug: regionSlug as string,
        drillDownType: DrillDownType.SOCIAL_LIFE,
      },
    },
    ssr: false,
  })

  const drillDowns = (data?.getDrillDowns ??
    []) as GetDrillDowns_getDrillDowns_DrillDownSocialLifeLocation[]
  const dataOfCurrentRegion = drillDowns.find(
    (item) => item?.locationSlug === regionSlug,
  )

  return (
    <Container>
      <TitleWithTooltip
        title={'Social life'}
        tooltipText={
          'Social Life scores are based on the representation of a users chosen demographic group that is represented in a given neighbourhood. If your preferred demographic is “Young Families”, areas with a higher share of families will get a higher score.'
        }
      />
      {dataOfCurrentRegion?.grade ? (
        <ScoreWithEmoji
          title={`${capitalize(dataOfCurrentRegion.grade)} social life`}
          subtitle={dataOfCurrentRegion.gradeText ?? ''}
          grade={dataOfCurrentRegion.grade}
        />
      ) : null}
      <ChartContainer>
        <Title>Comparison</Title>
        <SocialLifeGroupedBarChart />
      </ChartContainer>
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-auto-flow: row;
  gap: 1.6rem;
`
const Title = styled.div`
  justify-self: start;

  color: ${getColorTheme('sun')};
  font-weight: 500;
  font-size: 1.8rem;
`
const ChartContainer = styled(ChartContainerBase)`
  ${BREAKPOINT_TO_SWITCH_INTO_DESKTOP_VIEW} {
    width: 50%;
  }
`
