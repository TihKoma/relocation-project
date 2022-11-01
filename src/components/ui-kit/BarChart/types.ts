export type AreaType = 'neighborhood' | 'city' | 'state' | 'country'
export type Category = {
  id: string
  label: string
  type: AreaType
  color?: string
  isCurrentCategory?: boolean
}
export type Group = {
  id: string
  label: string
  color: string
  isSelected?: boolean
}
export type Datum = {
  id: string
  value: number
  category: Category
  group: Group
}
export type Data = Datum[]
export type ChartProps = {
  data: Data
  barWidth?: number
  avatarSrc: string
  transitionDuration?: number
}
