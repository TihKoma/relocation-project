import { FC, ReactElement, ReactNode, useContext } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import styled from '@emotion/styled'

import { EditProfileModalContextProvider } from '@/components/shared/EditProfileModal'
import {
  ViewMode,
  ViewModeContext,
  ViewModeContextProvider,
} from '@/components/shared/layout/ViewModeContext'
import { NotificationsModalContextProvider } from '@/components/shared/NotificationsModal/NotificationsContext'
import { DataForCreatePostContextProvider } from '@/components/shared/PostForm'
import { Toast } from '@/components/shared/Toast'
import { IconButton } from '@/components/ui-kit/IconButton'
import { ArrowIcon } from '@/images/ArrowIcon'
import { useIsMobileDevice } from '@/modules/device'
import { mobileMedia, notMobileMedia } from '@/styles/media'

import { ContactFormModalContextProvider } from '../ContactFormModal/contact-form-modal-context'
import { GlobalModals } from './GlobalModals'
import { Header, HEIGHT_MOBILE_HEADER } from './Header'
import { ModeButton as ModeButtonBase } from './ModeButton'
import { NAVIGATION_BAR_HEIGHT, NavigationBar } from './NavigationBar'

type LayoutProps = {
  isLoginUnskippable?: boolean
  redirect?: () => void
  initialViewMode?: ViewMode
  isMobileHeaderHidden?: boolean
  children: ReactNode
}
export const Layout: FC<LayoutProps> = ({
  isLoginUnskippable,
  redirect,
  initialViewMode = null,
  children,
  isMobileHeaderHidden,
}) => {
  const isMobile = useIsMobileDevice()
  return (
    <ContactFormModalContextProvider>
      <EditProfileModalContextProvider>
        <DataForCreatePostContextProvider>
          <NotificationsModalContextProvider>
            <ViewModeContextProvider initialViewMode={initialViewMode}>
              <Container>
                <Header isMobileHeaderHidden={isMobileHeaderHidden} />
                {isMobile && <NavigationBar />}
                {children}
                <GlobalModals
                  isLoginUnskippable={isLoginUnskippable}
                  redirect={redirect}
                />
                <Toast />
              </Container>
            </ViewModeContextProvider>
          </NotificationsModalContextProvider>
        </DataForCreatePostContextProvider>
      </EditProfileModalContextProvider>
    </ContactFormModalContextProvider>
  )
}

type SplitContentProps = {
  content: ReactElement
  map: ReactElement
  isMobileHeaderHidden?: boolean
  isModeButtonHidden?: boolean
  onChangeMode?: (viewMode: 'map' | 'feed') => void
  classNameButton?: string
  buttonList?: ReactElement
}
export const SplitContentWrapper: FC<SplitContentProps> = ({
  content,
  map,
  isMobileHeaderHidden,
  isModeButtonHidden,
  onChangeMode,
  classNameButton,
  buttonList,
}) => {
  const [{ viewMode, withBackButtonOnMap }, setViewModeData] =
    useContext(ViewModeContext)
  const toggleViewMode = () => {
    const newViewMode = viewMode === 'feed' ? 'map' : 'feed'
    setViewModeData?.(newViewMode)
    onChangeMode?.(newViewMode)
  }
  return (
    <>
      <SplitContentContainer isMobileHeaderHidden={isMobileHeaderHidden}>
        {content}
        <MapWrapper visible={viewMode === 'map'}>{map}</MapWrapper>
        {viewMode === 'map' && withBackButtonOnMap && (
          <BackButton
            Icon={<ArrowIcon direction={'left'} />}
            onClick={toggleViewMode}
          />
        )}
        {viewMode && !isModeButtonHidden && !withBackButtonOnMap && (
          <ModeButton
            buttonList={buttonList}
            className={classNameButton}
            mode={viewMode}
            onClick={toggleViewMode}
          />
        )}
      </SplitContentContainer>
    </>
  )
}

const Container = styled.div`
  position: relative;
  height: 100%;

  ${mobileMedia} {
    display: flex;
    flex-direction: column;
  }
  ${notMobileMedia} {
    height: 100vh;
    padding: 0 2.4rem 2.4rem 2.4rem;

    display: grid;
    grid-template-rows: auto 1fr;
  }
`
export const SplitContentContainer = styled.div<{
  viewMode?: ViewMode
  isMobileHeaderHidden?: boolean
}>`
  height: 100%;

  display: grid;

  overflow: hidden;
  ${mobileMedia} {
    width: 100%;
    padding-top: ${(props) =>
      props.isMobileHeaderHidden ? 0 : HEIGHT_MOBILE_HEADER}px;
    padding-bottom: ${NAVIGATION_BAR_HEIGHT}px;

    position: fixed;
    top: 0;
    bottom: 0;
  }
  ${notMobileMedia} {
    grid-template-columns: min(684px, 50%) auto;
    column-gap: 2.4rem;
  }
`
const MapWrapper = styled.div<{ visible?: boolean }>`
  width: 100%;
  ${mobileMedia} {
    z-index: ${(props) => (props.visible ? 1 : -1)};
    position: fixed;
    bottom: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
  }
`
const ModeButton = styled(ModeButtonBase)`
  position: fixed;
  left: 50%;
  bottom: 6.5rem;
  z-index: 3;

  transform: translateX(-50%);
`
const BackButton = styled(IconButton)`
  position: absolute;
  top: 8px;
  left: 12px;
  ${IconButton.size.medium};
  ${IconButton.viewType.secondary};
`
