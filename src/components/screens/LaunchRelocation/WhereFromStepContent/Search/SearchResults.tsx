import { FC } from 'react'
import styled from '@emotion/styled'
import capitalize from 'lodash/capitalize'

import { LoadingState } from '@/components/shared/LoadingState'
import { MockWithAction as MockWithActionBase } from '@/components/shared/MockWithAction'
import { Loader as LoaderBase } from '@/components/ui-kit/Loader'
import { PlaceholderEyeIcon } from '@/images'
import { getColorTheme } from '@/styles/themes'

type Item = {
  id: string
  name: string
  slug: string
}
type Props = {
  isLoading: boolean
  items?: Item[]
  onClick: (item: Item) => void
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
  return (
    <LoadingState
      loading={isLoading}
      loadingComponent={<Loader color={'neptune'} size={'medium'} />}
    >
      {items?.length ? (
        <List className={className}>
          {items.map((item) => {
            return (
              <Suggestion onClick={() => onClick(item)}>
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
              </Suggestion>
            )
          })}
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

const List = styled.ul`
  display: grid;
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
const SearchText = styled.span`
  color: black;
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
const Suggestion = styled.div`
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
