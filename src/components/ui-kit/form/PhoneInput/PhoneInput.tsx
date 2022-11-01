import {
  ChangeEvent,
  FC,
  forwardRef,
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import styled from '@emotion/styled'
import { create } from 'maska'
import Maska from 'maska/types/maska'
import { UseControllerReturn } from 'react-hook-form/dist/types/controller'

import {
  CommonInputStyles,
  Container as ContainerBase,
  CrossButton as CrossButtonBase,
  Error,
  hoverInput,
  InputProps,
} from '@/components/ui-kit/form/Input/shared'
import { ModalPortal } from '@/components/ui-kit/Modal'
import { CrossInCircleIcon } from '@/images'
import { CountryCode } from '@/modules/authorization'
import { composeRefs } from '@/modules/utils/composeRefs'
import { getColorTheme } from '@/styles/themes'

import { CodesModal } from './CodesModal'
import { CountryCodeButton as CountryCodeButtonBase } from './CountryCodeButton'
import { detectCountryByNumber } from './detectCountryByNumber'
import { useCountryCodes } from './useCountryCodes'

type Props = Omit<InputProps, 'label' | 'onChange'> & {
  onChange?: (value: string) => void
  onClick?: () => void
  onCountryCodeChange?: (countryCode: CountryCode) => void
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'label' | 'value'>

export const PhoneInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      onChange,
      onClick,
      error,
      className,
      onCountryCodeChange,
      disabled,
      value: initialValue,
      suffix,
      ...props
    },
    ref,
  ) => {
    const testId = props['data-test-id'] || 'phone-input'

    const inputRef = useRef<HTMLInputElement>(null)
    const maskRef = useRef<Maska | null>(null)

    const [codesModalIsOpen, setCodesModalIsOpen] = useState(false)

    const { countryCodes, loading } = useCountryCodes()

    const [countryCode, setCountryCode] = useState<
      (CountryCode & { mask: string }) | null
    >(null)

    const [inputValue, setInputValue] = useState<string>(initialValue)

    useEffect(() => {
      const clearInitialValue = initialValue?.replace(/\D/g, '')
      const clearCurrentValue = inputValue?.replace(/\D/g, '')
      if (clearInitialValue !== clearCurrentValue) {
        setInputValue(initialValue)
      }
    }, [initialValue, inputValue])

    useEffect(() => {
      const clearInputValue = inputValue?.replace(/\D/g, '')
      if (countryCodes && clearInputValue) {
        const suitableCountryCode = detectCountryByNumber(
          clearInputValue,
          countryCodes,
        )
        if (suitableCountryCode) {
          setCountryCode(suitableCountryCode)
        }
      }
    }, [countryCodes, inputValue])

    const onChangeCode = useCallback(
      (newCountryCode: CountryCode) => {
        if (!inputRef.current) {
          return null
        }

        const newCode = newCountryCode.prefix
        const { maskRawValue } = inputRef.current.dataset

        const currentCode = inputValue
          ?.match(/^\+\d*\s/)?.[0]
          ?.replace(/\D/g, '')

        if (currentCode) {
          const regexp = new RegExp(`^${currentCode}`)
          const newRawValue = maskRawValue?.replace(
            regexp,
            newCode.replace(/\D/g, ''),
          )
          setInputValue(newRawValue ?? newCode)
          onChange?.(newRawValue ?? newCode)
        } else {
          setInputValue(newCode)
          onChange?.(newCode)
        }

        inputRef.current?.focus()
        closeCodesListModal()
      },
      [inputValue, onChange],
    )

    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (!inputRef.current) {
        return
      }
      setInputValue(event.target.value)

      const { maskRawValue } = inputRef.current.dataset
      onChange?.(maskRawValue ?? '')
    }

    useEffect(() => {
      if (!countryCode || !inputRef.current) {
        maskRef.current = create(inputRef.current, {
          mask: '+# #*',
        })
        return
      }
      onCountryCodeChange?.(countryCode)
      const newCode = countryCode.prefix
      const codeMask = newCode.replace(/\d/g, '#')

      const newMask = `${codeMask} ${countryCode.mask}`
      maskRef.current = create(inputRef.current, {
        mask: newMask,
      })
      return () => {
        maskRef.current?.destroy()
      }
    }, [onCountryCodeChange, countryCode])

    const openCodesListModal = () => {
      setCodesModalIsOpen(true)
    }

    const closeCodesListModal = () => {
      setCodesModalIsOpen(false)
    }

    const resetValue = () => {
      if (countryCode) {
        setInputValue(countryCode.prefix)
        onChange?.(countryCode.prefix)
      } else {
        setInputValue('')
        onChange?.('')
      }
    }

    const crossButton = inputValue?.trim() !== countryCode?.prefix &&
      !disabled && (
        <CrossButton onClick={resetValue}>
          <CrossInCircleIcon />
        </CrossButton>
      )

    return (
      <Container className={className} onClick={onClick}>
        {suffix ? suffix({ crossButton, Button: CrossButton }) : crossButton}
        <Input
          {...props}
          ref={composeRefs([inputRef, ref])}
          onInput={handleOnChange}
          isError={Boolean(error)}
          data-test-id={`${testId}:input`}
          name={'phone'}
          value={inputValue}
          disabled={disabled}
        />
        <Label>Phone number</Label>
        <CountryCodeButton
          loading={loading}
          countryCode={countryCode}
          onClick={openCodesListModal}
          disabled={disabled || props.readOnly}
        />
        <ModalPortal
          isVisible={codesModalIsOpen}
          onRequestClose={closeCodesListModal}
        >
          <CodesModal onClick={onChangeCode} closeModal={closeCodesListModal} />
        </ModalPortal>
        <Error>{error}</Error>
      </Container>
    )
  },
)

export type FieldPhoneInputProps = UseControllerReturn & Omit<Props, 'value'>
export const FieldPhoneInput: FC<FieldPhoneInputProps> = ({
  field,
  fieldState,
  ...props
}) => {
  return <PhoneInput {...field} error={fieldState.error?.message} {...props} />
}

const Container = styled(ContainerBase)`
  @media (hover: hover) {
    &:hover > input {
      ${hoverInput}
    }
  }
`
const Input = styled(CommonInputStyles)`
  padding-left: 7.6rem;
  width: 100%;
`
const CountryCodeButton = styled(CountryCodeButtonBase)`
  position: absolute;

  left: 1.6rem;
  top: 2.7rem;

  outline: none;
`
const Label = styled.label`
  position: absolute;
  top: 0.8rem;
  left: 1.6rem;

  font-size: 1.4rem;
  color: ${getColorTheme('mercury')};
  pointer-events: none;
`
const CrossButton = styled(CrossButtonBase)`
  top: 1.8rem;
`
