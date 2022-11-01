import { GOOGLE_APP_ID } from '@/modules/utils/config'
import { isServer } from '@/modules/utils/is-server'

import { PREFIX, validateStatus } from './api'

let sdkLoadedPromise: Promise<null> | null = null

type GoogleAuthResponse = {
  token_type: string
  login_hint: string
  expires_in: number
  id_token: string
  access_token: string
  session_state: { extraQueryParams: { authuser: number } }
  first_issued_at: number
  expires_at: number
  idpId: string
}

export async function initializeGoogle() {
  if (isServer) {
    // eslint-disable-next-line no-console
    console.error('login with google on server')
  }
  if (sdkLoadedPromise) {
    return sdkLoadedPromise
  }

  const promise = new Promise<null>((resolve, reject) => {
    const script = window.document.createElement('script')
    script.onload = () => {
      const unsafeWindow = window as any
      unsafeWindow.gapi.load('auth2', () => {
        unsafeWindow.gapi.auth2.init({
          client_id: GOOGLE_APP_ID,
        })
        resolve(null)
      })
    }
    script.onerror = function () {
      reject('script login google load error')
    }
    script.src = 'https://apis.google.com/js/platform.js'
    document.head.append(script)
  })

  sdkLoadedPromise = promise
  return promise
}

type AuthSocialGoogleRequest = {
  google: {
    accessToken: string
  }
  cookie: boolean
}
export type AuthSocialGoogleResponse = {
  isNewUser: boolean
}
export const socialGoogle = async (
  request: AuthSocialGoogleRequest,
): Promise<AuthSocialGoogleResponse> => {
  return fetch(`${PREFIX}/social/google`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  })
    .then(validateStatus)
    .then((res) => res.json())
    .then((res) => res.data)
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error(error)
      throw error?.errors?.[0]?.description
    })
}

export async function fetchLoginWithGoogle() {
  const unsafeWindow = window as any
  const auth = unsafeWindow.gapi.auth2.getAuthInstance()
  const googleUser = await auth.signIn()
  const { access_token: accessToken } = (await googleUser.getAuthResponse(
    true,
  )) as GoogleAuthResponse

  if (!accessToken) {
    throw new Error('There is not accessToken')
  }

  return socialGoogle({ google: { accessToken }, cookie: true })
}
