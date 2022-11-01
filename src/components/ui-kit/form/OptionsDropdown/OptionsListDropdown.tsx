import { FC, ReactElement, ReactNode, useCallback } from 'react'
import { CSSObject } from '@emotion/styled'
import { SerializedStyles } from '@emotion/utils'

import {
  DropdownComponentsProps,
  DropdownOldDeprecated,
} from '@/components/ui-kit/form/DropdownOldDeprecated'

import { ListPopup } from './ListPopup'
import { ItemOptionsList, OnClickOptionsList } from './OptionsList'

type Props = {
  button: (props: DropdownComponentsProps) => ReactNode
  items: ItemOptionsList[]
  onClick: OnClickOptionsList
  activeId?: string
  containerCss?: SerializedStyles | CSSObject
  showArrowIcon?: boolean
  footer?: ReactElement | null
  onOpened?: () => void
}

export const OptionsListDropdown: FC<Props> = ({
  button,
  items,
  onClick,
  activeId,
  containerCss,
  showArrowIcon = false,
  footer,
  onOpened,
}) => {
  const PopupWrapper = useCallback(
    ({ onClose }: { onClose?: () => void }) => (
      <ListPopup
        onClose={onClose}
        onClick={onClick}
        items={items}
        activeId={activeId}
        footer={footer}
      />
    ),
    [items, onClick, activeId, footer],
  )

  return (
    <DropdownOldDeprecated
      button={button}
      popup={PopupWrapper}
      containerCss={containerCss}
      showArrowIcon={showArrowIcon}
      onOpened={onOpened}
    />
  )
}
