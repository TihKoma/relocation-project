import { useState, VFC } from 'react'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'

import { ProfilesCounter as ProfilesCounterBase } from '@/components/shared/ProfilesCounter'
import { QUERY_GET_PUBLIC_PROFILE } from '@/modules/profile'

import { ListModal } from './ListModal'

type Props = {
  userName: string
}
export const FollowersAndFollowing: VFC<Props> = ({ userName }) => {
  const { data: publicProfileData } = useQuery(QUERY_GET_PUBLIC_PROFILE, {
    variables: { userName },
    fetchPolicy: 'cache-and-network',
  })

  const [openedModal, setOpenedModal] = useState<
    null | 'followers' | 'following'
  >(null)

  const openFollowersModal = () => {
    setOpenedModal('followers')
  }
  const openFollowingModal = () => {
    setOpenedModal('following')
  }
  const closeModal = () => {
    setOpenedModal(null)
  }

  const followingsCount =
    publicProfileData?.getPublicProfileByUserName?.followingsCount ?? 0
  const followersCount =
    publicProfileData?.getPublicProfileByUserName?.followersCount ?? 0

  const followingsPreview =
    publicProfileData?.getPublicProfileByUserName?.previewFollowings.map(
      (item) => item.photoUrl,
    )
  const followersPreview =
    publicProfileData?.getPublicProfileByUserName?.previewFollowers.map(
      (item) => item.photoUrl,
    )

  return (
    <>
      <Container>
        <ProfilesCounter
          label={'following'}
          pluralLabel={'following'}
          count={followingsCount}
          imagesSrc={followingsPreview}
          onClick={openFollowingModal}
        />
        <ProfilesCounter
          label={'follower'}
          pluralLabel={'followers'}
          count={followersCount}
          imagesSrc={followersPreview}
          onClick={openFollowersModal}
        />
      </Container>
      <ListModal
        openedModal={openedModal}
        onRequestClose={closeModal}
        userId={publicProfileData?.getPublicProfileByUserName?.userId || ''}
        userName={
          publicProfileData?.getPublicProfileByUserName?.firstName || ''
        }
      />
    </>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  column-gap: 24px;
`
const ProfilesCounter = styled(ProfilesCounterBase)`
  grid-auto-flow: row;
  justify-items: center;
`
