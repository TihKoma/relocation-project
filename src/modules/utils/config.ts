import { isServer } from '@/modules/utils/is-server'

const throwErrorEnv = (name: string, value: string) =>
  new Error(`Env not set: ${name}=${value}`)

// We don't need to throw error for the property
export const WITH_ANALYTICS =
  (process.env.NEXT_PUBLIC_WITH_ANALYTICS || 'false') === 'true'

if (typeof process.env.NEXT_PUBLIC_API_HOST !== 'string') {
  throw throwErrorEnv(
    'NEXT_PUBLIC_API_HOST',
    String(process.env.NEXT_PUBLIC_API_HOST),
  )
}
const isSimulatorBrowserstack =
  process.env.NEXT_PUBLIC_MOBILE_BROWSERSTACK === 'true'
export const API_HOST = isServer
  ? process.env.NEXT_PUBLIC_SSR_API_HOST
  : isSimulatorBrowserstack
  ? 'http://bs-local.com:3000'
  : process.env.NEXT_PUBLIC_API_HOST

if (typeof process.env.NEXT_PUBLIC_MAPBOX_KEY !== 'string') {
  throw throwErrorEnv(
    'NEXT_PUBLIC_MAPBOX_KEY',
    String(process.env.NEXT_PUBLIC_MAPBOX_KEY),
  )
}
export const MAPBOX_KEY = process.env.NEXT_PUBLIC_MAPBOX_KEY

if (typeof process.env.NEXT_PUBLIC_TOMTOM_API_KEY !== 'string') {
  throw throwErrorEnv(
    'NEXT_PUBLIC_TOMTOM_API_KEY',
    String(process.env.NEXT_PUBLIC_TOMTOM_API_KEY),
  )
}
export const TOMTOM_API_KEY = process.env.NEXT_PUBLIC_TOMTOM_API_KEY

export const CAPTCHA_V3_KEY = process.env.NEXT_PUBLIC_CAPTCHA_V3_KEY

if (typeof process.env.NEXT_PUBLIC_FACEBOOK_APP_ID !== 'string') {
  throw throwErrorEnv(
    'NEXT_PUBLIC_FACEBOOK_APP_ID',
    String(process.env.NEXT_PUBLIC_FACEBOOK_APP_ID),
  )
}
export const FACEBOOK_APP_ID = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID

if (typeof process.env.NEXT_PUBLIC_GOOGLE_APP_ID !== 'string') {
  throw throwErrorEnv(
    'NEXT_PUBLIC_GOOGLE_APP_ID',
    String(process.env.NEXT_PUBLIC_GOOGLE_APP_ID),
  )
}
export const GOOGLE_APP_ID = process.env.NEXT_PUBLIC_GOOGLE_APP_ID

export const NODE_DEVELOPMENT = process.env.NODE_ENV === 'development'
