import { FC } from 'react'
import styled from '@emotion/styled'
import { UseControllerReturn } from 'react-hook-form/dist/types/controller'

import { ReactComponent as LocationIconBase } from '@/images/location.svg'

import { FormModel } from './types'

export const MAP_PREVIEW_ZOOM = 15

type Props = {
  value?: FormModel['location']
  className?: string
  isShowImage?: boolean
  onClickLocation?: () => void
}
export const LocationView: FC<Props> = ({
  value,
  className,
  onClickLocation,
}) => {
  return value ? (
    <Container className={className}>
      {value.properties.fullAddress && (
        <ContainerText
          onClick={onClickLocation}
          isMoveClick={!!onClickLocation}
        >
          <LocationIcon />
          <span>{value.properties.fullAddress}</span>
        </ContainerText>
      )}
    </Container>
  ) : null
}

const Container = styled.div``
const ContainerText = styled.div<{ isMoveClick: boolean }>`
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  justify-content: start;
  gap: 0.8rem;

  ${(props) => (props.isMoveClick ? 'cursor: pointer;' : '')}

  font-size: 1.4rem;
  line-height: 140%;
  letter-spacing: -0.05em;
  color: #9ea9b2;

  &:hover {
    text-decoration: underline;
  }
`
const LocationIcon = styled(LocationIconBase)`
  align-self: start;
  fill: #9ea9b2;
`
export const FieldLocationView: FC<Props & UseControllerReturn> = ({
  field,
  ...props
}) => {
  return <LocationView value={field.value} {...props} />
}
