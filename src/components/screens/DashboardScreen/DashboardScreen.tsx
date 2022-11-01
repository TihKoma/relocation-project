import { EditTaskContextProvider } from '@/components/screens/DashboardScreen/EditTaskContext'
import { TabsContextProvider } from '@/components/screens/DashboardScreen/TabsContext'
import { AreaLayout } from '@/components/shared/AreaLayout'
import { MetaTags } from '@/components/shared/MetaTags'
import { useIsMobileDevice } from '@/modules/device'

import { DesktopContent } from './DesktopContent'
import { MobileContent } from './MobileContent'

export const DashboardScreen = () => {
  const isMobile = useIsMobileDevice()

  return (
    <AreaLayout>
      <MetaTags
        title={
          'Nicity Virtual Relocation Assistant - Take control of all moving tasks'
        }
      />
      <EditTaskContextProvider>
        <TabsContextProvider>
          {isMobile ? <MobileContent /> : <DesktopContent />}
        </TabsContextProvider>
      </EditTaskContextProvider>
    </AreaLayout>
  )
}
