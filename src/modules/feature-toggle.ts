import { GetServerSideProps } from 'next'

import { createCookieServer, useCookie } from '@/modules/cookie'

export type FeatureToggleCookie = {
  [`feature-toggle-example`]?: string
}

type ExtendFeatures<KeysFeatureToggleCookie> =
  KeysFeatureToggleCookie extends `feature-toggle-${infer Features}`
    ? Features
    : never

export type Features = ExtendFeatures<keyof FeatureToggleCookie>

const prefix = 'feature-toggle'
export const useFeatureToggle = (feature: Features) => {
  const name: `${typeof prefix}-${typeof feature}` = `${prefix}-${feature}`

  return useCookie(({ [name]: featureValue }) => featureValue === 'true')
}

export const redirectToWhenHaveFeature =
  (feature: Features, path: string): GetServerSideProps =>
  async ({ res, req }) => {
    const { cookie } = createCookieServer({ req, res })
    const isHaveMatch = cookie.get()[`feature-toggle-${feature}`] === 'true'
    if (!isHaveMatch) {
      res.statusCode = 302
      res.setHeader('Location', path)
    }
    return { props: {} }
  }
