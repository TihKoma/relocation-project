import { ReactElement } from 'react'
import styled from '@emotion/styled'

import { NormalizedButton } from '@/components/ui-kit/Button'
import { Error as ErrorBase } from '@/components/ui-kit/form/Error'
import { ReactComponent as MagnifierIconBase } from '@/images/mag.svg'
import { getColorTheme } from '@/styles/themes'

export type InputProps = {
  label: string
  value: string
  disabled?: boolean
  onClick?: () => void
  className?: string
  maxLength?: number
  onChange: (value: string) => void
  error?: string
  'data-test-id'?: string
  onFocus?: () => void
  type?: string
  readOnly?: boolean
  prefix?: (options: {
    magnifierIcon: ReactElement<any> | boolean
    Icon: typeof MagnifierIcon
  }) => ReactElement<any> | boolean
  suffix?: (options: {
    crossButton: ReactElement<any> | boolean
    Button: typeof CrossButton
  }) => ReactElement<any> | boolean
  autoComplete?:
    | 'on'
    | 'off'
    | 'name'
    | 'honorific-prefix'
    | 'given-name'
    | 'additional-name'
    | 'family-name'
    | 'honorific-suffix'
    | 'nickname'
    | 'email'
    | 'username'
    | 'new-password'
    | 'current-password'
    | 'one-time-code'
    | 'organization-title'
    | 'organization'
    | 'street-address'
    | 'address-line1'
    | 'address-line2'
    | 'address-line3'
    | 'address-level4'
    | 'address-level3'
    | 'address-level2'
    | 'address-level1'
    | 'country'
    | 'country-name'
    | 'postal-code'
    | 'cc-name'
    | 'cc-given-name'
    | 'cc-additional-name'
    | 'cc-family-name'
    | 'cc-number'
    | 'cc-exp'
    | 'cc-exp-month'
    | 'cc-exp-year'
    | 'cc-csc'
    | 'cc-type'
    | 'transaction-currency'
    | 'transaction-amount'
    | 'language'
    | 'bday'
    | 'bday-day'
    | 'bday-month'
    | 'bday-year'
    | 'sex'
    | 'tel'
    | 'tel-country-code'
    | 'tel-national'
    | 'tel-area-code'
    | 'tel-local'
    | 'tel-extension'
    | 'impp'
    | 'url'
    | 'photo'
  inputMode?:
    | 'none'
    | 'text'
    | 'decimal'
    | 'numeric'
    | 'tel'
    | 'search'
    | 'email'
    | 'url'
}

export const Container = styled.div<{ onClick?: () => void }>`
  position: relative;

  display: flex;
  flex-direction: column;

  ${(props) => (props.onClick ? 'cursor: pointer;' : '')};
`
export const Error = styled(ErrorBase)`
  margin-left: 17px;
`
export const hoverInput = `
    border-color: transparent;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08),
      0 3.78px 33.4221px rgba(0, 0, 0, 0.0503198);
`
export const CrossButton = styled(NormalizedButton)`
  width: 24px;
  height: 24px;

  z-index: 1;

  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  right: 17px;
  top: 17px;

  &:hover + input {
    ${hoverInput}
  }
`

export const MagnifierIcon = styled(MagnifierIconBase)`
  position: absolute;
  top: 1.7rem;
  left: 1.7rem;

  stroke: ${getColorTheme('mercury')};
`

export const Label = styled.label<{ hasPrefix?: boolean }>`
  position: absolute;
  left: ${({ hasPrefix }) => (hasPrefix ? '48px;' : '17px;')};
  top: 17px;
  z-index: 1;

  transition: transform 0.225s;

  pointer-events: none;

  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: #9ea9b2;
`
export const CommonInputStyles = styled.input<{
  isError: boolean
  hasPrefix?: boolean
}>`
  padding: ${({ hasPrefix }) =>
    hasPrefix ? '26px 48px 4px;' : '26px 47px 8px 16px;'};
  margin-bottom: 3px;

  border: 1px solid #e2e6ec;
  border-radius: 12px;
  background: #ffffff;
  outline: none;
  appearance: none;

  transition: 0.225s;

  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: #12151f;

  &:not([value='']) + ${Label}, &:focus + ${Label} {
    transform: translateY(-10px) scale(0.875);
    transform-origin: left;
  }
  &:focus,
  &:hover {
    ${hoverInput}
  }
  ${({ isError }) => (isError ? 'border-color: #F24852 !important;' : '')}
  &:disabled {
    border-color: transparent;
    background: #f0f1f7;
    box-shadow: initial;
  }

  &:read-only {
    pointer-events: none;
  }

  /* Chrome, Safari, Edge, Opera */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    appearance: none;
  }

  /* Firefox */
  &[type='number'] {
    -moz-appearance: textfield;
  }
`
