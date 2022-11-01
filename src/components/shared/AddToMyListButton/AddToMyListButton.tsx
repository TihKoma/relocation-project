import { FC, useState } from 'react'
import { ComponentProps, useCallback } from 'react'
import Link from 'next/link'
import { useMutation, useQuery } from '@apollo/client'
import styled from '@emotion/styled'

import { Toast } from '@/components/shared/AddToMyListButton/Toast'
import { MockWithAction } from '@/components/shared/MockWithAction'
import { Button } from '@/components/ui-kit/Button'
import { FollowButton } from '@/components/ui-kit/FollowButton'
import { ModalPortal } from '@/components/ui-kit/Modal'
import { CrossIcon, PlaceholderEarth, PlaceholderGear } from '@/images'
import { useAnalytics } from '@/modules/analytics'
import { useFollowNeighborhood } from '@/modules/neighbourhood'
import {
  MUTATION_RELOCATION_SAVE_PROJECT,
  QUERY_RELOCATION_PROJECT,
} from '@/modules/relocation-project'
import { ROUTES } from '@/modules/router'
import { getColorTheme } from '@/styles/themes'

import { SubscriptableType } from '../../../../__generated__/globalTypes'

type Props = {
  regionId: string
  regionName: string
  isSubscribed: boolean
  className?: string
} & Omit<
  ComponentProps<typeof FollowButton>,
  'onFollow' | 'onUnfollow' | 'subscribed'
>

