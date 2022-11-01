import { FC, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'

import { NAVIGATION_BAR_HEIGHT } from '@/components/shared/layout'
import { LoadingState } from '@/components/shared/LoadingState'
import { NormalizedButton } from '@/components/ui-kit/Button'
import { Loader } from '@/components/ui-kit/Loader'
import { ArrowIcon } from '@/images'
import { ReactComponent as AreaSelectedIcon } from '@/images/area-selected-icon.svg'
import { ReactComponent as AreaIcon } from '@/images/areas.svg'
import { ReactComponent as GroupIcon } from '@/images/group-icon.svg'
import { ReactComponent as GroupSelectedIcon } from '@/images/group-selected-icon.svg'
import { ReactComponent as ProfileIcon } from '@/images/people.svg'
import { ReactComponent as PostIcon } from '@/images/post-icon.svg'
import { ReactComponent as PostSelectedIcon } from '@/images/post-selected-icon.svg'
import { ReactComponent as ProfileSelectedIcon } from '@/images/profile-selected-icon.svg'
import { ReactComponent as TagIcon } from '@/images/tag.svg'
import { ReactComponent as TagSelectedIcon } from '@/images/tag-selected-icon.svg'
import {
  SearchV2Summary_searchV2Summary_Buckets_Docs_Entity_FeedPost as FeedPost,
  SearchV2Summary_searchV2Summary_Buckets_Docs_Entity_FeedPost_region as Region,
  SearchV2Summary_searchV2Summary_Buckets_Docs_Entity_Group as Group,
  SearchV2Summary_searchV2Summary_Buckets_Docs_Entity_PublicProfile as Profile,
  SearchV2Summary_searchV2Summary_Buckets_Docs_Entity_Tag as Tag,
} from '@/modules/map/graphql/__generated__/SearchV2Summary'
import { QUERY_SEARCH_V2_SUMMARY } from '@/modules/map/graphql/query-search'
import { mobileMedia, notMobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

import { CertainResultTab } from './Tabs/CertainResultTab'
import { NothingFound } from './Tabs/NothingFound'
import { SummaryResultTab } from './Tabs/SummaryResultTab'

export type Tab = 'All' | 'Areas' | 'People' | 'Tags' | 'Posts' | 'Groups'
export type Tabs<T> = {
  name: T
  totalCount?: number
}[]

type SearchResultSectionValue<T> = {
  items: T[]
  totalCount: number
}

export type SearchResult = {
  region?: SearchResultSectionValue<Region>
  tag?: SearchResultSectionValue<Tag>
  profile?: SearchResultSectionValue<Profile>
  post?: SearchResultSectionValue<FeedPost>
  group?: SearchResultSectionValue<Group>
}

type Props = {
  searchValue: string
}

export const SearchResult: FC<Props> = ({ searchValue }) => {
  const [currentTab, setCurrentTab] = useState<Tab>('All')
  const searchResult: SearchResult = {}
  const router = useRouter()

  const { loading, data } = useQuery(QUERY_SEARCH_V2_SUMMARY, {
    variables: {
      query: searchValue,
    },
  })

  data?.searchV2Summary.Buckets?.forEach((el) => {
    if (el && el.Length > 0)
      searchResult[el.Name as keyof SearchResult] = {
        items: el.Docs?.map((d) => d?.Entity) as Profile[] &
          Tag[] &
          Region[] &
          FeedPost[] &
          Group[],
        totalCount: el.Total,
      }
  })

  const node = useRef<HTMLDivElement>(null)

  const tabs: Tabs<Tab> = []
  let key: keyof typeof searchResult
  for (key in searchResult) {
    let name
    switch (key) {
      case 'region':
        name = 'Areas'
        break

      case 'profile':
        name = 'People'
        break

      case 'post':
        name = 'Posts'
        break

      case 'tag':
        name = 'Tags'
        break

      case 'group':
        name = 'Groups'
        break
    }
    tabs.push({
      name: name as Tab,
      totalCount: searchResult[key]?.totalCount || 0,
    })
  }
  if (tabs.length > 0)
    tabs.unshift({
      name: 'All',
    })

  if (data?.searchV2Summary.Status?.Total === 0 && searchValue)
    return (
      <Container>
        <NothingFound />
      </Container>
    )

  return (
    <>
      {data?.searchV2Summary.Status?.Total !== 0 && (
        <Header ref={node}>
          <TitleContainer>
            <BackButton onClick={router.back}>
              <ArrowIcon direction={'left'} />
            </BackButton>
            <Title>Search result</Title>
          </TitleContainer>
          <TabsContainer>
            {tabs.map((tab) => {
              const isSelected = tab.name === currentTab
              return (
                <Tab
                  key={tab.name}
                  isSelected={isSelected}
                  onClick={() => setCurrentTab(tab.name)}
                >
                  {
                    {
                      All: '',
                      Areas: isSelected ? <AreaSelectedIcon /> : <AreaIcon />,
                      People: isSelected ? (
                        <ProfileSelectedIcon />
                      ) : (
                        <ProfileIcon />
                      ),
                      Tags: isSelected ? <TagSelectedIcon /> : <TagIcon />,
                      Posts: isSelected ? <PostSelectedIcon /> : <PostIcon />,
                      Groups: isSelected ? (
                        <GroupSelectedIcon />
                      ) : (
                        <GroupIcon />
                      ),
                    }[tab.name]
                  }
                  {tab.totalCount && (
                    <TabTotalCount>{tab.totalCount}</TabTotalCount>
                  )}
                  <TabTitle>{tab.name}</TabTitle>
                </Tab>
              )
            })}
          </TabsContainer>
        </Header>
      )}

      {data?.searchV2Summary.Status?.Total !== 0 && (
        <LoadingState
          loading={loading}
          loadingComponent={<Loader size={'small'} />}
        >
          {currentTab === 'All' && (
            <SummaryResultTab
              tabs={
                tabs.filter((tab) => tab.name !== 'All') as Tabs<
                  Exclude<Tab, 'All'>
                >
              }
              searchValue={searchValue}
              searchResult={searchResult}
              setCurrentTab={(tab: Tab) => {
                setCurrentTab(tab)
                node.current?.scrollIntoView({ behavior: 'smooth' })
              }}
            />
          )}
          {currentTab !== 'All' && (
            <CertainResultTab
              currentTab={currentTab}
              searchValue={searchValue}
            />
          )}
        </LoadingState>
      )}
    </>
  )
}

const Header = styled.div`
  padding: 1.6rem 1.6rem 0 1.6rem;
`
const TitleContainer = styled.div`
  display: flex;
`
const Title = styled.div`
  font-size: 2.8rem;
  line-height: 3.6rem;
  font-weight: 500;

  color: ${getColorTheme('sun1000')};
`
const TabsContainer = styled.div`
  display: flex;
  overflow: auto;

  margin: 2rem 0 0 0;
`
const Tab = styled.div<{ isSelected?: boolean }>`
  display: flex;
  align-items: center;

  padding-bottom: 0.5rem;
  margin-right: 1.5rem;

  cursor: pointer;
  transition: all 0.3s;

  font-size: 1.6rem;
  font-style: normal;
  font-weight: 400;

  color: ${(props) => (props.isSelected ? getColorTheme('neptune') : 'black')};
  border-bottom: 2px solid
    ${(props) =>
      props.isSelected ? getColorTheme('neptune') : 'rgba(0,0,0,0)'};

  &:hover {
    border-bottom: 2px solid ${getColorTheme('neptune')};
  }
`
const TabTitle = styled.span`
  margin: auto;
`
const TabTotalCount = styled.span`
  margin: auto 0.5rem;
`
const Container = styled.div`
  width: 100%;
  min-height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  ${notMobileMedia} {
    background-color: ${getColorTheme('sun50')};
  }

  padding: 1.6rem 0;
`

const HEIGHT_BACK_BUTTON = '4rem'
const APPROXIMATE_HEIGHT_HEADER = '10rem'
const BUTTON_INDENT_FROM_HEADER = '1.6rem'
const BUTTON_INDENT_FROM_SHEET = '1.6rem'
const polyfillVh = '--polyfill-vh'

const BaseNavButton = styled(NormalizedButton)`
  cursor: pointer;

  ${mobileMedia} {
    width: 4rem;
    height: ${HEIGHT_BACK_BUTTON};

    position: fixed;
    bottom: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    background: ${getColorTheme('earth')};
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.08);
    border-radius: 50%;

    --INDENT_TOP_SCREEN: calc(
      ${APPROXIMATE_HEIGHT_HEADER} + ${BUTTON_INDENT_FROM_HEADER} +
        ${HEIGHT_BACK_BUTTON} + ${NAVIGATION_BAR_HEIGHT}px
    );
    transform: translateY(
      calc(
        -1 * min((var(${polyfillVh}) - var(--INDENT_TOP_SCREEN)), (var(
                  --rsbs-overlay-h
                ) + ${BUTTON_INDENT_FROM_SHEET}))
      )
    );
    z-index: -1;
  }
`
const BackButton = styled(BaseNavButton)`
  ${notMobileMedia} {
    margin-right: 1.6rem;
  }
  ${mobileMedia} {
    left: 1.6rem;
  }
`
