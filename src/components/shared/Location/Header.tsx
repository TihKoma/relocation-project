import { FC } from 'react'
import styled from '@emotion/styled'

import { NormalizedButton } from '@/components/ui-kit/Button'
import { ArrowIcon } from '@/images/ArrowIcon'
import { ReactComponent as CloseIcon } from '@/images/close.svg'
import { mobileMedia } from '@/styles/media'

type Props = {
  onBack?: () => void
  title: string
  description?: string | null
  withCloseButton?: boolean
  onClose?: () => void
}
export const Header: FC<Props> = ({
  onBack,
  title,
  withCloseButton,
  description,
  onClose,
}) => {
  return (
    <Container>
      <TopPart>
        {onBack && (
          <ArrowButton onClick={onBack}>
            <ArrowIcon direction={'left'} />
          </ArrowButton>
        )}
        <Title>{title}</Title>
        {withCloseButton && (
          <ButtonClose onClick={onClose}>
            <CloseIcon />
          </ButtonClose>
        )}
      </TopPart>
      {description && <Description>{description}</Description>}
    </Container>
  )
}

const ArrowButton = styled(NormalizedButton)`
  margin-right: 16px;
`
const Description = styled.div`
  margin-bottom: 12px;

  font-size: 16px;
  line-height: 24px;
  color: #12151f;
`
const Container = styled.div``
const TopPart = styled.div`
  margin-bottom: 16px;

  display: flex;
  align-items: center;

  ${mobileMedia} {
    margin-bottom: 8px;
  }
`
const Title = styled.div`
  margin-right: 16px;

  font-weight: 500;
  font-size: 28px;
  line-height: 36px;
  letter-spacing: -0.06em;
  color: #000000;
`
const ButtonClose = styled(NormalizedButton)`
  padding: 8px;
  margin-left: auto;
`
