import { FC } from 'react'
import styled from '@emotion/styled'

import { useEditProfileModal } from '@/components/shared/EditProfileModal'
import { Option } from '@/components/ui-kit/form/Options'
import {
  CareersIcon,
  EditProfileIcon,
  FavoriteEmptyIcon as FavoriteEmptyIconBase,
  LogoutIcon,
  PrivacyPolicyIcon,
} from '@/images'
import { ReactComponent as MagnifierIconBase } from '@/images/mag.svg'
import { useAuthorizationStore } from '@/modules/authorization'
import { ROUTES } from '@/modules/router'
import { getColorTheme } from '@/styles/themes'

export const AppContextMenu: FC = () => {
  const [{ isLoggedIn }, { logout }] = useAuthorizationStore()

  const { showModal } = useEditProfileModal()

  return (
    <>
      {isLoggedIn && (
        <Option icon={<EditProfileIcon />} onClick={() => showModal('full')}>
          Edit profile
        </Option>
      )}
      {isLoggedIn && (
        <a href={ROUTES.favorites.calcUrl()}>
          <Option icon={<FavoriteEmptyIcon />}>Favorites Real Estate</Option>
        </a>
      )}
      {isLoggedIn && (
        <a href={ROUTES.savedSearches.calcUrl()}>
          <Option icon={<MagnifierIcon />}>Saved searches</Option>
        </a>
      )}
      <a
        href={'https://about.nicity.com/legal/privacy_policy'}
        target={'_blank'}
        rel={'noreferrer'}
      >
        <Option icon={<PrivacyPolicyIcon />}>Privacy policy</Option>
      </a>
      <a href={'https://jobs.nicity.com/'} target={'_blank'} rel={'noreferrer'}>
        <Option icon={<CareersIcon />}>Careers</Option>
      </a>
      {isLoggedIn && (
        <Option icon={<LogoutIcon />} onClick={logout}>
          Log out
        </Option>
      )}
      <Footer>© 2022 nicity</Footer>
    </>
  )
}

const Footer = styled(Option)`
  pointer-events: none;

  color: ${getColorTheme('mercury')};
  font-size: 1.4rem;
`
const FavoriteEmptyIcon = styled(FavoriteEmptyIconBase)`
  width: 2.4rem;
`
const MagnifierIcon = styled(MagnifierIconBase)`
  margin-left: 0.3rem;
`
