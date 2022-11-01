import { FC, MouseEvent, ReactNode } from 'react'

import { Dropdown } from '@/components/ui-kit/Dropdown'
import { ThreeDotsButton } from '@/components/ui-kit/form/Options/ThreeDotsButton'

type Props = {
  className?: string
  onOpenChange?: (open: boolean) => void
  onClick?: (event: MouseEvent) => void
  children: ReactNode
  offset?: [number, number]
}

export const Options: FC<Props> = ({
  children,
  className,
  onOpenChange,
  onClick,
  offset,
}) => {
  return (
    <Dropdown
      className={className}
      offset={offset}
      onOpenChange={onOpenChange}
      onClick={onClick}
      buttonRender={({ referenceProps }) => (
        <ThreeDotsButton {...referenceProps} />
      )}
    >
      {({ closeDropdown }) => <div onClick={closeDropdown}>{children}</div>}
    </Dropdown>
  )
}
