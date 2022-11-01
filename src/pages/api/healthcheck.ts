import { NextApiRequest, NextApiResponse } from 'next'
import { withSentry } from '@sentry/nextjs'

function handler(_req: NextApiRequest, res: NextApiResponse) {
  res.send('')
}

export default withSentry(handler)
