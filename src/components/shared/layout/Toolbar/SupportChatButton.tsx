import { useEffect } from 'react'

import { useZendesk, ZendeskChat } from '@/components/shared/ZendeskChat'
import { Button } from '@/components/ui-kit/Button'
import { ChatIcon } from '@/images'
import { useAnalytics } from '@/modules/analytics'

export const SupportChatButton = () => {
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
      <Button
        Icon={<ChatIcon />}
        viewType={'tertiary'}
        size={'small'}
        onClick={() => {
          analytics.supportWidgetOpened()
          openZendeskChat()
        }}
      />
      {isZendeskLoaded && <ZendeskChat isVisible={isVisibleZendeskButton} />}
    </>
  )
}
