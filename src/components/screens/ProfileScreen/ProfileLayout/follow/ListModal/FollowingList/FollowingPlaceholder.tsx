import { VFC } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'

import { MockWithAction } from '@/components/shared/MockWithAction'
import {
  PlaceholderEmotions,
  PlaceholderGear,
  PlaceholderHousesPlus,
  PlaceholderMarker,
  PlaceholderUserPlus,
} from '@/images'
import {
  QUERY_DETECT_REGION,
  useFollowNeighborhood,
} from '@/modules/neighbourhood'
import { useUserRegion } from '@/modules/neighbourhood'
import {
  QUERY_GET_USER_PROFILE,
  QUERY_LIST_FOLLOWED_REGIONS,
} from '@/modules/profile'
import { ROUTES } from '@/modules/router'
import { SubscriptableType } from '@/modules/subscription'

import type { Tab } from '../types'

type Props = {
  tab?: Tab
  userName: string
  userId: string
}
export const FollowingPlaceholder: VFC<Props> = ({ tab, userName, userId }) => {
  const router = useRouter()

  const { data: detectRegionData } = useQuery(QUERY_DETECT_REGION, {
    ssr: false,
  })

  const { data: { getUserProfile: myProfile } = {} } = useQuery(
    QUERY_GET_USER_PROFILE,
  )

  const { detectGeolocation, region, loading, isGeoDisabled } = useUserRegion()

  const redirectToSearch = () => {
    const path = ROUTES.search.calcUrl({ query: '' })
    router.push(path)
  }

  const redirectToDiscovery = () => {
    const path = ROUTES.area.calcUrl({
      regionSlug: region?.slug || detectRegionData?.detectRegion?.slug || '',
    })
    router.push(path)
  }

  const [follow] = useFollowNeighborhood({
    variables: {
      skip: !region?.id,
      input: {
        subscriptableId: region?.id,
        subscriptableType: SubscriptableType.REGION,
      },
    },
    refetchQueries: [QUERY_LIST_FOLLOWED_REGIONS],
  })

  const followUserRegion = () => {
    follow()
  }

  const isMyProfile = myProfile?.userId === userId

  if (isMyProfile) {
    if (tab === 'Groups') {
      return (
        <MockWithAction
          image={<PlaceholderEmotions />}
          title={'You have no subscriptions'}
          // TODO add with new search
          // description={'You can find interesting groups'}
          // buttonText={'Search'}
          // onClick={...}
        />
      )
    }
    if (isGeoDisabled) {
      return (
        <MockWithAction
          image={<PlaceholderGear />}
          title={'Allow Nicity to find you!'}
          description={'Turn on location permissions to see your neighborhood'}
        />
      )
    }
    if (region) {
      if (tab === 'Neighborhoods') {
        return (
          <MockWithAction
            title={`Is ${region.name} your neighborhood?`}
            buttonText={'Follow'}
            onClick={followUserRegion}
            secondaryButtonText={'Search'}
            secondaryButtonOnClick={redirectToSearch}
          />
        )
      }
      return (
        <MockWithAction
          image={<PlaceholderMarker />}
          title={'You have no subscriptions'}
          description={'You can find interesting people near you'}
          buttonText={'Go to Discovery'}
          onClick={redirectToDiscovery}
        />
      )
    }

    return (
      <MockWithAction
        loading={loading}
        image={<PlaceholderMarker />}
        title={'You have no subscriptions'}
        description={'You can find interesting people near you'}
        buttonText={'Define my neighborhood'}
        onClick={detectGeolocation}
        secondaryButtonText={'Search'}
        secondaryButtonOnClick={redirectToSearch}
      />
    )
  }

  if (tab === 'Groups') {
    return (
      <MockWithAction
        image={<PlaceholderEmotions />}
        title={`${userName} has no group subscriptions`}
      />
    )
  }
  if (tab === 'Neighborhoods') {
    return (
      <MockWithAction
        image={<PlaceholderHousesPlus />}
        title={`${userName} has no neighborhood subscriptions`}
        description={`They'll be listed here`}
      />
    )
  }
  return (
    <MockWithAction
      image={<PlaceholderUserPlus />}
      title={`${userName} isn’t following anyone`}
      description={`They'll be listed here`}
    />
  )
}
