import { FC, ReactNode } from 'react'
import styled from '@emotion/styled'

import { Button } from '@/components/ui-kit/Button'
import { ModalController, ModalPortal } from '@/components/ui-kit/Modal'
import { mobileMedia, notMobileMedia } from '@/styles/media'

type Props = {
  onClick: () => void
  onCancel?: (event: any) => void
  image?: ReactNode
  title: string
  subtitle?: string
  buttonText: string
  className?: string
} & ModalController

export const Alert: FC<Props> = ({
  isVisible,
  onRequestClose,
  className,
  onClick,
  onCancel,
  image,
  title,
  subtitle,
  buttonText,
}) => {
  return (
    <ModalPortal isVisible={isVisible} onRequestClose={onRequestClose}>
      <Container className={className}>
        {image && <Image>{image}</Image>}
        <Title dangerouslySetInnerHTML={{ __html: title }} />
        {subtitle && (
          <Subtitle dangerouslySetInnerHTML={{ __html: subtitle }} />
        )}
        <Button
          fullWidth
          size={'medium'}
          viewType={'primary'}
          onClick={onClick}
        >
          {buttonText}
        </Button>
        {onCancel && (
          <CancelButton
            fullWidth
            onClick={onCancel}
            viewType={'secondary'}
            size={'medium'}
          >
            Cancel
          </CancelButton>
        )}
      </Container>
    </ModalPortal>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  background: white;

  ${notMobileMedia} {
    padding: 6.8rem;

    border-radius: 3.2rem;
  }

  ${mobileMedia} {
    padding: 2.4rem;
    margin: auto 1.6rem;

    justify-content: center;

    border-radius: 2.4rem;
  }
`
const Image = styled.div`
  margin-bottom: 1.6rem;
`
const Title = styled.div`
  margin-bottom: 0.8rem;

  font-weight: 500;
  font-size: 2.8rem;
  text-align: center;
  line-height: 36px;
  letter-spacing: -0.04em;
`
const Subtitle = styled.div`
  margin-bottom: 2.4rem;

  font-weight: normal;
  color: #757484;
  text-align: center;
  line-height: 24px;
  font-size: 16px;
`
const CancelButton = styled(Button)`
  margin-top: 1.6rem;
`
