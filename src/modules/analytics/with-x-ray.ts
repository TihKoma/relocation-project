import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import type AWSXRayAPI from 'aws-xray-sdk-core'

const AWSXRay: typeof AWSXRayAPI =
  process.env.RUNTIME_ENV === 'server' ? require('aws-xray-sdk-core') : null

export const withXRay = (
  getServerSideProps: (options: {
    ctx: GetServerSidePropsContext
    xRay: typeof AWSXRayAPI
  }) => ReturnType<GetServerSideProps>,
) => {
  const wrapped: GetServerSideProps = async (ctx) => {
    const segment = AWSXRay.middleware.traceRequestResponseCycle(
      ctx.req,
      ctx.res,
    )
    const xRayNamespace = AWSXRay.getNamespace()

    xRayNamespace.bindEmitter(ctx.req)
    xRayNamespace.bindEmitter(ctx.res)

    return xRayNamespace.runAndReturn(() => {
      AWSXRay.setSegment(segment)
      const result = getServerSideProps({ ctx, xRay: AWSXRay })
      AWSXRay.resolveSegment(segment)
      return result
    })
  }

  return wrapped
}
