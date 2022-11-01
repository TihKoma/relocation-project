import { ChangeEvent, forwardRef, InputHTMLAttributes } from 'react'
import styled from '@emotion/styled'

import { CrossInCircleIcon } from '@/images'

import {
  CommonInputStyles,
  Container,
  CrossButton,
  Error,
  InputProps,
  Label,
  MagnifierIcon,
} from './shared'

type Props = InputProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'prefix'>

export const InlineInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      onChange,
      error,
      label,
      className,
      'data-test-id': testId = 'labeled-input',
      value,
      disabled,
      onClick,
      prefix,
      suffix,
      type,
      maxLength,
      readOnly,
      ...props
    },
    ref,
  ) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      let value = e?.currentTarget?.value

      if (maxLength && maxLength < e?.currentTarget?.value.length) {
        value = value.slice(0, maxLength)
      }

      onChange?.(value)
    }

    const crossButton = !!value && !disabled && !readOnly && (
      <CrossButton onClick={() => onChange('')}>
        <CrossInCircleIcon />
      </CrossButton>
    )

    const magnifierIcon = <MagnifierIcon />

    return (
      <Container className={className} onClick={onClick}>
        {prefix ? prefix({ magnifierIcon, Icon: MagnifierIcon }) : null}
        <Input
          hasPrefix={Boolean(prefix)}
          isError={Boolean(error)}
          ref={ref}
          onChange={onChangeHandler}
          data-test-id={`${testId}:input`}
          value={value}
          disabled={disabled}
          type={type}
          readOnly={readOnly}
          {...props}
        />
        <Label hasPrefix={Boolean(prefix)}>{label}</Label>
        <Error>{error}</Error>
        {suffix ? suffix({ crossButton, Button: CrossButton }) : crossButton}
      </Container>
    )
  },
)

const Input = styled(CommonInputStyles)``
