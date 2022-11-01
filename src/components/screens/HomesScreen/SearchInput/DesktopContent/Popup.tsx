import { FC } from 'react'
import styled from '@emotion/styled'

import {
  MarketplaceSearchSuggestion,
  MarketplaceSearchSuggestions,
} from '@/modules/marketplace'
import { MarketplaceRegions_marketplaceRegions_cities } from '@/modules/marketplace/graphql/__generated__/MarketplaceRegions'

import { SearchResults } from '../SearchResults'

type Props = {
  isLoading: boolean
  items?: MarketplaceSearchSuggestions | null
  onClick: (suggestion: MarketplaceSearchSuggestion) => void
  className?: string
  searchValue: string
  selectedItem?: MarketplaceRegions_marketplaceRegions_cities | null
  onSelectedItemChange?: (id: string) => void
}

export const Popup: FC<Props> = ({
  items,
  isLoading,
  onClick,
  className,
  searchValue,
  selectedItem,
  onSelectedItemChange,
}) => {
  return (
    <Container className={className}>
      <SearchResults
        searchValue={searchValue}
        onClick={onClick}
        isLoading={isLoading}
        items={items}
        selectedItem={selectedItem}
        onSelectedItemChange={onSelectedItemChange}
      />
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  max-height: 35vh;
  overflow-y: auto;

  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.08),
    0px 3.78px 33.4221px rgba(0, 0, 0, 0.0503198),
    0px 41.7776px 33.4221px rgba(0, 0, 0, 0.0503198);
  border-radius: 1.2rem;
`
