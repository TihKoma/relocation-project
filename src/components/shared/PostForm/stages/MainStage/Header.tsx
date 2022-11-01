import { FC } from 'react'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'

import { Button } from '@/components/ui-kit/Button'
import { ReactComponent as CloseIcon } from '@/images/close.svg'
import { useAnalytics } from '@/modules/analytics'
import { QUERY_GET_USER_PROFILE } from '@/modules/profile'
import { mobileMedia } from '@/styles/media'

import { UserInfo as UserInfoBase } from './UserInfo'

type Props = {
  title: string
  onClose: () => void
}
export const Header: FC<Props> = ({ title, onClose }) => {
  const analytics = useAnalytics()
  const { data: profileQuery } = useQuery(QUERY_GET_USER_PROFILE, {
    ssr: false,
  })
  const profile = profileQuery?.getUserProfile

  if (!profile) {
    // eslint-disable-next-line no-console
    console.error('Have not profile in PostForm')
    return null
  }

  return (
    <>
      <Title>{title}</Title>
      <ButtonClose
        size={'small'}
        viewType={'ghost'}
        Icon={<CloseIcon />}
        onClick={() => {
          analytics?.closeCreationPost()
          onClose()
        }}
      />
      <UserInfo user={profile} />
    </>
  )
}

const ButtonClose = styled(Button)`
  position: absolute;
  top: 1.6rem;
  right: 1.6rem;
`
const UserInfo = styled(UserInfoBase)`
  margin-bottom: 12px;
`
const Title = styled.div`
  margin-bottom: 16px;

  font-size: 28px;
  line-height: 36px;
  ${mobileMedia} {
    margin: 0 -16px 16px;
    padding: 0 16px 16px;

    font-size: 24px;
    line-height: 30px;

    border-bottom: 1px solid #f0f1f7;
  }
  letter-spacing: -0.06em;
  color: #000000;
`
