import { gql, TypedDocumentNode } from '@apollo/client'

import {
  SearchGroups,
  SearchGroupsVariables,
} from '@/modules/group/graphql/__generated__/SearchGroups'
import { FRAGMENT_POST_FIELDS } from '@/modules/post'
import { FRAGMENT_PUBLIC_PROFILE_FIELDS } from '@/modules/profile'

import {
  GetGroupFeed,
  GetGroupFeedVariables,
} from './__generated__/GetGroupFeed'

export const QUERY_GET_GROUP_FEED: TypedDocumentNode<
  GetGroupFeed,
  GetGroupFeedVariables
> = gql`
  ${FRAGMENT_POST_FIELDS}
  query GetGroupFeed($feedId: ID, $groupId: ID!, $position: Int, $limit: Int) {
    getGroupFeed(
      feedId: $feedId
      groupId: $groupId
      position: $position
      limit: $limit
    ) {
      id
      posts {
        ...PostFields
      }
    }
  }
`

export const QUERY_SEARCH_GROUPS: TypedDocumentNode<
  SearchGroups,
  SearchGroupsVariables
> = gql`
  ${FRAGMENT_PUBLIC_PROFILE_FIELDS}
  query SearchGroups($input: SearchGroupsInput!) {
    searchGroups(input: $input) {
      length
      total
      groups {
        slug
        author {
          ...PublicProfileFields
        }
        avatar
        cover
        createdAt
        description
        id
        members {
          total
          iAmIn
          profiles {
            ...PublicProfileFields
          }
        }
        name
        region {
          id
          name
          city
          country
          subtitle
          slug
          placeType
        }
        slug
        updatedAt
      }
    }
  }
`
