import { FC } from 'react'
import styled from '@emotion/styled'

import { LoadingState } from '@/components/shared/LoadingState'
import { MockWithAction as MockWithActionBase } from '@/components/shared/MockWithAction'
import { Loader as LoaderBase } from '@/components/ui-kit/Loader'
import { PlaceholderEyeIcon } from '@/images'
import {
  MarketplaceSearchSuggestion,
  MarketplaceSearchSuggestions,
} from '@/modules/marketplace'
import { MarketplaceRegions_marketplaceRegions_cities } from '@/modules/marketplace/graphql/__generated__/MarketplaceRegions'

import { SearchGroup } from './SearchGroup'

type Props = {
  isLoading: boolean
  items?: MarketplaceSearchSuggestions | null
  onClick: (suggestion: MarketplaceSearchSuggestion) => void
  className?: string
  searchValue: string
  selectedItem?: MarketplaceRegions_marketplaceRegions_cities | null
  onSelectedItemChange?: (id: string) => void
}

export const SearchResults: FC<Props> = ({
  items,
  isLoading,
  onClick,
  className,
  searchValue,
  selectedItem,
  onSelectedItemChange,
}) => {
  const isEmpty = !(
    items?.states?.length ||
    items?.counties?.length ||
    items?.cities?.length ||
    items?.neighborhoods?.length
  )

  return (
    <LoadingState
      loading={isLoading}
      loadingComponent={<Loader color={'neptune'} size={'medium'} />}
    >
      {!isEmpty ? (
        <List className={className}>
          <SearchGroup
            items={items.states}
            onClick={onClick}
            searchValue={searchValue}
            title={'States'}
            selectedItem={selectedItem}
            onSelectedItemChange={onSelectedItemChange}
          />
          <SearchGroup
            items={items.counties}
            onClick={onClick}
            searchValue={searchValue}
            title={'Counties'}
            selectedItem={selectedItem}
            onSelectedItemChange={onSelectedItemChange}
          />
          <SearchGroup
            items={items.cities}
            onClick={onClick}
            searchValue={searchValue}
            title={'Cities'}
            selectedItem={selectedItem}
            onSelectedItemChange={onSelectedItemChange}
          />
          <SearchGroup
            items={items.neighborhoods}
            onClick={onClick}
            searchValue={searchValue}
            title={'Neighborhoods'}
            selectedItem={selectedItem}
            onSelectedItemChange={onSelectedItemChange}
          />
        </List>
      ) : (
        <MockWithAction
          image={<PlaceholderEyeIcon />}
          title={'Sorry, we couldn’t find this location'}
          description={'Please check the spelling or try your search again'}
        />
      )}
    </LoadingState>
  )
}

const List = styled.ul`
  display: grid;
  grid-row-gap: 0.8rem;
  padding: 0 1.6rem;

  list-style-type: none;
`

const Loader = styled(LoaderBase)`
  height: 20rem;
`
const MockWithAction = styled(MockWithActionBase)`
  padding: 1rem 0 1.4rem;
  width: 100%;
  max-width: initial !important;
  margin: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
`
