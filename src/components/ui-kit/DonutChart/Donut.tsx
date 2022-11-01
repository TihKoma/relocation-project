import { FC, RefObject, useCallback, useEffect, useRef, useState } from 'react'
import 'd3-transition'
import styled from '@emotion/styled'
import * as d3Selection from 'd3-selection'
import * as d3Shape from 'd3-shape'

import { drawArcs } from './chart/arcs'
import { drawAvatars } from './chart/avatars'
import { createLayers, layerSelector } from './chart/layers'
import { Tooltip } from './Tooltip'
import type { Data, Datum } from './types'

type Props = {
  data: Data
  className?: string
  outerDiameter: number
  innerDiameter: number
  avatarSrc: string
}

export const Donut: FC<Props> = ({
  data,
  className,
  outerDiameter,
  innerDiameter,
  avatarSrc,
}) => {
  const [hoveredDatum, setHoveredDatum] = useState<Datum | null>(null)

  const [tooltipCoordinates, setTooltipCoordinates] = useState<
    [number, number] | null
  >(null)
  const [isTooltipVisible, setIsTooltipVisible] = useState(false)

  const svgRef = useRef<SVGSVGElement>(null)

  const radius = outerDiameter / 2
  const innerRadius = innerDiameter / 2

  const createChart = useCallback((ref: RefObject<SVGElement>) => {
    const svgEl = d3Selection.select(ref.current)

    svgEl.selectAll('*').remove()

    createLayers(svgEl)
  }, [])

  const redrawChart = useCallback(
    (ref: RefObject<SVGElement>) => {
      const svgEl = d3Selection.select(ref.current)

      const arcsLayer = svgEl
        .select(layerSelector('arcs'))
        .attr(
          'transform',
          `translate(${outerDiameter / 2}, ${outerDiameter / 2})`,
        )
      const avatarsLayer = svgEl
        .select(layerSelector('avatars'))
        .attr(
          'transform',
          `translate(${outerDiameter / 2}, ${outerDiameter / 2})`,
        )

      const arc = d3Shape
        .arc<d3Shape.PieArcDatum<Datum>>()
        .innerRadius(innerRadius)
        .outerRadius(radius)
        .padAngle(0.02)

      const pie = d3Shape
        .pie<Datum>()
        .value((d) => d.value)
        .sort(null)
      const pieData = pie(data)

      const onMouseEnter = (_: any, d: d3Shape.PieArcDatum<Datum>) => {
        const x = arc.centroid(d)[0] + radius
        const y = arc.centroid(d)[1] + radius
        setIsTooltipVisible(true)
        setTooltipCoordinates([x, y])
        setHoveredDatum(d.data)

        if (d.data.isSelected) {
          svgEl.select(`#avatar-${d.data.id}`).style('opacity', 0)
        }
      }
      const onMouseLeave = (_: any, d: d3Shape.PieArcDatum<Datum>) => {
        setIsTooltipVisible(false)

        if (d.data.isSelected) {
          svgEl.select(`#avatar-${d.data.id}`).style('opacity', 1)
        }
      }

      drawArcs({
        container: arcsLayer,
        onMouseEnter,
        onMouseLeave,
        pie,
        pieData,
        arc,
      })

      drawAvatars({
        container: avatarsLayer,
        pieData,
        arc,
        avatarSrc,
      })
    },
    [data, radius, innerRadius, outerDiameter, avatarSrc],
  )

  useEffect(() => {
    createChart(svgRef)
  }, [createChart])

  useEffect(() => {
    if (svgRef?.current) {
      redrawChart(svgRef)
    }
  }, [data, radius, redrawChart])

  return (
    <Container className={className}>
      <DonutWrapper>
        <DonutSvg ref={svgRef} width={outerDiameter} height={outerDiameter} />
        <Tooltip
          coordinates={tooltipCoordinates}
          datum={hoveredDatum}
          isVisible={isTooltipVisible}
          direction={
            tooltipCoordinates?.[0] && tooltipCoordinates[0] > outerDiameter / 2
              ? 'left'
              : 'right'
          }
          avatarSrc={avatarSrc}
        />
      </DonutWrapper>
    </Container>
  )
}

const Container = styled.div`
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`
const DonutWrapper = styled.div`
  height: fit-content;

  position: relative;
`
const DonutSvg = styled.svg`
  align-self: center;
`
