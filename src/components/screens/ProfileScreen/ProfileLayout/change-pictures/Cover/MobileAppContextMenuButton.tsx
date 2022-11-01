import { FC } from 'react'
import styled from '@emotion/styled'

import { AppContextMenu } from '@/components/shared/AppContextMenu'
import { Dropdown } from '@/components/ui-kit/Dropdown'
import { ReactComponent as ThreeDotsIconBase } from '@/images/three-dots.svg'
import { getColorTheme } from '@/styles/themes'

import { CircleButton } from './CircleButton'

type Props = {
  className?: string
  withBackground?: boolean
}
export const MobileAppContextMenuButton: FC<Props> = ({
  className,
  withBackground,
}) => {
  return (
    <div className={className}>
      <Dropdown
        placement={'bottom-end'}
        buttonRender={({ isDropdownOpened, referenceProps }) => (
          <CircleButton
            isDropdownOpened={isDropdownOpened}
            withBackground={withBackground}
            referenceProps={referenceProps}
          >
            <ThreeDotsIcon />
          </CircleButton>
        )}
      >
        {() => <AppContextMenu />}
      </Dropdown>
    </div>
  )
}

const ThreeDotsIcon = styled(ThreeDotsIconBase)`
  fill: ${getColorTheme('sun')};
`
