import { ComponentProps, FC } from 'react'
import styled from '@emotion/styled'

import { Button } from '@/components/ui-kit/Button'
import { ModalPortal } from '@/components/ui-kit/Modal'
import { CrossIcon } from '@/images'
import { InfinityScrollProvider } from '@/modules/infinity-scroll'
import { mobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

import { FollowersList } from './FollowersList'
import { FollowingList } from './FollowingList'

type Props = {
  userId: string
  userName: string
  openedModal: null | 'followers' | 'following'
} & Omit<ComponentProps<typeof ModalPortal>, 'isVisible' | 'children'>

export const ListModal: FC<Props> = ({
  openedModal,
  onRequestClose,
  userId,
  userName,
}) => {
  return (
    <ModalPortal isVisible={!!openedModal} onRequestClose={onRequestClose}>
      <Container>
        <CloseButton
          size={'small'}
          viewType={'ghost'}
          Icon={<CrossIcon />}
          onClick={() => onRequestClose(false)}
          data-test-id={'area-groups-modal:close-button'}
        />
        <InfinityScrollProvider>
          {openedModal === 'followers' ? (
            <>
              <Title>Followers</Title>
              <FollowersList userId={userId} userName={userName} />
            </>
          ) : (
            <>
              <Title>Following</Title>
              <FollowingList userId={userId} userName={userName} />
            </>
          )}
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
  padding: 1.6rem;

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
