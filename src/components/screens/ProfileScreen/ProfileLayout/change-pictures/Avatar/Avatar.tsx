import { VFC } from 'react'
import styled from '@emotion/styled'

import { AvatarIcon as AvatarIconBase } from '@/images'
import { getColorTheme } from '@/styles/themes'

import { AddAvatarButton } from './AddAvatarButton'

type Props = {
  className?: string
  photoUrl?: string
  isMyProfile: boolean
}

export const Avatar: VFC<Props> = ({ className, photoUrl, isMyProfile }) => {
  return (
    <Container isEmpty={!photoUrl} className={className}>
      {photoUrl ? <AvatarImage src={photoUrl} /> : <AvatarIcon />}
      {!photoUrl && isMyProfile && <CustomAddAvatarButton />}
    </Container>
  )
}

const Container = styled.div<{ isEmpty: boolean }>`
  display: inline-block;

  position: relative;

  width: 16rem;
  height: 16rem;
`
const AvatarIcon = styled(AvatarIconBase)`
  border: 2px solid ${getColorTheme('earth')};
  background: ${getColorTheme('moon')};
  overflow: hidden;
  border-radius: 80px;
`

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;

  object-fit: cover;
  object-position: center center;
  border-radius: 80px;
`

const CustomAddAvatarButton = styled(AddAvatarButton)`
  position: absolute;
  right: 0;
  bottom: 0;
`
