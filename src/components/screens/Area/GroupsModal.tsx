import { FC } from 'react'
import styled from '@emotion/styled'

import { GroupsList } from '@/components/screens/ProfileScreen/ProfileLayout/follow/ListModal/FollowingList/GroupsList'
import { Button } from '@/components/ui-kit/Button'
import { ModalPortal } from '@/components/ui-kit/Modal'
import { CrossIcon } from '@/images'
import { InfinityScrollProvider } from '@/modules/infinity-scroll'
import { mobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

type ModalProps = {
  modalIsOpened: boolean
  regionId: string
  closeModal: () => void
}

export const GroupsModal: FC<ModalProps> = ({
  regionId,
  modalIsOpened,
  closeModal,
}) => {
  return (
    <ModalPortal isVisible={modalIsOpened} onRequestClose={closeModal}>
      <Container>
        <CloseButton
          size={'small'}
          viewType={'ghost'}
          Icon={<CrossIcon />}
          onClick={closeModal}
          data-test-id={'area-groups-modal:close-button'}
        />
        <InfinityScrollProvider>
          <Title>Groups</Title>
          <GroupsList regionId={regionId} userName={'userName'} />
        </InfinityScrollProvider>
      </Container>
    </ModalPortal>
  )
}

const Container = styled.div`
  width: 100%;
  max-width: min(51.6rem, calc(100% - 3.2rem));
  height: 100%;
  max-height: min(65.8rem, calc(100% - 3.2rem));
  padding: 2.4rem 1.6rem;

  position: relative;

  display: flex;
  flex-direction: column;

  overflow: hidden;
  border-radius: 1.6rem;
  background: ${getColorTheme('earth')};

  ${mobileMedia} {
    max-width: unset;
    max-height: unset;

    border-radius: unset;
  }
`
const CloseButton = styled(Button)`
  position: absolute;
  top: 1.6rem;
  right: 1.6rem;
`
const Title = styled.div`
  margin-bottom: 1.6rem;

  color: ${getColorTheme('sun')};
  font-size: 2.8rem;
`
