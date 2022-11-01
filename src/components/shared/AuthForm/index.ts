import dynamic from 'next/dynamic'

import type { AuthFormProps } from './AuthForm'

export const AuthForm = dynamic<AuthFormProps>(
  () => import('./AuthForm').then((mod) => mod.AuthForm),
  {
    ssr: false,
  },
)
