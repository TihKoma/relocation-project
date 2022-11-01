import { GeocodeFeature } from '@/modules/map'
import { Media } from '@/modules/post'

import { FileModel } from './Files'

export type BasicSourceData = {
  id: string
  name: string
}

type PostFormModelCreate = {
  content: string
  media: Array<Required<FileModel>>
  geoData?: GeocodeFeature
  region?: BasicSourceData
  group?: BasicSourceData
}
export type PostFormModelEdit = PostFormModelCreate & {
  id: string
}
export type PostFormModel = PostFormModelCreate | PostFormModelEdit

export type PostInitialValues =
  | {
      region?: BasicSourceData
    }
  | {
      id: string
      content: string
      media: Array<Media>
      geoData?: GeocodeFeature
      region?: BasicSourceData
      group?: BasicSourceData
    }
