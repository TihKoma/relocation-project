import { VFC } from 'react'
import styled from '@emotion/styled'

import { GetPublicProfile_getPublicProfileByUserName as Profile } from '@/modules/profile/__generated__/GetPublicProfile'
import { mobileMedia, notMobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

import { Avatar } from './change-pictures/Avatar'
import { Cover } from './change-pictures/Cover'
import { FollowersAndFollowing, FollowUserButton } from './follow'
import { PlugsCarousel } from './PlugsCarousel'

type Props = {
  isMyProfile: boolean
  profile: Profile
  userName: string
}
export const ProfileLayout: VFC<Props> = ({
  isMyProfile,
  profile,
  userName,
}) => {
  const { firstName, lastName, bio, photoUrl, coverUrl, userId, subscribed } =
    profile

  return (
    <Container>
      <Cover
        isMyProfile={isMyProfile}
        coverUrl={coverUrl}
        photoUrl={photoUrl}
      />
      <ProfileContent>
        <CustomAvatar photoUrl={photoUrl} isMyProfile={isMyProfile} />
        <ProfileDescription>
          <UserName>{`${firstName} ${lastName}`} </UserName>
          {bio && <Bio>{bio}</Bio>}
          <FollowersAndFollowing userName={userName} />
        </ProfileDescription>
        {isMyProfile ? (
          <PlugsCarousel />
        ) : (
          <FollowUserButton
            userId={userId}
            subscribed={subscribed}
            from={'profile'}
          />
        )}
      </ProfileContent>
    </Container>
  )
}

const Container = styled.div`
  margin-bottom: auto;
  width: 100%;
  padding-bottom: 2.4rem;

  ${notMobileMedia} {
    background-color: ${getColorTheme('moon')};
  }

  ${mobileMedia} {
    background-color: ${getColorTheme('earth')};
  }
`

const ProfileContent = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;

  border-top-right-radius: 16px;
  border-top-left-radius: 16px;

  ${notMobileMedia} {
    padding-top: 5.2rem;
    padding-left: 2.4rem;
    padding-right: 2.4rem;
  }

  ${mobileMedia} {
    padding-top: 5.7rem;
    padding-left: 1.6rem;
    padding-right: 1.6rem;
  }
`

const CustomAvatar = styled(Avatar)`
  position: absolute;
  left: 50%;

  transform: translateX(-50%);
  border-radius: 100px;

  ${notMobileMedia} {
    top: -12rem;
  }

  ${mobileMedia} {
    top: -11.2rem;
  }
`

const ProfileDescription = styled.div`
  margin: 0 24px 16px;

  display: grid;
  row-gap: 8px;
`

const UserName = styled.h1`
  margin: 0;
  display: block;

  color: ${getColorTheme('sun')};
  font-size: 2rem;
  line-height: 2.4rem;
  text-align: center;
  font-weight: 400;
`

const Bio = styled.p`
  margin: 0;

  word-break: break-word;
  font-size: 1.4rem;
  line-height: 2rem;
  text-align: center;
`
