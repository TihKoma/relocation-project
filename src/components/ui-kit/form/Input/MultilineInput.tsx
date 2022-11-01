import { forwardRef, TextareaHTMLAttributes } from 'react'
import styled from '@emotion/styled'

import { CrossInCircleIcon } from '@/images'
import { getColorTheme } from '@/styles/themes'

import {
  CommonInputStyles,
  Container,
  CrossButton as CrossButtonBase,
  Error,
  InputProps,
  Label,
} from './shared'

type Props = InputProps &
  Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    'value' | 'onChange' | 'prefix'
  >

export const MultilineInput = forwardRef<HTMLTextAreaElement, Props>(
  (
    {
      onChange,
      error,
      label,
      className,
      'data-test-id': testId = 'labeled-input',
      value,
      onClick,
      disabled,
      suffix,
      maxLength,
    },
    ref,
  ) => {
    const crossButton = !!value && !disabled && (
      <CrossButton onClick={() => onChange('')}>
        <CrossInCircleIcon />
      </CrossButton>
    )

    return (
      <Container className={className} onClick={onClick}>
        {suffix ? suffix({ crossButton, Button: CrossButton }) : crossButton}
        <TextareaStyled
          ref={ref}
          isError={Boolean(error)}
          onChange={(event) => onChange(event.currentTarget.value)}
          data-test-id={`${testId}:textarea`}
          value={value}
          maxLength={maxLength}
          disabled={disabled}
        />
        <Label>{label}</Label>
        <LabelBackground disabled={disabled} />
        {maxLength ? (
          <Counter>
            {value.length}/{maxLength}
          </Counter>
        ) : null}
        <Error>{error}</Error>
      </Container>
    )
  },
)

const TextareaStyled = styled(CommonInputStyles.withComponent('textarea'))`
  resize: none;
  height: 10.7rem;
`
const Counter = styled.div`
  position: absolute;
  top: 0.8rem;
  right: 1.6rem;

  color: ${getColorTheme('mercury')};
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
`
const LabelBackground = styled.div<{ disabled?: boolean }>`
  height: 2.6rem;

  position: absolute;
  top: 0.1rem;
  left: 1.6rem;
  right: 4.7rem;

  transition: 0.225s;

  background: ${(props) =>
    props.disabled
      ? getColorTheme('moon')(props)
      : getColorTheme('earth')(props)};
  pointer-events: none;
`
const CrossButton = styled(CrossButtonBase)`
  top: calc(50% - 1.6rem);
  transform: translateY(-50%);
`
