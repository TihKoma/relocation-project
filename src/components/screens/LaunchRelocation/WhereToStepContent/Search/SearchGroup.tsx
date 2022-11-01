import { FC } from 'react'
import styled from '@emotion/styled'
import capitalize from 'lodash/capitalize'

import { MarketplaceSearchSuggestion } from '@/modules/marketplace'
import { getColorTheme } from '@/styles/themes'

import { Region } from '../../types'

type Props = {
  items: Array<MarketplaceSearchSuggestion | null> | null
  onClick: (region: Region) => void
  searchValue: string
  title: string
}
export const SearchGroup: FC<Props> = ({
  title,
  items,
  onClick,
  searchValue,
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
          <Item onClick={onItemClick(item.id, item.name, item.slug)}>
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
const Item = styled.a`
  width: 100%;
  height: 3.7rem;

  display: flex;
  align-items: center;
  gap: 1.4rem;

  transition: all 0.1s ease-out;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;

  :hover {
    background-color: #f0f1f6;
  }
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
