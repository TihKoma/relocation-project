import { VFC } from 'react'
import styled from '@emotion/styled'
import { Controller, ControllerRenderProps, FieldValues } from 'react-hook-form'

import { FieldLocationView as FieldLocationViewBase } from '@/components/shared/Location'
import {
  FieldFilesPreview as FieldFilesPreviewBase,
  FileModel,
} from '@/components/shared/PostForm/Files'

type Props = {
  onMediaDelete: (file: FileModel) => void
}
export const Previews: VFC<Props> = ({ onMediaDelete }) => {
  return (
    <>
      <Controller
        name={'media'}
        render={(input) => (
          <FieldFilesPreview
            {...input}
            onDelete={onMediaDelete}
            field={input.field as ControllerRenderProps<FieldValues, string>}
          />
        )}
      />
      <Controller
        name={'geoData'}
        render={(input) => (
          <FieldLocationView
            {...input}
            field={input.field as ControllerRenderProps<FieldValues, string>}
          />
        )}
      />
    </>
  )
}

const FieldLocationView = styled(FieldLocationViewBase)`
  margin-bottom: 8px;
`

const FieldFilesPreview = styled(FieldFilesPreviewBase)`
  margin-bottom: 16px;
`
