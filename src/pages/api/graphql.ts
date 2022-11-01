// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'
import { createProxyMiddleware } from 'http-proxy-middleware'

const authProxyMiddleware = createProxyMiddleware({
  target: process.env.SERVER_URL,
  changeOrigin: true,
  secure: false,
  cookieDomainRewrite: {
    '*': 'localhost',
  },
  logLevel: 'debug',
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  return (authProxyMiddleware as any)(req, res)
}

export const config = {
  api: {
    bodyParser: false,
  },
}
