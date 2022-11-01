import { FC, useRef } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'

import { Layout } from '@/components/shared/layout'
import { Button } from '@/components/ui-kit/Button'
import { ArrowIcon } from '@/images'
import {
  InfinityScrollProvider,
  useInfinityScrollProvider,
  useScrollOnElement,
} from '@/modules/infinity-scroll'
import { QUERY_SAVED_LISTINGS_SEARCHES } from '@/modules/listing/graphql/queries'
import { QUERY_GET_USER_PROFILE } from '@/modules/profile'
import { desktopMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

import { NoSavedSearches } from './NoSavedSearches'
import { SearchItem } from './SearchItem'

const PAGINATION_START_POSITION = 0
const PAGINATION_LIMIT = 10

export const SavedSearchesScreen: FC = () => {
  const router = useRouter()

  const {
    data: savedSearches,
    fetchMore,
    refetch: refetchSavedSearches,
  } = useQuery(QUERY_SAVED_LISTINGS_SEARCHES, {
    variables: { limit: PAGINATION_LIMIT, offset: PAGINATION_START_POSITION },
    fetchPolicy: 'no-cache',
  })

  const { data: userProfile } = useQuery(QUERY_GET_USER_PROFILE)

  const prevPosition = useRef(PAGINATION_START_POSITION)
  const listRef = useRef<HTMLDivElement>(null)
  useScrollOnElement(listRef.current)

  useInfinityScrollProvider(() => {
    prevPosition.current = savedSearches?.savedListingsSearches?.length || 0

    fetchMore({
      variables: {
        offset: prevPosition.current,
      },

      updateQuery: (data, { fetchMoreResult }) => {
        return {
          ...data,
          savedListingsSearches: [
            ...(data?.savedListingsSearches ?? []),
            ...(fetchMoreResult?.savedListingsSearches ?? []),
          ],
        }
      },
    })
  })

  return (
    <Layout isMobileHeaderHidden>
      <InfinityScrollProvider>
        <Container ref={listRef}>
          <Header>
            <BackButton
              viewType={'ghost'}
              size={'small'}
              Icon={<ArrowIcon direction={'left'} />}
              onClick={() => {
                router.back()
              }}
            />
            <Title>Saved Searches</Title>
          </Header>

          {savedSearches?.savedListingsSearches.map((item) => (
            <SearchItem
              key={item.id}
              hasEmail={!!userProfile?.getUserProfile?.email}
              searchData={item}
              refetchSavedSearches={refetchSavedSearches}
            />
          ))}

          {savedSearches?.savedListingsSearches.length === 0 && (
            <NoSavedSearches />
          )}
        </Container>
      </InfinityScrollProvider>
    </Layout>
  )
}

const Container = styled.div`
  padding: 2.6rem 1.6rem 4.6rem;
`
const Title = styled.div`
  margin-bottom: 1.6rem;

  font-weight: 500;
  font-size: 2.8rem;
  line-height: 3.6rem;
  color: ${getColorTheme('sun1000')};
`
const BackButton = styled(Button)`
  margin-right: 0.8rem;

  ${desktopMedia} {
    display: none;
  }
`
const Header = styled.div`
  display: flex;
`
