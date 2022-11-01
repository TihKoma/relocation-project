import { FC } from 'react'
import Link from 'next/link'
import { useQuery } from '@apollo/client'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

import { FollowUserButton } from '@/components/screens/ProfileScreen/ProfileLayout/follow'
import { Avatar } from '@/components/ui-kit/Avatar'
import { SearchV2Summary_searchV2Summary_Buckets_Docs_Entity_PublicProfile as ProfileType } from '@/modules/map/graphql/__generated__/SearchV2Summary'
import { QUERY_SEARCH_V2_SUMMARY } from '@/modules/map/graphql/query-search'
import { QUERY_GET_USER_PROFILE } from '@/modules/profile'
import { ROUTES } from '@/modules/router'
import { getColorTheme } from '@/styles/themes'

export const UserProfile: FC<Omit<ProfileType, '__typename'>> = ({
  userId,
  userName,
  photoUrl,
  firstName,
  lastName,
  subscribed,
}) => {
  const url = ROUTES.publicProfile.calcUrl({ userName: userName })
  const { data: { getUserProfile: myProfile } = {} } = useQuery(
    QUERY_GET_USER_PROFILE,
  )

  return (
    <Item>
      <User data-test-id={'search_result: people'}>
        <Link href={ROUTES.publicProfile.calcUrl({ userName: userName })}>
          <Avatar src={photoUrl} css={AvatarStyle} isLazyLoad />
        </Link>

        <Link href={url}>
          <UserName>{firstName + ' ' + lastName}</UserName>
        </Link>

        {myProfile?.userId !== userId && (
          <ButtonContainer>
            <FollowUserButton
              userId={userId}
              subscribed={subscribed}
              size={'small'}
              refetchQueries={[QUERY_SEARCH_V2_SUMMARY]}
              from={'searchResult'}
            />
          </ButtonContainer>
        )}
      </User>
    </Item>
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
const User = styled.div`
  display: flex;

  height: 4rem;

  white-space: nowrap;
  align-items: center;
`
const AvatarStyle = css`
  cursor: pointer;
`
const UserName = styled.span`
  margin-left: 2rem;

  cursor: pointer;
  align-items: center;

  overflow: hidden;
  text-overflow: ellipsis;
`
const ButtonContainer = styled.div`
  margin-left: auto;
`
