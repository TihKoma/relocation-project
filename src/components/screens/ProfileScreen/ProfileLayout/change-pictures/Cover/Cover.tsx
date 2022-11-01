import { useMemo, VFC } from 'react'
import styled from '@emotion/styled'

import { useIsMobileDevice } from '@/modules/device'
import { mobileMedia, notMobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

import { AddCoverButton } from './AddCoverButton'
import { MobileAppContextMenuButton as MobileAppContextMenuButtonBase } from './MobileAppContextMenuButton'
import { MobileNotificationsButton as MobileNotificationsButtonBase } from './MobileNotificationsButton'

type Props = {
  isMyProfile: boolean
  coverUrl: string
  photoUrl: string
}
export const Cover: VFC<Props> = ({ isMyProfile, coverUrl, photoUrl }) => {
  const isAddCoverButtonVisible = useMemo(
    () => isMyProfile && photoUrl && !coverUrl,
    [photoUrl, coverUrl, isMyProfile],
  )
  const isMobile = useIsMobileDevice()

  return (
    <Container
      {...(coverUrl && { style: { backgroundImage: `url(${coverUrl})` } })}
    >
      {isAddCoverButtonVisible && <AddCoverButton />}
      {isMyProfile && isMobile && <MobileAppContextMenuButton withBackground />}
      {isMyProfile && isMobile && <MobileNotificationsButton />}
    </Container>
  )
}

const Container = styled.div`
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;

  ${notMobileMedia} {
    max-height: 29.1rem;
    height: 22vh;
    padding: 2.4rem 2.4rem 0 2.4rem;

    background-color: ${getColorTheme('moon')};
  }

  ${mobileMedia} {
    height: 13.1rem;
    padding: 1.6rem 2rem 0 1.6rem;

    position: relative;

    background-color: ${getColorTheme('earth')};
  }
`
const MobileAppContextMenuButton = styled(MobileAppContextMenuButtonBase)`
  ${mobileMedia} {
    position: absolute;
    top: 1.6rem;
    right: 1.6rem;
  }
`
const MobileNotificationsButton = styled(MobileNotificationsButtonBase)`
  position: absolute;
  top: 1.6rem;
  right: 6.8rem;

  ${notMobileMedia} {
    display: none;
  }
`
