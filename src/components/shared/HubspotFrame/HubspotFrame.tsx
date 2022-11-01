import { FC, useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'

const HUBSPOT_LANDING_URL = 'https://nicity-22460673.hs-sites.com'
const HUBSPOT_GUIDE_URL = 'https://blog.nicity.com/usa-relocation-guide'

export type HubspotConfig = {
  handlers?: { type: 'click-button'; name: string; selector: string }[]
  withAddTasks?: boolean
}

type PageType = 'landing' | 'guide'

type Props = {
  slug: string
  type: PageType
  prefixUrl?: string
  onButtonClick?: (name: string, disabled: boolean) => void
  onDisabledElementClick?: () => void
  onAddTask?: (text: string) => void
  config?: HubspotConfig
  query?: [string, string][]
  withHash?: boolean
  onLoad?: (title: string, description: string) => void
}
export const HubspotFrame: FC<Props> = ({
  slug,
  onButtonClick,
  type = 'landing',
  prefixUrl = 'en',
  config,
  withHash,
  onDisabledElementClick,
  onAddTask,
  query,
  onLoad,
}) => {
  const frameRef = useRef<HTMLIFrameElement | null>(null)
  const [isInitHandlers, setIsInitHandlers] = useState(false)
  const [hash, setHash] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    if (withHash) {
      setHash(window.location.hash)
    }
  }, [withHash])

  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (event.origin.includes('nicity') && event.data.type) {
        switch (event.data.type) {
          case 'click-button': {
            if (
              event.data.payload.buttonName === 'link' &&
              event.data.payload.href
            ) {
              window.location.href = event.data.payload.href
              break
            }

            onButtonClick?.(
              event.data.payload.buttonName,
              !!event.data.payload.disabled,
            )
            break
          }
          case 'click-disabled-element': {
            onDisabledElementClick?.()
            break
          }
          case 'add-task': {
            onAddTask?.(event.data.payload.text)
            break
          }
          case 'load': {
            if (config && frameRef.current?.contentWindow) {
              frameRef.current.contentWindow.postMessage(
                createAction('set-config', { config }),
                '*',
              )

              if (onLoad) {
                const { title, description } = event.data.payload ?? {}
                onLoad(title, description)
              }
            }
            break
          }
          default: {
            // eslint-disable-next-line no-console
            console.log('There is not event type')
          }
        }
      }
    }
    window.addEventListener('message', handler, false)
    setIsInitHandlers(true)

    return () => {
      window.removeEventListener('message', handler)
    }
  }, [router, onLoad, config, onDisabledElementClick, onButtonClick, onAddTask])

  const src = useMemo(() => {
    const queryParams = query
      ? `?${query.map((item) => item.join('=')).join('&')}`
      : ''

    const domain = type === 'landing' ? HUBSPOT_LANDING_URL : HUBSPOT_GUIDE_URL

    return `${domain}/${prefixUrl}/${slug}${hash}${queryParams}`
  }, [type, prefixUrl, slug, query, hash])

  return slug && isInitHandlers ? <Frame src={src} ref={frameRef} /> : null
}

const Frame = styled.iframe`
  width: 100%;
  height: 100%;

  border: 0;
`

const createAction = (type: string, payload: Object) => ({
  type,
  payload,
})
