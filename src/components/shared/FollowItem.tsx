import React, { MouseEvent, ReactNode, useCallback, useState } from 'react'
import styled from '@emotion/styled'

import { Avatar } from '@/components/ui-kit/Avatar'
import { FollowButton } from '@/components/ui-kit/FollowButton'
import { useAuthGlobalModals } from '@/modules/authorization/authorization'
import { getColorTheme } from '@/styles/themes'

const Styled = {
  Content: styled.div`
    margin-right: 1.6rem;
    flex-grow: 1;
    overflow: hidden;
  `,
  Description: styled.span`
    color: ${getColorTheme('mercury')};
    display: block;
    font-size: 1.4rem;
    letter-spacing: -0.04em;
    line-height: 2rem;
  `,
  Preview: styled(Avatar)`
    margin-right: 1.2rem;

    cursor: pointer;
  `,
  Title: styled.h3`
    color: ${getColorTheme('sun')};
    font-size: 1.4rem;
    margin: 0;
    line-height: 2rem;
    letter-spacing: -0.04em;
    font-weight: 500;
  `,
  Wrapper: styled.div`
    align-items: center;
    background-color: #ffffff;
    border-radius: 1.2rem;
    display: flex;
    position: relative;
  `,
}

export type Props = {
  defaultChecked?: boolean
  description: ReactNode
  onChange?: (checked: boolean) => void
  previewUrl?: string
  title: ReactNode
  className?: string
  onPreviewClick?: () => void
}

export const FollowItem = React.memo<Props>(
  ({
    defaultChecked = false,
    description,
    onPreviewClick = () => {},
    onChange = null,
    previewUrl,
    title,
    className,
  }) => {
    const [isNotHavePermission, showModal] = useAuthGlobalModals('follow')
    const [buttonChecked, setButtonChecked] = useState(defaultChecked)

    const handleButtonClick = useCallback(
      (event: MouseEvent) => {
        event.preventDefault()
        if (isNotHavePermission) {
          showModal()
          return
        }

        setButtonChecked((value) => {
          if (onChange !== null) {
            onChange(!value)
          }

          return !value
        })
      },
      [isNotHavePermission, showModal, onChange],
    )

    return (
      <Styled.Wrapper className={className}>
        {previewUrl && (
          <Styled.Preview
            onClick={onPreviewClick}
            size={'medium'}
            src={previewUrl}
          />
        )}
        <Styled.Content>
          <Styled.Title>{title}</Styled.Title>
          <Styled.Description>{description}</Styled.Description>
        </Styled.Content>
        <FollowButton
          subscribed={!buttonChecked}
          onFollow={handleButtonClick}
          onUnfollow={handleButtonClick}
        />
      </Styled.Wrapper>
    )
  },
)
