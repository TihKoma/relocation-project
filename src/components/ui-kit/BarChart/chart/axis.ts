import * as d3Axis from 'd3-axis'
import * as d3Scale from 'd3-scale'
import * as d3Selection from 'd3-selection'

import { LightTheme } from '@/styles/themes'

import type { Group } from '../types'

type XAxisProps = {
  container: d3Selection.Selection<
    d3Selection.BaseType,
    unknown,
    null,
    undefined
  >
  xScale: d3Scale.ScaleLinear<number, number, never>
  ticks: number
  tickSize: number
  tickPadding: number
}
export const drawXAxis = ({
  container,
  xScale,
  ticks,
  tickSize,
  tickPadding,
}: XAxisProps) => {
  const xAxis = d3Axis
    .axisBottom(xScale)
    .ticks(ticks)
    .tickSize(tickSize)
    .tickPadding(tickPadding)

  container
    .transition()
    .duration(512)
    .call(xAxis as any)

  container.select('.domain').remove()
  const ticksSelection = container.selectAll('.tick')

  ticksSelection
    .select('text')
    .attr('transform', 'translate(-14, 0)')
    .style('font-size', '1.2rem')
    .style('color', LightTheme.sun500)

  ticksSelection
    .select('line')
    .attr('stroke-width', '2')
    .attr('stroke-dasharray', '5 4')
    .attr('stroke-linecap', 'round')
    .style('stroke', LightTheme.sun200)

  container
    .selectAll('text.main-x-axis-label')
    .data([null])
    .join('text')
    .classed('main-x-axis-label', true)
    .attr('x', -55)
    .attr('y', 0)
    .text('Percent')
    .style('font-size', '1.2rem')
    .attr('fill', LightTheme.sun500)
}
type YAxisProps = {
  container: d3Selection.Selection<
    d3Selection.BaseType,
    unknown,
    null,
    undefined
  >
  yScale: d3Scale.ScaleBand<string>
  ticks: number
  tickSize: number
  tickPadding: number
  groups: Group[]
  yAxisWidth: number
  transitionDuration: number
}
export const drawYAxis = ({
  container,
  yScale,
  ticks,
  tickSize,
  tickPadding,
  groups,
  yAxisWidth,
  transitionDuration,
}: YAxisProps) => {
  const yAxis = d3Axis
    .axisLeft(yScale)
    .ticks(ticks)
    .tickSize(tickSize)
    .tickSizeOuter(0)
    .tickPadding(tickPadding)
    .tickFormat(() => '')

  const axis = container.call(yAxis as any).selection()

  type labelPosition = {
    label: string
    transform: string
    dy: string
  }
  const labelPositions: labelPosition[] = []
  axis.selectAll('.tick').each(function (d) {
    const fullGroupData = groups.find((item) => item.id === d) as Group
    const label = fullGroupData?.label
    labelPositions.push({
      label,
      transform: d3Selection
        .select(this)
        .attr('transform')
        .replace(/\(0,/, `(-${yAxisWidth},`),
      dy: d3Selection.select(this).select('text').attr('dy'),
    })
  })

  drawActualYAxis({
    container,
    data: labelPositions,
    yAxisWidth,
    tickPadding,
    transitionDuration,
  })

  container.select('.domain').remove()
  container.style('font-size', '1.4rem').style('color', LightTheme.sun)
}

type labelPosition = {
  label: string
  transform: string
  dy: string
}
type actualYAxisProps = {
  container: d3Selection.Selection<
    d3Selection.BaseType,
    unknown,
    null,
    undefined
  >
  data: labelPosition[]
  yAxisWidth: number
  tickPadding: number
  transitionDuration: number
}
const drawActualYAxis = ({
  container,
  data,
  yAxisWidth,
  tickPadding,
  transitionDuration,
}: actualYAxisProps) => {
  function insertLinebreaks(d: labelPosition) {
    // @ts-ignore
    const text = d3Selection.select(this)
    const words = d.label.split(/\s+/).reverse()

    let word: string | undefined = ''
    let line: string[] = []

    let lineNumber = 0
    const lineHeight = 1

    const y = text.attr('transform')

    const dy = parseFloat(text.attr('dy'))

    let tspan = text
      .text(null)
      .append('tspan')
      .attr('x', 0)
      .attr('y', y)
      .attr('dy', dy + 'em')

    while ((word = words.pop())) {
      line.push(word)
      tspan.text(line.join(' '))
      const tspanWidth = tspan.node()?.getComputedTextLength() ?? 0
      if (tspanWidth > yAxisWidth - tickPadding) {
        line.pop()
        tspan.text(line.join(' '))
        line = [word]
        tspan = text
          .append('tspan')
          .attr('x', 0)
          .attr('y', y)
          .attr('dy', ++lineNumber * lineHeight + dy + 'em')
          .text(word)

        text.style(
          'transform',
          `translateY(-${(lineHeight * lineNumber) / 2}em)`,
        )
      }
    }
  }

  container
    .selectAll('g.actual-y-axis')
    .data([null])
    .join('g')
    .classed('actual-y-axis', true)
    .selectAll('g')
    .data(data, (datum: any) => datum.label)
    .join(
      (enter) => {
        return enter
          .append('g')
          .attr('transform', (d) => d.transform)
          .append('text')
          .style('font-size', '14px')
          .attr('fill', 'black')
          .attr('x', -tickPadding)
          .attr('dy', (d) => d.dy)
          .style('text-anchor', 'start')
          .each(insertLinebreaks)
      },
      (update) => {
        return update
          .transition()
          .duration(transitionDuration)
          .attr('transform', (d) => d.transform)
      },
      (exit) => {
        return exit.remove()
      },
    )
}
