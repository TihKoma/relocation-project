import { FC, useCallback, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { useQuery } from '@apollo/client'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

import { FollowUserButton } from '@/components/screens/ProfileScreen/ProfileLayout/follow'
import { Avatar } from '@/components/ui-kit/Avatar'
import {
  ModalContainer as ModalContainerBase,
  ModalPortal,
} from '@/components/ui-kit/Modal'
import { reactionsEmojis } from '@/images/reactions'
import { Reactions } from '@/modules/feed'
import {
  InfinityScrollProvider,
  useInfinityScrollProvider,
  useScrollOnElement,
} from '@/modules/infinity-scroll'
import { QUERY_GET_USER_PROFILE } from '@/modules/profile'
import { QUERY_LIST_REACTION } from '@/modules/reaction/graphql/queries'
import { ROUTES } from '@/modules/router'
import { mobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

import { LoadingState } from '../LoadingState'

const PAGINATION_START_POSITION = 0
export const PAGINATION_LIMIT = 10

type Props = {
  entityId: any
  reactions: Reactions
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

type Reaction = keyof Reactions

export const ReactionsModal: FC<Props> = ({
  entityId,
  reactions,
  isOpen,
  setIsOpen,
}) => {
  const [selectedTab, setSelectedTab] = useState<Reaction>('total')

  const prevPosition = useRef(PAGINATION_START_POSITION)
  const listRef = useRef<HTMLDivElement>(null)
  useScrollOnElement(listRef.current)

  let reactionTabs = []
  const [isLoading, setIsLoading] = useState(false)

  const {
    data: { listReactionsByEntity: listReactions } = {},
    fetchMore,
    refetch,
  } = useQuery(QUERY_LIST_REACTION, {
    variables: {
      entityId,
      limit: PAGINATION_LIMIT,
      position: 0,
      reactionTypes: [] as Uppercase<Reaction>[],
    },
    onCompleted: () => setIsLoading(false),
  })

  const { data: { getUserProfile: myProfile } = {} } = useQuery(
    QUERY_GET_USER_PROFILE,
  )

  const onTabClick = useCallback(
    (tab: Reaction) => () => {
      setSelectedTab(tab)
      setIsLoading(true)
      const reactionTypes =
        tab !== 'total' ? ([tab.toUpperCase()] as Uppercase<Reaction>[]) : []

      refetch({ reactionTypes })
    },
    [refetch],
  )

  reactionTabs = useMemo(() => {
    const tabs = []
    let key: Reaction

    for (key in reactions) {
      // search for the current emoji
      const Emoji = reactionsEmojis.find(
        (e) => e.type === key.toUpperCase(),
      )?.Emoji

      if (reactions[key] === 0 || key === 'total' || !Emoji) continue // skip unnecessary tabs

      tabs.push(
        <Tab
          key={key}
          isSelected={key === selectedTab}
          onClick={onTabClick(key)}
        >
          <Emoji css={EmojiCss} />
          <Counter>{reactions[key]}</Counter>
        </Tab>,
      )
    }
    return tabs
  }, [reactions, selectedTab, onTabClick])

  const userList = useMemo(() => {
    return listReactions?.map((ur) => {
      const url = ROUTES.publicProfile.calcUrl({ userName: ur.user.userName })
      return (
        <User key={ur.user.userId} data-test-id={'reactions-modal:user'}>
          <Link href={url}>
            <Avatar src={ur.user.photoUrl} css={AvatarStyle} isLazyLoad />
          </Link>

          <Link href={url}>
            <UserName>{ur.user.firstName + ' ' + ur.user.lastName}</UserName>
          </Link>

          {myProfile?.userId !== ur.user.userId && (
            <BtnContainer>
              <FollowUserButton
                userId={ur.user.userId}
                subscribed={ur.user.isSubscribed as boolean}
                size={'small'}
                refetchQueries={[QUERY_LIST_REACTION]}
                from={'reactions_list'}
              />
            </BtnContainer>
          )}
        </User>
      )
    })
  }, [listReactions, myProfile])

  useInfinityScrollProvider(() => {
    prevPosition.current = listReactions?.length || 0

    fetchMore({
      variables: {
        entityId,
        position: prevPosition.current,
        reactionTypes:
          selectedTab !== 'total' ? [selectedTab.toUpperCase()] : [],
      },

      updateQuery: (data, { fetchMoreResult }) => {
        return {
          ...data,
          listReactionsByEntity: [
            ...(data?.listReactionsByEntity ?? []),
            ...(fetchMoreResult?.listReactionsByEntity ?? []),
          ],
        }
      },
    })
  })

  return (
    <ModalPortal isVisible={isOpen} onRequestClose={() => setIsOpen(false)}>
      <ModalContainer
        onRequestClose={() => setIsOpen(false)}
        data-test-id={'reactions-modal:modal-window'}
      >
        <ModalHeader>
          <ModalTitle>Reactions</ModalTitle>
        </ModalHeader>
        <Content>
          <TabsContainer data-test-id={'reactions-modal:tabs'}>
            <Tab
              isSelected={selectedTab === 'total'}
              onClick={onTabClick('total')}
            >
              <Counter>All</Counter>
            </Tab>
            {reactionTabs}
          </TabsContainer>

          <LoadingState loading={isLoading} css={LoadingStateCss}>
            <InfinityScrollProvider>
              <UsersContainer
                ref={listRef}
                data-test-id={'reactions-modal:user-list'}
              >
                {userList}
              </UsersContainer>
            </InfinityScrollProvider>
          </LoadingState>
        </Content>
      </ModalContainer>
    </ModalPortal>
  )
}

const LoadingStateCss = css`
  margin-top: 50px;
`

const BtnContainer = styled.div`
  margin-left: auto;
`
const ModalContainer = styled(ModalContainerBase)`
  width: 100%;
  max-width: min(51.6rem, calc(100% - 3.2rem));
  height: 100%;
  max-height: min(65.8rem, calc(100% - 3.2rem));

  display: flex;
  flex-direction: column;

  overflow: hidden;

  ${mobileMedia} {
    max-width: unset;
    max-height: unset;

    border-radius: unset;
  }
`
const Content = styled.div`
  margin: 0 0 0 2.6rem;
  min-height: 270px;
`
const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 2.8rem 2.5rem 2.5rem;
`
const ModalTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 0;

  line-height: 1.5;

  font-size: 2.8rem;
  font-weight: 500;
`
const TabsContainer = styled.div`
  display: flex;
  margin-bottom: 30px;
`
const Tab = styled.div<{ isSelected?: boolean }>`
  display: flex;
  max-width: 7rem;

  padding-bottom: 0.5rem;
  margin-right: 1.5rem;

  cursor: pointer;
  transition: all 0.3s;

  font-style: normal;
  font-weight: 400;
  font-size: 1.6rem;

  color: ${getColorTheme('mercury')};

  ${(props) => `
    border-bottom: 2px solid ${
      props.isSelected ? '#3f37c9' : 'rgba(0, 0, 0, 0)'
    };
  `};

  &:hover {
    border-bottom: 2px solid #3f37c9;
  }
`
const EmojiCss = css`
  margin-right: 0.6rem;
`
const Counter = styled.h3`
  margin: 0;
  font-weight: 400;
`
const UsersContainer = styled.div`
  overflow: auto;
  height: 100%;

  padding: 0 2rem 7rem 0;
`
const User = styled.div`
  margin-bottom: 1rem;
  height: 4rem;

  transition: 0.3s;
  display: flex;

  white-space: nowrap;
  align-items: center;

  &:hover {
    color: ${getColorTheme('neptune')};
  }
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
