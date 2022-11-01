import * as d3Selection from 'd3-selection'
import * as d3Shape from 'd3-shape'

import { Datum } from '../types'

type Props = {
  container: d3Selection.Selection<
    d3Selection.BaseType,
    unknown,
    null,
    undefined
  >
  arc: d3Shape.Arc<any, d3Shape.PieArcDatum<Datum>>
  pieData: d3Shape.PieArcDatum<Datum>[]
  avatarSrc: string
}
export const drawAvatars = ({ container, pieData, arc, avatarSrc }: Props) => {
  container
    .selectAll('g')
    .data(
      pieData.filter((datum) => datum.data.isSelected),
      (datum: any) => datum.data.id,
    )
    .join(
      (enter) => {
        const avatar = enter
          .append('g')
          .attr('id', (d) => `avatar-${d.data.id}`)
          .style('opacity', 0)
          .transition()
          .delay((_, i, nodes) => {
            return (258 / nodes.length) * i
          })
          .duration(225)
          .style('opacity', 1)
          .selection()
          .style('transition', 'opacity 225ms')
          .style('pointer-events', 'none')
          .style(
            'transform',
            (d) =>
              `translate(${arc.centroid(d)[0]}px, ${arc.centroid(d)[1]}px)`,
          )

        avatar
          .append('defs')
          .append('clipPath')
          .attr('id', (d) => `clipCircle-${d.data.id}`)
          .append('circle')
          .attr('r', 10)
          .attr('cx', 0)
          .attr('cy', 0)

        avatar
          .append('circle')
          .attr('r', 12)
          .attr('cx', 0)
          .attr('cy', 0)
          .attr('fill', 'white')
          .style('filter', 'drop-shadow(0px 2px 4px rgba(18, 21, 31, 0.08))')

        avatar
          .append('image')
          .attr('href', avatarSrc)
          .attr('width', 20)
          .attr('height', 20)
          .attr('clip-path', (d) => `url(#clipCircle-${d.data.id})`)
          .attr('x', -10)
          .attr('y', -10)
          .attr('preserveAspectRatio', 'xMidYMid slice')

        return avatar
      },
      (update) => {
        return update
          .transition()
          .duration(512)
          .styleTween('transform', function (d) {
            return function () {
              const coordinates = arc.centroid(d)
              return `translate(${coordinates[0]}px, ${coordinates[1]}px)`
            }
          })
          .selection()
      },
      (exit) => {
        return exit.remove()
      },
    )
}
