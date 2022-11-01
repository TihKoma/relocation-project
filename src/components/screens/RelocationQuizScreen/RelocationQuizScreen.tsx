import { FC, useState } from 'react'
import { useRouter } from 'next/router'
import { useLazyQuery, useQuery } from '@apollo/client'
import styled from '@emotion/styled'
import { Widget as WidgetBase } from '@typeform/embed-react'

import { AreaLayout } from '@/components/shared/AreaLayout'
import { LoadingState } from '@/components/shared/LoadingState'
import { Loader } from '@/components/ui-kit/Loader'
import { CrossIcon } from '@/images'
import { useIsMobileDevice } from '@/modules/device'
import { QUERY_GET_USER_PROFILE } from '@/modules/profile'
import {
  QUERY_RELOCATION_PROJECT,
  QUERY_RELOCATION_PROJECT_TODOS,
} from '@/modules/relocation-project'
import { ROUTES } from '@/modules/router'
import { NODE_DEVELOPMENT } from '@/modules/utils/config'
import { getColorTheme } from '@/styles/themes'

import { RelocationProjectTodoStatus } from '../../../../__generated__/globalTypes'

export const RelocationQuizScreen: FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const router = useRouter()
  const isMobile = useIsMobileDevice()

  const { data: relocationProjectData, loading: relocationProjectLoading } =
    useQuery(QUERY_RELOCATION_PROJECT)
  const { data: userProfileData, loading: userProfileLoading } = useQuery(
    QUERY_GET_USER_PROFILE,
  )

  const [fetchTodos] = useLazyQuery(QUERY_RELOCATION_PROJECT_TODOS, {
    ssr: false,
    fetchPolicy: 'network-only',
    variables: {
      input: {
        limit: 50,
        offset: 0,
        statuses: [
          RelocationProjectTodoStatus.NOT_DONE,
          RelocationProjectTodoStatus.IN_PROGRESS,
        ],
      },
    },
  })

  return (
    <>
      <AreaLayout withoutNavigationBar>
        <Container>
          {isMobile && (
            <MobileHeader>
              <HeaderTitle>My relocation</HeaderTitle>
              <CrossIcon
                onClick={() => {
                  router.push(ROUTES.dashboard.calcUrl(), undefined, {
                    shallow: true,
                  })
                }}
              />
            </MobileHeader>
          )}
          <LoadingState
            loading={relocationProjectLoading || userProfileLoading}
            loadingComponent={<Loader withGradient />}
          >
            {relocationProjectData?.relocationProject?.id &&
              userProfileData?.getUserProfile?.userId &&
              !isSubmitted && (
                <Widget
                  id={'izUNkNgK'}
                  inlineOnMobile
                  hidden={{
                    user_id: userProfileData?.getUserProfile?.userId,
                    project_id: relocationProjectData?.relocationProject?.id,
                  }}
                  enableSandbox={NODE_DEVELOPMENT}
                  onEndingButtonClick={() => {}}
                  onSubmit={async () => {
                    setIsSubmitted(true)
                    await fetchTodos()
                    router.push(ROUTES.dashboard.calcUrl())
                  }}
                />
              )}
          </LoadingState>
        </Container>
      </AreaLayout>
    </>
  )
}

const Container = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;

  overflow-y: hidden;
`
const Widget = styled(WidgetBase)`
  width: 100%;
  flex-grow: 1;
`
const MobileHeader = styled.div`
  height: 5.6rem;
  width: 100%;
  padding-left: 1.6rem;
  padding-right: 2rem;

  position: sticky;
  top: 0;
  z-index: 1;

  display: flex;
  justify-content: space-between;
  align-items: center;

  background: ${getColorTheme('backgroundDefaultPrimary')};
  box-shadow: 0px -2px 12px rgba(18, 21, 31, 0.02),
    0px -8px 32px rgba(18, 21, 31, 0.12);
`
const HeaderTitle = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 1.8rem;
  line-height: 2.4rem;
  text-align: center;
  font-feature-settings: 'liga' off;
  color: ${getColorTheme('textDefaultPrimary')};
`
