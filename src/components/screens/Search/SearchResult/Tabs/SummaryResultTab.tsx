import { FC, useMemo } from 'react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

import { ShortPost } from '@/components/shared/feed/Post/ShortPost'
import { followersListItem } from '@/components/shared/FollowersList'
import { Button } from '@/components/ui-kit/Button'
import CoverMock from '@/images/region-cover-mock.png'
import { PostItem } from '@/modules/feed'
import { ROUTES } from '@/modules/router'
import { mobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

import { SearchResult, Tab, Tabs } from '../SearchResult'
import { Area } from './items/Area'
import { Group } from './items/Group'
import { Tag } from './items/Tag'
import { UserProfile } from './items/UserProfile'

type Props = {
  tabs: Tabs<Exclude<Tab, 'All'>>
  searchValue: string
  searchResult: SearchResult
  setCurrentTab: (value: Tab) => void
}

export const SummaryResultTab: FC<Props> = ({
  tabs,
  searchResult,
  setCurrentTab,
}) => {
  const { region, profile, post, tag, group } = searchResult

  const areas = useMemo(
    () => region?.items?.map((item) => <Area key={item.id} {...item} />),
    [region],
  )

  const profiles = useMemo(
    () =>
      profile?.items?.map((item) => <UserProfile key={item.id} {...item} />),
    [profile],
  )

  const posts = useMemo(
    () =>
      post?.items?.map((item) => {
        return <ShortPost item={item as PostItem} css={PostStyle} />
      }),
    [post],
  )

  const tags = useMemo(
    () => tag?.items?.map((item) => <Tag key={item.tag} {...item} />),
    [tag],
  )

  const transformedGroups = useMemo(
    () =>
      group?.items.map((group) => {
        const groupFollowers = `${group.members?.total ?? 0} ${
          group.members?.total ?? 0 > 1 ? 'followers' : 'follower'
        }`
        return {
          id: group.id,
          name: group.name,
          subtitle: (
            <>
              <span>{group.region?.subtitle}</span>
              <br />
              <span>{groupFollowers}</span>
            </>
          ),
          slug: ROUTES.group.calcUrl({ groupSlug: group.slug }),
          subscribed: group.members?.iAmIn,
          avatarSrc: group.avatar || CoverMock.src,
        }
      }) ?? [],
    [group],
  )

  const groups = useMemo(
    () =>
      transformedGroups.map((item) => (
        <Group key={item?.id} item={item as followersListItem} />
      )),
    [transformedGroups],
  )

  return (
    <Container>
      {tabs.map((tab) => (
        <>
          <SectionTitle>{tab.name}</SectionTitle>
          <TabList>
            {
              {
                Areas: areas,
                People: profiles,
                Tags: tags,
                Posts: posts,
                Groups: groups,
              }[tab.name]
            }
          </TabList>
          <ButtonShowAll
            size={'small'}
            viewType={'secondary'}
            onClick={() => setCurrentTab(tab.name)}
          >
            Show All
          </ButtonShowAll>
        </>
      ))}
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;

  padding: 1.6rem 0 12rem 0;
  overflow: auto;

  background-color: ${getColorTheme('sun50')};
`
const SectionTitle = styled.div`
  font-size: 2.4rem;
  line-height: 2.8rem;
  font-weight: 500;

  margin: 3.2rem 1.6rem 0 1.6rem;

  color: ${getColorTheme('sun1000')};

  &:first-child {
    margin-top: 0;
  }
`
export const TabList = styled.ul`
  display: grid;
  grid-auto-flow: row;

  margin: 2rem 0 0 0;
  padding: 0;
  gap: 0.8rem;

  z-index: 1;

  list-style: none;
`
const ButtonShowAll = styled(Button)`
  margin: 2.4rem 0 0 1.6rem;

  ${mobileMedia} {
    width: calc(100% - 3.2rem);
    margin: 1.6rem auto 0 auto;

    display: block;
  }
`
export const PostStyle = css`
  margin: 0 1.6rem;
  width: inherit;
`
