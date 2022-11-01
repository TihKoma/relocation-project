import { FC } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'
import capitalize from 'lodash/capitalize'

import { DiversityGroupedBarChart } from '@/components/screens/where/Area/drillDown/charts/DiversityGroupedBarChart'
import { DrillDownType, QUERY_GET_DRILL_DOWNS } from '@/modules/drilldown'
import { GetDrillDowns_getDrillDowns_DrillDownSocialLifeLocation } from '@/modules/drilldown/graphql/__generated__/GetDrillDowns'

import { DiversityDonutChart } from '../charts/DiversityDonutChart'
import { ChartsWrapper } from '../ChartsWrapper'
import { ScoreWithEmoji } from '../ScoreWithEmoji'
import { TitleWithTooltip } from '../TitleWithTooltip'

type Props = {}
export const EthnicDiversity: FC<Props> = () => {
  const router = useRouter()
  const { regionSlug } = router.query
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
    []) as GetDrillDowns_getDrillDowns_DrillDownSocialLifeLocation[]
  const dataOfCurrentRegion = drillDowns.find(
    (item) => item?.locationSlug === regionSlug,
  )

  return (
    <Container>
      <TitleWithTooltip
        title={'Ethnic diversity'}
        tooltipText={
          <p>
            Nicity values cultural and ethnic diversity. The Diversity score
            represents the level of cultural & ethnic diversity in a given
            neighbourhood. Diversity scores are highest in areas where the
            difference between largest and smallest cultural & ethnic category
            is the smallest.
            <br />
            <br />
            Selecting specific cultural & ethnic categories in addition to
            general ethnic diversity will yield scores indicating a higher
            representation of selected groups in a given neighborhood in
            comparison with the city average.
          </p>
        }
      />
      {dataOfCurrentRegion?.grade ? (
        <ScoreWithEmoji
          title={`${capitalize(dataOfCurrentRegion.grade)} diversity`}
          subtitle={dataOfCurrentRegion.gradeText ?? ''}
          grade={dataOfCurrentRegion.grade}
        />
      ) : null}
      <ChartsWrapper
        tabs={[
          {
            name: 'Overview',
            type: 'overview',
            chart: <DiversityDonutChart />,
          },
          {
            name: 'Comparison',
            type: 'comparison',
            chart: <DiversityGroupedBarChart />,
          },
        ]}
      />
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-auto-flow: row;
  gap: 1.6rem;
`
