import { VFC } from 'react'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'

import { ProfileMeta } from '@/components/screens/ProfileScreen/ProfileMeta'
import { Layout } from '@/components/shared/layout'
import { Activity } from '@/components/ui-kit/Activity'
import { InfinityScrollProvider } from '@/modules/infinity-scroll'
import {
  QUERY_GET_PUBLIC_PROFILE,
  QUERY_GET_USER_PROFILE,
} from '@/modules/profile'
import { mobileMedia, notMobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

import { PostsSectionContent } from './posts/PostsSectionContent'
import { ProfileLayout } from './ProfileLayout'
import { Section } from './Section'

type Props = {
  userName: string
}
export const ProfileScreen: VFC<Props> = ({ userName }) => {
  const {
    loading: isLoadingProfileInfo,
    data: profileInfoData,
    error: profileInfoError,
  } = useQuery(QUERY_GET_PUBLIC_PROFILE, { variables: { userName }, ssr: true })
  const { data: userProfile } = useQuery(QUERY_GET_USER_PROFILE, { ssr: true })

  if (isLoadingProfileInfo || profileInfoError) {
    return (
      <Layout isMobileHeaderHidden>
        <Loader>
          <Activity />
        </Loader>
      </Layout>
    )
  }

  const isMyProfile = !!(
    userProfile?.getUserProfile &&
    userProfile.getUserProfile.userName === userName
  )

  const { userId, firstName, photoUrl, coverUrl, lastName } =
    profileInfoData!.getPublicProfileByUserName!
  const hasPhotoAndCover = !!photoUrl && !!coverUrl

  return (
    <>
      <ProfileMeta
        firstName={firstName}
        lastName={lastName}
        userName={userName}
        photoUrl={photoUrl}
      />
      <Layout isMobileHeaderHidden>
        <Container>
          <InfinityScrollProvider>
            <PostsSectionContent
              hasPhotoAndCover={hasPhotoAndCover}
              firstName={firstName}
              isMyProfile={isMyProfile}
              userId={userId}
            />
          </InfinityScrollProvider>
          <InfoSection>
            <ProfileLayout
              isMyProfile={isMyProfile}
              profile={profileInfoData!.getPublicProfileByUserName!}
              userName={userName}
            />
          </InfoSection>
        </Container>
      </Layout>
    </>
  )
}

const Container = styled.div`
  background-color: ${getColorTheme('earth')};

  ${notMobileMedia} {
    border-radius: 12px;
    display: grid;
    grid-auto-columns: 1fr;
    grid-auto-flow: column;
    column-gap: 24px;
    flex-grow: 1;
  }

  ${mobileMedia} {
    padding: 0;
    height: 100%;
    padding-bottom: 4.9rem;

    display: flex;
    flex-direction: column;

    overflow-y: auto;

    border-radius: 0;
    grid-auto-flow: row;
  }
`

const Loader = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 40px;
`
const InfoSection = styled(Section)`
  display: flex;
  align-items: center;
  justify-content: center;
`
