import { VFC } from 'react'
import styled from '@emotion/styled'

import { NormalizedButton } from '@/components/ui-kit/Button'
import { CrossInCircleIcon as CrossInCircleIconBase } from '@/images'
import { getColorTheme } from '@/styles/themes'

import type { Value } from './Dropdown'

type Props = {
  addresses: Value
  removeAddresses: (id: Value['features'][number]) => void
}

export const SelectedAddresses: VFC<Props> = ({
  addresses,
  removeAddresses,
}) => {
  return (
    <>
      {addresses.features.length > 0 && (
        <List>
          {addresses.features.map((address) => {
            return (
              <Item key={address.id}>
                <Title>{address.properties.title}</Title>
                <CrossButton onClick={() => removeAddresses(address)}>
                  <CrossInCircleIcon />
                </CrossButton>
                <SubTitle>{address.properties.subTitle}</SubTitle>
              </Item>
            )
          })}
        </List>
      )}
    </>
  )
}

const List = styled.ul`
  margin: 0 0 24px 0;
  padding: 0;

  display: flex;
  flex-direction: column;
  gap: 1rem;
`
const Item = styled.li`
  padding: 0.8rem 1.6rem;

  color: ${getColorTheme('neptune')};

  border: 2px solid ${getColorTheme('neptune')};
  border-radius: 12px;

  display: grid;
  gap: 2px 8px;
  grid-template-rows: auto auto;
  grid-template-columns: 1fr 24px;
`
const CrossButton = styled(NormalizedButton)`
  grid-row: span 2;
  align-self: center;
  justify-self: flex-start;
`

const CrossInCircleIcon = styled(CrossInCircleIconBase)`
  stroke: ${getColorTheme('neptune')};

  & path {
    stroke: ${getColorTheme('neptune')};
    fill: ${getColorTheme('neptune')};
  }
`

const Title = styled.div`
  margin-bottom: 0.4rem;

  font-size: 1.6rem;
  line-height: 2.4rem;
`

const SubTitle = styled.div`
  font-size: 1.4rem;
  line-height: 2rem;
`
