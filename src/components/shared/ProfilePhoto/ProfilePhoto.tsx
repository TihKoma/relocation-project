import { forwardRef, VFC } from 'react'
import styled from '@emotion/styled'
import { UseControllerReturn } from 'react-hook-form'

import { Error as ErrorBase } from '@/components/ui-kit/form/Error'
import { AvatarIcon } from '@/images'
import { getColorTheme } from '@/styles/themes'

import { CameraInputFile } from './CameraInputFile'

type Props = {
  value?: string
  onChange?: (url: string) => void
  onBlur?: () => void
  error?: string
  className?: string
}
export const ProfilePhoto: VFC<Props> = forwardRef<HTMLInputElement, Props>(
  ({ value, error, onChange, onBlur, ...props }, ref) => {
    return (
      <Photo value={value} {...props}>
        {!value && <AvatarIcon />}
        <CameraInputFileStyled
          value={value}
          ref={ref}
          onChange={onChange}
          onBlur={onBlur}
        />
        <Error>{error}</Error>
      </Photo>
    )
  },
)

const Photo = styled.div<{ value?: string }>`
  width: 16rem;
  height: 16rem;

  position: relative;
  z-index: 200;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${getColorTheme('moon')};
  border-radius: 19.2rem;
  background-position: center;
  background-size: cover;

  ${(props) =>
    props.value
      ? `background-image: url(${props.value});`
      : `border: 2px solid ${getColorTheme('earth')(props)};`}
`

const Error = styled(ErrorBase)`
  position: absolute;
  bottom: -3.5rem;
  left: 50%;
  transform: translateX(-50%);
`

const CameraInputFileStyled = styled(CameraInputFile)`
  position: absolute;
  right: 0;
  bottom: 0;
`

export const FieldProfilePhoto: VFC<UseControllerReturn & Props> = ({
  field,
  fieldState,
  ...props
}) => {
  return (
    <ProfilePhoto {...field} error={fieldState.error?.message} {...props} />
  )
}
