import { FC, useRef } from 'react'
import styled from '@emotion/styled'

import { mobileMedia } from '@/styles/media'

import { FactorsScoreProps, TotalButton as TotalButtonBase } from './shared'

export const Desktop: FC<FactorsScoreProps> = ({
  total,
  onOpen,
  onClose,
  totalSessionsCount,
  isPreview,
}) => {
  const hoverTime = useRef<number | null>(null)
  const close = () => {
    // @ts-ignore
    hoverTime.current = setTimeout(() => {
      hoverTime.current = null
      onClose()
    }, 800)
  }
  const open = () => {
    if (hoverTime.current !== null) {
      clearTimeout(hoverTime.current)
    }
    onOpen()
  }
  return (
    <TotalButton
      onMouseEnter={open}
      onMouseLeave={close}
      total={total}
      totalSessionsCount={totalSessionsCount}
      isPreview={isPreview}
    />
  )
}

const TotalButton = styled(TotalButtonBase)`
  ${mobileMedia} {
    display: none;
  }
`
