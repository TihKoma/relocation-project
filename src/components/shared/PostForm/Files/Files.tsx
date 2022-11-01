import { FC } from 'react'
import styled from '@emotion/styled'
import { UseControllerReturn } from 'react-hook-form'

import { Chip } from '@/components/ui-kit/Chip'
import { FileInput as FileInputBase } from '@/components/ui-kit/form/FileInput'
import { ReactComponent as ClipIcon } from '@/images/clip.svg'
import { MediaType } from '@/modules/post'

export type FileModel = {
  id: string
  url?: string
  type?: MediaType
}

type Props = {
  value: FileModel[]
  onChange: (files: FileModel[]) => void
  onBlur: () => void
  name: string
  'data-test-id': string
}

const Files: FC<Props> = ({
  value: files,
  name,
  onChange,
  onBlur,
  'data-test-id': dataTestId,
}) => {
  return (
    <FileInput
      name={name}
      onBlur={onBlur}
      data-test-id={dataTestId}
      accept={'image/jpeg,image/png,image/svg'}
      onStartLoad={(id) => {
        // TODO remove filter when we can show few images in post gallery https://nicity.atlassian.net/browse/CP-1114
        const filesWithoutImages = files.filter(
          (file) => file.type !== MediaType.IMAGE,
        )

        onChange([...filesWithoutImages, { id, type: MediaType.IMAGE }])
      }}
      onChange={(url, id) => {
        onChange(
          files.map((file) => (file.id === id ? { ...file, url } : file)),
        )
      }}
    >
      <Chip as={'div'}>
        <ClipIcon />
        Media
      </Chip>
    </FileInput>
  )
}

const FileInput = styled(FileInputBase)`
  display: inline-flex;
`

export const FieldFiles: FC<
  UseControllerReturn & Omit<Props, keyof UseControllerReturn['field']>
> = ({ field, ...props }) => {
  return <Files {...field} {...props} />
}
