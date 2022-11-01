import { ChangeEvent, ReactNode, useRef, VFC } from 'react'
import styled from '@emotion/styled'
import { RegisterOptions, useForm } from 'react-hook-form'

type Props = {
  onFileUpload(e: ChangeEvent<HTMLInputElement>): void
  control(handleClick: () => void): ReactNode
  name: string
} & RegisterOptions

export const FileUploadingAdapter: VFC<Props> = ({
  onFileUpload,
  control,
  name,
  ...options
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const { register } = useForm()
  const { ref, onChange, ...fileInputProps } = register(name, options)
  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <>
      {control(handleClick)}
      <HiddenFileInput
        type={'file'}
        ref={(e) => {
          ref(e)
          fileInputRef.current = e
        }}
        onChange={(e) => {
          onChange(e)
          onFileUpload(e)
        }}
        {...fileInputProps}
      />
    </>
  )
}

const HiddenFileInput = styled.input`
  position: absolute;

  width: 0.1px;
  height: 0.1px;

  margin: 0;
  padding: 0;

  appearance: none;
  border: none;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
`
