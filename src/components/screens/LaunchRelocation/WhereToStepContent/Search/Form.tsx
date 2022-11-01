import { FC, useEffect } from 'react'
import styled from '@emotion/styled'
import { SubmitHandler, useForm } from 'react-hook-form'

import { ReactComponent as MagnifierIconBase } from '@/images/mag.svg'
import { HOVER_TRANSITION_TIME } from '@/styles/const'
import { mobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

type FormInput = {
  search: string
}

type Props = {
  setIsFocused?: (value: boolean) => void
  isFocused?: boolean
  onChange?: (value: string) => void
  onSubmit?: (search: string) => void
  initialValue?: string
  onClick?: () => void
  className?: string
  autoFocus?: boolean
}

export const Form: FC<Props> = ({
  setIsFocused,
  onChange,
  className,
  initialValue,
  onClick,
  isFocused,
  onSubmit: onSubmitProp,
  autoFocus,
}) => {
  const { reset, register, handleSubmit } = useForm<FormInput>({
    defaultValues: { search: initialValue },
  })

  useEffect(() => {
    reset({ search: initialValue })
  }, [initialValue, reset])

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    onSubmitProp?.(data.search)
  }

  return (
    <Container
      onSubmit={handleSubmit(onSubmit)}
      onClick={onClick}
      className={className}
    >
      <Input
        isFocused={isFocused}
        autoFocus={autoFocus}
        placeholder={'Enter state, city or neighborhood'}
        data-test-id={'launch-relocation:search-from-input'}
        autoComplete={'off'}
        {...register('search', {
          required: true,
          maxLength: 70,
          onBlur: () => setIsFocused?.(false),
          onChange: (e) => {
            onChange?.(e.target.value)
          },
        })}
        onFocus={() => {
          setIsFocused?.(true)
        }}
      />
      <MagnifierIcon />
    </Container>
  )
}

const Container = styled.form`
  height: 100%;
`
// TODO move base styles to InputBase
const Input = styled.input<{ isFocused?: boolean }>`
  width: 100%;
  height: 100%;
  padding: 0 1.6rem 0 4.8rem;

  border: 1px solid ${getColorTheme('milkyway')};
  border-radius: 1.2rem;
  outline: none;

  transition: ${HOVER_TRANSITION_TIME};

  font-size: 1.6rem;

  &:hover,
  :focus {
    box-shadow: 0 2px 4px rgba(18, 21, 31, 0.08),
      0 4px 16px 1px rgba(18, 21, 31, 0.08);
    border-color: transparent;
  }
  ::placeholder {
    color: ${getColorTheme('mercury')};
  }

  ${mobileMedia} {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
  }
`
const MagnifierIcon = styled(MagnifierIconBase)`
  position: absolute;
  top: 50%;
  left: 1.8rem;
  transform: translateY(-50%);

  stroke: ${getColorTheme('mercury')};
`
