import { interpolateNumber as d3InterpolateNumber } from 'd3-interpolate'
import * as d3Scale from 'd3-scale'
import * as d3Selection from 'd3-selection'

import { Data, Datum } from '@/components/ui-kit/BarChart/types'

import type { Group } from '../types'

type Props = {
  container: d3Selection.Selection<
    d3Selection.BaseType,
    unknown,
    null,
    undefined
  >
  data: Data
  yGroupScale: d3Scale.ScaleBand<string>
  yBarScale: d3Scale.ScaleOrdinal<string, unknown, never>
  xScale: d3Scale.ScaleLinear<number, number, never>
  groups: Group[]
  barWidth: number
  transitionDuration: number
  onMouseEnter: (event: any, datum: Datum) => void
  onMouseLeave: () => void
}
export const drawBars = ({
  container,
  data,
  yGroupScale,
  yBarScale,
  xScale,
  groups,
  barWidth,
  transitionDuration,
  onMouseEnter,
  onMouseLeave,
}: Props) => {
  const prevData = d3Selection.local()
  container
    .selectAll('g')
    .selectAll('path')
    .each(function (datum) {
      const element = this as SVGPathElement
      if (element) {
        prevData.set(element, datum)
      }
    })

  const groupsSelection = container
    .selectAll('g')
    .data<Group>(groups, (datum: any) => datum.id)
    .join(
      (enter) => {
        return enter
          .append('g')
          .attr('transform', (d) => `translate(0, ${yGroupScale(d.id)})`)
      },
      (update) => {
        return update
          .transition()
          .duration(transitionDuration)
          .attr('transform', (d) => `translate(0, ${yGroupScale(d.id)})`)
      },
      (exit) => {
        return exit.remove()
      },
    )

  const enter = (
    enter: d3Selection.Selection<
      d3Selection.EnterElement,
      Datum,
      d3Selection.BaseType | SVGGElement,
      Group
    >,
  ) => {
    return enter
      .append('path')
      .attr('fill', (d) => d.category.color as string)
      .transition()
      .duration(transitionDuration)
      .attrTween('d', (datum, _, elements) => {
        const numberOfElementsInGroup = elements.length
        const barLength = xScale(datum.value)
        const barRoundTopSize = barWidth / 2
        const yGroupStartPosition =
          (yGroupScale.bandwidth() - barWidth * numberOfElementsInGroup) / 2

        const barLengthInterpolation = d3InterpolateNumber(0, barLength)
        const borderRoundTopInterpolation = d3InterpolateNumber(
          0,
          barRoundTopSize,
        )

        return (t) => {
          const currentBarLength = barLengthInterpolation(t)
          const currentRoundTopSize = borderRoundTopInterpolation(t)
          // to prevent bar round top go to negative area
          const currentBarLengthWithoutRoundTop =
            currentBarLength - currentRoundTopSize
          const currentSafeBarLengthWithoutRoundTop = Math.max(
            currentBarLengthWithoutRoundTop,
            0,
          )
          return `
            M0,${yGroupStartPosition + (yBarScale(datum.category.id) as number)}
            h${currentSafeBarLengthWithoutRoundTop}
            q${currentRoundTopSize},0 ${currentRoundTopSize},${barRoundTopSize}
            q0,${barRoundTopSize} -${currentRoundTopSize},${barRoundTopSize}
            h-${currentSafeBarLengthWithoutRoundTop}
            z
          `
        }
      })
      .selection()
      .on('mouseenter', onMouseEnter)
      .on('mouseleave', onMouseLeave)
  }

  const update = (
    update: d3Selection.Selection<
      d3Selection.BaseType,
      Datum,
      d3Selection.BaseType | SVGGElement,
      Group
    >,
  ) => {
    return update
      .transition()
      .duration(transitionDuration)
      .attr('d', function (datum, _, elements) {
        const barLength = xScale(datum.value)
        const barRoundTopSize = barWidth / 2
        const numberOfElementsInGroup = elements.length
        const yGroupStartPosition =
          (yGroupScale.bandwidth() - barWidth * numberOfElementsInGroup) / 2
        // to prevent bar round top go to negative area
        const barLengthWithoutRoundTop = barLength - barRoundTopSize
        const safeBarLengthWithoutRoundTop = Math.max(
          barLengthWithoutRoundTop,
          0,
        )
        return `
              M0,${
                yGroupStartPosition + (yBarScale(datum.category.id) as number)
              }
              h${safeBarLengthWithoutRoundTop}
              q${barRoundTopSize},0 ${barRoundTopSize},${barRoundTopSize}
              q0,${barRoundTopSize} -${barRoundTopSize},${barRoundTopSize}
              h-${safeBarLengthWithoutRoundTop}
              z
            `
      })
      .selection()
  }

  const exit = (
    exit: d3Selection.Selection<
      d3Selection.BaseType,
      Datum,
      d3Selection.BaseType | SVGGElement,
      Group
    >,
  ) => exit.remove()

  groupsSelection
    .selectAll('path')
    .data<Datum>(
      (group) => {
        return data.filter((item) => {
          const isItemInCurrentGroup = item.group.id === group.id
          return isItemInCurrentGroup
        })
      },
      (datum: any) => datum.category.isCurrentCategory,
    )
    .join(enter, update, exit)
}
