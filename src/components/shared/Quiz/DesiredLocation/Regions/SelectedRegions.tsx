import { VFC } from 'react'

import {
  CrossButton,
  CrossInCircleIcon,
  Item,
  List,
  SelectedItemSubTitle as SubTitle,
  SelectedItemTitle as Title,
} from '@/components/shared/Quiz/shared/shared'

import type { Value } from './Dropdown'

type Props = {
  regions: Value
  removeRegions: (id: Value[number]) => void
}

export const SelectedRegions: VFC<Props> = ({ regions, removeRegions }) => {
  return (
    <>
      {regions.length > 0 && (
        <List>
          {regions.map((region) => {
            const [title, subtitle] = region.name.split(',')
            return (
              <Item key={region.id}>
                <Title>{title}</Title>
                <CrossButton onClick={() => removeRegions(region)}>
                  <CrossInCircleIcon />
                </CrossButton>
                <SubTitle>{subtitle}</SubTitle>
              </Item>
            )
          })}
        </List>
      )}
    </>
  )
}
