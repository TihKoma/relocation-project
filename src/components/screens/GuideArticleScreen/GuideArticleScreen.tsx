import { FC, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'

import { AreaLayout } from '@/components/shared/AreaLayout'
import { HubspotConfig, HubspotFrame } from '@/components/shared/HubspotFrame'
import { useAuthorizationStore } from '@/modules/authorization'
import { MUTATION_RELOCATION_ADD_TODO } from '@/modules/relocation-project'
import { ROUTES } from '@/modules/router'

import {
  RelocationProjectTodoStatus,
  RelocationProjectTodoType,
} from '../../../../__generated__/globalTypes'
import { ScreenMeta } from './ScreenMeta'

type Props = {
  guideSlug: string
}

export const GuideArticleScreen: FC<Props> = ({ guideSlug }) => {
  const [{ isLoggedIn }] = useAuthorizationStore()
  const [title, setTitle] = useState('')
  const router = useRouter()
  const [description, setDescription] = useState('')
  const hubspotConfig: HubspotConfig = useMemo(
    () =>
      ({
        withAddTasks: isLoggedIn,
        handlers: [],
      } as HubspotConfig),
    [isLoggedIn],
  )
  const [addTodo] = useMutation(MUTATION_RELOCATION_ADD_TODO)

  return (
    <>
      <ScreenMeta title={title} description={description} />
      <AreaLayout isFixedHeightMobileContent>
        <HubspotFrame
          type={'guide'}
          slug={guideSlug}
          prefixUrl={''}
          config={hubspotConfig}
          onButtonClick={(name) => {
            if (name === 'all-guides') {
              router.push(ROUTES.guide.calcUrl())
            }
          }}
          onLoad={(title, description) => {
            setTitle(title)
            setDescription(description)
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
