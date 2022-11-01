import * as d3Selection from 'd3-selection'

const layersClassNames = {
  xAxis: 'x-axis-layer',
  yAxis: 'y-axis-layer',
  bars: 'bars-layer',
  avatars: 'avatars-layer',
}
export const layerSelector = (key: keyof typeof layersClassNames) => {
  return `.${layersClassNames[key]}`
}
export const createLayers = (
  svgSelection: d3Selection.Selection<
    SVGElement | null,
    unknown,
    null,
    undefined
  >,
) => {
  const mainLayer = svgSelection.append('g')

  Object.entries(layersClassNames).map(([_, value]) => {
    mainLayer.append('g').classed(value, true)
  })
}
