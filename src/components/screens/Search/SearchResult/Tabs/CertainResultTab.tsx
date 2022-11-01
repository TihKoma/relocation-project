import { FC, useEffect, useRef, useState } from 'react'
import { EntityType } from '__generated__/globalTypes'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'

import { ShortPost } from '@/components/shared/feed/Post/ShortPost'
import { LoadingState } from '@/components/shared/LoadingState'
import { Loader } from '@/components/ui-kit/Loader'
import CoverMock from '@/images/region-cover-mock.png'
import { PostItem } from '@/modules/feed'
import {
  InfinityScrollProvider,
  useInfinityScrollProvider,
  useScrollOnElement,
} from '@/modules/infinity-scroll'
import {
  SearchV2Summary_searchV2Summary_Buckets_Docs_Entity_FeedPost_region as RegionType,
  SearchV2Summary_searchV2Summary_Buckets_Docs_Entity_Group as GroupType,
  SearchV2Summary_searchV2Summary_Buckets_Docs_Entity_PublicProfile as ProfileType,
  SearchV2Summary_searchV2Summary_Buckets_Docs_Entity_Tag as TagType,
} from '@/modules/map/graphql/__generated__/SearchV2Summary'
import { QUERY_SEARCH_V2 } from '@/modules/map/graphql/query-search'
import { getColorTheme } from '@/styles/themes'

import { Tab } from '../SearchResult'
import { Area } from './items/Area'
import { Group } from './items/Group'
import { Tag } from './items/Tag'
import { UserProfile } from './items/UserProfile'
import { PostStyle, TabList } from './SummaryResultTab'

const PAGINATION_START_POSITION = 0
const PAGINATION_LIMIT = 30

type Props = {
  currentTab: Exclude<Tab, 'All'>
  searchValue: string
}

export const CertainResultTab: FC<Props> = ({ searchValue, currentTab }) => {
  const [isLoading, setIsLoading] = useState(false)

  const searchType: EntityType = {
    Areas: EntityType.REGION,
    People: EntityType.PROFILE,
    Tags: EntityType.TAG,
    Posts: EntityType.POST,
    Groups: EntityType.GROUP,
  }[currentTab]

  const { data, fetchMore } = useQuery(QUERY_SEARCH_V2, {
    variables: {
      query: searchValue,
      type: searchType,
      limit: PAGINATION_LIMIT,
      offset: 0,
    },
    onCompleted: () => {
      setIsLoading(false)
    },
  })

  const prevPosition = useRef(PAGINATION_START_POSITION)
  const listRef = useRef<HTMLDivElement>(null)
  useScrollOnElement(listRef.current)

  const items = {
    Areas: data?.searchV2.Docs?.map((doc) => {
      const area = doc?.Entity as RegionType
      return <Area key={area.id} {...area} />
    }),

    People: data?.searchV2.Docs?.map((doc) => {
      const user = doc?.Entity as ProfileType
      return <UserProfile key={user.id} {...user} />
    }),

    Tags: data?.searchV2.Docs?.map((doc) => {
      const tag = doc?.Entity as TagType
      return <Tag key={tag.tag} {...tag} />
    }),

    Posts: data?.searchV2.Docs?.map((item) => {
      return <ShortPost item={item?.Entity as PostItem} css={PostStyle} />
    }),

    Groups: data?.searchV2.Docs?.map((item) => {
      const group = item?.Entity as GroupType
      const groupFollowers = `${group.members?.total ?? 0} ${
        group.members?.total ?? 0 > 1 ? 'followers' : 'follower'
      }`
      return (
        <Group
          item={{
            id: group.id,
            name: group.name,
            slug: group.slug,
            avatarSrc: group.avatar || CoverMock.src,
            subtitle: (
              <>
                <span>{group.region?.subtitle}</span>
                <br />
                <span>{groupFollowers}</span>
              </>
            ),
            subscribed: group.members?.iAmIn || false,
          }}
        />
      )
    }),
  }[currentTab]

  useEffect(() => {
    if (!data?.searchV2.Docs?.length || data?.searchV2.Docs?.length === 0)
      setIsLoading(true)
  }, [currentTab, data?.searchV2.Docs])

  useInfinityScrollProvider(() => {
    prevPosition.current = items?.length || 0

    fetchMore({
      variables: {
        query: searchValue,
        type: searchType,
        limit: 10,
        offset: prevPosition.current,
      },

      updateQuery: (data, { fetchMoreResult }) => {
        return {
          ...data,
          searchV2: {
            ...fetchMoreResult?.searchV2,
            Docs: [
              ...(data?.searchV2.Docs ?? []),
              ...(fetchMoreResult?.searchV2.Docs ?? []),
            ],
          },
        }
      },
    })
  })

  return (
    <InfinityScrollProvider>
      <Container ref={listRef}>
        <LoadingState
          loading={isLoading}
          loadingComponent={<Loader size={'small'} />}
        >
          <TabList>{items}</TabList>
        </LoadingState>
      </Container>
    </InfinityScrollProvider>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;

  background-color: ${getColorTheme('sun50')};

  padding: 0.1rem 0;
  padding: 0 0 12rem 0;

  overflow: auto;
`
