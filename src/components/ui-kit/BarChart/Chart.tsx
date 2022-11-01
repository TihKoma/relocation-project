import {
  FC,
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import 'd3-transition'
import styled from '@emotion/styled'
import * as d3Selection from 'd3-selection'

import { drawAvatars } from './chart/avatars'
import { drawXAxis, drawYAxis } from './chart/axis'
import { drawBars } from './chart/bars'
import { createLayers, layerSelector } from './chart/layers'
import { getXScale, getYBarScale, getYGroupScale } from './chart/scales'
import { Tooltip } from './Tooltip'
import type { Category, ChartProps, Datum, Group } from './types'

export const Chart: FC<ChartProps & { width: number }> = ({
  data,
  barWidth = 12,
  avatarSrc,
  width,
  transitionDuration = 512,
}) => {
  const svgRef = useRef<SVGSVGElement>(null)

  const [tooltipIsVisible, setTooltipIsVisible] = useState(false)
  const [hoverBarReference, setHoverBarReference] = useState<SVGElement | null>(
    null,
  )
  const [hoveredDatum, setHoveredDatum] = useState<Datum | null>(null)

  const yAxisWidth = 80
  const xAxisHeight = 20

  const paddingBetweenBar = 16

  const groups = useMemo(
    () =>
      data.reduce<Group[]>((accumulator, current) => {
        if (accumulator.find((item) => item.id === current.group.id)) {
          return accumulator
        }
        return [...accumulator, current.group]
      }, []),
    [data],
  )

  const categories = useMemo(
    () =>
      data
        .reduce<Category[]>((accumulator, current) => {
          if (accumulator.find((item) => item.id === current.category.id)) {
            return accumulator
          }
          return [...accumulator, current.category]
        }, [])
        .sort((itemA) => (itemA.isCurrentCategory ? -1 : 1)),
    [data],
  )

  const height =
    groups.length * (barWidth * categories.length + paddingBetweenBar) +
    xAxisHeight

  const createChart = useCallback((ref: RefObject<SVGElement>) => {
    const svgEl = d3Selection.select(ref.current)

    svgEl.selectAll('*').remove()

    createLayers(svgEl)
  }, [])

  const redrawChart = useCallback(
    (ref: RefObject<SVGElement>) => {
      const svgEl = d3Selection
        .select(ref.current)
        .select('g')
        .attr('transform', `translate(${yAxisWidth}, 0)`)

      const xAxisLayer = svgEl
        .select(layerSelector('xAxis'))
        .attr('transform', `translate(-1, ${height - 1})`)
      const yAxisLayer = svgEl.select(layerSelector('yAxis'))
      const barsLayer = svgEl
        .select(layerSelector('bars'))
        .attr('transform', `translate(-2, 0)`)
      const avatarsLayer = svgEl.select(layerSelector('avatars'))

      const groupsIds = groups.map((item) => item.id)
      const categoriesIds = categories.map((item) => item.id)

      const xScale = getXScale(data, width - yAxisWidth)
      const yGroupScale = getYGroupScale(groupsIds, height - xAxisHeight)
      const yBarScale = getYBarScale(categoriesIds, barWidth)

      drawXAxis({
        container: xAxisLayer,
        xScale,
        ticks: 5,
        tickSize: -height,
        tickPadding: -9,
      })
      drawYAxis({
        container: yAxisLayer,
        yScale: yGroupScale,
        ticks: 5,
        tickSize: 0,
        tickPadding: 22,
        groups,
        yAxisWidth,
        transitionDuration,
      })
      drawBars({
        container: barsLayer,
        data,
        yGroupScale,
        yBarScale,
        xScale,
        groups,
        barWidth,
        transitionDuration,
        onMouseEnter: function (_, datum) {
          d3Selection
            // @ts-ignore
            .select(this)
            .style('filter', 'saturate(240%)')
          setHoveredDatum(datum)
          // @ts-ignore
          setHoverBarReference(this)
          setTooltipIsVisible(true)
        },
        onMouseLeave: function () {
          setTooltipIsVisible(false)
          // @ts-ignore
          d3Selection.select(this).style('filter', 'unset')
        },
      })
      drawAvatars({
        container: avatarsLayer,
        data,
        avatarSrc,
        xScale,
        yGroupScale,
        groups,
        width,
        avatarSize: 24,
        yAxisWidth,
      })
    },
    [
      data,
      height,
      width,
      barWidth,
      transitionDuration,
      avatarSrc,
      groups,
      categories,
    ],
  )

  useEffect(() => {
    createChart(svgRef)
  }, [createChart])

  useEffect(() => {
    redrawChart(svgRef)
  }, [data, svgRef, redrawChart])

  return (
    <>
      <Container ref={svgRef} width={width} height={height} />
      <Tooltip
        referenceElement={hoverBarReference}
        datum={hoveredDatum}
        isVisible={tooltipIsVisible}
      />
    </>
  )
}

const Container = styled.svg`
  & * {
    font-family: EuclidCircularA, Segoe UI, Roboto, sans-serif;
  }
`
