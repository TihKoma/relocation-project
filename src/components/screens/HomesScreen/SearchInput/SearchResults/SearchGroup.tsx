import { FC } from 'react'
import Link from 'next/link'
import styled from '@emotion/styled'
import capitalize from 'lodash/capitalize'

import { MarketplaceSearchSuggestion } from '@/modules/marketplace'
import { MarketplaceRegions_marketplaceRegions_cities } from '@/modules/marketplace/graphql/__generated__/MarketplaceRegions'
import { ROUTES } from '@/modules/router'
import { getColorTheme } from '@/styles/themes'

type Props = {
  items: Array<MarketplaceSearchSuggestion | null> | null
  onClick: (suggestion: MarketplaceSearchSuggestion) => void
  searchValue: string
  title: string
  selectedItem?: MarketplaceRegions_marketplaceRegions_cities | null
  onSelectedItemChange?: (id: string) => void
}
export const SearchGroup: FC<Props> = ({
  title,
  items,
  onClick,
  searchValue,
  selectedItem,
  onSelectedItemChange,
}) => {
  const onItemClick = (id: string, name: string, slug: string) => () => {
    onClick({
      id,
      name,
      slug,
    })
  }

  return items?.length ? (
    <Container>
      <GroupTitle>{title}</GroupTitle>
      {items.map((item) => {
        if (!item) {
          return
        }

        return (
          <Link
            key={item.id}
            href={ROUTES.areaRealEstate.calcUrl({ regionSlug: item.slug })}
            passHref
          >
            <Item
              id={item.id}
              isSelected={selectedItem?.id === item.id}
              onClick={onItemClick(item.id, item.name, item.slug)}
              onMouseEnter={() => onSelectedItemChange?.(item.id)}
            >
              <Title>
                <Text>
                  {replaceJSX(
                    item.name,
                    searchValue.replace(/\w+/g, capitalize),
                    <SearchText>
                      {searchValue.replace(/\w+/g, capitalize)}
                    </SearchText>,
                  )}
                </Text>
              </Title>
            </Item>
          </Link>
        )
      })}
    </Container>
  ) : null
}

const Container = styled.div``
const GroupTitle = styled.div`
  margin-bottom: 0.8rem;

  font-weight: 500;
  font-size: 1.8rem;
  line-height: 2.4rem;
  color: ${getColorTheme('sun1000')};
`
const Title = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  align-items: center;
  flex: 1;
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
const Item = styled.a<{ isSelected?: boolean }>`
  width: 100%;
  height: 3.7rem;

  display: flex;
  align-items: center;
  gap: 1.4rem;

  transition: all 0.1s ease-out;
  cursor: pointer;
  outline: none;

  overflow: hidden;
  text-overflow: ellipsis;

  ${({ isSelected }) => (isSelected ? 'background-color: #f0f1f6;' : '')}
`

const replaceJSX = (str: string, find: string, replace: JSX.Element) => {
  const parts = str.split(find)
  const result = []
  for (let i = 0; i < parts.length; i++) {
    result.push(parts[i])
    result.push(replace)
  }
  result.pop()

  return result
}
