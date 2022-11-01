import { FC } from 'react'
import Head from 'next/head'

import { AreaLayout } from '@/components/shared/AreaLayout'

import { ServerData } from './_app'

const TestCookiePage: FC<ServerData> = () => {
  return (
    <>
      <Head>
        <script
          type="text/javascript"
          src="//cdn.cookie-script.com/s/244a278916121d5c66ac369bef19be73.js"
        />
      </Head>
      <AreaLayout>
        <div>TestCookiePage</div>
      </AreaLayout>
    </>
  )
}

export default TestCookiePage
