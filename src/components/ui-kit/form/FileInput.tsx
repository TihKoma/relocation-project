import { ChangeEvent, FC, forwardRef, ReactNode, useRef, useState } from 'react'
import { useApolloClient } from '@apollo/client'
import styled from '@emotion/styled'
import { UseControllerReturn } from 'react-hook-form/dist/types/controller'
import { v4 as uuid } from 'uuid'

import { Spinner } from '@/images'
import { MUTATION_UPLOAD_FILE } from '@/modules/file'
import { composeRefs } from '@/modules/utils/composeRefs'

const FileInputHidden = styled.input`
  display: none;
`

const Label = styled.label<{ isLoading: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) => {
    return props.isLoading
      ? `
      opacity: 0.3;
      pointer-events: none;
    `
      : `
      cursor: pointer;
    `
  }}
`

type Props = {
  className?: string
  onChange?: (url: string, id: string) => void
  onStartLoad?: (id: string) => void
  onBlur?: () => void
  accept?: string
  name?: string
  children: ReactNode
}
export const FileInput = forwardRef<HTMLInputElement, Props>(function FileInput(
  {
    className,
    children,
    onChange,
    onBlur,
    onStartLoad,
    accept,
    name,
    ...props
  },
  ref,
) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isLoadingFile, setIsLoadingFile] = useState(false)

  const cacheBlur = useRef(onBlur)
  cacheBlur.current = onBlur

  const cacheOnChange = useRef(onChange)
  cacheOnChange.current = onChange

  const cacheStartLoad = useRef(onStartLoad)
  cacheStartLoad.current = onStartLoad

  const client = useApolloClient()

  const uploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.item(0)
    if (!file) {
      return
    }
    setIsLoadingFile(true)
    const id = uuid()
    cacheStartLoad.current?.(id)
    const { data } = await client.mutate({
      mutation: MUTATION_UPLOAD_FILE,
      variables: {
        public: true,
        file,
      },
    })
    const url = data?.uploadFile?.url
    setIsLoadingFile(false)
    if (url) {
      cacheOnChange.current?.(url, id)
    } else {
      // eslint-disable-next-line no-console
      console.error('file input: url is null')
    }

    // clear file input
    const ref = fileInputRef.current
    if (ref) {
      ref.value = ''
    }
    // fix blur react-hook-form
    setTimeout(() => cacheBlur.current, 0)
  }

  return (
    <Label className={className} {...props} isLoading={isLoadingFile}>
      {isLoadingFile ? <Loader /> : children}
      <FileInputHidden
        name={name}
        accept={accept}
        ref={composeRefs([fileInputRef, ref])}
        type={'file'}
        onChange={uploadFile}
      />
    </Label>
  )
})

const Loader = styled(Spinner)`
  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }

  animation: spin 1s linear infinite;
`

export const FieldFileInput: FC<UseControllerReturn & Props> = ({
  field,
  ...props
}) => {
  return <FileInput {...field} {...props} />
}
