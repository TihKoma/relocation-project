import { FC, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import styled from '@emotion/styled'

import { AddToMyListButton as AddToMyListButtonBase } from '@/components/shared/AddToMyListButton'
import { useSticky } from '@/components/shared/AreaLayout/use-sticky-header'
import { ProfilesCounter } from '@/components/shared/ProfilesCounter'
import { ShareDropdown } from '@/components/shared/ShareDropdown'
import { NormalizedButton } from '@/components/ui-kit/Button'
import { ArrowIcon, ShareIcon } from '@/images'
import { useIsNotMobileDevice } from '@/modules/device'
import { Region } from '@/modules/map'
import { ROUTES } from '@/modules/router'
import { H1 } from '@/modules/seo'
import { useIntersectionalObserver } from '@/modules/utils/useIntersectionalObserver'
import { HOVER_TRANSITION_TIME } from '@/styles/const'
import { mobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

import { OptionsMenu } from './OptionsMenu'

type Props = {
  region: Region
  onRequestBack?: () => void
  regionSlug: string
  className?: string
  isHeaderVisible?: boolean
  showStickyHeaderOnMobile?: boolean
}
export const RegionHeader: FC<Props> = ({
  region,
  regionSlug,
  onRequestBack,
  className,
  showStickyHeaderOnMobile,
}) => {
  const areaUrl = `${process.env.NEXT_PUBLIC_API_HOST}${ROUTES.area.calcUrl({
    regionSlug,
  })}`

  const isNotMobile = useIsNotMobileDevice()
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const { isFixed, scrollElementRef } = useSticky()

  const [useRef, entry] = useIntersectionalObserver({
    threshold: 0,
  })

  useEffect(() => {
    if (entry) {
      setIsHeaderVisible(entry?.isIntersecting)
    }
  }, [entry])

  const content = (
    <>
      {region && (isNotMobile || showStickyHeaderOnMobile) && (
        <SmallHeader isVisible={!isHeaderVisible}>
          <NameWrapper>
            {onRequestBack ? (
              <BackButton onClick={onRequestBack}>
                <ArrowIcon direction={'left'} />
              </BackButton>
            ) : null}
            <Name isHeaderVisible={isHeaderVisible}>{region.name}</Name>
          </NameWrapper>
          <div>
            <Share url={areaUrl}>
              <ShareIcon />
            </Share>
          </div>
        </SmallHeader>
      )}
      <Header
        ref={useRef}
        isHeaderVisible={isHeaderVisible}
        type={onRequestBack ? 'full' : 'mini'}
        className={className}
      >
        <Wrapper isHeaderVisible={isHeaderVisible}>
          {onRequestBack && isNotMobile ? (
            <BackButton onClick={onRequestBack}>
              <ArrowIcon direction={'left'} />
            </BackButton>
          ) : (
            <div />
          )}
          <Title>
            {region.subtitle && (
              <Location>
                <TypePlace>{region.placeType}</TypePlace>
                {region.subtitle}
              </Location>
            )}
            <Name isHeaderVisible={isHeaderVisible}>{region.name}</Name>
          </Title>
          <OptionsMenu
            regionId={region.id}
            regionSlug={regionSlug}
            subscribed={region.subscribed}
          />
        </Wrapper>
        <AddToMyListButton
          fullWidth
          regionId={region.id}
          isSubscribed={region.subscribed}
          regionName={region.name}
        />
        <ProfilesCounterCompact
          imagesSrc={region.previewFollowers.map(({ photoUrl }) => photoUrl)}
          count={region.subscribersCount}
          label={'added to their favorites'}
          pluralLabel={'added to their favorites'}
        />
      </Header>
    </>
  )

  const contentMobileMinimized = (
    <HeaderMobile isFixed={isFixed}>
      <Name isHeaderVisible={isHeaderVisible}>{region.name}</Name>
    </HeaderMobile>
  )

  return (
    <>
      {content}
      {isFixed && scrollElementRef.current
        ? createPortal(
            <StickyBehavior>{contentMobileMinimized}</StickyBehavior>,
            scrollElementRef.current,
          )
        : null}
    </>
  )
}

const TypePlace = styled.div`
  margin-right: 0.6rem;

  font-weight: 500;
  color: ${getColorTheme('sun1000')};
  text-transform: capitalize;
`
const Name = styled(H1)<{ isHeaderVisible: boolean | undefined }>`
  margin-right: ${({ isHeaderVisible }) => (isHeaderVisible ? '0' : ' 1.6rem')};

  font-weight: 500;
  font-size: 2.8rem;
  line-height: 3.6rem;
  color: ${getColorTheme('sun1000')};

  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  ${mobileMedia} {
    font-size: 2.4rem;
    line-height: 2.8rem;
  }
`
const Location = styled.div`
  margin-bottom: 0.4rem;

  display: flex;

  font-size: 1.4rem;
  line-height: 2rem;
  color: ${getColorTheme('sun500')};
`
const SmallHeader = styled.div<{
  isVisible: boolean
}>`
  width: 100%;
  max-width: 100%;
  padding: 1.4rem 1.6rem;
  z-index: 10;

  position: sticky;
  top: 0;

  display: flex;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  border-radius: 2.4rem;
  box-shadow: ${(props) =>
    props.isVisible
      ? '0 0.2rem 0.8rem rgba(18, 21, 31, 0.04), 0 0.6rem 2.4rem rgba(18, 21, 31, 0.1);'
      : 'none'};
  transform: ${(props) =>
    props.isVisible ? 'translateY(0)' : 'translateY(-100%)'};
  transition: transform 0.225s ease, box-shadow 0.225s ease;
  background: ${getColorTheme('earth')};

  & > div {
    display: flex;
  }

  ${mobileMedia} {
    position: fixed;
    top: 0;

    display: ${(props) => (props.isVisible ? 'block' : 'none')};
  }
`
const NameWrapper = styled.div`
  overflow: hidden;
`
const Header = styled.div<{
  type: 'mini' | 'full'
  isHeaderVisible: boolean
}>`
  padding: 1.6rem;
  margin-bottom: 1.2rem;
`
const HeaderMobile = styled.div<{ isFixed: boolean }>`
  padding: 0.8rem 1.6rem;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border-radius: 2.4rem;
  box-shadow: 0 0.6rem 2.4rem 0 rgba(18, 21, 31, 0.1),
    0 0.2rem 0.8rem 0 rgba(18, 21, 31, 0.04);
`

const Title = styled.div``

const Wrapper = styled.div<{
  isHeaderVisible: boolean | undefined
}>`
  margin-bottom: 1.2rem;

  display: grid;
  grid-template-columns: min-content minmax(0, 1fr) auto min-content;
`
const BackButton = styled(NormalizedButton)`
  margin: auto 2rem auto 0;
  width: 4rem;
  height: 4rem;

  align-self: start;
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  transition: ${HOVER_TRANSITION_TIME};

  ${mobileMedia} {
    display: none;
  }

  &:hover {
    background: ${getColorTheme('sun50')};
  }
`
const Share = styled(ShareDropdown)`
  height: 4rem;
  width: 4rem;
  margin-left: 1.6rem;

  display: flex;
  align-items: center;
  justify-content: center;
  justify-self: end;

  border-radius: 50%;

  transition: ${HOVER_TRANSITION_TIME};

  &:hover {
    background: ${getColorTheme('sun50')};
  }
`

const StickyBehavior = styled.div`
  padding-top: 0;
  width: 100%;

  position: fixed;
  top: 0;
  z-index: 5;

  background-color: ${getColorTheme('earth')};
  border-radius: 1.6rem;
`
const AddToMyListButton = styled(AddToMyListButtonBase)`
  margin-bottom: 1.2rem;
`
const ProfilesCounterCompact = styled(ProfilesCounter)`
  justify-content: start;
`
