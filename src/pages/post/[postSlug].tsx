import { FC } from 'react'
import { useRouter } from 'next/router'
import { ApolloClient } from '@apollo/client'

import { Post } from '@/components/screens/Post'
import { withXRay } from '@/modules/analytics'
import { QUERY_GET_POST_BY_SLUG } from '@/modules/post'
import { ROUTES } from '@/modules/router'

import { ServerData } from '../_app'

// TODO: resolve with area/[postSlug]
const PostPage: FC<ServerData> = () => {
  const router = useRouter()

  const postSlug =
    typeof router.query.postSlug === 'string' ? router.query.postSlug : ''

  if (!postSlug) {
    return null
  }

  return <Post postSlug={postSlug} />
}

export const getServerSideProps = withXRay(async ({ ctx, xRay }) => {
  const apolloClient = (
    ctx.req as unknown as { apolloClient: ApolloClient<object> }
  ).apolloClient

  const postSlug = ctx.query.postSlug

  try {
    await xRay.captureAsyncFunc('get post', async (subsegment) => {
      const data = await apolloClient.query({
        query: QUERY_GET_POST_BY_SLUG,
        variables: { slug: postSlug as string },
      })
      const { post } = data.data.getPostBySlug

      subsegment?.close()

      if (post.slug === postSlug) {
        return {
          props: {},
        }
      } else {
        return {
          redirect: {
            destination: encodeURI(
              ROUTES.detailedPost.calcUrl({ postSlug: post.slug as string }),
            ),
            permanent: false,
          },
        }
      }
    })
  } catch {
    return {
      notFound: true,
      props: {},
    }
  }

  return {
    props: {},
  }
})

export default PostPage
