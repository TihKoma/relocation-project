import { useEffect, useMemo, useState } from 'react'
import App, { AppContext, AppProps } from 'next/app'
import Head from 'next/head'
import 'modern-normalize/modern-normalize.css'
import '../styles/globals.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import {
  ApolloClient,
  ApolloProvider,
  NormalizedCacheObject,
} from '@apollo/client'
import { getDataFromTree } from '@apollo/client/react/ssr'
import { ThemeProvider } from '@emotion/react'
import styled from '@emotion/styled'
import { Language } from 'accept-language-parser'
import type AWSXRayAPI from 'aws-xray-sdk-core'
import type { ClientRequest } from 'http'
import { ErrorBoundary } from 'react-error-boundary'

import { ErrorFallback } from '@/components/shared/ErrorFallback'
import { AnalyticsProvider } from '@/modules/analytics'
import { AuthorizationState, AuthStoreProvider } from '@/modules/authorization'
import {
  CookieProvider,
  createCookie,
  createCookieServer,
} from '@/modules/cookie'
import { createApollo } from '@/modules/core'
import { DefaultDeviceContextProvider } from '@/modules/device'
import { InfinityScrollBodyProvider } from '@/modules/infinity-scroll'
import { QUERY_GET_USER_PROFILE } from '@/modules/profile'
import { SurveyProvider } from '@/modules/survey/SurveyContext'
import { parseLanguage } from '@/modules/utils/accept-language-parser'
import { isServer } from '@/modules/utils/is-server'
import { RootClickEmitter } from '@/modules/utils/use-outside-click'
import { DarkTheme, LightTheme } from '@/styles/themes'
const AWSXRay: typeof AWSXRayAPI =
  process.env.RUNTIME_ENV === 'server' ? require('aws-xray-sdk-core') : null

export type ServerData = { language: Language }
type MyAppProps = AppProps<ServerData> & {
  apolloState: NormalizedCacheObject
  userAgent: string
  apolloClient: ApolloClient<NormalizedCacheObject>
  state: {
    authorization: AuthorizationState
  }
  cookieKit: ReturnType<typeof createCookieServer>
}

const MyApp = ({
  Component,
  pageProps,
  state,
  userAgent,
  apolloState,
  apolloClient,
  cookieKit,
}: MyAppProps) => {
  const apolloClientCache = useMemo(
    () =>
      apolloClient ? apolloClient : createApollo({ initialData: apolloState }),
    [apolloState, apolloClient],
  )

  const cookieClientKit = useMemo(
    () => (isServer ? cookieKit : createCookie()),
    [cookieKit],
  )
  const [currentTheme, setCurrentTheme] = useState(LightTheme)
  useEffect(() => {
    // @ts-ignore
    window.toggleTheme = () => {
      setCurrentTheme(DarkTheme === currentTheme ? LightTheme : DarkTheme)
    }
  }, [currentTheme])

  return (
    <>
      <Head>
        <meta
          name={'viewport'}
          content={
            'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
          }
        />
      </Head>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <DefaultDeviceContextProvider userAgent={userAgent}>
          <CookieProvider value={cookieClientKit}>
            <AuthStoreProvider defaultStore={state?.authorization}>
              <ApolloProvider client={apolloClientCache}>
                <AnalyticsProvider>
                  <SurveyProvider>
                    <InfinityScrollBodyProvider>
                      <ThemeProvider theme={currentTheme}>
                        <Container
                          onClick={(event) => RootClickEmitter.emit(event)}
                          onTouchStart={(event) => RootClickEmitter.emit(event)}
                        >
                          <Component {...pageProps} />
                        </Container>
                      </ThemeProvider>
                    </InfinityScrollBodyProvider>
                  </SurveyProvider>
                </AnalyticsProvider>
              </ApolloProvider>
            </AuthStoreProvider>
          </CookieProvider>
        </DefaultDeviceContextProvider>
      </ErrorBoundary>
    </>
  )
}

