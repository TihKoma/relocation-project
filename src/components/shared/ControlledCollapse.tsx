import { FC, ReactNode, useRef, useState } from 'react'
import styled from '@emotion/styled'

import { NormalizedButton } from '@/components/ui-kit/Button'
import { getColorTheme } from '@/styles/themes'

type Props = {
  collapsedHeight: number
  className?: string
  renderPredicate?: boolean
  children: ReactNode
}

export const ControlledCollapse: FC<Props> = ({
  children,
  collapsedHeight,
  className,
  renderPredicate,
}) => {
  const collapseRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [isPropertiesListOpen, setIsPropertiesListOpen] = useState(false)
  const handleExpandButtonClick = () => {
    const newMaxHeightValue = isPropertiesListOpen
      ? collapsedHeight
      : contentRef?.current?.clientHeight
    collapseRef?.current?.style.setProperty(
      'max-height',
      `${newMaxHeightValue}px`,
    )
    setIsPropertiesListOpen((value) => !value)
  }

  return renderPredicate ? (
    <div>
      <Collapse
        ref={collapseRef}
        collapsedHeight={collapsedHeight}
        className={className}
      >
        <div ref={contentRef}>{children}</div>
      </Collapse>
      <ExpandButton onClick={handleExpandButtonClick}>
        {isPropertiesListOpen ? 'less' : 'more'}
      </ExpandButton>
    </div>
  ) : (
    <>{children}</>
  )
}

const Collapse = styled.div<{ collapsedHeight: number }>`
  position: relative;

  overflow: hidden;
  transition: max-height 150ms;

  max-height: ${({ collapsedHeight }) => collapsedHeight}px;
`
const ExpandButton = styled(NormalizedButton)`
  margin-top: 8px;

  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.04em;
  color: ${getColorTheme('mercury')};
`
