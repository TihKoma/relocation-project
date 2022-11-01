import { forwardRef, KeyboardEvent, ReactNode, useRef } from 'react'
import styled from '@emotion/styled'
import { nanoid } from 'nanoid'
import { ChangeHandler, useFormContext } from 'react-hook-form'

import { NormalizedButton } from '@/components/ui-kit/Button'
import { CrossInCircleIcon } from '@/images'
import { composeRefs } from '@/modules/utils/composeRefs'
import { getColorTheme } from '@/styles/themes'

export type InputProps = {
  name: string
  onChange: ChangeHandler
  label?: string
  suffix?: ReactNode | false
  withoutNegative?: boolean
  fieldClassName?: string
} & Omit<JSX.IntrinsicElements['input'], 'onChange'>

export const InputField = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id = nanoid(5),
      name,
      label,
      onChange,
      suffix,
      withoutNegative,
      fieldClassName,
      ...props
    },
    forwardedRef,
  ) => {
    const { reset, getValues, getFieldState } = useFormContext()
    const { error } = getFieldState(name)
    const inputRef = useRef<HTMLInputElement | null>(null)
    const suffixComponent = suffix ?? (
      <ClearInputButton
        onClick={() => {
          reset({ ...getValues(), [name]: '' })

          inputRef.current?.focus()
        }}
      >
        <CrossInCircleIcon />
      </ClearInputButton>
    )

    const onKeyDown = (e: KeyboardEvent) => {
      if (
        withoutNegative &&
        !(
          (e.keyCode > 95 && e.keyCode < 106) ||
          (e.keyCode > 47 && e.keyCode < 58) ||
          e.keyCode === 8
        )
      ) {
        e.preventDefault()
      }
    }

    return (
      <FieldContainer>
        <InputContainer>
          <InputComponent
            ref={composeRefs([forwardedRef, inputRef])}
            id={id}
            name={name}
            placeholder={label}
            onChange={onChange}
            suffix={Boolean(suffixComponent)}
            onKeyDown={onKeyDown}
            className={fieldClassName}
            {...props}
          />
          <Borders error={Boolean(error)} />
          {suffixComponent && (
            <SuffixContainer>{suffixComponent}</SuffixContainer>
          )}
          <Label htmlFor={id}>{label}</Label>
        </InputContainer>
        {error && <Error>{error.message}</Error>}
      </FieldContainer>
    )
  },
)

const FieldContainer = styled.div`
  display: inline-block;

  font-size: 1.6rem;
  font-weight: 400;
  line-height: 2.4rem;
`
const InputContainer = styled.div`
  display: flex;
  position: relative;

  border-radius: 1.2rem;
  overflow: hidden;
`
const SuffixContainer = styled.div`
  position: absolute;
  top: 1.7rem;
  right: 1.7rem;
  z-index: 2;
`
const Label = styled.label`
  position: absolute;
  top: 0;
  left: 1.6rem;
  z-index: 1;

  color: ${getColorTheme('mercury')};
  transform: translateY(1.6rem);
  transition: transform, font-size, line-height 0.225s;
  pointer-events: none;
`
const Borders = styled.div<{ error: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  background-color: ${getColorTheme('earth')};
  border: 1px solid
    ${({ error }) =>
      error ? getColorTheme('mars') : getColorTheme('milkyway')};
  border-radius: 1.2rem;
`
const ClearInputButton = styled(NormalizedButton)`
  display: flex;
  align-items: center;
  justify-content: center;
`
const InputComponent = styled.input<{ suffix: boolean }>`
  flex-shrink: 1;
  z-index: 1;

  width: 100%;

  padding: ${({ suffix }) =>
    suffix ? '2.7rem 5.6rem 0.7rem 1.6rem' : '2.7rem 1.6rem 0.7rem'};

  background: transparent;
  border: none;
  color: ${getColorTheme('sun')};
  font-size: inherit;
  font-weight: inherit;
  line-height: inherit;

  &:disabled {
    & ~ ${Borders} {
      background-color: ${getColorTheme('moon')};
      border-color: transparent;
    }
  }
  &:invalid {
    & ~ ${Borders} {
      border-color: ${getColorTheme('mars')};
    }
  }
  &:not(:disabled) {
    &:hover,
    &:focus {
      outline: none;
      & ~ ${Borders} {
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08),
          0 3.78px 33.4221px rgba(0, 0, 0, 0.06);
      }
    }
  }
  &:placeholder-shown {
    & ~ ${SuffixContainer} {
      ${ClearInputButton} {
        display: none;
      }
    }
  }
  &:not(:placeholder-shown),
  &:focus {
    & ~ ${Label} {
      transform: translateY(0.8rem);
      font-size: 1.4rem;
      font-weight: 400;
      line-height: 2rem;
    }
  }
  /* hide browser autocomplete input styles */
  &:-webkit-autofill {
    -webkit-background-clip: text;
  }
  /* hide placeholder */
  &::placeholder,
  &:-ms-input-placeholder,
  &::-ms-input-placeholder {
    color: transparent;
  }
  /* hide browser controls for input[type='number'] */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &[type='number'] {
    -moz-appearance: textfield;
    appearance: textfield;
  }
`
const Error = styled.span`
  display: block;
  margin: 0.4rem 1.7rem 0;
  color: ${getColorTheme('mars')};
  font-size: 1.4rem;
  line-height: 2rem;
`
