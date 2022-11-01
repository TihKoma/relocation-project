import React from 'react'

import { MyFeed } from '@/components/screens/MyFeed'

import { ServerData } from './_app'

const Feed: React.FC<ServerData> = () => {
  return <MyFeed />
}

export default Feed
