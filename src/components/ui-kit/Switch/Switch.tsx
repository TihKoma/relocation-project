import { FC, MouseEvent, useEffect, useState } from 'react'
import styled from '@emotion/styled'

import { NormalizedButton } from '@/components/ui-kit/Button'
import { getColorTheme } from '@/styles/themes'

const NOT_ACTIVE_TAB_PADDING = 2
const ACTIVE_TAB_PADDING = 22

type Size = 'small' | 'medium' | 'big'

type Props = {
  defaultValue?: boolean
  size?: Size
  className?: string
  onChange?: (value: boolean) => boolean | void
}

export const Switch: FC<Props> = ({
  defaultValue = false,
  size = 'big',
  className,
  onChange,
}) => {
  const [offsetLeft, setOffsetLeft] = useState(
    defaultValue ? ACTIVE_TAB_PADDING : NOT_ACTIVE_TAB_PADDING,
  )
  const [isActive, setIsActive] = useState(defaultValue)

  useEffect(() => {
    setIsActive(defaultValue)
    setOffsetLeft(defaultValue ? ACTIVE_TAB_PADDING : NOT_ACTIVE_TAB_PADDING)
  }, [defaultValue])

  const onTabClick = (event: MouseEvent<HTMLButtonElement>, value: boolean) => {
    if (!onChange?.(value)) return

    if (value) setOffsetLeft(event.currentTarget.offsetLeft - 4)
    else setOffsetLeft(NOT_ACTIVE_TAB_PADDING + event.currentTarget.offsetLeft)

    setIsActive(value)
  }

  return (
    <TabContainer className={className} size={size} isActive={isActive}>
      <Tab
        onClick={(event) => {
          onTabClick(event, false)
        }}
      ></Tab>

      <Tab
        onClick={(event) => {
          onTabClick(event, true)
        }}
      ></Tab>

      <Slide style={{ left: offsetLeft }} size={size} />
    </TabContainer>
  )
}

const TabContainer = styled.div<{ size: Size; isActive: boolean }>`
  display: flex;
  align-items: center;

  width: 5.1rem;
  height: 3.1rem;

  position: relative;
  transition: 0.3s;

  background: ${({ isActive }) =>
    isActive ? getColorTheme('neptune') : getColorTheme('sun50')};
  border-radius: 6.4rem;
`

const Tab = styled(NormalizedButton)`
  height: 100%;
  flex: 1 1 0;

  user-select: none;

  font-weight: 500;
  text-align: center;
  letter-spacing: -0.04em;

  border-radius: 3.6rem;
`

const Slide = styled.div<{ size: Size }>`
  width: 2.7rem;
  height: 2.7rem;

  position: absolute;

  background: ${getColorTheme('earth')};
  box-shadow: 0px 2px 4px rgba(18, 21, 31, 0.08),
    0px 4px 16px 1px rgba(18, 21, 31, 0.08);
  border-radius: 3.6rem;

  transition: all 0.5s ease;
`
