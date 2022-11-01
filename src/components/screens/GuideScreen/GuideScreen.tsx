import { useMemo } from 'react'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'

import { AreaLayout } from '@/components/shared/AreaLayout'
import { HubspotConfig, HubspotFrame } from '@/components/shared/HubspotFrame'
import { useCheckAccess } from '@/modules/profile/hooks/useCheckAccess'
import { MUTATION_RELOCATION_ADD_TODO } from '@/modules/relocation-project'
import { ROUTES } from '@/modules/router'

import {
  RelocationProjectTodoStatus,
  RelocationProjectTodoType,
} from '../../../../__generated__/globalTypes'
import { ScreenMeta } from './ScreenMeta'

export const GuideScreen = () => {
  const router = useRouter()
  const isFullAccess = useCheckAccess('guide')
  const hubspotConfig: HubspotConfig = useMemo(
    () =>
      ({
        handlers: [],
      } as HubspotConfig),
    [],
  )
  const [addTodo] = useMutation(MUTATION_RELOCATION_ADD_TODO)

  const query = []

  if (isFullAccess) {
    query.push(['isFullAccess', isFullAccess.toString()])
  }

  return (
    <>
      <ScreenMeta />
      <AreaLayout isFixedHeightMobileContent>
        <HubspotFrame
          type={'landing'}
          slug={'us-relocation-guide'}
          query={query as [string, string][]}
          prefixUrl={'en-us'}
          config={hubspotConfig}
          onDisabledElementClick={() => {
            router.push(
              ROUTES.relocationManager.calcUrl({
                toPlans: true,
                paymentRedirectTo: window.location.href,
              }),
            )
          }}
          onButtonClick={(name, disabled) => {
            if (!disabled) {
              router.push(ROUTES.guideArticle.calcUrl({ guideSlug: name }))
            }
          }}
          onAddTask={(text) => {
            addTodo({
              variables: {
                input: {
                  title: text,
                  type: RelocationProjectTodoType.USER,
                  status: RelocationProjectTodoStatus.NOT_DONE,
                },
              },
            })
          }}
        />
      </AreaLayout>
    </>
  )
}
