import React, { useMemo, VFC } from 'react'
import { useQuery } from '@apollo/client'

import { Header as HeaderBase } from '@/components/shared/feed/FeedContent/Header'
import { ContextMenuPopup } from '@/components/shared/feed/Post/ContextMenuPopup'
import { PostForm } from '@/components/shared/PostForm'
import { usePostForm } from '@/components/shared/PostForm'
import { ModalPortal } from '@/components/ui-kit/Modal'
import { PostItem } from '@/modules/feed'
import { QUERY_GET_USER_PROFILE } from '@/modules/profile'

type Props = {
  item: PostItem
  feedId?: string
  isOnDetailedPage?: boolean
  linkToDetailedPage?: string
  isContextMenuPopupVisible?: boolean
  avatarClassName?: string
}

export const Header: VFC<Props> = ({
  feedId,
  item,
  isOnDetailedPage,
  isContextMenuPopupVisible = true,
  avatarClassName,
}) => {
  const { user, region, post, group } = item

  const { data: profileBase } = useQuery(QUERY_GET_USER_PROFILE, { ssr: false })

  const profile = profileBase?.getUserProfile

  const isCurrentUserPost = profile?.userId === user.userId

  const { isOpen, onOpen, onRequestClose, onClose, formRef } = usePostForm()

  const initialValues = useMemo(
    () => ({
      id: post.id,
      content: post.content,
      media: (post.media ?? []).map(({ __typename, ...other }) => other),
      geoData: post.geoData,
      region: {
        id: region.id,
        name: region.name,
      },
      group: group
        ? {
            id: group.id,
            name: group.name,
          }
        : undefined,
    }),
    [post, group, region],
  )

  return (
    <HeaderBase
      user={user}
      region={region}
      group={group}
      createdAt={post.createdAt}
      avatarClassName={avatarClassName}
      isOnDetailedPage={isOnDetailedPage}
      isInPost
    >
      {isCurrentUserPost && (
        <>
          <ModalPortal isVisible={isOpen} onRequestClose={onRequestClose}>
            <PostForm
              initialValues={initialValues}
              title={'Editing post'}
              ref={formRef}
              onClose={onClose}
            />
          </ModalPortal>
        </>
      )}
      {isContextMenuPopupVisible && (
        <ContextMenuPopup
          item={item}
          feedId={feedId}
          isOnDetailedPage={isOnDetailedPage}
          isCurrentUserPost={isCurrentUserPost}
          setIsShowFormPost={onOpen}
        />
      )}
    </HeaderBase>
  )
}
