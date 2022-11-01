import { ElementType, FC, forwardRef, MouseEventHandler } from 'react'
import styled from '@emotion/styled'
import { Strategy } from '@floating-ui/core'

import { showSuccessToast } from '@/components/shared/Toast'
import {
  EmailIcon,
  FacebookIcon,
  LinkIcon,
  TwitterIcon,
  WhatsAppIcon,
} from '@/images/share'
import { useAnalytics } from '@/modules/analytics'
import { getColorTheme } from '@/styles/themes'

import type { ContentType, SharingMethod } from './types'

type Props = {
  onClose?: () => void
  url: string
  className?: string
  contentType?: ContentType
  onShare?: () => void
  onClick?: (event: any) => void
  style?: {
    position: Strategy
    left: string | number
    top: string | number
  }
}

export const Popup = forwardRef<HTMLDivElement, Props>(
  ({ className, style, url, onClick, onClose, contentType, onShare }, ref) => {
    const handleCopyLink: MouseEventHandler = () => {
      navigator.clipboard.writeText(url)
      showSuccessToast('Link copied', {
        autoClose: 2000,
      })
      onClose?.()
      onShare?.()
    }
    return (
      <PopupContainer
        className={className}
        ref={ref}
        onClick={(event) => {
          event.preventDefault()
          event.stopPropagation()
          onClick?.(event)
        }}
        style={style}
      >
        <List>
          <Item onClick={handleCopyLink} key={'email'}>
            <LinkIcon />
            <TextWrapper>Copy link</TextWrapper>
          </Item>
          <ShareItem
            name={'Facebook'}
            Icon={FacebookIcon}
            link={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
            method={'facebook'}
            contentType={contentType}
            onShare={onShare}
          />
          <ShareItem
            name={'Twitter'}
            Icon={TwitterIcon}
            link={`https://twitter.com/share?url=${url}`}
            method={'twitter'}
            contentType={contentType}
            onShare={onShare}
          />
          <ShareItem
            name={'WhatsApp'}
            Icon={WhatsAppIcon}
            link={`https://api.whatsapp.com/send?text=${url}`}
            method={'whatsapp'}
            contentType={contentType}
            onShare={onShare}
          />
          <ShareItem
            name={'Email'}
            Icon={EmailIcon}
            link={`mailto:?body=${url}`}
            method={'email'}
            contentType={contentType}
            onShare={onShare}
          />
        </List>
      </PopupContainer>
    )
  },
)

type ItemProps = {
  Icon: ElementType
  link: string
  name: string
  method?: SharingMethod
  contentType?: ContentType
  onShare?: () => void
}

const ShareItem: FC<ItemProps> = ({
  Icon,
  link,
  name,
  method,
  contentType,
  onShare,
}) => {
  const analytics = useAnalytics()
  const handleClick = () => {
    if (method && contentType) {
      window.open(link, '_blank', 'noopener,noreferrer')
      analytics.shareButtonPress({ method, type: contentType })
    }
    onShare?.()
  }

  return (
    <Item key={name} onClick={handleClick}>
      <Icon />
      <TextWrapper>{`Share to ${name}`}</TextWrapper>
    </Item>
  )
}

const PopupContainer = styled.div`
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0px 3.7799999713897705px 33.422088623046875px 0px #0000000f,
    0px 2px 4px 0px #00000014;
`
const List = styled.ul`
  padding: 0.8rem 0;
  margin: 0;

  list-style: none;

  font-weight: 400;
`

const TextWrapper = styled.div`
  padding: 0.8rem 0;
  border-bottom: 1px solid #f0f1f6;
`

const Item = styled.li`
  padding: 0 1.8rem;

  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1.6rem;
  align-items: center;
  justify-content: start;

  white-space: nowrap;
  cursor: pointer;

  color: ${getColorTheme('sun')};

  &:hover {
    background-color: #f0f1f6;
  }

  &:last-child ${TextWrapper} {
    border-bottom: none;
  }
`
