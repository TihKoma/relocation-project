import { FC, forwardRef, InputHTMLAttributes } from 'react'
import styled from '@emotion/styled'
import { UseControllerReturn } from 'react-hook-form/dist/types/controller'

import { Error } from '@/components/ui-kit/form/Error'
import { CrossButton as CrossButtonBase } from '@/components/ui-kit/form/Input/shared'
import { CrossInCircleIcon } from '@/images'
import { ReactComponent as MagIconBase } from '@/images/mag.svg'
import { getColorTheme } from '@/styles/themes'

type Props = {
  value?: string
  onChange?: (value: string) => void
  error?: string
  onReset: () => void
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>

export const SearchInput = forwardRef<HTMLInputElement, Props>(
  ({ value, onChange, error, className, onReset, ...props }, ref) => {
    return (
      <Container className={className}>
        <InputWrapper>
          <MagIcon />
          <Input
            ref={ref}
            isError={Boolean(error)}
            value={value}
            onChange={(event) => {
              onChange?.(event.target.value)
            }}
            {...props}
          />
          {value ? (
            <CrossButton onClick={onReset}>
              <CrossInCircleIcon />
            </CrossButton>
          ) : null}
        </InputWrapper>
        {typeof error === 'string' && <Error>{error}</Error>}
      </Container>
    )
  },
)

const Container = styled.div`
  display: inline-block;
`
const Input = styled.input<{ isError: boolean }>`
  height: 50px;
  width: 100%;
  padding-left: 56px;
  padding-right: 45px;

  background: #f0f1f7;
  border-radius: 12px;

  font-size: 16px;
  line-height: 22px;
  color: #12151f;
  &::placeholder {
    color: #9ea9b2;
  }
  &:disabled {
    color: #9ea9b2;
  }
  outline: none;
  border: 1px solid transparent;
  ${({ isError }) => (isError ? 'border: 1px solid #F24852;' : '')}
`
const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 3px;
`
const MagIcon = styled(MagIconBase)`
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  stroke: ${getColorTheme('sun')};
`
const CrossButton = styled(CrossButtonBase)`
  top: 50%;
  transform: translate(0, -50%);
`

export const FieldSearchInput: FC<UseControllerReturn & Props> = ({
  field: { onBlur, onChange, ...field },
  fieldState,
  onBlur: onBlurFromProp,
  onChange: onChangeFromProp,
  ...props
}) => {
  return (
    <SearchInput
      onBlur={(event) => {
        onBlur()
        onBlurFromProp?.(event)
      }}
      onChange={(value) => {
        onChange(value)
        onChangeFromProp?.(value)
      }}
      {...field}
      error={fieldState.error?.message}
      {...props}
    />
  )
}