type Request = AppContext['ctx']['req'] &
  Partial<{
    apolloClient: ApolloClient<NormalizedCacheObject>
    cookies: Record<string, string>
    userId: string
    userName: string
    isFilled: boolean
  }>
if (process.env.RUNTIME_ENV === 'server' && AWSXRay) {
  AWSXRay.capturePromise()

  // We can toggle it only in production, 'cause we have http-proxy-middleware
  if (process.env.NODE_ENV === 'production') {
    const callback = (subsegment: AWSXRayAPI.Subsegment, _: ClientRequest) => {
      subsegment.addAnnotation('request name', 'test')
    }
    AWSXRay.captureHTTPsGlobal(require('http'), undefined, callback)
    AWSXRay.captureHTTPsGlobal(require('https'), undefined, callback)
  }
}
const handleServer = async (appContext: AppContext) => {
  const req: Request = appContext.ctx.req!
  const res = appContext.ctx.res!

  AWSXRay.middleware.setDefaultName('nextjs')
  const segment = AWSXRay.middleware.traceRequestResponseCycle(req, res)
  const xRayNamespace = AWSXRay.getNamespace()

  xRayNamespace.bindEmitter(req)
  xRayNamespace.bindEmitter(res)

  return xRayNamespace.runAndReturn(async () => {
    AWSXRay.setSegment(segment)
    const props = await App.getInitialProps(appContext)

    const language = parseLanguage(
      req.headers['accept-language'] ?? 'en-US,en;q=0.8',
    )

    const pageProps = { ...props.pageProps, language }

    res.setHeader('x-amzn-trace-id', segment.trace_id)

    const apolloClient = createApollo({
      headers: {
        ...req.headers,
        'x-amzn-trace-id': segment.trace_id,
      },
    })

    req.apolloClient = apolloClient

    const isAccessCookie = req.cookies?.access

    let isLoggedIn = false
    if (isAccessCookie) {
      try {
        // check authorization
        await AWSXRay.captureAsyncFunc(
          'check logged in',
          async (subsegment) => {
            const { data } = await apolloClient.query({
              query: QUERY_GET_USER_PROFILE,
            })
            isLoggedIn = Boolean(data?.getUserProfile)
            const userId = data?.getUserProfile?.userId || ''

            req.userId = userId
            segment.setUser(userId)

            req.userName = data?.getUserProfile?.userName
            req.isFilled = data?.getUserProfile?.isFilled

            subsegment?.close()
          },
        )
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
        isLoggedIn = false
      }
    }

    segment.addAnnotation('isLoggedIn', isLoggedIn)

    const state: MyAppProps['state'] = {
      authorization: {
        isLoggedIn,
        isAuthModalVisible: false,
        isFillProfileModalVisible: false,
      },
    }

    const cookieKit = createCookieServer({ req, res })

    const userAgent = appContext?.ctx?.req?.headers['user-agent'] as string

    try {
      await AWSXRay.captureAsyncFunc('ssr', async (subsegment) => {
        await getDataFromTree(
          <appContext.AppTree
            pageProps={pageProps}
            apolloClient={apolloClient}
            state={state}
            userAgent={userAgent}
            cookieKit={cookieKit}
          />,
        )

        subsegment?.close()
      })
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }

    const apolloState = apolloClient?.extract()

    return {
      ...props,
      apolloState,
      userAgent,
      cookieKit,
      pageProps,
      state,
    }
  })
}

const handleClient = async (appContext: AppContext) => {
  const props = await App.getInitialProps(appContext)

  const pageProps = { ...props.pageProps, language: 'en-US,en;q=0.8' }

  return {
    ...props,
    userAgent: navigator.userAgent,
    pageProps,
  }
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  return isServer ? handleServer(appContext) : handleClient(appContext)
}

const Container = styled.div`
  height: 100%;
`

export default MyApp
