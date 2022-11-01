import { VFC } from 'react'
import styled from '@emotion/styled'

import { Activity } from '@/components/ui-kit/Activity'
import { IconButton } from '@/components/ui-kit/IconButton'
import { CrossIcon } from '@/images'

import { FileModel } from './Files'

type Props = {
  file: FileModel
  onDelete: (file: FileModel) => void
}

export const FilePreview: VFC<Props> = ({ file, onDelete }) => {
  if (!file.url) {
    return (
      <Container>
        <Activity />
      </Container>
    )
  }

  return (
    <Container>
      <DeleteButton Icon={<CrossIcon />} onClick={() => onDelete(file)} />
      <Image src={file.url} />
    </Container>
  )
}

const Container = styled.div`
  margin-right: 1rem;
  margin-top: 1rem;
  height: 13rem;
  min-width: 13rem;

  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 0.1rem solid silver;
  border-radius: 0.6rem;
  overflow: hidden;
  background: white;
`
const Image = styled.img`
  height: 130px;
  object-fit: cover;
`
const DeleteButton = styled(IconButton)`
  position: absolute;
  bottom: 1rem;
  right: 1rem;

  ${IconButton.size.small}
  ${IconButton.viewType.secondary}
`
