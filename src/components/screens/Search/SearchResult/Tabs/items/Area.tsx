import { FC } from 'react'
import Link from 'next/link'
import { SubscriptableType } from '__generated__/globalTypes'
import styled from '@emotion/styled'

import { FollowItem as FollowItemBase } from '@/components/shared/FollowItem'
import { TextHighlighter } from '@/components/ui-kit/TextHighlighter'
import CoverMock from '@/images/region-cover-mock.png'
import { SearchV2Summary_searchV2Summary_Buckets_Docs_Entity_FeedPost_region as RegionType } from '@/modules/map/graphql/__generated__/SearchV2Summary'
import { QUERY_SEARCH_V2_SUMMARY } from '@/modules/map/graphql/query-search'
import {
  useFollowNeighborhood,
  useUnfollowNeighborhood,
} from '@/modules/neighbourhood'
import { ROUTES } from '@/modules/router'
import { getColorTheme } from '@/styles/themes'

export const Area: FC<Omit<RegionType, '__typename'>> = ({
  id,
  subtitle,
  PhotoUrl,
  name,
  subscribed,
  slug,
}) => {
  const [unfollowArea] = useUnfollowNeighborhood({
    refetchQueries: [QUERY_SEARCH_V2_SUMMARY],
  })
  const [followArea] = useFollowNeighborhood({
    refetchQueries: [QUERY_SEARCH_V2_SUMMARY],
  })
  return (
    <Link href={ROUTES.area.calcUrl({ regionSlug: slug })}>
      <Item>
        <FollowItem
          description={<Subtitle>{subtitle}</Subtitle>}
          previewUrl={PhotoUrl || CoverMock.src}
          title={
            <Title>
              <TextHighlighter text={name || ''} match={'searchValue'} />
            </Title>
          }
          defaultChecked={!subscribed}
          onChange={(checked) => {
            if (checked) {
              unfollowArea({
                variables: { subscriptableId: id },
              })
            } else {
              followArea({
                variables: {
                  input: {
                    subscriptableId: id,
                    subscriptableType: SubscriptableType.REGION,
                  },
                },
              })
            }
          }}
        />
      </Item>
    </Link>
  )
}

const Item = styled.li`
  padding: 0.4rem 1.6rem;

  overflow: hidden;

  transition: 0.3s;
  cursor: pointer;

  &:hover {
    background-color: ${getColorTheme('sun200')};
  }
`
const Title = styled.div`
  cursor: pointer;
`
const Subtitle = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;

  white-space: nowrap;
`
const FollowItem = styled(FollowItemBase)`
  background-color: inherit;
`
