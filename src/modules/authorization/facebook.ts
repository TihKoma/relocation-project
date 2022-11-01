import { FACEBOOK_APP_ID } from '@/modules/utils/config'
import { isServer } from '@/modules/utils/is-server'

import { PREFIX, validateStatus } from './api'

const ID = FACEBOOK_APP_ID
const VERSION = `v11.0`

let sdkLoadedPromise: Promise<null> | null = null

type FacebookLoginResponse = {
  authResponse: {
    accessToken: string
    userID: string
    expiresIn: number
    signedRequest: string
    data_access_expiration_time: number
  }
  status: string
}

async function initializeFacebook() {
  if (isServer) {
    // eslint-disable-next-line no-console
    console.error('login with facebook on server')
  }
  if (sdkLoadedPromise) {
    return sdkLoadedPromise
  }

  const unsafeWindow = window as any
  const promise = new Promise<null>((resolve) => {
    // fbAsyncInit callback
    unsafeWindow.fbAsyncInit = function () {
      unsafeWindow.FB.init({
        appId: ID,
        cookie: true,
        xfbml: true,
        version: VERSION,
      })

      unsafeWindow.FB.AppEvents.logPageView()
      resolve(null)
    }

    // initiate Facebook SDK load
    ;(function (d: Document, s: string, id: string) {
      let js: HTMLScriptElement | null = null
      const fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) {
        return
      }
      js = d.createElement(s) as HTMLScriptElement
      js.id = id
      js.src = 'https://connect.facebook.net/en_US/sdk.js'
      fjs.parentNode?.insertBefore(js, fjs)
    })(document, 'script', 'facebook-jssdk')
  })

  sdkLoadedPromise = promise
  return promise
}

const getAccessToken = async (): Promise<
  FacebookLoginResponse['authResponse']['accessToken']
> => {
  await initializeFacebook()
  const unsafeWindow = window as any

  return new Promise((resolve) => {
    unsafeWindow.FB.login(
      (loginStatus: FacebookLoginResponse) => {
        resolve(loginStatus.authResponse?.accessToken)
      },
      { scope: 'email' },
    )
  })
}

type AuthSocialFacebookRequest = {
  facebook: {
    accessToken: string
  }
  cookie: boolean
}
export type AuthSocialFacebookResponse = {
  isNewUser: boolean
}
export const socialFacebook = async (
  request: AuthSocialFacebookRequest,
): Promise<AuthSocialFacebookResponse> => {
  return fetch(`${PREFIX}/social/facebook`, {
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

export const fetchLoginWithFacebook = async () => {
  const accessToken = await getAccessToken()
  return socialFacebook({ facebook: { accessToken }, cookie: true })
}
