import { FC } from 'react'
import styled from '@emotion/styled'

import { Avatar as AvatarBase } from '@/components/ui-kit/Avatar'
import { mobileMedia } from '@/styles/media'

import { StageSelector } from './StageSelector'

type Props = {
  // TODO: add common type
  user: {
    photoUrl: string
    userName: string
    firstName: string
    lastName: string
  }
  createdAt?: string
  avatarClassName?: string
  className?: string
  linkDetailedPage?: string
}

export const UserInfo: FC<Props> = ({ user, avatarClassName, className }) => {
  const username = `${user.firstName} ${user.lastName}`

  return (
    <Container className={className}>
      <Avatar
        src={user.photoUrl}
        size={'medium'}
        className={avatarClassName}
        profileName={username}
      />
      <InfoWrapper>
        <Name>{username}</Name>
        <StageSelector />
        {/*<Location*/}
        {/*  error={touchedFields.content && !region}*/}
        {/*  onClick={() => {*/}
        {/*    setFormStage('neighborhood')*/}
        {/*  }}*/}
        {/*>*/}
        {/*  {locationTitle} <ArrowDownIcon />*/}
        {/*</Location>*/}
      </InfoWrapper>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
`
const Avatar = styled(AvatarBase)`
  margin-right: 16px;

  ${mobileMedia} {
    margin-right: 8px;
  }
`
const Name = styled.div`
  padding-bottom: 0.4rem;

  font-size: 1.4rem;
  letter-spacing: -0.04em;
  line-height: 18px;
  font-weight: 500;
  color: ${(props) => props.theme.sun};
`
const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
