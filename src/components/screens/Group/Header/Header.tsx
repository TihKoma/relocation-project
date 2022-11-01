import { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'

import { Avatar as AvatarBase } from '@/components/ui-kit/Avatar'
import { Button } from '@/components/ui-kit/Button'
import { FollowButton as FollowButtonBase } from '@/components/ui-kit/FollowButton'
import { TextCollapse } from '@/components/ui-kit/TextCollapse'
import { ArrowIcon } from '@/images'
import { DiversityIcon } from '@/images'
import { useIsNotMobileDevice } from '@/modules/device'
import { useFollowGroup, useUnfollowGroup } from '@/modules/group'
import { SearchGroups_searchGroups_groups } from '@/modules/group/graphql/__generated__/SearchGroups'
import { ROUTES } from '@/modules/router'
import { useIntersectionalObserver } from '@/modules/utils/useIntersectionalObserver'
import { mobileMedia, notMobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

import { Followers } from './Followers'
import { ShareButton } from './ShareButton'
// import { ReportButton } from './ReportButton'

export const SMALL_HEADER_SIZE = '6.8rem'

type Props = {
  group: SearchGroups_searchGroups_groups
}

export const Header: FC<Props> = ({ group }) => {
  const router = useRouter()
  const isNotMobile = useIsNotMobileDevice()

  const [isVisible, setIsVisible] = useState(true)

  const [useRef, entry] = useIntersectionalObserver({
    threshold: 0,
  })

  useEffect(() => {
    if (entry) {
      setIsVisible(entry?.isIntersecting)
    }
  }, [entry])

  const [followGroup, { loading: followGroupLoading }] = useFollowGroup({
    variables: {
      input: {
        subscriptableId: group.id,
      },
    },
  })

  const [unfollowGroup, { loading: unfollowGroupLoading }] = useUnfollowGroup({
    variables: {
      subscriptableId: group.id,
    },
  })

  const onBack = () => {
    const isNewPage = window.history.state.idx === 0

    if (isNewPage) {
      router.push(ROUTES.area.calcUrl({ regionSlug: group.region?.slug ?? '' }))
    } else {
      router.back()
    }
  }

  const onFollow = () => followGroup()
  const onUnfollow = () => unfollowGroup()

  return (
    <>
      {isNotMobile && (
        <SmallHeader isVisible={!isVisible}>
          <BackButton
            viewType={'ghost'}
            size={'small'}
            Icon={<ArrowIcon direction={'left'} />}
            onClick={onBack}
          />
          <SmallAvatar
            src={group.avatar ?? ''}
            shape={'square'}
            size={'medium'}
          />
          <Title as={'div'} oneLiner>
            {group.name}
          </Title>
          <FollowButton
            size={'small'}
            subscribed={!!group.members?.iAmIn}
            onFollow={onFollow}
            onUnfollow={onUnfollow}
            disabled={followGroupLoading || unfollowGroupLoading} // TODO replace with loading state, when it will be added to design system
            // isLoading={followGroupLoading || unfollowGroupLoading}
            withMargin
          />
          <ShareButton />
          {/*<ReportButton groupId={group.id} />*/}
        </SmallHeader>
      )}
      <Container ref={useRef} isVisible={isVisible}>
        <Top>
          <BackButton
            viewType={'ghost'}
            size={'small'}
            Icon={<ArrowIcon direction={'left'} />}
            onClick={onBack}
            data-test-id={'group-header:back-button'}
          />
          <Avatar src={group.avatar || ''} shape={'square'} size={'large'} />
          <Name>
            {(group?.region?.city || group?.region?.country) && (
              <Location>
                <TypePlace>{group.region?.placeType}&nbsp;</TypePlace>
                {[group.region.city, group.region.country].join(', ')}
              </Location>
            )}
            <Title>{group.name}</Title>
          </Name>
          <ShareButton />
          {/*<ReportButton groupId={group.id} />*/}
        </Top>
        <Bottom>
          <FollowButton
            size={'small'}
            subscribed={!!group.members?.iAmIn}
            onFollow={onFollow}
            onUnfollow={onUnfollow}
            disabled={followGroupLoading || unfollowGroupLoading} // TODO replace with loading state, when it will be added to design system
            // isLoading={followGroupLoading || unfollowGroupLoading}
          />
          <Followers
            previewFollowers={group.members?.profiles}
            total={group.members?.total ?? 0}
            groupId={group.id}
            groupName={group.name}
          />
          <GroupType>
            <DiversityIcon />
            Public
          </GroupType>
        </Bottom>
        <TextCollapse countRow={2}>{group.description}</TextCollapse>
      </Container>
    </>
  )
}

const Container = styled.div<{ isVisible: boolean }>`
  width: 100%;
  padding: 1.6rem;

  display: grid;
  grid-auto-flow: row;
  gap: 1.2rem;

  background: ${getColorTheme('earth')};
`
const Top = styled.div`
  display: flex;
  flex-direction: row;
`
const BackButton = styled(Button)`
  margin-right: 0.8rem;
`
const Avatar = styled(AvatarBase)`
  margin-right: 0.8rem;
`
const Name = styled.div`
  margin-right: 0.8rem;

  flex-grow: 1;
  display: grid;
  grid-auto-flow: row;
  gap: 0.8rem;
`
const Location = styled.div`
  overflow: hidden;

  font-size: 1.4rem;
  color: ${getColorTheme('mercury')};
  white-space: nowrap;
  text-overflow: ellipsis;
`
const TypePlace = styled.span`
  margin-right: 0.6rem;

  color: ${getColorTheme('sun')};
  text-transform: capitalize;

  font-weight: 500;
`
const Title = styled.h1<{ oneLiner?: boolean }>`
  margin: 0;

  flex-grow: 1;

  font-size: 2.8rem;
  font-weight: 500;
  color: ${getColorTheme('sun')};

  ${(props) => {
    if (props.oneLiner) {
      return `
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      `
    }
  }}
`
const Bottom = styled.div`
  display: grid;
  gap: 1.2rem;
  justify-content: start;

  ${notMobileMedia} {
    grid-auto-flow: column;
  }
  ${mobileMedia} {
    grid-template-columns: 1fr auto;
  }
`
const GroupType = styled.div`
  display: grid;
  gap: 0.4rem;
  align-items: center;
  justify-content: start;
  grid-auto-flow: column;

  font-size: 1.4rem;
  font-weight: 500;
`
const SmallHeader = styled.div<{ isVisible: boolean }>`
  width: 100%;
  height: ${SMALL_HEADER_SIZE};
  padding: 0 1.6rem;
  z-index: 1;

  position: sticky;
  top: 0;

  display: flex;
  flex-direction: row;
  align-items: center;

  border-radius: 2.4rem;
  box-shadow: ${(props) =>
    props.isVisible
      ? '0px 2px 8px rgba(18, 21, 31, 0.04), 0px 6px 24px rgba(18, 21, 31, 0.1);'
      : 'none'};
  transform: ${(props) =>
    props.isVisible ? 'translateY(0)' : 'translateY(-100%)'};
  transition: transform 0.225s ease, box-shadow 0.225s ease;
  background: ${getColorTheme('earth')};
`
const SmallAvatar = styled(AvatarBase)`
  margin-right: 0.4rem;
`
const FollowButton = styled(FollowButtonBase)<{ withMargin?: boolean }>`
  margin-right: ${(props) => (props.withMargin ? '1.6rem' : 0)};
`
