import { gql, TypedDocumentNode } from '@apollo/client'

import { Search, SearchVariables } from './__generated__/Search'
import { SearchV2, SearchV2Variables } from './__generated__/SearchV2'
import {
  SearchV2Summary,
  SearchV2SummaryVariables,
} from './__generated__/SearchV2Summary'

export const QUERY_SEARCH: TypedDocumentNode<Search, SearchVariables> = gql`
  query Search(
    $searchType: SearchType!
    $query: String!
    $page: Int
    $limit: Int
  ) {
    search(searchType: $searchType, query: $query, page: $page, limit: $limit) {
      ... on Region {
        id
        name
        subscribed
        subscribersCount
        slug
        subtitle
        PhotoUrl
      }
    }
  }
`

export const QUERY_SEARCH_V2: TypedDocumentNode<
  SearchV2,
  SearchV2Variables
> = gql`
  query SearchV2(
    $query: String!
    $type: EntityType
    $limit: Int
    $offset: Int
  ) {
    searchV2(
      input: { Query: $query, Type: $type, Limit: $limit, Offset: $offset }
    ) {
      Status {
        Total
        Length
        TookInMillis
      }
      Docs {
        Meta {
          Score
          Type
        }
        Entity {
          ... on Group {
            id
            region {
              id
              subtitle
              slug
            }
            name
            description
            slug
            cover
            avatar
            members {
              total
              iAmIn
            }
          }
          ... on FeedPost {
            post {
              id
              userId
              regionId
              type
              content
              media {
                url
                type
                description
                sortKey
              }
              geoData
              tags
              tagsPositions
              createdAt
              updatedAt
              isRead
              slug
              groupId
            }
            user {
              userId
              userName
              firstName
              lastName
              photoUrl
              isSubscribed
            }
            geo {
              address
              title
            }
            region {
              id
              name
              subscribed
              subscribersCount
              slug
              subtitle
              PhotoUrl
            }
            reactions {
              like
              super
              funny
              sad
              angry
              total
            }
            viewsCount
            userReaction {
              id
              userId
              entityId
              entityType
              type
              createdAt
              updatedAt
            }
            commentsCount
            comments {
              comment {
                id
                userId
                entityId
                entityType
                parentId
                text
                createdAt
                updatedAt
              }
              userReaction {
                id
                userId
                entityId
                entityType
                type
                createdAt
                updatedAt
              }
              reactions {
                like
                super
                funny
                sad
                angry
                total
              }
            }
            group {
              id
              region {
                id
                subtitle
                slug
              }
              name
              description
              slug
              cover
              avatar
              members {
                total
                iAmIn
              }
            }
          }
          ... on Tag {
            tag
            popular
            createdAt
            updatedAt
          }
          ... on Region {
            id
            name
            subscribed
            subscribersCount
            slug
            subtitle
            PhotoUrl
          }
          ... on PublicProfile {
            id
            userId
            userName
            firstName
            lastName
            bio
            photoUrl
            coverUrl
            isFilled
            subscribed
            followersCount
            followingsCount
          }
        }
      }
    }
  }
`

export const QUERY_SEARCH_V2_SUMMARY: TypedDocumentNode<
  SearchV2Summary,
  SearchV2SummaryVariables
> = gql`
  query SearchV2Summary($query: String!) {
    searchV2Summary(input: { Query: $query }) {
      Status {
        Total
        Length
        TookInMillis
      }
      Buckets {
        Name
        Total
        Length
        Docs {
          Meta {
            Score
            Type
          }
          Entity {
            ... on Group {
              id
              region {
                id
                subtitle
                slug
              }
              name
              description
              slug
              cover
              avatar
              members {
                total
                iAmIn
              }
            }
            ... on FeedPost {
              post {
                id
                userId
                regionId
                type
                content
                media {
                  url
                  type
                  description
                  sortKey
                }
                geoData
                tags
                tagsPositions
                createdAt
                updatedAt
                isRead
                slug
                groupId
              }
              user {
                userId
                userName
                firstName
                lastName
                photoUrl
                isSubscribed
              }
              geo {
                address
                title
              }
              region {
                id
                name
                subscribed
                subscribersCount
                slug
                subtitle
                PhotoUrl
              }
              reactions {
                like
                super
                funny
                sad
                angry
                total
              }
              viewsCount
              userReaction {
                id
                userId
                entityId
                entityType
                type
                createdAt
                updatedAt
              }
              commentsCount
              comments {
                comment {
                  id
                  userId
                  entityId
                  entityType
                  parentId
                  text
                  createdAt
                  updatedAt
                }
                userReaction {
                  id
                  userId
                  entityId
                  entityType
                  type
                  createdAt
                  updatedAt
                }
                reactions {
                  like
                  super
                  funny
                  sad
                  angry
                  total
                }
              }
              group {
                id
                region {
                  id
                  subtitle
                  slug
                }
                name
                description
                slug
                cover
                avatar
                members {
                  total
                  iAmIn
                }
              }
            }
            ... on Tag {
              tag
              popular
              createdAt
              updatedAt
            }
            ... on Region {
              id
              name
              subscribed
              subscribersCount
              slug
              subtitle
              PhotoUrl
            }
            ... on PublicProfile {
              id
              userId
              userName
              firstName
              lastName
              bio
              photoUrl
              coverUrl
              isFilled
              subscribed
              followersCount
              followingsCount
            }
          }
        }
      }
    }
  }
`
