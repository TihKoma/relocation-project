import { useRouter } from 'next/router'
import { useApolloClient, useMutation, useQuery } from '@apollo/client'

import { useAnalytics } from '@/modules/analytics'
import { QUERY_SEARCH_GROUPS } from '@/modules/group'
import { mapServiceLocator, QUERY_GET_REGION_INFO } from '@/modules/map'
import {
  MUTATION_CREATE_POST,
  MUTATION_EDIT_POST,
  PostType,
} from '@/modules/post'
import { QUERY_GET_USER_PROFILE } from '@/modules/profile'
import { ROUTES } from '@/modules/router'

import { PostFormModel, PostInitialValues } from './types'

export const useSubmitPost = (
  initialValuesBase: PostInitialValues,
  initialRegionId?: string,
  regionId?: string,
  feedId?: string,
  onClose?: () => void,
  dirtyFields?: Record<keyof PostFormModel, boolean>,
) => {
  const analytics = useAnalytics()
  const router = useRouter()
  const { data: profileData } = useQuery(QUERY_GET_USER_PROFILE, {
    ssr: false,
  })
  const profile = profileData?.getUserProfile

  const { data: regionInfo } = useQuery(QUERY_GET_REGION_INFO, {
    skip: !regionId,
    variables: { id: regionId as string },
    ssr: false,
  })
  const apolloClient = useApolloClient()

  const [createPost] = useMutation(MUTATION_CREATE_POST, {
    update(cache, { data }) {
      const post = data?.createPost
      if (post && profile && regionInfo?.getRegionInfo) {
        cache.modify({
          optimistic: true,
          id: `Feed:${feedId}`,
          fields: {
            posts(postsRefs: any[], { toReference }) {
              const postReference = toReference(
                post as { [index: string]: any },
              )

              const regionReference = toReference(
                regionInfo.getRegionInfo as { [index: string]: any },
              )

              const newPost = {
                post: { id: post.id, ...postReference },
                __typename: 'FeedPost' as 'FeedPost',
                user: {
                  __typename: 'FeedUser' as 'FeedUser',
                  userId: profile.userId,
                  firstName: profile.firstName,
                  lastName: profile.lastName,
                  photoUrl: profile.photoUrl,
                  userName: profile.userName,
                },
                region: regionReference,
                userReaction: null,
                reactions: {
                  __typename: 'Reactions' as 'Reactions',
                  angry: 0,
                  funny: 0,
                  like: 0,
                  sad: 0,
                  super: 0,
                  total: 0,
                },
                comments: [],
              }

              return [toReference(newPost, true), ...postsRefs]
            },
          },
        })
      } else {
        // eslint-disable-next-line no-console
        console.error('when create post: !post || !profile || !regionInfo')
      }
    },
  })
  const [editPost] = useMutation(MUTATION_EDIT_POST)

  const onSubmit = async (form: PostFormModel) => {
    let newRegionId

    try {
      if ('id' in form) {
        if ('id' in initialValuesBase) {
          const result = await editPost({
            variables: {
              postId: form.id,
              input: {
                regionId: form.region?.id,
                content: form.content,
                geoData: form.geoData,
                media: form.media.map(({ url, type }) => ({
                  ...(initialValuesBase.media.find(
                    (media) => media.url === url,
                  ) ?? {
                    description: '',
                    sortKey: 0,
                  }),
                  url,
                  type,
                })),
              },
            },
          })

          newRegionId =
            result.data?.editPost?.regionId !== initialRegionId
              ? result.data?.editPost?.regionId
              : ''
        }
      } else {
        const result = await createPost({
          variables: {
            input: {
              regionId: form.region?.id ?? '',
              groupId: form.group?.id,
              type: PostType.POST,
              content: form.content,
              geoData: form.geoData,
              media: form.media.map(({ url, type }) => ({
                url,
                type,
                description: '',
                sortKey: 0,
              })),
            },
          },
        })

        newRegionId =
          result.data?.createPost?.regionId !== initialRegionId
            ? result.data?.createPost?.regionId
            : ''
      }

      analytics?.publishPost()

      onClose?.()

      if (form.group?.id) {
        const { data } = await apolloClient.query({
          query: QUERY_SEARCH_GROUPS,
          variables: {
            input: {
              limit: 1,
              id: form.group.id,
            },
          },
        })

        const group = data.searchGroups.groups?.[0]
        if (group) {
          router.push(
            ROUTES.group.calcUrl({
              groupSlug: group.slug,
            }),
          )
          return
        }
      }
      if (typeof newRegionId === 'string' && newRegionId !== '') {
        const { data } = await apolloClient.query({
          query: QUERY_GET_REGION_INFO,
          variables: { id: newRegionId },
        })

        if (data.getRegionInfo?.slug) {
          router.push(
            ROUTES.area.calcUrl({
              regionSlug: data.getRegionInfo.slug,
            }),
            undefined,
            { shallow: true },
          )
        }
      }

      if (dirtyFields?.geoData) {
        mapServiceLocator.getDiscoveryCPMapAsync().then((mapFacade) => {
          mapFacade.drawPostMarkersByBBox()
        })
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err)
    }
  }

  return onSubmit
}
