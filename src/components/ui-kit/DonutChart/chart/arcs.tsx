import { interpolateNumber as d3InterpolateNumber } from 'd3-interpolate'
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
  onMouseEnter: (event: any, d: d3Shape.PieArcDatum<Datum>) => void
  onMouseLeave: (event: any, d: d3Shape.PieArcDatum<Datum>) => void
  pie: d3Shape.Pie<any, Datum>
  pieData: d3Shape.PieArcDatum<Datum>[]
  arc: d3Shape.Arc<any, d3Shape.PieArcDatum<Datum>>
}

export const drawArcs = ({
  container,
  onMouseEnter,
  onMouseLeave,
  pie,
  pieData,
  arc,
}: Props) => {
  const fullAngleInterpolation = d3InterpolateNumber(
    pie.startAngle()([]),
    pie.endAngle()([]),
  )

  const prevData = d3Selection.local<d3Shape.PieArcDatum<Datum>>()
  container.selectAll('path').each((d, i, elements) => {
    const element = elements[i] as SVGPathElement
    if (element) {
      prevData.set(element, d as d3Shape.PieArcDatum<Datum>)
    }
  })

  container
    .selectAll('path')
    .data(pieData, (datum: any) => datum.data.id)
    .join(
      (enter) => {
        return enter
          .append('path')
          .style('fill', (d) => d.data.color)
          .attr('className', (d) => `arc arc-${d.data.id}`)
          .transition()
          .duration(512)
          .attrTween('d', (d) => {
            const originalEnd = d.endAngle
            return (t) => {
              const currentAngle = fullAngleInterpolation(t)
              if (currentAngle < d.startAngle) {
                return ''
              }
              d.endAngle = Math.min(currentAngle, originalEnd)
              return arc(d) || ''
            }
          })
          .selection()
          .on('mouseenter', function (...props) {
            onMouseEnter(...props)
            d3Selection.select(this).style('filter', 'saturate(240%)')
          })
          .on('mouseleave', function (...props) {
            onMouseLeave(...props)
            d3Selection.select(this).style('filter', 'none')
          })
      },
      (update) => {
        return update
          .transition()
          .duration(512)
          .attrTween('d', function (d) {
            const p = prevData.get(this as SVGPathElement)
            const datumAngleInterpolationStart = d3InterpolateNumber(
              p?.startAngle ?? 0,
              d.startAngle,
            )
            const datumAngleInterpolationEnd = d3InterpolateNumber(
              p?.endAngle ?? 0,
              d.endAngle,
            )
            return (t) => {
              const startAngle = datumAngleInterpolationStart(t)
              const endAngle = datumAngleInterpolationEnd(t)
              d.startAngle = startAngle
              d.endAngle = endAngle
              return arc(d) || ''
            }
          })
          .selection()
      },
      (exit) => {
        return exit.remove()
      },
    )
}
