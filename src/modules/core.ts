import {
  ApolloClient,
  ApolloClientOptions,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client'
import { FieldMergeFunction } from '@apollo/client/cache/inmemory/policies'
import { createUploadLink } from 'apollo-upload-client'
import { IncomingHttpHeaders } from 'http'
import uniqBy from 'lodash/uniqBy'

import {
  AdapterGeoJsonFromMapboxToTomTomApolloClient,
  GeocodeFeature,
} from '@/modules/map'
import { API_HOST, NODE_DEVELOPMENT } from '@/modules/utils/config'
import { isServer } from '@/modules/utils/is-server'

const PATH = `${API_HOST}/api/graphql`
let apolloClientCached: ApolloClient<NormalizedCacheObject> | null = null

export const createApollo = ({
  initialData = {},
  headers,
}: {
  initialData?: NormalizedCacheObject
  cookie?: string
  headers?: IncomingHttpHeaders
}) => {
  if (apolloClientCached) {
    return apolloClientCached
  }

  const cache = new InMemoryCache({
    typePolicies: {
      FeedPost: {
        keyFields: ['post', ['id']],
      },
      FeedComment: {
        keyFields: ['comment', ['id']],
      },
      Feed: {
        fields: {
          posts: {
            keyArgs: ['regionId', 'feedId'],
            merge: mergeArrayWithUniq,
          },
        },
      },
      Post: {
        fields: {
          geoData: {
            read: (existing) => {
              if (typeof existing?.place_name !== 'string') {
                return existing
              }
              const [title, ...subTitle] = existing.place_name?.split(',')

              return {
                id: existing?.id,
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: existing?.geometry?.coordinates ?? [0, 0],
                },
                properties: {
                  title,
                  subTitle: subTitle.join(','),
                  fullAddress: existing.place_name,
                },
              } as GeocodeFeature
            },
          },
        },
      },
      QuizStep: {
        keyFields: false,
      },
      PublicProfile: {
        keyFields: ['userId'],
      },
      PublicProfileNotification: {
        keyFields: ['userId'],
      },
      Query: {
        fields: {
          listPostsByUser: {
            keyArgs: ['userId'],
            merge: mergeArray,
          },
          listEntityComments: {
            keyArgs: ['entityId'],
            merge: mergeArrayWithUniq,
          },
          getFilteredListings: {
            keyArgs: ['regionId', 'filter', 'order', 'bbox'],
            merge: mergeArrayWithUniq,
          },
        },
      },
    },
  })

  cache.restore(initialData)

  const options: ApolloClientOptions<NormalizedCacheObject> = {
    uri: PATH,
    cache,
    ssrMode: isServer,
    connectToDevTools: NODE_DEVELOPMENT,
    link: createUploadLink({
      uri: PATH,
      ...(headers
        ? {
            headers: {
              'x-amzn-trace-id': headers['x-amzn-trace-id'],
              Cookie: headers.cookie,
              'True-Client-IP': headers['true-client-ip'],
              'X-Forwarded-For': headers['x-forwarded-for'],
              'X-Real-IP': headers['x-real-ip'],
            },
          }
        : {}),
    }),
  }

  if (!isServer && NODE_DEVELOPMENT) {
    // @ts-ignore
    window.inMemoryCache = options.cache
  }

  const apolloClient = new AdapterGeoJsonFromMapboxToTomTomApolloClient(options)

  if (!isServer) {
    apolloClientCached = apolloClient
  }

  return apolloClient
}

const mergeArray: FieldMergeFunction = (existing, incoming) => {
  return [...(existing ?? []), ...incoming]
}

// TODO: fix apollo. When two request in same time. It merge twice
const mergeArrayWithUniq: FieldMergeFunction = (existing, incoming) => {
  return uniqBy([...(existing ?? []), ...incoming], (item) => item.__ref)
}
