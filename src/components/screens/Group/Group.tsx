import { FC, useContext, useEffect, useRef } from 'react'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'

import { AreaLayout } from '@/components/shared/AreaLayout'
import { FeedPostsList } from '@/components/shared/feed/FeedPostsList'
import { Shadow } from '@/components/shared/layout'
import { LoadingState } from '@/components/shared/LoadingState'
import { DiscoveryCPMap } from '@/components/shared/maps/DiscoveryCPMap/DiscoveryCPMap'
import { MockWithAction } from '@/components/shared/MockWithAction'
import { DataForCreatePostContext } from '@/components/shared/PostForm'
import { CreatePostContextState } from '@/components/shared/PostForm/CreatePostContext'
import { Loader } from '@/components/ui-kit/Loader'
import { PlaceholderQuestionIcon } from '@/images'
import { useInfinityScrollFeed } from '@/modules/feed'
import { QUERY_GET_GROUP_FEED, QUERY_SEARCH_GROUPS } from '@/modules/group'
import { SearchGroups_searchGroups_groups } from '@/modules/group/graphql/__generated__/SearchGroups'
import { mobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

import { GroupMeta } from './GroupMeta'
import { Header as GroupHeader, SMALL_HEADER_SIZE } from './Header'

type Props = {
  groupSlug: string
}

export const Group: FC<Props> = ({ groupSlug }) => {
  const { data, loading, error } = useQuery(QUERY_SEARCH_GROUPS, {
    variables: {
      input: {
        slug: groupSlug,
        limit: 1,
      },
    },
    ssr: true,
  })

  const group = data?.searchGroups.groups?.[0]

  return (
    <AreaLayout
      map={() => (
        <DiscoveryCPMap groupId={group?.id} regionSlug={group?.region.slug} />
      )}
    >
      <LoadingState
        loading={loading}
        error={error?.message}
        loadingComponent={<Loader withGradient size={'large'} />}
      >
        {group && <Content group={group} />}
      </LoadingState>
    </AreaLayout>
  )
}

type ContentProps = {
  group: SearchGroups_searchGroups_groups
}

const Content: FC<ContentProps> = ({ group }) => {
  const ref = useRef<HTMLDivElement>(null)

  const { loading, posts, feedId, error } = useInfinityScrollFeed(
    QUERY_GET_GROUP_FEED,
    {
      skip: !group,
      variables: {
        groupId: group?.id,
      },
      ssr: true,
    },
    ref?.current,
  )

  const [_, setDataForCreatePostContext] = useContext(DataForCreatePostContext)

  useEffect(() => {
    if (!group && !feedId) return

    const data = {} as CreatePostContextState
    if (group) {
      data.group = {
        id: group.id,
        name: group.name,
      }
    }
    if (group.region) {
      data.region = {
        id: group.region.id,
        name: group.region.id,
      }
    }
    if (feedId) {
      data.feedId = feedId
    }
    setDataForCreatePostContext?.(data)
  }, [group, feedId, setDataForCreatePostContext])

  return (
    <>
      <GroupMeta
        groupName={group.name}
        regionName={group.region?.name ?? ''}
        regionSubtitle={group.region?.subtitle ?? ''}
      />
      <Container>
        <Shadow position={'top'} />
        <GroupHeader group={group} />
        <LoadingState
          loading={loading}
          error={error?.message}
          loadingComponent={<Loader size={'large'} withGradient />}
        >
          {posts.length ? (
            <>
              <Wrapper>
                <FeedPostsList
                  posts={posts}
                  feedId={feedId}
                  withCreatePostButton
                />
              </Wrapper>
            </>
          ) : (
            <MockWithAction
              image={<PlaceholderQuestionIcon />}
              title={'Feed is empty'}
              description={'Share something interesting in a group'}
              withCreatePostButton
            />
          )}
        </LoadingState>
      </Container>
    </>
  )
}

const Container = styled.div`
  margin-top: -${SMALL_HEADER_SIZE};

  position: relative;

  ${mobileMedia} {
    margin-top: 0;
  }
`
const Wrapper = styled.div`
  padding: 1.6rem;

  background-color: ${getColorTheme('moon')};
`
