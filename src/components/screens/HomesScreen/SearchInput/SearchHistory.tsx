import { FC, useMemo } from 'react'
import Link from 'next/link'
import styled from '@emotion/styled'

import { ReactComponent as HistoryImg } from '@/images/search-history.svg'
import { MarketplaceSearchSuggestion } from '@/modules/marketplace'
import { ROUTES } from '@/modules/router'
import { getColorTheme } from '@/styles/themes'

import { SEARCH_HISTORY_STORAGE_KEY } from './types'

type Props = {
  onClick?: () => void
  hideSearchHistory: () => void
}
export const SearchHistory: FC<Props> = ({ onClick, hideSearchHistory }) => {
  const storage = sessionStorage?.getItem(SEARCH_HISTORY_STORAGE_KEY)
  const searchHistory: MarketplaceSearchSuggestion[] = useMemo(
    () =>
      JSON.parse(storage || '[]').filter(
        (item: MarketplaceSearchSuggestion) => !!item,
      ),
    [storage],
  )

  if (!searchHistory?.length) return <></>

  const clearSearchHistory = () => {
    sessionStorage.setItem(SEARCH_HISTORY_STORAGE_KEY, '')
    hideSearchHistory()
  }

  return (
    <List>
      <SearchHistoryItem>
        <HistoryImg />
        <Text>Search history</Text>
        <ClearButton onClick={clearSearchHistory}>Clear</ClearButton>
      </SearchHistoryItem>
      {searchHistory.map((item) => (
        <Link
          key={item.id}
          href={ROUTES.areaRealEstate.calcUrl({ regionSlug: item.slug })}
          passHref
        >
          <Item onClick={onClick}>
            <Title>
              <Text>{item.name}</Text>
            </Title>
          </Item>
        </Link>
      ))}
    </List>
  )
}

const List = styled.ul`
  padding: 0.8rem 0;
  margin: 0;

  display: grid;

  list-style-type: none;
`
const Title = styled.div`
  height: 100%;
  width: 100%;
  padding-left: 3.2rem;

  display: flex;
  align-items: center;
  flex: 1;

  border-bottom: 1px solid ${getColorTheme('moon')};

  overflow: inherit;
`
const Text = styled.span`
  overflow: hidden;

  font-size: 1.6rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: black;
`
const Item = styled.a`
  width: 100%;
  height: 3.7rem;
  padding: 0 1.6rem;

  display: flex;
  align-items: center;
  gap: 1.4rem;

  transition: all 0.1s ease-out;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;

  &:last-child ${Title} {
    border-bottom: none;
  }

  :hover {
    background-color: #f0f1f6;
  }
`
const SearchHistoryItem = styled(Item)`
  cursor: default;

  :hover {
    background-color: inherit;
  }
`
const ClearButton = styled.div`
  font-size: 1.6rem;
  line-height: 2.4rem;
  color: ${getColorTheme('sun500')};

  cursor: pointer;
  margin-left: auto;
`
