import { useCallback, useEffect, useState } from 'react'

type ZendeskSDK = (type: string, action: string) => void
type WindowWithZendeskSDK = { zE: ZendeskSDK }

const OPEN_ZENDESK_CHAT_KEY = 'ZD-widgetOpen'
const CHECKING_CLOSE_INTERVAL = 1000

export const useZendesk = () => {
  const [isZendeskLoaded, setIsZendeskLoaded] = useState(false)
  const [isVisibleZendeskButton, setIsVisibleZendeskButton] = useState(false)

  const loadZendesk = useCallback(() => setIsZendeskLoaded(true), [])

  useEffect(() => {
    const value = sessionStorage.getItem(OPEN_ZENDESK_CHAT_KEY)

    if (value === 'true') {
      loadZendesk()
      setIsVisibleZendeskButton(true)
      startCheckingClose()
    }
  }, [loadZendesk])

  const startCheckingClose = () => {
    const intervalId = setInterval(() => {
      const value = sessionStorage.getItem(OPEN_ZENDESK_CHAT_KEY)

      if (value === 'false') {
        clearInterval(intervalId)
        setIsVisibleZendeskButton(false)
      }
    }, CHECKING_CLOSE_INTERVAL)
  }

  const openZendeskChat = () => {
    const zendeskSdk = (window as unknown as WindowWithZendeskSDK).zE

    if (zendeskSdk) {
      setIsVisibleZendeskButton(true)
      try {
        zendeskSdk('messenger', 'open')
        startCheckingClose()
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e)
      }
    }
  }

  return {
    openZendeskChat,
    isVisibleZendeskButton,
    isZendeskLoaded,
    loadZendesk,
  }
}
