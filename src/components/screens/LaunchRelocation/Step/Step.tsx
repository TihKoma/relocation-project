import { FC, ReactNode, useState } from 'react'
import styled from '@emotion/styled'

import { Button } from '@/components/ui-kit/Button'
import { ModalPortal } from '@/components/ui-kit/Modal'
import { CrossIcon, EditIcon as EditIconBase } from '@/images'
import { getColorTheme } from '@/styles/themes'

import { Region } from '../types'

type Props = {
  isActive?: boolean
  badgeLabel: string
  title: string
  selectedRegion?: Region | null
  onSelect: (region: Region) => void
  resultPrefix: string
  children?: ReactNode
  className?: string
  content: (onSelectFromEdit?: () => void) => ReactNode
  description?: string
  withStepBage?: boolean
}
export const Step: FC<Props> = ({
  isActive,
  badgeLabel,
  title,
  selectedRegion,
  resultPrefix,
  className,
  content,
  description,
  withStepBage = true,
}) => {
  const [isFullScreenFormOpened, setIsFullScreenFormOpened] = useState(false)

  const openFullScreenForm = () => {
    setIsFullScreenFormOpened(true)
  }
  const closeFullScreenForm = () => {
    setIsFullScreenFormOpened(false)
  }

  if (isFullScreenFormOpened) {
    return (
      <ModalPortal isVisible onRequestClose={closeFullScreenForm}>
        <ModalContainer>
          <Header>
            <HeaderTitle>{title}</HeaderTitle>
            <Button
              size={'small'}
              viewType={'ghost'}
              Icon={<CrossIcon />}
              onClick={closeFullScreenForm}
            />
            {description && <Description>{description}</Description>}
          </Header>
          {content(closeFullScreenForm)}
        </ModalContainer>
      </ModalPortal>
    )
  }
  if (selectedRegion) {
    return (
      <ResultCard onClick={openFullScreenForm} className={className}>
        <span>
          {resultPrefix} <b>{selectedRegion.name}</b>
        </span>
        <EditIcon />
      </ResultCard>
    )
  }

  return (
    <Container disabled={!isActive} className={className}>
      {withStepBage && <Badge disabled={!isActive}>{badgeLabel}</Badge>}
      <Title disabled={!isActive}>{title}</Title>
      {isActive ? content() : null}
    </Container>
  )
}

const Container = styled.div<{ disabled?: boolean }>`
  width: 100%;
  padding: 1.6rem;

  display: grid;

  border-radius: 2.4rem;
  border: 1px solid ${getColorTheme('strokeDefaultSecondary')};
  box-shadow: 0px 2px 8px rgba(18, 21, 31, 0.04),
    0px 6px 24px rgba(18, 21, 31, 0.1);

  ${(props) => {
    if (props.disabled) {
      return `
        box-shadow: unset;
        pointer-events: none;
      `
    }
  }}
`
const Badge = styled.div<{ disabled?: boolean }>`
  padding: 0.2rem 0.8rem;
  margin-bottom: 0.8rem;

  background: ${getColorTheme('accentAlphaSecondary')};
  justify-self: start;
  border-radius: 2.4rem;

  font-size: 1.4rem;
  color: ${getColorTheme('textDefaultPrimary')};

  ${(props) => {
    if (props.disabled) {
      return `
        background: ${getColorTheme('backgroundDefaultSecondary')(props)};
        color: ${getColorTheme('textDisabled')(props)}
      `
    }
  }}
`
const ResultCard = styled.div`
  padding: 0.8rem 1.6rem;

  border-radius: 1.2rem;
  border: 1px solid ${getColorTheme('strokeDefaultSecondary')};

  display: flex;
  align-items: center;
  justify-content: space-between;

  color: ${getColorTheme('textDefaultSecondary')};

  & b {
    color: ${getColorTheme('textDefaultPrimary')};
    font-weight: 500;
  }
`
const Title = styled.div<{ disabled?: boolean }>`
  margin-bottom: ${(props) => (props.disabled ? 0 : '1.6rem')};

  color: ${(props) =>
    props.disabled
      ? getColorTheme('textDisabled')
      : getColorTheme('textDefaultPrimary')};
  font-size: 2rem;
`
const EditIcon = styled(EditIconBase)`
  fill: ${getColorTheme('iconSecondary')};
`
const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 1.6rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  background: ${getColorTheme('earth')};
`
const Header = styled.div`
  width: 100%;

  padding: 1.6rem 0;

  display: grid;
  grid-auto-flow: row;
  grid-template-columns: 1fr auto;
  grid-auto-rows: auto auto;
  row-gap: 1.6rem;
  align-items: center;
`
const HeaderTitle = styled.div`
  font-weight: 500;
  font-size: 1.8rem;
  line-height: 2.4rem;
  color: ${getColorTheme('sun1000')};
`
const Description = styled.div`
  grid-column: 1 / 3;

  color: ${getColorTheme('sun')};
`
