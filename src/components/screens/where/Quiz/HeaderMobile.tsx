import { FC } from 'react'
import styled from '@emotion/styled'

import { Button, NormalizedButton } from '@/components/ui-kit/Button'
import { CrossIcon } from '@/images'
import { ArrowIcon } from '@/images/ArrowIcon'
import { ExtendPropsFCDeprecated } from '@/modules/utils/types'
import { notMobileMedia } from '@/styles/media'

type ButtonProps = ExtendPropsFCDeprecated<typeof Button>

type Props = {
  className?: string
  withBackButton?: boolean
  withCloseButton?: boolean
  onClose?: () => void
} & ButtonProps

export const HeaderMobile: FC<Props> = ({
  className,
  withBackButton,
  withCloseButton,
  onClose,
  ...props
}) => {
  return (
    <Header className={className}>
      {withBackButton && (
        <ArrowButton {...props}>
          <ArrowIcon direction={'left'} />
        </ArrowButton>
      )}
      {withCloseButton && (
        <CloseButton
          size={'small'}
          viewType={'ghost'}
          Icon={<CrossIcon />}
          onClick={onClose}
          data-test-id={'area-groups-modal:close-button'}
        />
      )}
    </Header>
  )
}

const Header = styled.div`
  ${notMobileMedia} {
    display: none;
  }

  height: 5.6rem;
  padding: 2rem;
  margin: 0 -1.6rem;

  display: flex;
  align-items: center;

  position: sticky;
  top: 0;

  z-index: 100;
  transition: 225ms;

  background: white;
`

const ArrowButton = styled(NormalizedButton)``

const CloseButton = styled(Button)`
  margin-left: auto;
`
