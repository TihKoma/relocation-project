import { FC } from 'react'
import Link from 'next/link'
import styled from '@emotion/styled'
import capitalize from 'lodash/capitalize'

import { NothingFound } from '@/components/screens/Search/SearchResult/Tabs/NothingFound'
import { Loader as LoaderBase } from '@/components/ui-kit/Loader'
import { useAnalytics } from '@/modules/analytics'
import { useIsMobileDevice } from '@/modules/device'
import { Suggestion } from '@/modules/map'
import { ROUTES } from '@/modules/router'
import { mobileMedia, notMobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

import { LoadingState } from '../../LoadingState'
import { SearchHistory } from './SearchBarInput'

type Props = {
  isLoading: boolean
  isFocused: boolean
  items?: Suggestion[] | null
  onClick: (suggestion: SearchHistory) => void
  className?: string
  searchValue: string
}

export const SuggestionsPopup: FC<Props> = ({
  items,
  isLoading,
  isFocused,
  onClick,
  className,
  searchValue,
}) => {
  const analytics = useAnalytics()

  const onItemClick = (entityId: string, suggestion: string) => () => {
    onClick({
      entityId: entityId,
      suggestion: suggestion,
    })
    analytics.searchOpenResult(suggestion)
  }

  const isMobile = useIsMobileDevice()
  const sizeLoader = isMobile ? 'medium' : 'small'

  const isNothingFound = !isLoading && isFocused && isMobile && !items?.length
  if (isNothingFound)
    return (
      <NothingFoundContainer>
        <NothingFound />
      </NothingFoundContainer>
    )

  return (
    <Container className={className}>
      <LoadingState
        loading={isLoading}
        loadingComponent={<Loader color={'neptune'} size={sizeLoader} />}
      >
        {(items?.length && (
          <List>
            {items.map((item) => (
              <Link
                key={item.entityId}
                href={ROUTES.search.calcUrl({ query: item.suggestion })}
                passHref
              >
                <Item onClick={onItemClick(item.entityId, item.suggestion)}>
                  <Title>
                    <Text>
                      {replaceJSX(
                        item.suggestion,
                        searchValue.replace(/\w+/g, capitalize),
                        <SearchText>
                          {searchValue.replace(/\w+/g, capitalize)}
                        </SearchText>,
                      )}
                    </Text>
                  </Title>
                </Item>
              </Link>
            ))}
          </List>
        )) ||
          ''}
      </LoadingState>
    </Container>
  )
}

const NothingFoundContainer = styled.div`
  padding-top: 14.3rem;
`
const Container = styled.div`
  ${notMobileMedia} {
    background: #ffffff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.08),
      0px 3.78px 33.4221px rgba(0, 0, 0, 0.0503198),
      0px 41.7776px 33.4221px rgba(0, 0, 0, 0.0503198);
    border-radius: 1.2rem;
  }
  width: 100%;
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
`
const Text = styled.span`
  overflow: hidden;

  font-size: 1.6rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: ${getColorTheme('sun500')};
`
const SearchText = styled.span`
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
const Loader = styled(LoaderBase)`
  ${mobileMedia} {
    margin-top: 10rem;
  }
`

export const replaceJSX = (str: string, find: string, replace: JSX.Element) => {
  const parts = str.split(find)
  const result = []
  for (let i = 0; i < parts.length; i++) {
    result.push(parts[i])
    result.push(replace)
  }
  result.pop()

  return result
}
