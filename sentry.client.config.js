import * as Sentry from '@sentry/nextjs'

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    tracesSampleRate: 0.2,
    sampleRate: 1,
    maxBreadcrumbs: 50,
  })
}
