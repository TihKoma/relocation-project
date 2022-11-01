import styled from '@emotion/styled'

import { mobileMedia } from '@/styles/media'

import { DropdownBase } from './Base'

export const DropdownDesktop = styled(DropdownBase)`
  ${mobileMedia} {
    display: none;
  }
`
