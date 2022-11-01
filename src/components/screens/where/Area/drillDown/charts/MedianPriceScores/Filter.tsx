import { FC } from 'react'
import styled from '@emotion/styled'

import {
  PropertyType,
  RoomsType,
  TransactionType,
} from '@/components/screens/where/Area/drillDown/charts/MedianPriceScores/MedianPriceScoresWithSelectors'
import { DropdownButton } from '@/components/ui-kit/DropdownButton'
import { Option } from '@/components/ui-kit/form/Options'

type OptionType = PropertyType | RoomsType | TransactionType
type Props = {
  selectedOption: OptionType
  onSelect: (option: OptionType) => void
  options: OptionType[]
}
// TODO: replace with dropdown button
export const Filter: FC<Props> = ({ selectedOption, options, onSelect }) => {
  return (
    <DropdownButton title={selectedOption.label as string} withArrow isSelected>
      {({ closeDropdown }) => (
        <List onClick={closeDropdown}>
          {options.map((option) => {
            return (
              <Option
                disabled={!option.isActive}
                key={option.index as string}
                onClick={() => onSelect(option)}
                isSelected={option.index === selectedOption.index}
              >
                {option.label as string}
              </Option>
            )
          })}
        </List>
      )}
    </DropdownButton>
  )
}

const List = styled.ul`
  margin: 0;
  padding: 0;

  list-style: none;
`
