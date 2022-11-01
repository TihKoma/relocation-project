import { FC, useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'

import {
  MockWithAction as MockWithActionBase,
  SignInMock,
} from '@/components/shared/MockWithAction'
import { ModalPortal } from '@/components/ui-kit/Modal'
import {
  PlaceholderEyeIcon,
  PlaceholderGear,
  PlaceholderQuestionIcon,
} from '@/images'
import { useAuthorizationStore } from '@/modules/authorization'
import { useUserRegion } from '@/modules/neighbourhood'
import { useRegionSlugForDiscovery } from '@/modules/neighbourhood'
import { QUERY_GET_USER_PROFILE } from '@/modules/profile'
import { ROUTES } from '@/modules/router'
import { mobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

export const Placeholder: FC = () => {
  const router = useRouter()

  const [{ isLoggedIn }] = useAuthorizationStore()

  const { data: { getUserProfile: profile } = {} } = useQuery(
    QUERY_GET_USER_PROFILE,
  )

  const [regionSlug] = useRegionSlugForDiscovery()

  const goToDiscovery = () => {
    router.push(ROUTES.area.calcUrl({ regionSlug }))
  }
  const goToRegion = useCallback(
    (regionSlug: string) => {
      router.push(ROUTES.area.calcUrl({ regionSlug }))
    },
    [router],
  )

  const { detectGeolocation, region, loading, isGeoDisabled } = useUserRegion()

  const [isGeoModalOpen, setIsGeoModalOpen] = useState(false)
  const openGeoModal = () => {
    setIsGeoModalOpen(true)
  }
  const closeGeoModal = () => {
    setIsGeoModalOpen(false)
  }

  const onDetectGeolocation = () => {
    if (region) {
      goToRegion(region.slug)
    } else {
      detectGeolocation()
    }
  }

  useEffect(() => {
    if (isGeoDisabled) {
      openGeoModal()
    }
    if (region) {
      goToRegion(region.slug)
    }
  }, [region, isGeoDisabled, loading, goToRegion])

  if (!isLoggedIn) {
    return (
      <SignInMock
        customTitle={'Hold on a sec!'}
        customDescription={'You need to log in to see your feed'}
      />
    )
  }
  if (profile?.followingsCount) {
    return (
      <MockWithAction
        image={<PlaceholderEyeIcon />}
        title={'Your feed is empty'}
        description={'You can find interesting people near you'}
        buttonText={'Go to Discovery'}
        onClick={goToDiscovery}
      />
    )
  }
  return (
    <>
      <MockWithAction
        image={<PlaceholderQuestionIcon />}
        title={'Your feed is empty'}
        description={
          'Define your neighborhood to find interesting news and people'
        }
        buttonText={'Define your neighborhood '}
        onClick={onDetectGeolocation}
        loading={loading}
      />
      <ModalPortal isVisible={isGeoModalOpen} onRequestClose={closeGeoModal}>
        <ModalContainer>
          <MockWithAction
            image={<PlaceholderGear />}
            title={'Allow Nicity to use your location'}
            description={
              'Turn on location permissions to see your neighborhood'
            }
            buttonText={'Ok'}
            onClick={closeGeoModal}
          />
        </ModalContainer>
      </ModalPortal>
    </>
  )
}

const MockWithAction = styled(MockWithActionBase)`
  padding-top: 2.4rem;
`
const ModalContainer = styled.div`
  padding: 6.8rem;
  border-radius: 3.2rem;

  background: ${getColorTheme('earth')};

  ${mobileMedia} {
    padding: 2.4rem;
  }
`
