import { FC, ReactNode } from 'react'
import styled from '@emotion/styled'

import { DropdownOldDeprecated as DropdownBase } from '@/components/ui-kit/form/DropdownOldDeprecated'
import { ReactionType } from '@/modules/reaction'

import { Popup } from './Popup'

type Props = {
  onClick: (id: ReactionType) => void
  disabled?: boolean
  children: ReactNode
}

export const ReactionsDropdown: FC<Props> = ({
  onClick,
  children,
  disabled,
}) => {
  return (
    <Dropdown
      showArrowIcon={false}
      placement={'top'}
      disabled={disabled}
      button={() => <>{children}</>}
      popup={({ onClose }) => <Popup onClick={onClick} onClose={onClose} />}
      isShowPopupOnHover
      offset={[0, 0]}
    />
  )
}

const Dropdown = styled(DropdownBase)`
  display: flex;
  align-items: center;
`
