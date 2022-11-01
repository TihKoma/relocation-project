import { FC, useMemo } from 'react'
import Link from 'next/link'
import styled from '@emotion/styled'

import { ReactComponent as HistoryImg } from '@/images/search-history.svg'
import { ROUTES } from '@/modules/router'
import { notMobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

import { SEARCH_HISTORY, SearchHistory } from './SearchBarInput'

type Props = {
  onClick?: () => void
  hideSearchHistory: () => void
}

export const SearchHistoryPopup: FC<Props> = ({
  onClick,
  hideSearchHistory,
}) => {
  const storage = sessionStorage?.getItem(SEARCH_HISTORY)
  const searchHistory: SearchHistory[] = useMemo(
    () => JSON.parse(storage || '[]'),
    [storage],
  )

  const clearSearchHistory = () => {
    sessionStorage.setItem(SEARCH_HISTORY, '')
    hideSearchHistory()
  }

  if (!searchHistory?.length) return <></>

  return (
    <Container>
      <List>
        <SearchHistoryItem>
          <HistoryImg />
          <Text>Search history</Text>
          <ClearButton onClick={clearSearchHistory}>Clear</ClearButton>
        </SearchHistoryItem>
        {searchHistory.map((item) => (
          <Link
            key={item.entityId}
            href={ROUTES.search.calcUrl({ query: item.suggestion })}
            passHref
          >
            <Item onClick={onClick}>
              <Title>
                <Text>{item.suggestion}</Text>
              </Title>
            </Item>
          </Link>
        ))}
      </List>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;

  ${notMobileMedia} {
    background: ${getColorTheme('earth')};
    border-radius: 1.2rem;

    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.08),
      0px 3.78px 33.4221px rgba(0, 0, 0, 0.0503198),
      0px 41.7776px 33.4221px rgba(0, 0, 0, 0.0503198);
  }
`
const List = styled.ul`
  padding: 0.8rem 0;
  margin: 0;

  display: grid;

  list-style-type: none;
`
const Title = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  align-items: center;
  flex: 1;

  border-bottom: 1px solid ${getColorTheme('moon')};

  margin-left: 5rem;
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
