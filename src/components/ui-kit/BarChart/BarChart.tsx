import { FC, ReactNode, useMemo, useRef, useState } from 'react'
import 'd3-transition'
import styled from '@emotion/styled'
import capitalize from 'lodash/capitalize'

import { SegmentedButton as SegmentedButtonBase } from '@/components/ui-kit/SegmentedButton'
import useComponentSize from '@/modules/drilldown/hooks/useComponentSize'

import { Chart } from './Chart'
import { Legend } from './Legend'
import type { AreaType, ChartProps } from './types'

const categoryTypeWeight: {
  [key in AreaType]: number
} = {
  neighborhood: 0,
  city: 1,
  country: 2,
  state: 3,
}

export const BarChart: FC<ChartProps & { title?: ReactNode }> = ({
  data,
  barWidth = 16,
  avatarSrc,
}) => {
  const [comparedCategoryType, setComparedCategoryType] =
    useState<AreaType>('country')

  const dataWithColors = useMemo(
    () =>
      data.map((item) => {
        return {
          ...item,
          category: {
            ...item.category,
            color: item.category.isCurrentCategory ? '#B59AF8' : '#E2E5EC',
          },
        }
      }),
    [data],
  )

  const filteredData = useMemo(() => {
    return dataWithColors.filter((item) => {
      const isMainCategoryItem = item.category.isCurrentCategory
      const matchesSelectedCategoryType =
        item.category.type === comparedCategoryType
      return isMainCategoryItem || matchesSelectedCategoryType
    })
  }, [dataWithColors, comparedCategoryType])

  const dataForLegend = useMemo(() => {
    return filteredData
      .reduce<any[]>((accumulator, current) => {
        const exists = accumulator.find(
          (item) => item.label === current.category.label,
        )
        if (exists) {
          return accumulator
        }
        return [...accumulator, current.category]
      }, [])
      .sort((itemA) => (itemA.isCurrentCategory ? -1 : 1))
  }, [filteredData])

  const dataForButtons = useMemo(() => {
    return data
      .reduce<
        {
          name: string
          type: AreaType
        }[]
      >((accumulator, current) => {
        const exists = accumulator.find(
          (item) => item.type === current.category.type,
        )
        if (exists || current.category.isCurrentCategory) {
          return accumulator
        }
        return [
          ...accumulator,
          {
            name: capitalize(current.category.type),
            type: current.category.type,
          },
        ]
      }, [])
      .sort((itemA, itemB) => {
        return categoryTypeWeight[itemA.type] - categoryTypeWeight[itemB.type]
      })
  }, [data])

  const onChange = (type: string | number) => {
    setComparedCategoryType(type as AreaType)
  }

  const chartWrapperRef = useRef(null)
  const size = useComponentSize(chartWrapperRef)

  return (
    <Container ref={chartWrapperRef}>
      <Legend data={dataForLegend} />
      <Chart
        data={filteredData}
        width={size.width}
        avatarSrc={avatarSrc}
        barWidth={barWidth}
      />
      {dataForButtons?.length ? (
        <SegmentedButton
          buttons={dataForButtons}
          onChange={onChange}
          value={comparedCategoryType}
        />
      ) : null}
    </Container>
  )
}

const Container = styled.div`
  width: 100%;

  display: grid;
  grid-auto-flow: row;
  gap: 1.6rem;
  overflow: hidden;
`
const SegmentedButton = styled(SegmentedButtonBase)`
  height: 3.2rem;

  font-size: 1.4rem;
`
