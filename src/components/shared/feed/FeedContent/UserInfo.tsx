import { FC } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'

import { Avatar } from '@/components/ui-kit/Avatar'
import { FeedItem } from '@/modules/feed'
import { ROUTES } from '@/modules/router'
import { useTimePassed } from '@/modules/utils/time-passed'
import { mobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

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
  region?: FeedItem['region']
  className?: string
  group?: FeedItem['group']
  isOnDetailedPage?: boolean
  isInPost?: boolean
}

export const UserInfo: FC<Props> = ({
  user,
  avatarClassName,
  region,
  createdAt,
  className,
  group,
  isOnDetailedPage,
  isInPost,
}) => {
  const router = useRouter()

  const isOnGroupPage = router.pathname === ROUTES.group.as

  const timePassed = useTimePassed(createdAt ?? new Date().toISOString())

  let publishInfo = region ? (
    <Link
      href={ROUTES.area.calcUrl({ regionSlug: region.slug })}
      passHref
      shallow
    >
      <LocationLink>
        <LocationName>{region.name}</LocationName>
        {createdAt && <TimeInInfo>{timePassed}</TimeInInfo>}
      </LocationLink>
    </Link>
  ) : null

  if (group && isOnGroupPage) {
    publishInfo = <TimeInInfo>{timePassed}</TimeInInfo>
  }

  return (
    <Container className={className} isInPost={isInPost}>
      <AvatarWrapper>
        {group && !isOnGroupPage && !isOnDetailedPage ? (
          <Link
            href={ROUTES.group.calcUrl({ groupSlug: group.slug })}
            passHref
            shallow
          >
            {/*eslint-disable-next-line jsx-a11y/anchor-is-valid*/}
            <a>
              <Avatar
                src={group.avatar ?? undefined}
                size={'medium'}
                shape={'square'}
                className={avatarClassName}
                profileName={`${user.firstName} ${user.lastName}`}
                badge={
                  <AvatarBadge
                    src={user.photoUrl}
                    size={'xSmall'}
                    className={avatarClassName}
                    profileName={`${user.firstName} ${user.lastName}`}
                    withStroke
                  />
                }
              />
            </a>
          </Link>
        ) : (
          <Link
            href={ROUTES.publicProfile.calcUrl({ userName: user.userName })}
            passHref
            shallow
          >
            {/*eslint-disable-next-line jsx-a11y/anchor-is-valid*/}
            <a>
              <Avatar
                src={user.photoUrl}
                size={'medium'}
                className={avatarClassName}
                profileName={`${user.firstName} ${user.lastName}`}
                isLazyLoad
              />
            </a>
          </Link>
        )}
      </AvatarWrapper>
      <InfoWrapper>
        {group && !isOnGroupPage && !isOnDetailedPage ? (
          <Link
            href={ROUTES.group.calcUrl({ groupSlug: group.slug })}
            passHref
            shallow
          >
            {/*eslint-disable-next-line jsx-a11y/anchor-is-valid*/}
            <a>
              <Name>{`${group.name}`}</Name>
            </a>
          </Link>
        ) : (
          <Link
            href={ROUTES.publicProfile.calcUrl({ userName: user.userName })}
            passHref
            shallow
          >
            {/*eslint-disable-next-line jsx-a11y/anchor-is-valid*/}
            <a>
              <Name>{`${user.firstName} ${user.lastName}`}</Name>
            </a>
          </Link>
        )}
        <PublishInfo>{publishInfo}</PublishInfo>
      </InfoWrapper>
    </Container>
  )
}

const Container = styled.div<{ isInPost: boolean | undefined }>`
  display: flex;

  ${({ isInPost }) =>
    isInPost
      ? `
      gap: 1.6rem;

      ${mobileMedia} {
        gap: 0.8rem;
      }`
      : ''}
`
const AvatarWrapper = styled.div`
  position: relative;
`

const AvatarBadge = styled(Avatar)`
  &:hover::after {
    opacity: 0;
  }
`

const Name = styled.div`
  padding-bottom: 0.4rem;

  font-size: 1.4rem;
  letter-spacing: -0.04em;
  line-height: 18px;
  font-weight: 500;
  color: ${getColorTheme('sun')};

  &:hover {
    opacity: 0.5;
  }
`
const PublishInfo = styled.div`
  display: flex;

  letter-spacing: -0.04em;
  font-size: 14px;
  line-height: 18px;
  color: ${(props) => props.theme.mercury};
`
const LocationName = styled.span`
  margin-right: 0.8rem;
`
const TimeInInfo = styled.div`
  white-space: nowrap;
`
const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const LocationLink = styled.a`
  display: flex;
  flex-wrap: nowrap;

  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
`
