import { FC, ReactNode } from 'react'

import { DropdownOldDeprecated } from '@/components/ui-kit/form/DropdownOldDeprecated'

import { Popup } from './Popup'
import type { ContentType } from './types'

type Props = {
  offset?: [number, number]
  hideForSession?: () => void
  contentType?: ContentType
  onShare?: () => void
  url: string
  className?: string
  children: ReactNode
}

export const ShareDropdown: FC<Props> = ({
  url,
  offset,
  hideForSession,
  onShare,
  children,
  contentType,
  className,
}) => {
  return (
    <DropdownOldDeprecated
      className={className}
      showArrowIcon={false}
      placement={'bottom'}
      offset={offset}
      button={() => {
        return <>{children}</>
      }}
      hideForSession={hideForSession}
      popup={({ onClose }) => {
        return (
          <Popup
            onClose={onClose}
            url={url}
            contentType={contentType}
            onShare={onShare}
          />
        )
      }}
    />
  )
}
