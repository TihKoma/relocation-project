import { FC } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'
import capitalize from 'lodash/capitalize'

import { ScoresComponent } from '@/components/shared/where/Scores'
import {
  GetDrillDownMedianPrice_getDrillDownMedianPrice_data,
  GetDrillDownMedianPrice_getDrillDownMedianPrice_filters,
} from '@/modules/drilldown/graphql/__generated__/GetDrillDownMedianPrice'
import { QUERY_GET_DRILL_DOWN_MEDIAN_PRICE } from '@/modules/drilldown/graphql/queries'
import { getColorTheme } from '@/styles/themes'

type DataForScores = {
  id: string
  name: string
  value: number
  color: string
}

export const MedianPriceScoresWithFilters: FC = () => {
  const router = useRouter()
  const { regionSlug } = router.query

  const { data: medianPriceResponse } = useQuery(
    QUERY_GET_DRILL_DOWN_MEDIAN_PRICE,
    {
      variables: {
        input: {
          locationSlug: typeof regionSlug === 'string' ? regionSlug : '',
        },
      },
    },
  )

  const medianPriceData = (medianPriceResponse?.getDrillDownMedianPrice.data ??
    []) as GetDrillDownMedianPrice_getDrillDownMedianPrice_data[]

  const dataForScores = transformDataForScores(
    medianPriceData,
    typeof regionSlug === 'string' ? regionSlug : '',
  )

  const medianPriceFilters = medianPriceResponse?.getDrillDownMedianPrice
    .filters as GetDrillDownMedianPrice_getDrillDownMedianPrice_filters

  const filters = getFilters(medianPriceFilters) as string[]

  return (
    <Container>
      {filters && filters.length > 0 && (
        <Filters>
          {filters.map((filter) => (
            <Filter>{filter}</Filter>
          ))}
        </Filters>
      )}
      {dataForScores.length ? (
        <ScoresComponent scores={dataForScores} type={'price'} />
      ) : null}
    </Container>
  )
}

const getFilters = (
  medianPriceFilters:
    | GetDrillDownMedianPrice_getDrillDownMedianPrice_filters
    | null
    | undefined,
) => {
  if (medianPriceFilters) {
    return Object.values(medianPriceFilters).reduce((acc, cur) => {
      if (Array.isArray(cur)) {
        const filter = cur.find((item) => item.inRequest)
        if (filter && filter.name) {
          acc.push(capitalize(filter.name))
        }
      }
      return acc
    }, [])
  }
}

const transformDataForScores = (
  data: GetDrillDownMedianPrice_getDrillDownMedianPrice_data[],
  currentLocationSlug: string,
): DataForScores[] => {
  return data.map((item) => {
    const isCurrentRegion = item.locationSlug === currentLocationSlug
    return {
      id: item.locationId,
      name: item.locationName,
      value: item.MedianPrice,
      color: isCurrentRegion ? '#B59AF8' : '#E2E5EC',
    }
  })
}

const Container = styled.div``

const Filters = styled.div`
  margin-bottom: 1.2rem;

  display: flex;
  gap: 0.6rem;

  font-size: 1.4rem;
  line-height: 2rem;
  color: ${getColorTheme('sun500')};
`
const Filter = styled.div`
  &:not(:last-child):after {
    width: 0.4rem;
    height: 0.4rem;
    margin-left: 0.6rem;

    content: '';
    display: inline-block;
    vertical-align: middle;

    border-radius: 50%;
    background-color: ${getColorTheme('sun500')};
  }
`
