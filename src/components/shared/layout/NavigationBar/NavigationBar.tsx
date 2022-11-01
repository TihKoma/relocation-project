import { VFC } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'

import { AllServicesButton } from '@/components/shared/layout/NavigationBar/AllServicesButton'
import { SupportButton } from '@/components/shared/layout/NavigationBar/SupportButton'
import { useNotificationsModal } from '@/components/shared/NotificationsModal/NotificationsContext'
import { NavLink } from '@/components/ui-kit/NavLink'
import { BellIcon, ProfileIcon as ProfileIconBase } from '@/images'
import { RelocationIcon as RelocationIconBase } from '@/images/navigation'
import { useAuthorizationStore } from '@/modules/authorization'
import { QUERY_GET_USER_PROFILE } from '@/modules/profile'
import { QUERY_RELOCATION_PROJECT } from '@/modules/relocation-project'
import { ROUTES } from '@/modules/router'
import { getColorTheme } from '@/styles/themes'

import { CustomButton } from './shared'

type Props = {
  className?: string
}

export const NAVIGATION_BAR_HEIGHT = 50

export const NavigationBar: VFC<Props> = ({ className }) => {
  const { data: userProfile } = useQuery(QUERY_GET_USER_PROFILE, { ssr: true })
  const [{ isLoggedIn }] = useAuthorizationStore()
  const router = useRouter()

  const profileUrl =
    isLoggedIn && userProfile?.getUserProfile?.userName
      ? ROUTES.publicProfile.calcUrl({
          userName: userProfile.getUserProfile.userName,
        })
      : ROUTES.login.calcUrl({})

  const { data: relocationProjectData } = useQuery(QUERY_RELOCATION_PROJECT)

  const relocationHref = relocationProjectData?.relocationProject
    ? ROUTES.dashboard.calcUrl()
    : ROUTES.relocationMarketplace.calcUrl({})

  const { openNotificationsModal } = useNotificationsModal()

  return (
    <NavigationBarList className={className}>
      <NavigationBarListItem>
        <CustomNavLink
          path={[
            ROUTES.relocationMarketplace.as,
            ROUTES.relocationMarketplaceServiceGroup.as,
            ROUTES.relocationMarketplaceService.as,
            ROUTES.dashboard.as,
          ]}
          href={relocationHref}
          shallow
        >
          <RelocationIcon />
          <span>Relocation</span>
        </CustomNavLink>
      </NavigationBarListItem>
      <NavigationBarListItem>
        <SupportButton />
      </NavigationBarListItem>
      <NavigationBarListItem>
        <AllServicesButton />
      </NavigationBarListItem>
      <NavigationBarListItem>
        <CustomButton
          onClick={() => {
            if (isLoggedIn) {
              openNotificationsModal()
            } else {
              router.push(ROUTES.login.calcUrl({ to: 'back' }))
            }
          }}
        >
          <BellIcon />
          <span>Notifications</span>
        </CustomButton>
      </NavigationBarListItem>
      <NavigationBarListItem>
        <CustomNavLink href={profileUrl} shallow>
          <ProfileImageWrapper withMarker={false}>
            {userProfile?.getUserProfile?.photoUrl ? (
              <Image
                src={userProfile?.getUserProfile?.photoUrl}
                alt={'user-avatar'}
              />
            ) : (
              <ProfileIcon />
            )}
          </ProfileImageWrapper>
          Profile
        </CustomNavLink>
      </NavigationBarListItem>
    </NavigationBarList>
  )
}

const NavigationBarList = styled.ul`
  display: flex;

  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 4;

  height: ${NAVIGATION_BAR_HEIGHT}px;

  padding: 0;
  margin: 0;

  background-color: ${getColorTheme('earth')};
  border-top: 1px solid ${getColorTheme('moon')};
  list-style: none;
`
const NavigationBarListItem = styled.li`
  flex-basis: 100%;
  padding: 4px;
`
const RelocationIcon = styled(RelocationIconBase)`
  margin-bottom: 0.6rem;

  position: relative;
  top: 0.3rem;

  stroke: none !important;
  fill: none !important;
`
const CustomNavLink = styled(NavLink)`
  display: grid;
  grid-auto-flow: row;
  align-items: center;
  justify-items: center;
  row-gap: 2px;

  color: ${getColorTheme('mercury')};
  font-size: 1.2rem;

  & svg {
    fill: ${getColorTheme('mercury')};
    stroke: ${getColorTheme('mercury')};
  }

  ${RelocationIcon} {
    path {
      fill: ${getColorTheme('mercury')};
    }
  }

  &.active,
  &:hover {
    color: ${getColorTheme('sun')};
    & svg {
      fill: ${getColorTheme('sun')};
      stroke: ${getColorTheme('sun')};
    }

    ${RelocationIcon} {
      path {
        fill: ${getColorTheme('sun')};
      }
    }
  }
`
const Image = styled.img`
  width: 2.2rem;
  height: 2.2rem;
  margin-bottom: 0.3rem;

  border-radius: 50%;
  overflow: hidden;
  object-fit: cover;
`
const ProfileImageWrapper = styled.div<{ withMarker: boolean }>`
  width: 2.4rem;
  height: 2.4rem;

  position: relative;
  display: inherit;
  align-items: inherit;
  justify-items: inherit;

  &:after {
    width: 0.6rem;
    height: 0.6rem;

    position: absolute;
    top: 0;
    right: -0.4rem;

    display: ${(props) => (props.withMarker ? 'block' : 'none')};

    content: '';
    background: ${getColorTheme('mars')};
    border-radius: 50%;
  }
`
const ProfileIcon = styled(ProfileIconBase)`
  stroke: ${getColorTheme('sun')};
`
