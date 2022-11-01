import React from 'react'

import { HomesScreen } from '@/components/screens/HomesScreen'

import { ServerData } from '../_app'

const HomesPage: React.FC<ServerData> = () => {
  return <HomesScreen />
}

export default HomesPage
