import { ComponentProps, FC, useMemo, useState } from 'react'
import styled from '@emotion/styled'

import { ProfilesCounter } from '@/components/shared/ProfilesCounter'
import { Button } from '@/components/ui-kit/Button'
import { ModalPortal } from '@/components/ui-kit/Modal'
import { CrossIcon } from '@/images'
import { InfinityScrollProvider } from '@/modules/infinity-scroll'
import { mobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

import { FollowersList } from './FollowersList'

type PreviewProfile = {
  photoUrl: string
} | null

type Props = {
  previewFollowers?: PreviewProfile[] | null
  total: number
  groupId: string
  groupName: string
}

export const Followers: FC<Props> = ({
  total,
  previewFollowers,
  groupId,
  groupName,
}) => {
  const [modalIsOpened, setModalIsOpened] = useState(false)

  const openModal = () => {
    setModalIsOpened(true)
  }
  const closeModal = () => {
    setModalIsOpened(false)
  }

  const images = useMemo(
    () =>
      previewFollowers
        ?.filter((data) => data)
        .map((item) => item?.photoUrl ?? ''),
    [previewFollowers],
  )

  return (
    <>
      <ProfilesCounter
        count={total}
        label={'follower'}
        pluralLabel={'followers'}
        onClick={openModal}
        imagesSrc={images}
      />
      <ModalList onRequestClose={closeModal} isOpened={modalIsOpened}>
        <InfinityScrollProvider>
          <Title>Followers</Title>
          <FollowersList groupId={groupId} groupName={groupName} />
        </InfinityScrollProvider>
      </ModalList>
    </>
  )
}

type ModalListProps = {
  isOpened: boolean
  onRequestClose: () => void
} & Omit<ComponentProps<typeof ModalPortal>, 'isVisible'>

const ModalList: FC<ModalListProps> = ({
  isOpened,
  onRequestClose,
  children,
}) => {
  return (
    <ModalPortal isVisible={isOpened} onRequestClose={onRequestClose}>
      <Container>
        <CloseButton
          size={'small'}
          viewType={'ghost'}
          onClick={onRequestClose}
          data-test-id={'followers-modal:close-button'}
          Icon={<CrossIcon />}
        />
        {children}
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
