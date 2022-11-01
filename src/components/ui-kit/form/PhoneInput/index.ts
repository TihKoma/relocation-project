import dynamic from 'next/dynamic'

import type { FieldPhoneInputProps } from './PhoneInput'

export const FieldPhoneInput = dynamic<FieldPhoneInputProps>(
  () => import('./PhoneInput').then((mod) => mod.FieldPhoneInput),
  {
    ssr: false,
  },
)
