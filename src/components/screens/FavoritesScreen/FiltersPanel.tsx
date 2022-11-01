import { FC } from 'react'
import { createPortal } from 'react-dom'
import styled from '@emotion/styled'

import { StickyBehavior, useFiltersSticky } from '@/components/shared/filters'
import { OrderFilter } from '@/components/shared/filters/OrderFilter'
import { TransactionTypeFilter } from '@/components/shared/filters/TransactionTypeFilter'
import { useIsDesktopDevice } from '@/modules/device'
import { mobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

type Props = {
  className?: string
}

export const FiltersPanel: FC<Props> = ({ className }) => {
  const isDesktopDevice = useIsDesktopDevice()
  const { isFixed, scrollElementRef, targetElementRef } = useFiltersSticky()

  const content = (
    <Container className={className} ref={targetElementRef}>
      <OrderFilter isOnlyIcon={!isDesktopDevice} />
      <TransactionTypeFilter />
    </Container>
  )

  return (
    <>
      {content}
      {isFixed && scrollElementRef.current
        ? createPortal(
            <StickyBehavior>{content}</StickyBehavior>,
            scrollElementRef.current,
          )
        : null}
    </>
  )
}

const Container = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 0.8rem;
  justify-content: start;

  ${mobileMedia} {
    background-color: ${getColorTheme('earth')};
  }
`
