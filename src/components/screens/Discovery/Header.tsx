import React, { VFC } from 'react'
import Link from 'next/link'
import styled from '@emotion/styled'

import { FollowRegion } from '@/components/shared/FollowButton'
import { ProfilesCounter as ProfilesCounterBase } from '@/components/shared/ProfilesCounter'
import { Region } from '@/modules/map'
import { ROUTES } from '@/modules/router'
import { mobileMedia, notMobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

type Props = {
  regionInfo: Region
}

export const Header: VFC<Props> = ({ regionInfo }) => {
  const { id, name, subscribed, subscribersCount, subtitle } = regionInfo

  return (
    <Container>
      <Title>
        <Link
          href={ROUTES.areaDetail.calcUrl({ regionSlug: regionInfo.slug })}
          passHref
          shallow
        >
          {name}
        </Link>
      </Title>
      <Location>{subtitle}</Location>
      <ProfilesCounter
        count={subscribersCount}
        imagesSrc={regionInfo.previewFollowers.map((item) => item.photoUrl)}
        label={'follower'}
        pluralLabel={'followers'}
      />
      <FollowRegion regionId={id} isSubscribed={subscribed} />
    </Container>
  )
}

const Container = styled.div`
  height: min-content;
  padding: 1.6rem;

  position: relative;
  align-items: center;

  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr auto;

  background: linear-gradient(93.96deg, #5d54e6 6.11%, #d0cdfa 95.21%);

  color: #fff;

  ${mobileMedia} {
    padding-bottom: 3.2rem;

    gap: 0.5rem;
  }
  ${notMobileMedia} {
    margin-bottom: 1.6rem;

    border-radius: 1.2rem;
  }
`
const Title = styled.h1`
  margin: 0;

  grid-row: 1;
  grid-column: span 2;
  z-index: 1;

  font-weight: 400;
  font-size: 3.2rem;
  line-height: 90%;
  letter-spacing: -0.08em;

  ${mobileMedia} {
    font-size: 2.4rem;
    line-height: 3rem;
    letter-spacing: -0.04rem;
  }
`
const Location = styled.div`
  margin-bottom: 35px;

  grid-row: 2;
  grid-column: span 2;

  font-size: 1.4rem;
  letter-spacing: -0.04em;
  z-index: 1;
`
const ProfilesCounter = styled(ProfilesCounterBase)`
  justify-content: start;

  color: ${getColorTheme('earth')};
`
