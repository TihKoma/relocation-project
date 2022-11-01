import { useEffect, VFC } from 'react'
import { Global } from '@emotion/react'

const ZENDESK_BUTTON_SELECTOR = 'div iframe[style*="webSDKOnLoad"]'
const NODE_ID = 'ze-snippet'

type Props = {
  isVisible: boolean
}
export const ZendeskChat: VFC<Props> = ({ isVisible }) => {
  useEffect(() => {
    // Load this way, 'cause zendesk is 1MB
    if (!document.getElementById(NODE_ID)) {
      const script = document.createElement('script')
      script.src = `https://static.zdassets.com/ekr/snippet.js?key=39931262-fe88-4e76-bc1e-b8b7e81e37ce`
      script.id = NODE_ID

      document.head.appendChild(script)
    }
  }, [])

  return (
    <>
      <Global
        styles={{
          [ZENDESK_BUTTON_SELECTOR]: {
            visibility: isVisible ? 'visible' : 'hidden',
          },
        }}
        key={isVisible ? 'visible-ZendeskChat' : 'hidden-ZendeskChat'}
      />
    </>
  )
}
