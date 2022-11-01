import { FC, useEffect, useRef } from 'react'
import styled from '@emotion/styled'

import { ButtonDetectLocation } from '@/components/shared/maps/BaseMap'
import { ZoomLevelsButtons } from '@/components/shared/maps/BaseMap/ZoomButtons/ZoomLevelsButtons'
import { ArrowIcon, CrossIcon } from '@/images'
import { useCurrentBackgroundMap } from '@/modules/map'
import { mobileMedia, notMobileMedia } from '@/styles/media'

import { BackButton, BaseNavButton, HeaderModel, polyfillVh } from './shared'

type Props = {} & Pick<
  HeaderModel,
  'onRequestBack' | 'onRequestClose' | 'withoutCloseButton'
>
export const HeaderMobile: FC<Props> = ({
  onRequestClose,
  onRequestBack,
  withoutCloseButton,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const mapFacade = useCurrentBackgroundMap()

  useEffect(() => {
    const handler = () => {
      ref.current?.style.setProperty(
        // fix for mobile safari
        polyfillVh,
        window.innerHeight + 'px',
      )
    }
    window.addEventListener('resize', handler)
    handler()
    return () => window.removeEventListener('resize', handler)
  }, [])

  const button = onRequestClose ? (
    <RightButtonMobile onClick={onRequestClose}>
      <CrossIcon />
    </RightButtonMobile>
  ) : mapFacade ? (
    <>
      <ZoomLevelsButtons />
      <RightButtonMobile
        as={ButtonDetectLocation}
        // @ts-ignore
        mapFacade={mapFacade}
      />
    </>
  ) : null

  return (
    <HeaderButtonMobile ref={ref}>
      {onRequestBack && (
        <BackButtonMobile onClick={onRequestBack}>
          <ArrowIcon direction={'left'} />
        </BackButtonMobile>
      )}
      {withoutCloseButton ? null : button}
    </HeaderButtonMobile>
  )
}

const HeaderButtonMobile = styled.div`
  z-index: 10;
`
const BackButtonMobile = styled(BackButton)`
  ${notMobileMedia} {
    display: none;
  }
`
const RightButtonMobile = styled(BaseNavButton)`
  ${notMobileMedia} {
    display: none;
  }
  ${mobileMedia} {
    right: 1.6rem;
  }
`
