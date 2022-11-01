import isEmail from 'validator/lib/isEmail'
import isMobilePhone, { MobilePhoneLocale } from 'validator/lib/isMobilePhone'

import { CountryCode } from '@/modules/authorization'

export const required =
  (message = 'Required field') =>
  (value: any): true | string =>
    value ? true : message

export const lengthLessOrEqualThen =
  (length: number, message = `No more than ${length} characters`) =>
  (value: unknown): true | string =>
    typeof value !== 'string' || value.length <= length ? true : message

export const notOnlyEmptySymbols =
  (message = `You cannot use only spaces`) =>
  (value: string | undefined): true | string => {
    if (typeof value === 'undefined') {
      return true
    }
    return value.trim() !== '' ? true : message
  }
export const onlyLatinLetters =
  (message = `You can use only latin letters`) =>
  (value: string | undefined): true | string => {
    if (typeof value === 'undefined') {
      return true
    }
    return value.match(/^[a-zA-Z]+$/) ? true : message
  }

export const minLength =
  (
    length: number,
    message = `Value should be minimum ${length}  characters long`,
  ) =>
  (value: unknown): true | string =>
    typeof value !== 'string' || value.length >= length ? true : message

export const checkIsEmail =
  (message = 'Please enter valid email address') =>
  (value: string | undefined) => {
    if (typeof value === 'undefined') {
      return true
    }
    return isEmail(value) || message
  }

export const checkIsPhone =
  (countryCode?: CountryCode, message = 'Please enter valid phone number') =>
  (value: string | undefined) => {
    if (typeof value === 'undefined') {
      return true
    }

    const locale = countryCode
      ? mapCountryCodeAndMobilePhoneLocale(countryCode.short)
      : 'any'

    return isMobilePhone(value, locale) || message
  }

// ad-hoc to map library base and our
const mapCountryCodeAndMobilePhoneLocale = (
  code: string,
): MobilePhoneLocale | 'any' => {
  switch (code.toLowerCase()) {
    case 'us': {
      return 'en-US'
    }
    case 'ca': {
      return 'en-CA'
    }
    case 'ru': {
      return 'ru-RU'
    }
    default: {
      return 'any'
    }
  }
}
