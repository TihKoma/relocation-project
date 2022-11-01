import * as d3Array from 'd3-array'
import * as d3Scale from 'd3-scale'
import * as d3Selection from 'd3-selection'

import { Data, Group } from '@/components/ui-kit/BarChart/types'

type Props = {
  container: d3Selection.Selection<
    d3Selection.BaseType,
    unknown,
    null,
    undefined
  >
  data: Data
  avatarSrc: string
  xScale: d3Scale.ScaleLinear<number, number, never>
  yGroupScale: d3Scale.ScaleBand<string>
  groups: Group[]
  width: number
  avatarSize: number
  yAxisWidth: number
}
export const drawAvatars = ({
  container,
  data,
  avatarSrc,
  xScale,
  yGroupScale,
  groups,
  width,
  avatarSize,
  yAxisWidth,
}: Props) => {
  const paddingBetweenAvatarAndBar = 4
  const filteredGroups = groups.filter((group) => group.isSelected)
  container
    .selectAll('g')
    .data(filteredGroups, (group: any) => group.id)
    .join(
      (enter) => {
        const avatar = enter
          .append('g')
          .attr('id', (group) => `avatar-${group.id}`)
          .style('pointer-events', 'none')
          .attr('transform', (group) => {
            const groupHeight = yGroupScale.bandwidth()
            const topYPosition = yGroupScale(group.id) ?? 0
            const yPosition = topYPosition + groupHeight / 2

            const itemsOfCurrentGroup = data.filter(
              (item) => item.group.id === group.id,
            )
            const largestValue =
              d3Array.max(itemsOfCurrentGroup, (item) => item.value) ?? 0
            const xCenterPosition = xScale(largestValue)
            const xPosition =
              xCenterPosition + paddingBetweenAvatarAndBar + avatarSize / 2
            const maxAllowedXPosition = width - yAxisWidth - avatarSize / 2
            return `translate(${Math.min(
              xPosition,
              maxAllowedXPosition,
            )}, ${yPosition})`
          })
          .style('opacity', 0)
          .transition()
          .duration(200)
          .delay(300)
          .style('opacity', 1)
          .selection()
        avatar
          .append('defs')
          .append('clipPath')
          .attr('id', (datum) => `clipCircle-${datum.id}`)
          .append('circle')
          .attr('r', (avatarSize - 4) / 2)
          .attr('cx', 0)
          .attr('cy', 0)
        avatar
          .append('circle')
          .attr('r', avatarSize / 2)
          .attr('cx', 0)
          .attr('cy', 0)
          .attr('fill', 'white')
          .style('filter', 'drop-shadow(0px 2px 4px rgba(18, 21, 31, 0.08))')
        avatar
          .append('image')
          .attr('href', avatarSrc)
          .attr('width', avatarSize - 4)
          .attr('height', avatarSize - 4)
          .attr('clip-path', (group) => `url(#clipCircle-${group.id})`)
          .attr('x', -(avatarSize - 4) / 2)
          .attr('y', -(avatarSize - 4) / 2)
          .attr('preserveAspectRatio', 'xMidYMid slice')

        return avatar
      },
      (update) => {
        return update
          .style('transition', `transform ease-in-out ${512}ms`)
          .attr('transform', (group) => {
            const groupHeight = yGroupScale.bandwidth()
            const topYPosition = yGroupScale(group.id) ?? 0
            const yPosition = topYPosition + groupHeight / 2

            const itemsOfCurrentGroup = data.filter(
              (item) => item.group.id === group.id,
            )
            const largestValue =
              d3Array.max(itemsOfCurrentGroup, (item) => item.value) ?? 0
            const xCenterPosition = xScale(largestValue)
            const xPosition =
              xCenterPosition + paddingBetweenAvatarAndBar + avatarSize / 2
            const maxAllowedXPosition = width - yAxisWidth - avatarSize / 2
            return `translate(${Math.min(
              xPosition,
              maxAllowedXPosition,
            )}, ${yPosition})`
          })
          .selection()
      },
      (exit) => {
        return exit.remove()
      },
    )
}
