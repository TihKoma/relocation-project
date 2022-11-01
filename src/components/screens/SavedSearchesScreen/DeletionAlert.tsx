import { ComponentProps, FC } from 'react'
import styled from '@emotion/styled'

import { Button as ButtonBase } from '@/components/ui-kit/Button'
import { ModalPortal } from '@/components/ui-kit/Modal'
import { ReactComponent as WarningIconBase } from '@/images/deletion-warning.svg'
import { mobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

type Props = Omit<ComponentProps<typeof ModalPortal>, 'children'> & {
  onDeleteClick?: () => void
}

export const DeletionAlert: FC<Props> = ({
  isVisible,
  onRequestClose,
  onDeleteClick,
}) => {
  return (
    <ModalPortal isVisible={isVisible} onRequestClose={onRequestClose}>
      <Container>
        <WarningIcon />
        <Title>Are you sure?</Title>
        <SubTitle>
          You will no longer get updates when there are new matches
        </SubTitle>

        <Button onClick={onDeleteClick}>Delete</Button>
        <Button viewType={'secondary'} onClick={() => onRequestClose(false)}>
          Cancel
        </Button>
      </Container>
    </ModalPortal>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  max-width: 54.6rem;
  padding: 1.6rem 6.8rem;

  position: relative;
  overflow: hidden;

  border-radius: 1.6rem;
  background: ${getColorTheme('earth')};

  ${mobileMedia} {
    margin: auto 1.6rem;
    padding: 1.6rem 2.4rem;
  }
`
const WarningIcon = styled(WarningIconBase)`
  display: flex;
  margin-bottom: 3rem;
`
const Title = styled.div`
  margin-bottom: 1.6rem;

  font-size: 2.8rem;
  color: ${getColorTheme('sun')};
`
const SubTitle = styled.div`
  max-width: 36rem;
  margin-bottom: 2.4rem;

  font-size: 1.6rem;
  line-height: 2.4rem;
  text-align: center;
  color: ${getColorTheme('sun500')};
`
const Button = styled(ButtonBase)`
  width: 100%;
  margin-bottom: 1.6rem;
`
