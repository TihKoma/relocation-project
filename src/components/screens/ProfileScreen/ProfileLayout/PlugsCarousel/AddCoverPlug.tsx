import { FC } from 'react'

import { useChangePicture } from '@/components/screens/ProfileScreen/ProfileLayout/change-pictures/use-change-picture'
import { Plug } from '@/components/shared/Plug'
import { Button } from '@/components/ui-kit/Button'
import { CoverColorizedIcon } from '@/images'
import { useIsMobileDevice } from '@/modules/device'

import { FileUploadingAdapter } from '../../../../shared/FileUploadingAdapter'

export const AddCoverPlug: FC = () => {
  const { isLoadingFile, onFileUpload } = useChangePicture('coverUrl')

  const isMobile = useIsMobileDevice()
  return (
    <Plug
      title={'Add a background'}
      description={
        'Neighbors who visit your profile will see it. Show your style'
      }
      icon={<CoverColorizedIcon />}
    >
      <FileUploadingAdapter
        onFileUpload={onFileUpload}
        name={'coverUrl'}
        required
        control={(onClick) => (
          <Button
            size={'medium'}
            viewType={isMobile ? 'primary' : 'secondary'}
            disabled={isLoadingFile} // TODO replace with loading state, when it will be added to design system
            fullWidth={isMobile}
            onClick={onClick}
          >
            Add background
          </Button>
        )}
      />
    </Plug>
  )
}
