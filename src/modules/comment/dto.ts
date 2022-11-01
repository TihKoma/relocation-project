import { GraphqlProfile as ProfileDTO } from '@/modules/profile'

import { AddComment_addComment as CommentDTO } from './graphql/__generated__/AddComment'
import {
  ListEntityComments_listEntityComments as FeedCommentDTO,
  ListEntityComments_listEntityComments_replies as FeedCommentReplyDTO,
} from './graphql/__generated__/ListEntityComments'

export const createFeedCommentDTO = (
  comment: CommentDTO,
  profile: ProfileDTO,
): FeedCommentDTO => ({
  __typename: 'FeedComment' as const,
  comment,
  user: calcUser(profile),
  reactions: defaultReactions,
  userReaction: null,
  replies: null,
})

export const createFeedCommentReplyDTO = (
  comment: CommentDTO,
  profile: ProfileDTO,
): FeedCommentReplyDTO => ({
  __typename: 'FeedComment' as const,
  comment,
  user: calcUser(profile),
  reactions: defaultReactions,
  userReaction: null,
})

const defaultReactions = {
  __typename: 'Reactions' as const,
  angry: 0,
  funny: 0,
  like: 0,
  sad: 0,
  super: 0,
  total: 0,
}

const calcUser = (profile: ProfileDTO) => ({
  __typename: 'FeedUser' as const,
  userId: profile.userId,
  firstName: profile.firstName,
  lastName: profile.lastName,
  photoUrl: profile.photoUrl,
  userName: profile.userName,
  isSubscribed: null,
})
