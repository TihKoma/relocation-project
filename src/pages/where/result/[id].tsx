import { Result } from '@/components/screens/where/Result'
import { withXRay } from '@/modules/analytics'
import { QUERY_QUIZ } from '@/modules/quiz'

const ResultPage = () => {
  return <Result />
}

export const getServerSideProps = withXRay(async ({ ctx, xRay }) => {
  // @ts-ignore
  const apolloClient = ctx.req.apolloClient

  const id = ctx.query.id
  let notFound = false

  try {
    await xRay.captureAsyncFunc('get quiz', async (subsegment) => {
      await apolloClient.query({
        query: QUERY_QUIZ,
        variables: { id, position: 0, limit: 0 },
      })
      subsegment?.close()
    })
  } catch {
    notFound = true
  }

  return {
    notFound,
    props: {},
  }
})

export default ResultPage
