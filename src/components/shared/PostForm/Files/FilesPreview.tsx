import { VFC } from 'react'
import styled from '@emotion/styled'
import { UseControllerReturn } from 'react-hook-form'

import { FilePreview } from './FilePreview'
import { FileModel } from './Files'

type Props = {
  value: FileModel[]
  onChange: (files: FileModel[]) => void
  onDelete?: (file: FileModel) => void
  className?: string
}

const FilesPreview: VFC<Props> = ({
  value: files,
  onChange,
  className,
  onDelete,
}) => {
  return (
    <Container className={className}>
      {files.map((file) => (
        <FilePreview
          key={file.id}
          file={file}
          onDelete={(fileOnDelete) => {
            onChange(files.filter((file) => file.id !== fileOnDelete.id))
            onDelete?.(fileOnDelete)
          }}
        />
      ))}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export const FieldFilesPreview: VFC<
  UseControllerReturn & Omit<Props, keyof UseControllerReturn['field']>
> = ({ field, ...props }) => {
  return <FilesPreview {...field} {...props} />
}
