import { GeocodeFeature } from '@/modules/map'

export type FormModel = {
  search: string
  location: GeocodeFeature | null
}

export type CommonLocationFeatureProps = {
  title: string
  withCloseButton?: boolean
  onBack?: () => void
  error?: string
  filterSearch?: (feature: Exclude<FormModel['location'], null>) => boolean
}
