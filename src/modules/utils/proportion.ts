type TPointFromSection2 = number
type TProportion = (
  point1FromSection1: number,
  point2FromSection1: number,
) => (
  point1FromSection2: number,
  point2FromSection2: number,
) => (pointFromSection1: number) => TPointFromSection2

export const proportion: TProportion = (
  point1FromSection1,
  point2FromSection1,
) => {
  const section1Length = point2FromSection1 - point1FromSection1
  return (point1FromSection2, point2FromSection2) => {
    const section2Length = point2FromSection2 - point1FromSection2
    const k = section2Length / section1Length
    const mapPointFromSection1toSection2 = (
      pointFromSection1: number,
    ): TPointFromSection2 => {
      const pointFromSection2 = point1FromSection2 + k * pointFromSection1
      return pointFromSection2
    }
    return mapPointFromSection1toSection2
  }
}
