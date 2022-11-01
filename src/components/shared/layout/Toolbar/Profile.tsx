import { FC } from 'react'
import Link from 'next/link'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'

import { Avatar } from '@/components/ui-kit/Avatar'
import { Button } from '@/components/ui-kit/Button'
import { SignUp } from '@/images'
import { useAuthorizationStore } from '@/modules/authorization'
import { QUERY_GET_USER_PROFILE } from '@/modules/profile'
import { ROUTES } from '@/modules/router'

export const Profile: FC = () => {
  const { data: profileData } = useQuery(QUERY_GET_USER_PROFILE, {
    ssr: true,
  })
  const profile = profileData?.getUserProfile

  const [{ isLoggedIn }] = useAuthorizationStore()

  return isLoggedIn && profile?.userName ? (
    <Link
      href={ROUTES.publicProfile.calcUrl({
        userName: profile.userName,
      })}
      passHref
    >
      <AvatarWrapper>
        <Avatar src={profile.photoUrl} state={'zero'} />
      </AvatarWrapper>
    </Link>
  ) : (
    <Link href={ROUTES.login.calcUrl({})} passHref>
      <Button
        viewType={'primary'}
        size={'small'}
        Icon={<SignUp />}
        iconPosition={'right'}
      >
        Sign up
      </Button>
    </Link>
  )
}

const AvatarWrapper = styled.a`
  position: relative;
`
