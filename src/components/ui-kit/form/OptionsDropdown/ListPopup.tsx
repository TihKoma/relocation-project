import { FC, ReactElement, useCallback } from 'react'
import styled from '@emotion/styled'

import { ItemOptionsList, OnClickOptionsList, OptionsList } from './OptionsList'

const Popup = styled.div`
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.08),
    0px 3.78px 33.4221px rgba(0, 0, 0, 0.0503198),
    0px 41.7776px 33.4221px rgba(0, 0, 0, 0.0503198);
  border-radius: 12px;
`

type Props = {
  onClose?: () => void
  items: ItemOptionsList[]
  onClick: OnClickOptionsList
  activeId?: string
  footer?: ReactElement | null
}

export const ListPopup: FC<Props> = ({
  onClose,
  onClick,
  items,
  activeId,
  footer,
}) => {
  const onClickAndClose = useCallback(
    async (id: string) => {
      await onClick?.(id)
      onClose?.()
    },
    [onClick, onClose],
  )

  return (
    <Popup>
      <OptionsList
        items={items}
        onClick={onClickAndClose}
        activeId={activeId}
      />
      {footer}
    </Popup>
  )
}
