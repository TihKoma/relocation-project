import { useState, VFC } from 'react'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'

import { ReportModal } from '@/components/shared/ReportModal'
import { showSuccessToast } from '@/components/shared/Toast'
import { Activity } from '@/components/ui-kit/Activity'
import { Option, Options } from '@/components/ui-kit/form/Options'
import { useAnalytics } from '@/modules/analytics'
import { useAuthGlobalModals } from '@/modules/authorization'
import { PostItem } from '@/modules/feed'
import { MUTATION_SEND_COMPLAIN } from '@/modules/feed/graphql/mutations'
import { MUTATION_REMOVE_POST, QUERY_GET_POSTS_BY_USER } from '@/modules/post'
import { useFollowUser } from '@/modules/profile'
import { useUnfollowUser } from '@/modules/profile'
import { ROUTES } from '@/modules/router'

import { ComplaintEntityType } from '../../../../../__generated__/globalTypes'

type Props = {
  feedId?: string
  item: PostItem
  isCurrentUserPost: boolean
  setIsShowFormPost: (value: boolean) => void
  isOnDetailedPage?: boolean
}
export const ContextMenuPopup: VFC<Props> = ({
  item,
  isCurrentUserPost,
  setIsShowFormPost,
  isOnDetailedPage,
  feedId,
}) => {
  const [isReportModalVisible, setIsReportModalVisible] = useState(false)
  const [isNotHavePermission, showModal] = useAuthGlobalModals('follow')
  const analytics = useAnalytics()

  const router = useRouter()

  const [removePost, { loading: isLoading }] = useMutation(
    MUTATION_REMOVE_POST,
    {
      update(cache, _, { variables }) {
        const posts = cache.readQuery({
          query: QUERY_GET_POSTS_BY_USER,
          variables: {
            userId: item.user.userId,
          },
        })

        if (posts) {
          cache.writeQuery({
            query: QUERY_GET_POSTS_BY_USER,
            data: {
              listPostsByUser: (posts?.listPostsByUser ?? []).filter(
                ({ post }) => variables?.postId !== post.id,
              ),
            },
            overwrite: true,
            variables: {
              userId: item.user.userId,
            },
          })
        }
        cache.modify({
          id: `Feed:${feedId}`,
          fields: {
            posts(postsRefs: any[], { readField }) {
              return postsRefs.filter((postRef) => {
                return (
                  variables?.postId !==
                  readField('id', readField('post', postRef))
                )
              })
            },
          },
        })
      },
    },
  )
  const [sendComplaint, { loading: isComplaintLoading }] = useMutation(
    MUTATION_SEND_COMPLAIN,
    {
      variables: {
        input: { entityId: item.post.id, entityType: ComplaintEntityType.POST },
      },
    },
  )

  const [subscribed, setSubscribed] = useState(item.user.isSubscribed)
  const [followUser, { loading: followUserLoading }] = useFollowUser({
    variables: {
      input: {
        subscriptableId: item.user.userId,
      },
    },
    onCompleted: () => {
      showSuccessToast(
        `You are now following ${item.user.firstName} ${item.user.lastName}!`,
        {
          autoClose: 2000,
        },
      )
      setSubscribed(true)
    },
  })
  const [unfollowUser, { loading: unfollowUserLoading }] = useUnfollowUser({
    variables: {
      subscriptableId: item.user.userId,
    },
    onCompleted: () => {
      showSuccessToast(
        `You are no longer following ${item.user.firstName} ${item.user.lastName}!`,
        {
          autoClose: 2000,
        },
      )
      setSubscribed(false)
    },
  })

  const onReportRequestClose = () => {
    setIsReportModalVisible(false)
  }

  const onReportSuccess = async () => {
    await sendComplaint()
    onReportRequestClose()
    showSuccessToast(
      'Thanks for brining this to our attention. We’ll look into the situation and take action within 24 hours',
    )
    analytics.postComplain(item.user.firstName + item.user.lastName)
  }

  const editPost = () => {
    setIsShowFormPost(true)
  }
  const deletePost = async () => {
    await removePost({
      variables: {
        postId: item.post.id,
      },
    })
    if (isOnDetailedPage) {
      router.replace(ROUTES.root.calcUrl())
    }
  }
  const reportPost = () => {
    setIsReportModalVisible(true)
  }
  const onFollow = async () => {
    if (isNotHavePermission) {
      showModal()
      return
    }
    await followUser()
  }
  return (
    <>
      <Options>
        {isCurrentUserPost ? (
          <>
            <Option onClick={editPost}>Edit</Option>
            <Option onClick={deletePost}>
              {isLoading ? <Activity /> : 'Delete'}
            </Option>
          </>
        ) : (
          <>
            {subscribed ? (
              <Option
                onClick={() => {
                  unfollowUser()
                  analytics.userUnfollow('discovery')
                }}
              >
                {unfollowUserLoading ? <Activity /> : 'Unfollow'}
              </Option>
            ) : (
              <Option
                onClick={() => {
                  onFollow()
                  analytics.userFollow('discovery')
                }}
              >
                {followUserLoading ? <Activity /> : 'Follow'}
              </Option>
            )}
            <Option onClick={reportPost}>Report</Option>
          </>
        )}
      </Options>
      <ReportModal
        isVisible={isReportModalVisible}
        onRequestClose={onReportRequestClose}
        onSuccess={onReportSuccess}
        isLoading={isComplaintLoading}
        text={'Are you sure you want to report this post?'}
      />
    </>
  )
}
