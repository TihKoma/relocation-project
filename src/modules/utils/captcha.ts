import { CAPTCHA_V3_KEY } from './config'

type Captcha = {
  ready: (callback: () => void) => void
  execute: (key: string, options: { action: string }) => Promise<string>
}

const CAPTCHA_API_URL = 'https://www.google.com/recaptcha/api.js'
let apiLoaded = false

export const captchaInitialize = async () => {
  return new Promise((resolve) => {
    if (apiLoaded) {
      resolve(null)
      return
    }

    const script = document.createElement('script')
    script.src = `${CAPTCHA_API_URL}?render=${CAPTCHA_V3_KEY}&invisible=true`
    script.onload = () => {
      apiLoaded = true
      resolve(null)
    }
    document.body.appendChild(script)
  })
}

export const protectByCaptcha = async (
  sendRequest: (token?: string) => Promise<any>,
): Promise<any> => {
  await captchaInitialize()

  return new Promise((resolve) => {
    const captcha: Captcha | null | undefined = CAPTCHA_V3_KEY
      ? // @ts-ignore
        window.grecaptcha
      : null

    if (captcha) {
      captcha.ready(async () => {
        if (CAPTCHA_V3_KEY) {
          const token = await captcha.execute(CAPTCHA_V3_KEY, {
            action: 'submit',
          })

          return resolve(sendRequest(token))
        } else {
          resolve(sendRequest())
        }
      })
    } else {
      return resolve(sendRequest())
    }
  })
}
