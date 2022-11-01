import { VFC } from 'react'

import { Props } from './Base'
import { DropdownDesktop } from './Desktop'
import { DropdownMobileStyled } from './Mobile'

export const Dropdown: VFC<Omit<Props, 'label'>> = (props) => {
  const label = `Enter state, county, metro area, city`
  return (
    <>
      <DropdownDesktop {...props} label={label} />
      <DropdownMobileStyled {...props} label={label} />
    </>
  )
}
