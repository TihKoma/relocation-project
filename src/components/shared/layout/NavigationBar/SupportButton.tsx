import { useEffect } from 'react'

import { useZendesk, ZendeskChat } from '@/components/shared/ZendeskChat'
import { ChatIcon } from '@/images'
import { useAnalytics } from '@/modules/analytics'

import { CustomButton } from './shared'

export const SupportButton = () => {
  const {
    loadZendesk,
    openZendeskChat,
    isZendeskLoaded,
    isVisibleZendeskButton,
  } = useZendesk()

  useEffect(() => {
    loadZendesk()
  }, [loadZendesk])

  const analytics = useAnalytics()

  return (
    <>
      <CustomButton
        onClick={() => {
          analytics.supportWidgetOpened()
          openZendeskChat()
        }}
      >
        <ChatIcon />
        <span>Support</span>
      </CustomButton>
      {isZendeskLoaded && <ZendeskChat isVisible={isVisibleZendeskButton} />}
    </>
  )
}
