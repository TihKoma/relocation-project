import * as d3Array from 'd3-array'
import * as d3Scale from 'd3-scale'

import { Datum } from '../types'

export const getXScale = (data: Datum[], width: number) => {
  const maxValue = d3Array.max<Datum, number>(data, (datum) => datum.value) ?? 0
  return d3Scale.scaleLinear().domain([0, maxValue]).range([0, width])
}
export const getYGroupScale = (groupsIds: string[], height: number) => {
  return d3Scale
    .scaleBand()
    .domain(groupsIds)
    .range([0, height])
    .paddingInner(0)
}
export const getYBarScale = (categoriesIds: string[], barWidth: number) => {
  return d3Scale.scaleOrdinal().domain(categoriesIds).range([0, barWidth])
}
