import { forwardRef } from 'react'
import styled from '@emotion/styled'

import { Button } from '@/components/ui-kit/Button'
import { FileInput as FileInputBase } from '@/components/ui-kit/form/FileInput'
import { CameraIcon } from '@/images'
import { CrossIcon } from '@/images'

type Props = {
  onChange?: (url: string) => void
  onBlur?: () => void
  value?: string
  className?: string
}
export const CameraInputFile = forwardRef<HTMLInputElement, Props>(
  ({ onChange, onBlur, className, value }, ref) => {
    return (
      <Button
        backgroundUnderButton={'map'}
        size={'small'}
        className={className}
        onClick={() => {
          if (value) {
            onChange?.('')
          }
        }}
        Icon={
          value ? (
            <CrossIcon />
          ) : (
            <FileInput
              ref={ref}
              onChange={(url) => {
                onChange?.(url)
              }}
              onBlur={onBlur}
            >
              <CameraIcon />
            </FileInput>
          )
        }
      />
    )
  },
)

const FileInput = styled(FileInputBase)`
  width: 100%;
  height: 100%;
`
