import { protectByCaptcha } from '@/modules/utils/captcha'

export const PREFIX = '/api/auth'

export const validateStatus = async (res: Response) => {
  if (200 <= res?.status && res?.status < 300) {
    return res
  }

  throw await res.json()
}

export type AuthAuthRequest = {
  phone: string
}
export type AuthAuthResponse = string
export const fetchSendSmsCode = async (
  request: AuthAuthRequest,
): Promise<AuthAuthResponse> => {
  return protectByCaptcha((token) => {
    return fetch(`${PREFIX}/auth`, {
      method: 'POST',
      // @ts-ignore
      headers: {
        'Content-Type': 'application/json',
        'x-nicity-recaptch': token,
      },
      body: JSON.stringify({
        phoneAuth: {
          phone: request.phone,
        },
      }),
    })
      .then(validateStatus)
      .then((x) => x.json())
      .then((result) => result.data.challengeParameters.session)
      .catch((error) => {
        throw error?.errors?.[0]?.description
      })
  })
}

export const logOut = async (): Promise<void> => {
  return fetch(`${PREFIX}/logout`, {
    method: 'POST',
  })
    .then(validateStatus)
    .then(() => undefined)
}

export type AuthConfirmRequest = {
  phone: string
  code: string
  session: string
}
export type AuthConfirmResponse = {
  accessToken: string
  accessTokenExpiredAt: string
  refreshToken: string
  refreshTokenExpiredAt: string
  tokenType: string
  isNewUser: boolean
}
export const fetchConfirmSmsCode = async (
  request: AuthConfirmRequest,
): Promise<AuthConfirmResponse> => {
  return fetch(`${PREFIX}/confirm`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...request, cookie: true }),
  })
    .then(validateStatus)
    .then((res) => res.json())
    .then((res) => res.data)
    .catch((error) => {
      throw error?.errors?.[0]?.description
    })
}

export type CountryCode = {
  prefix: string
  flag: string
  short: string
  name: string
}
type CountryCodesResponse = CountryCode[]
export const fetchCountryCodesList =
  async (): Promise<CountryCodesResponse> => {
    return fetch(`${PREFIX}/internal/country-codes`, {
      method: 'GET',
    })
      .then(validateStatus)
      .then(
        (result) =>
          result.json() as Promise<{ data: { codes: CountryCodesResponse } }>,
      )
      .then((result) => {
        return result.data.codes
      })
      .catch((error) => {
        throw error?.errors?.[0]?.description
      })
  }
