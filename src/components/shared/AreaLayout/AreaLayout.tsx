import { FC } from 'react'

import { EditProfileModalContextProvider } from '@/components/shared/EditProfileModal'
import { GlobalModals } from '@/components/shared/layout'
import { ZoomMapContextProvider } from '@/components/shared/maps/BaseMap/zoom-map-context'
import { NotificationsModalContextProvider } from '@/components/shared/NotificationsModal/NotificationsContext'
import { DataForCreatePostContextProvider } from '@/components/shared/PostForm'
import { SurveyMonkey } from '@/components/shared/SurveyMonkey/SurveyMonkey'
import { Toast } from '@/components/shared/Toast'
import { BottomSheetContextProvider } from '@/components/ui-kit/BottomSheet'
import { usePaymentAnalyticsEvent } from '@/modules/analytics/hooks/usePaymentAnalyticsEvent'
import { useIsNotMobileDevice } from '@/modules/device'

import { ContactFormModalContextProvider } from '../ContactFormModal/contact-form-modal-context'
import { DesktopLayout } from './DesktopLayout'
import { MobileLayout } from './MobileLayout'
import { LayoutProps } from './shared'

export const AreaLayout: FC<LayoutProps> = ({ theme = 'light', ...props }) => {
  const isNotMobile = useIsNotMobileDevice()

  usePaymentAnalyticsEvent()

  return (
    <DataForCreatePostContextProvider>
      <NotificationsModalContextProvider>
        <ContactFormModalContextProvider>
          <EditProfileModalContextProvider>
            <ZoomMapContextProvider>
              <BottomSheetContextProvider>
                {isNotMobile ? (
                  <DesktopLayout theme={theme} {...props} />
                ) : (
                  <MobileLayout theme={theme} {...props} />
                )}
                {/*  TODO: add to root*/}
                <GlobalModals />
                <Toast />
                <SurveyMonkey />
              </BottomSheetContextProvider>
            </ZoomMapContextProvider>
          </EditProfileModalContextProvider>
        </ContactFormModalContextProvider>
      </NotificationsModalContextProvider>
    </DataForCreatePostContextProvider>
  )
}
