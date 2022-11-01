import { useMemo, VFC } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { css } from '@emotion/css'
import styled from '@emotion/styled'
import {
  Controller,
  ControllerRenderProps,
  FieldValues,
  SubmitHandler,
  useForm,
} from 'react-hook-form'

import { Avatar as AvatarBase } from '@/components/ui-kit/Avatar'
import { FieldTextArea } from '@/components/ui-kit/form/TextArea'
import { IconButton } from '@/components/ui-kit/IconButton'
import { ArrowIcon } from '@/images/ArrowIcon'
import { useAnalytics } from '@/modules/analytics'
import {
  CommentEntityType,
  createFeedCommentDTO,
  createFeedCommentReplyDTO,
  MUTATION_ADD_COMMENT,
  MUTATION_EDIT_COMMENT,
  QUERY_LIST_ENTITY_COMMENTS,
} from '@/modules/comment'
import { QUERY_GET_USER_PROFILE } from '@/modules/profile'
import { lengthLessOrEqualThen, required } from '@/modules/utils/validatores'

const MAX_TEXT_LENGTH = 1000

type FormModelEdit = {
  id: string
  comment: string
}
type FormModelCreate = {
  postId: string
  parentId?: string
  comment: string
}
type FormModel = FormModelCreate | FormModelEdit

export type Props = {
  onClose?: () => void
  initialValues: FormModelEdit | Omit<FormModelCreate, 'comment'>
  className?: string
  withAvatar?: boolean
  withBackground?: boolean
}

export const CommentForm: VFC<Props> = ({
  onClose,
  className,
  withBackground,
  withAvatar,
  initialValues: initialValuesBase,
}) => {
  const initialValues: FormModel = useMemo(() => {
    if ('id' in initialValuesBase) {
      return initialValuesBase
    } else {
      return { ...initialValuesBase, comment: '' }
    }
  }, [initialValuesBase])
  const { data: profileQuery } = useQuery(QUERY_GET_USER_PROFILE, {
    ssr: true,
  })
  const profile = profileQuery?.getUserProfile
  const analytics = useAnalytics()

  const addComment = useAddComment(initialValues as FormModelCreate)
  const [editComment] = useMutation(MUTATION_EDIT_COMMENT)

  const {
    reset,
    handleSubmit,
    control,
    formState: { isSubmitting, isDirty },
  } = useForm<FormModelCreate>({ defaultValues: initialValues })

  const onSubmit: SubmitHandler<FormModel> = async (form) => {
    if ('id' in form) {
      await editComment({
        variables: {
          commentId: form.id,
          input: {
            text: form.comment,
          },
        },
      })
    } else {
      await addComment({
        variables: {
          input: {
            entityId: form.postId,
            parentId: form.parentId,
            entityType: CommentEntityType.POST,
            text: form.comment,
          },
        },
      })
    }
    reset()
    onClose?.()

    analytics?.publishComment()
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className={className}>
      {withAvatar && (
        <Avatar src={profile?.photoUrl} size={'medium'} isLazyLoad />
      )}
      <Controller
        control={control}
        name={'comment'}
        rules={{
          validate: {
            lengthLessOrEqualThen: lengthLessOrEqualThen(MAX_TEXT_LENGTH),
            required: required(),
          },
        }}
        render={(input) => (
          <FieldComment
            withBackground={withBackground}
            classNameInput={TextAreaStyle}
            autoresize
            data-test-id={'comment-form'}
            placeholder={'Type your reply'}
            initialInputHeight={56}
            {...input}
            field={
              input.field as unknown as ControllerRenderProps<
                FieldValues,
                string
              >
            }
          />
        )}
      />
      <SubmitButton
        type={'submit'}
        Icon={<ArrowIcon direction={'top'} />}
        disabled={isSubmitting || !isDirty}
      />
    </Form>
  )
}

const TextAreaStyle = css`
  padding-right: 60px;
  position: relative;
`
const FieldComment = styled(FieldTextArea)`
  flex-grow: 1;
`
const SubmitButton = styled(IconButton)`
  position: absolute;
  right: 1.4rem;
  bottom: 0.8rem;

  z-index: 1;

  ${IconButton.size.medium}
  ${IconButton.viewType.primary}
`
const Avatar = styled(AvatarBase)`
  align-self: center;
  flex-shrink: 0;

  position: absolute;
  left: -5.7rem;
  top: 0;
`
const Form = styled.form`
  display: flex;
  position: relative;
`

const useAddComment = (initialValues: FormModelCreate) => {
  const { data: profileQuery } = useQuery(QUERY_GET_USER_PROFILE, {
    ssr: false,
  })
  const profile = profileQuery?.getUserProfile

  const [addComment] = useMutation(MUTATION_ADD_COMMENT, {
    update(cache, { data }) {
      const isReply = !!initialValues.parentId

      // TODO update comment state for replies https://nicity.atlassian.net/browse/CP-1056
      const comment = data?.addComment
      if (!comment || !profile || !('postId' in initialValues)) {
        // eslint-disable-next-line no-console
        console.error('have not comment when add him')
        return
      }

      if (isReply) {
        const feedComment = createFeedCommentReplyDTO(comment, profile)

        cache.modify({
          id: `FeedComment:${JSON.stringify({
            comment: { id: initialValues.parentId },
          })}`,
          fields: {
            replies(repliesRefs: any[], { toReference }) {
              return [
                toReference(
                  {
                    ...feedComment,
                    // @ts-ignore
                    comment: { id: comment.id, ...toReference(comment) },
                  },
                  true,
                ),
                ...(repliesRefs ?? []),
              ]
            },
          },
        })
        cache.modify({
          id: `FeedPost:${JSON.stringify({
            post: { id: initialValues.postId },
          })}`,
          fields: {
            commentsCount: (commentsCountRef) => {
              return commentsCountRef + 1
            },
          },
        })
      } else {
        const feedComment = createFeedCommentDTO(comment, profile)

        const entityComments = cache.readQuery({
          query: QUERY_LIST_ENTITY_COMMENTS,
          variables: { entityId: initialValues.postId },
        })
        if (entityComments) {
          cache.writeQuery({
            query: QUERY_LIST_ENTITY_COMMENTS,
            variables: { entityId: initialValues.postId },
            data: {
              listEntityComments: [
                feedComment,
                ...(entityComments?.listEntityComments ?? []),
              ],
            },
            overwrite: true,
          })
        }
        cache.modify({
          id: `FeedPost:${JSON.stringify({
            post: { id: initialValues.postId },
          })}`,
          fields: {
            comments(commentsRefs: any[], { toReference }) {
              return [
                toReference(
                  {
                    ...feedComment,
                    // @ts-ignore
                    comment: { id: comment.id, ...toReference(comment) },
                  },
                  true,
                ),
                ...commentsRefs,
              ]
            },
            commentsCount: (commentsCountRef) => {
              return commentsCountRef + 1
            },
          },
        })
      }
    },
  })

  return addComment
}