export const AddToMyListButton: FC<Props> = ({
  regionId,
  isSubscribed,
  className,
  regionName,
  ...props
}) => {
  const [showChangeDestinationWarning, setShowChangeDestinationWarning] =
    useState(false)
  const [showStartProjectWarning, setShowStartProjectWarning] = useState(false)

  const [textForToast, setTextForToast] = useState('')

  const openChangeWarningModal = () => {
    setShowChangeDestinationWarning(true)
  }
  const closeChangeDestinationModal = () => {
    setShowChangeDestinationWarning(false)
  }

  const openStartProjectModal = () => {
    setShowStartProjectWarning(true)
  }
  const closeStartProjectModal = () => {
    setShowStartProjectWarning(false)
  }

  const [showNotificationToast, setShowNotificationToast] = useState(false)

  const openNotificationToast = () => {
    setShowNotificationToast(true)
  }
  const closeNotificationToast = () => {
    setShowNotificationToast(false)
  }

  const [follow, { loading: followRegionLoading }] = useFollowNeighborhood()

  const onFollow = useCallback(() => {
    if (regionId) {
      follow({
        variables: {
          input: {
            subscriptableId: regionId,
            subscriptableType: SubscriptableType.REGION,
          },
        },
      })
    }
  }, [follow, regionId])

  const { data: relocationProjectData, loading: loadingRelocationProject } =
    useQuery(QUERY_RELOCATION_PROJECT)

  const isMyDestination =
    relocationProjectData?.relocationProject?.whereToRegionId === regionId

  const analytics = useAnalytics()

  const [changeDestination, { loading: loadingChangeDestination }] =
    useMutation(MUTATION_RELOCATION_SAVE_PROJECT, {
      onCompleted: () => {
        analytics.relocationMarketplaceStep('destination_set')
        closeChangeDestinationModal()
        closeStartProjectModal()
      },
      update: (cache, result) => {
        cache.writeQuery({
          query: QUERY_RELOCATION_PROJECT,
          data: {
            relocationProject: result.data?.relocationSaveProject,
          },
        })
      },
    })

  const onChangeDestinationAndKeepTasks = async (textForToast: string) => {
    if (loadingRelocationProject) {
      return
    }
    await changeDestination({
      variables: {
        input: {
          whereFromRegionId:
            relocationProjectData?.relocationProject?.whereFromRegionId,
          whereToRegionId: regionId,
        },
        resetProject: false,
      },
      onCompleted: () => {
        setTextForToast(textForToast)
        openNotificationToast()
      },
    })
  }

  const onChangeDestinationAndResetTasks = async () => {
    if (loadingRelocationProject) {
      return
    }
    await changeDestination({
      variables: {
        input: {
          whereFromRegionId:
            relocationProjectData?.relocationProject?.whereFromRegionId,
          whereToRegionId: regionId,
        },
        resetProject: true,
      },
      onCompleted: () => {
        setTextForToast(
          `A new project with ${regionName} as destination has been created`,
        )
        openNotificationToast()
      },
    })
  }

  const onClickChangeDestination = async () => {
    if (!relocationProjectData?.relocationProject) {
      openStartProjectModal()
      return
    }
    if (relocationProjectData?.relocationProject?.whereToRegionId) {
      openChangeWarningModal()
      return
    }
    await changeDestination({
      variables: {
        input: {
          whereFromRegionId:
            relocationProjectData?.relocationProject?.whereFromRegionId,
          whereToRegionId: regionId,
        },
        resetProject: false,
      },
      onCompleted: () => {
        setTextForToast(`${regionName} is chosen as the destination`)
        openNotificationToast()
      },
    })
  }

  let button
  if (isMyDestination) {
    button = (
      <Link href={ROUTES.dashboard.calcUrl()} passHref>
        <a>
          <Button
            size={'small'}
            viewType={'tertiary'}
            className={className}
            loading={loadingRelocationProject}
            {...props}
          >
            I’m moving here
          </Button>
        </a>
      </Link>
    )
  } else if (isSubscribed) {
    button = (
      <Button
        size={'small'}
        viewType={'secondary'}
        onClick={onClickChangeDestination}
        loading={loadingRelocationProject || loadingChangeDestination}
        className={className}
        {...props}
      >
        Move here
      </Button>
    )
  } else {
    button = (
      <Button
        size={'small'}
        onClick={onFollow}
        loading={followRegionLoading}
        className={className}
        {...props}
      >
        Add to favorites
      </Button>
    )
  }

  return (
    <>
      {button}
      <ModalPortal
        isVisible={showChangeDestinationWarning}
        onRequestClose={closeChangeDestinationModal}
      >
        <ModalContainer>
          <CloseButton
            size={'small'}
            viewType={'ghost'}
            Icon={<CrossIcon />}
            onClick={closeChangeDestinationModal}
            data-test-id={'change-destination-modal:close-button'}
          />
          <MockWithAction
            image={<PlaceholderGear />}
            title={
              'With updated origin or destination your relocation checklist might be different'
            }
            buttonText={'Keep my tasks'}
            onClick={async () => {
              await onChangeDestinationAndKeepTasks(
                `${regionName} is chosen as the destination`,
              )
            }}
            secondaryButtonText={'Restart project from scratch'}
            secondaryButtonOnClick={async () => {
              await onChangeDestinationAndResetTasks()
            }}
            loading={loadingChangeDestination}
          />
        </ModalContainer>
      </ModalPortal>
      <ModalPortal
        isVisible={showStartProjectWarning}
        onRequestClose={closeStartProjectModal}
      >
        <ModalContainer>
          <MockWithAction
            image={<PlaceholderEarth />}
            title={'Do you want to start a relocation project?'}
            description={
              'Nicity Virtual Relocation Assistant will help you take control of all moving tasks'
            }
            buttonText={'Start relocation project'}
            onClick={async () => {
              await onChangeDestinationAndKeepTasks(
                `A new project with ${regionName} as destination has been created`,
              )
            }}
            secondaryButtonText={'Cancel'}
            secondaryButtonOnClick={closeStartProjectModal}
            loading={loadingChangeDestination}
          />
        </ModalContainer>
      </ModalPortal>
      <Toast
        isVisible={showNotificationToast}
        text={textForToast}
        onClose={closeNotificationToast}
      />
    </>
  )
}

const ModalContainer = styled.div`
  width: 100%;
  max-width: min(45rem, calc(100vw - 3.2rem));
  min-height: 36.4rem;
  padding: 2.4rem;

  position: relative;

  display: flex;
  align-items: center;

  background-color: ${getColorTheme('earth')};
  border-radius: 2.4rem;
`
const CloseButton = styled(Button)`
  position: absolute;
  top: 1.6rem;
  right: 1.6rem;
`
