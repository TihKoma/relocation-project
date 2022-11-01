import { FC, useState } from 'react'
import styled from '@emotion/styled'

import { LoadingState } from '@/components/shared/LoadingState'
import { MockWithAction } from '@/components/shared/MockWithAction'
import { Button } from '@/components/ui-kit/Button'
import { Loader } from '@/components/ui-kit/Loader'
import { ModalPortal } from '@/components/ui-kit/Modal'
import { PlaceholderGear } from '@/images'
import { useUserRegion } from '@/modules/neighbourhood'
import { mobileMedia, notMobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

import { Region } from '../types'
import { Search } from './Search'

type Props = {
  selectRegion: (region: Region) => void
  selectedRegion: Region | null
}
export const WhereFromStepContent: FC<Props> = ({
  selectRegion,
  selectedRegion,
}) => {
  const [detectLocationModalIsOpen, setDetectLocationModalIsOpen] =
    useState(false)
  const { detectGeolocation, region, loading, isGeoDisabled } = useUserRegion()

  const openDetectLocationModal = () => {
    setDetectLocationModalIsOpen(true)
    detectGeolocation()
  }
  const closeDetectLocationModal = () => {
    setDetectLocationModalIsOpen(false)
  }

  const selectUserCurrentLocation = () => {
    if (region) {
      selectRegion({
        id: String(region.id),
        name: region.name,
        slug: region.slug,
      })
    }
    closeDetectLocationModal()
  }

  return (
    <>
      <FormWrapper>
        <Search selectRegion={selectRegion} selectedRegion={selectedRegion} />
      </FormWrapper>
      <Or>Or</Or>
      <Button fullWidth size={'small'} onClick={openDetectLocationModal}>
        Choose my current location
      </Button>
      <ModalPortal
        isVisible={detectLocationModalIsOpen}
        onRequestClose={setDetectLocationModalIsOpen}
      >
        <ModalContainer>
          <LoadingState
            loading={loading}
            loadingComponent={
              <Loader color={'neptune'} size={'medium'} withGradient />
            }
          >
            {isGeoDisabled && (
              <MockWithAction
                image={<PlaceholderGear />}
                title={'Allow Nicity to find you!'}
                description={
                  'Turn on location permissions to see your neighborhood'
                }
              />
            )}
            {region && (
              <Placeholder>
                <MockWithAction
                  title={`Your location is ${region.name}?`}
                  image={<PlaceholderGear />}
                  buttonText={'Yes, choose it'}
                  onClick={selectUserCurrentLocation}
                  secondaryButtonText={'No, I will choose another'}
                  secondaryButtonOnClick={closeDetectLocationModal}
                />
              </Placeholder>
            )}
          </LoadingState>
        </ModalContainer>
      </ModalPortal>
    </>
  )
}

const FormWrapper = styled.div`
  width: 100%;
  margin-bottom: 0.8rem;

  position: relative;

  ${notMobileMedia} {
    height: 5.6rem;
  }

  ${mobileMedia} {
    height: 4rem;
  }
`
const Or = styled.div`
  margin-bottom: 0.8rem;
  justify-self: center;

  color: ${getColorTheme('textDefaultSecondary')};
`
const ModalContainer = styled.div`
  width: 100%;
  min-height: 36.4rem;
  margin: auto 1.6rem auto 1.6rem;

  border-radius: 2.4rem;
  display: flex;
  align-items: center;
  justify-content: center;

  background: ${getColorTheme('earth')};
`
const Placeholder = styled.div`
  height: 100%;
  width: 100%;

  display: grid;
  grid-auto-flow: row;
  justify-items: center;
  gap: 1.6rem;
`
