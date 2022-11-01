import { FC } from 'react'

import { Plug } from '@/components/shared/Plug'
import { Button } from '@/components/ui-kit/Button'
import { QuestionColorized } from '@/images'
import { useIsMobileDevice } from '@/modules/device'

import { FileUploadingAdapter } from '../../../../shared/FileUploadingAdapter'
import { useChangePicture } from '../change-pictures/use-change-picture'

export const AddAvatarPlug: FC = () => {
  const { onFileUpload, isLoadingFile } = useChangePicture('photoUrl')

  const isMobile = useIsMobileDevice()
  return (
    <Plug
      title={'Add profile photo'}
      description={'Smile! Photos help your neighbors know who you are.'}
      icon={<QuestionColorized />}
    >
      <FileUploadingAdapter
        onFileUpload={onFileUpload}
        name={'photoUrl'}
        required
        control={(onClick) => (
          <Button
            size={'medium'}
            viewType={isMobile ? 'primary' : 'secondary'}
            disabled={isLoadingFile} // TODO replace with loading state, when it will be added to design system
            fullWidth={isMobile}
            onClick={onClick}
          >
            Add photo
          </Button>
        )}
      />
    </Plug>
  )
}
