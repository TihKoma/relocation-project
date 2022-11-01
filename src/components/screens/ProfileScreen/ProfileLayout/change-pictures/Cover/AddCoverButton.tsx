import { FC } from 'react'

import { FileUploadingAdapter } from '@/components/shared/FileUploadingAdapter/FileUploadingAdapter'
import { Button } from '@/components/ui-kit/Button'
import { CoverIcon } from '@/images'

import { useChangePicture } from '../use-change-picture'

type Props = {
  className?: string
}

export const AddCoverButton: FC<Props> = ({ className }) => {
  const {
    onFileUpload,
    isLoadingFile,
    // fileError,
  } = useChangePicture('coverUrl')

  return (
    <FileUploadingAdapter
      onFileUpload={onFileUpload}
      name={'coverUrl'}
      required
      control={(onClick) => (
        <Button
          size={'small'}
          viewType={'primary'}
          backgroundUnderButton={'map'}
          onClick={onClick}
          disabled={isLoadingFile} // TODO replace with loading state, when it will be added to design system
          Icon={<CoverIcon />}
          className={className}
          // error={fileError} // TODO add error state, when it will be added to design system
        />
      )}
    />
  )
}
