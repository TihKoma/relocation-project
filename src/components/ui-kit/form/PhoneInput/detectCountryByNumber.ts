import { CountryCode } from '@/modules/authorization'

import { popularMasks } from './mockMasks'

export const detectCountryByNumber = (
  number: string,
  countryCodes: CountryCode[],
): (CountryCode & { mask: string }) | null => {
  let lastSuitableCode
  const clearNumber = number.replace(/\D/g, '')
  for (const countryCode of countryCodes) {
    if (clearNumber.startsWith(countryCode.prefix.slice(1))) {
      const mask = popularMasks[countryCode.short.toLowerCase()] ?? '#*'
      lastSuitableCode = {
        ...countryCode,
        mask,
      }
      continue
    }
    if (lastSuitableCode) {
      return lastSuitableCode
    }
  }
  return null
}
