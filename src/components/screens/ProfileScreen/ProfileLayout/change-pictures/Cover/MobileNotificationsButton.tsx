import { FC } from 'react'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'

import { useNotificationsModal } from '@/components/shared/NotificationsModal/NotificationsContext'
import { BellIcon } from '@/images'
import { QUERY_GET_USER_PROFILE } from '@/modules/profile'
import { getColorTheme } from '@/styles/themes'

import { CircleButton } from './CircleButton'

type Props = {
  className?: string
}
export const MobileNotificationsButton: FC<Props> = ({ className }) => {
  const { openNotificationsModal } = useNotificationsModal()

  const { data: profileData } = useQuery(QUERY_GET_USER_PROFILE)
  const profile = profileData?.getUserProfile

  const newNotificationsTotal = profile?.newNotificationsCount

  return (
    <Container className={className}>
      <CircleButton onClick={openNotificationsModal} withBackground>
        <BellIcon />
      </CircleButton>
      {newNotificationsTotal ? (
        <Badge>
          {newNotificationsTotal > 99 ? '99+' : newNotificationsTotal}
        </Badge>
      ) : null}
    </Container>
  )
}

const Container = styled.div`
  position: relative;
`
const Badge = styled.div`
  padding: 0 0.4rem;

  position: absolute;
  top: -0.3rem;
  left: 2.7rem;

  background-color: ${getColorTheme('mars')};
  border-radius: 12px;

  color: ${getColorTheme('earth')};
  font-size: 1.2rem;
  line-height: 1.6rem;
`
