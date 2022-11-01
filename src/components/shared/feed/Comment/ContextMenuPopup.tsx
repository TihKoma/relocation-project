import { FC, useState } from 'react'
import { useMutation } from '@apollo/client'
import styled from '@emotion/styled'

import { ReportModal } from '@/components/shared/ReportModal'
import { showSuccessToast } from '@/components/shared/Toast'
import {
  Option,
  Options as OptionsBase,
} from '@/components/ui-kit/form/Options'
import {
  MUTATION_REMOVE_COMMENT,
  QUERY_LIST_ENTITY_COMMENTS,
} from '@/modules/comment'
import { MUTATION_SEND_COMPLAIN } from '@/modules/feed/graphql/mutations'

import { ComplaintEntityType } from '../../../../../__generated__/globalTypes'

type Props = {
  postId: string
  commentId: string
  isCurrentUserComment: boolean
  openEditForm: () => void
  parentId?: string
}

export const ContextMenuPopup: FC<Props> = ({
  postId,
  commentId,
  isCurrentUserComment,
  parentId,
  openEditForm,
}) => {
  const [isReportModalVisible, setIsReportModalVisible] = useState(false)

  const openReportPopup = () => {
    setIsReportModalVisible(true)
  }

  const closeReportPopup = () => {
    setIsReportModalVisible(false)
  }

  const [sendComplaint, { loading }] = useMutation(MUTATION_SEND_COMPLAIN, {
    variables: {
      input: { entityId: commentId, entityType: ComplaintEntityType.COMMENT },
    },
  })

  const onReportSuccess = async () => {
    await sendComplaint()
    closeReportPopup()
    showSuccessToast(
      'Thanks for brining this to our attention. We’ll look into the situation and take action within 24 hours',
      {
        autoClose: 2000,
      },
    )
  }

  const { removeComment: removeCommentRequest } = useRemoveComment(
    postId,
    parentId,
  )

  const removeComment = () => {
    removeCommentRequest({
      variables: { commentId },
    })
  }

  return (
    <>
      <Options>
        {isCurrentUserComment ? (
          <>
            <Option onClick={openEditForm}>Edit</Option>
            <Option onClick={removeComment}>Remove</Option>
          </>
        ) : (
          <Option onClick={openReportPopup}>Report</Option>
        )}
      </Options>
      <ReportModal
        isVisible={isReportModalVisible}
        onRequestClose={closeReportPopup}
        onSuccess={onReportSuccess}
        isLoading={loading}
        text={'Are you sure you want to report this comment?'}
      />
    </>
  )
}

const Options = styled(OptionsBase)`
  height: 2.4rem;
  width: 2.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
`

const useRemoveComment = (postId: string, parentId?: string) => {
  const [removeComment, { loading: isLoading }] = useMutation(
    MUTATION_REMOVE_COMMENT,
    {
      update(cache, _, { variables }) {
        const isReply = !!parentId
        if (isReply) {
          cache.modify({
            id: `FeedComment:${JSON.stringify({ comment: { id: parentId } })}`,
            fields: {
              replies(repliesRefs: any[], { readField }) {
                return repliesRefs.filter((replyRef) => {
                  return (
                    variables?.commentId !==
                    readField('id', readField('comment', replyRef))
                  )
                })
              },
            },
          })
        } else {
          const entityComments = cache.readQuery({
            query: QUERY_LIST_ENTITY_COMMENTS,
            variables: { entityId: postId },
          })
          if (entityComments) {
            cache.writeQuery({
              query: QUERY_LIST_ENTITY_COMMENTS,
              variables: { entityId: postId },
              data: {
                listEntityComments: (
                  entityComments?.listEntityComments ?? []
                ).filter(({ comment }) => variables?.commentId !== comment.id),
              },
              overwrite: true,
            })
          }
          cache.modify({
            id: `FeedPost:${JSON.stringify({ post: { id: postId } })}`,
            fields: {
              comments(commentsRefs: any[], { readField }) {
                return commentsRefs.filter((commentRef) => {
                  return (
                    variables?.commentId !==
                    readField('id', readField('comment', commentRef))
                  )
                })
              },
            },
          })
        }
      },
    },
  )

  return {
    removeComment,
    isLoading,
  }
}
