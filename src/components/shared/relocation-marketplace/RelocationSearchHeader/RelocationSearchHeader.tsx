import { FC, ReactNode } from 'react'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'
import { offset, shift, useFloating } from '@floating-ui/react-dom-interactions'

import { SearchServicesModal } from '@/components/shared/SearchServicesModal'
import { Button } from '@/components/ui-kit/Button'
import { ArrowIcon, CrossIcon } from '@/images'
import { useAnalytics } from '@/modules/analytics'
import { useIsMobileDevice } from '@/modules/device'
import { ROUTES } from '@/modules/router'
import { mobileMedia, notMobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

import { SearchButton as SearchButtonBase } from './SearchButton'

const CONTENT_WIDTH_DESKTOP = '80vw'
const CONTENT_MAX_WIDTH_DESKTOP = '80.8rem'

type Props = {
  className?: string
  isModalVisible: boolean
  setIsModalVisible: (value: boolean) => void
}

export const RelocationSearchHeader: FC<Props> = ({
  isModalVisible,
  setIsModalVisible,
  className,
}) => {
  const analytics = useAnalytics()
  const { x, y, reference, floating, strategy } = useFloating({
    placement: 'bottom',
    open: isModalVisible,
    middleware: [offset(8), shift()],
  })

  const router = useRouter()
  const withBackButton = router.query.withBackButton === 'true'

  const onBack = () => {
    const isNewPage = window.history.state.idx === 0

    if (isNewPage) {
      router.push(ROUTES.dashboard.calcUrl())
    } else {
      router.back()
    }
  }

  const isMobile = useIsMobileDevice()

  let title: ReactNode

  if (withBackButton) {
    if (isMobile) {
      title = (
        <TitleWithBackButton>
          <BackButtonMobile
            viewType={'ghost'}
            size={'small'}
            Icon={<ArrowIcon direction={'left'} />}
            onClick={onBack}
          />
          Services
        </TitleWithBackButton>
      )
    } else {
      title = (
        <>
          <Title>Services</Title>
          <BackButtonDesktop
            viewType={'tertiary'}
            backgroundUnderButton={'default'}
            size={'xSmall'}
            Icon={<CrossIcon />}
            onClick={onBack}
          >
            Close
          </BackButtonDesktop>
        </>
      )
    }
  } else {
    title = <Title>All you need to relocate</Title>
  }
  return (
    <Container className={className}>
      {title}
      <SearchButton
        setIsModalVisible={() => {
          setIsModalVisible(true)
          analytics.MPServicesSearchOpened()
        }}
        ref={reference}
      />
      {isModalVisible && (
        <SearchServicesModal
          style={{
            position: strategy,
            top: y ?? '',
            left: x ?? '',
            width: CONTENT_MAX_WIDTH_DESKTOP,
            maxWidth: CONTENT_WIDTH_DESKTOP,
          }}
          onRequestClose={() => {
            setIsModalVisible(false)
            analytics.MPServicesSearchClosed()
          }}
          ref={floating}
        />
      )}
    </Container>
  )
}

const Container = styled.div`
  z-index: 1;
  position: relative;

  ${notMobileMedia} {
    padding-top: 3.6rem;
    padding-bottom: 4.4rem;

    border-bottom: 0.05rem solid ${getColorTheme('dividerSecondary')};
  }

  ${mobileMedia} {
    padding-bottom: 2.4rem;

    box-shadow: 0px -2px 12px rgba(18, 21, 31, 0.02),
      0px -8px 32px rgba(18, 21, 31, 0.12);
  }
`

const Title = styled.h2`
  margin: 0;

  font-style: normal;
  font-weight: 500;
  text-align: center;
  font-feature-settings: 'liga' off;
  color: ${getColorTheme('textDefaultPrimary')};

  ${notMobileMedia} {
    margin-bottom: 3.2rem;

    font-size: 4.2rem;
    line-height: 5.2rem;
  }

  ${mobileMedia} {
    padding-top: 2.8rem;
    margin-bottom: 2.4rem;

    font-size: 2.4rem;
    line-height: 2.8rem;
  }
`

const SearchButton = styled(SearchButtonBase)`
  ${notMobileMedia} {
    width: ${CONTENT_WIDTH_DESKTOP};
    max-width: ${CONTENT_MAX_WIDTH_DESKTOP};
  }

  ${mobileMedia} {
    margin-left: 1.6rem;
    margin-right: 1.6rem;
  }
`
const TitleWithBackButton = styled.div`
  width: 100%;
  padding: 1.6rem;

  display: grid;
  grid-template-columns: auto 1fr;
  gap: 3.2rem;
  align-items: center;

  font-size: 1.8rem;
  font-weight: 500;
`
const BackButtonMobile = styled(Button)``
const BackButtonDesktop = styled(Button)`
  position: absolute;

  top: 2.4rem;
  right: 2.4rem;
`
