import { VFC } from 'react'
import Link from 'next/link'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'

import { Avatar } from '@/components/ui-kit/Avatar'
import { NormalizedButton } from '@/components/ui-kit/Button'
import { ButtonRenderOptions } from '@/components/ui-kit/Dropdown'
import { ReactComponent as ThreeDotsIconBase } from '@/images/three-dots.svg'
import { useAuthorizationStore } from '@/modules/authorization'
import { QUERY_GET_USER_PROFILE } from '@/modules/profile'
import { ROUTES } from '@/modules/router'
import { HOVER_TRANSITION_TIME } from '@/styles/const'
import { getColorTheme } from '@/styles/themes'

type Props = {
  onClick?: () => void
} & ButtonRenderOptions
export const MenuButton: VFC<Props> = ({
  isDropdownOpened,
  referenceProps,
}) => {
  const { data: profileData } = useQuery(QUERY_GET_USER_PROFILE, {
    ssr: true,
  })
  const profile = profileData?.getUserProfile

  const [{ isLoggedIn }] = useAuthorizationStore()

  return isLoggedIn && profile ? (
    <Link
      href={ROUTES.publicProfile.calcUrl({ userName: profile?.userName })}
      passHref
    >
      <AvatarWrapper {...referenceProps} withMarker={false}>
        <Avatar src={profile?.photoUrl} state={'zero'} />
      </AvatarWrapper>
    </Link>
  ) : (
    <ThreeDotsButton isOpen={isDropdownOpened} {...referenceProps}>
      <ThreeDotsIcon />
    </ThreeDotsButton>
  )
}

const AvatarWrapper = styled.a<{ withMarker: boolean }>`
  position: relative;

  display: inline-block;

  &:before {
    width: 0.6rem;
    height: 0.6rem;

    display: ${(props) => (props.withMarker ? 'block' : 'none')};

    position: absolute;
    top: 0;
    right: 0;

    content: '';
    border-radius: 50%;
    background: ${getColorTheme('mars')};
  }
`
const ThreeDotsIcon = styled(ThreeDotsIconBase)`
  fill: ${getColorTheme('sun')};
`
const ThreeDotsButton = styled(NormalizedButton)<{ isOpen: boolean }>`
  width: 4rem;
  height: 4rem;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  ${(props) =>
    props.isOpen ? `background: ${getColorTheme('moon')(props)};` : ''}

  cursor: pointer;

  transition: ${HOVER_TRANSITION_TIME};
  &:hover {
    background: ${getColorTheme('moon')};
  }
`
