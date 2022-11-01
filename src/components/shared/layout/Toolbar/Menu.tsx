import { FC } from 'react'

import { AppContextMenu } from '@/components/shared/AppContextMenu'
import { Dropdown } from '@/components/ui-kit/Dropdown'

import { MenuButton } from './MenuButton'

export const Menu: FC = () => {
  return (
    <>
      <Dropdown
        placement={'bottom-end'}
        isShowPopupOnHover
        buttonRender={({ isDropdownOpened, referenceProps }) => (
          <MenuButton
            isDropdownOpened={isDropdownOpened}
            referenceProps={referenceProps}
          />
        )}
      >
        {() => <AppContextMenu />}
      </Dropdown>
    </>
  )
}
