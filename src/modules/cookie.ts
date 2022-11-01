import { createContext, useContext } from 'react'
import {
  Cookie as CookieClient,
  createRealTimeCookie,
} from '@cookie-baker/browser'
import type { CookieController, RealTimeCookie } from '@cookie-baker/core'
import { Cookie as CookieServer } from '@cookie-baker/node'
import type { useCookie as useCookieType } from '@cookie-baker/react'
import { createUseCookie } from '@cookie-baker/react'
import { IncomingMessage, ServerResponse } from 'http'

import { FeatureToggleCookie } from '@/modules/feature-toggle'

type UserCookie = {
  // TODO: move to localStorage
  [`user_id`]?: string
  [`user_segment_filter`]?: 'team' | 'creator'
  [`last_discovery_region_slug`]?: string
}

export type CookieModel = FeatureToggleCookie & UserCookie

export const createCookie = () => {
  const cookie = new CookieClient<CookieModel>()
  const realTimeCookie = createRealTimeCookie(cookie)
  const useCookie = createUseCookie(cookie, realTimeCookie)
  return { cookie, realTimeCookie, useCookie }
}

export const createCookieServer = (ctx: {
  req: IncomingMessage
  res: ServerResponse
}) => {
  const cookie = new CookieServer<CookieModel>(ctx)
  const realTimeCookie = createRealTimeCookie(cookie)
  const useCookie = createUseCookie(cookie, realTimeCookie)
  return { cookie, realTimeCookie, useCookie }
}

type CookieDI = {
  cookie: CookieController<CookieModel>
  realTimeCookie: RealTimeCookie<CookieModel>
  useCookie: useCookieType<CookieModel>
}
const CookieContext = createContext<CookieDI>(
  // @ts-ignore
  null,
)

export const CookieProvider = CookieContext.Provider

export const useCookieController = () => {
  return useContext(CookieContext)?.cookie
}
// TODO: fix types
// @ts-ignore
export const useCookie: useCookieType<CookieModel> = (...args) => {
  // @ts-ignore
  return useContext(CookieContext)?.useCookie(...args)
}
