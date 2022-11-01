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

import { SearchGroup } from './SearchGroup'

type Props = {
  isLoading: boolean
  items?: MarketplaceSearchSuggestions | null
  onClick: (suggestion: MarketplaceSearchSuggestion) => void
  className?: string
  searchValue: string
}

export const SearchResults: FC<Props> = ({
  items,
  isLoading,
  onClick,
  className,
  searchValue,
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
          />
          <SearchGroup
            items={items.counties}
            onClick={onClick}
            searchValue={searchValue}
            title={'Counties'}
          />
          <SearchGroup
            items={items.cities}
            onClick={onClick}
            searchValue={searchValue}
            title={'Cities'}
          />
          <SearchGroup
            items={items.neighborhoods}
            onClick={onClick}
            searchValue={searchValue}
            title={'Neighborhoods'}
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
