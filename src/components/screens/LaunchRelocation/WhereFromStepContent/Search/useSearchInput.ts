import { MutableRefObject, useEffect, useMemo, useState } from 'react'
import { EntityType } from '__generated__/globalTypes'
import { useLazyQuery } from '@apollo/client'
import debounce from 'lodash/debounce'
import { useClickAway } from 'react-use'

import { SearchV2Summary_searchV2Summary_Buckets_Docs_Entity_Region } from '@/modules/map/graphql/__generated__/SearchV2Summary'
import { QUERY_SEARCH_V2 } from '@/modules/map/graphql/query-search'
import { MarketplaceSearchSuggestion } from '@/modules/marketplace'

const SEARCH_HISTORY_STORAGE_KEY = 'relocation-from-search-history'

const SEARCH_DEBOUNCE = 300
const MAX_LENGTH_SEARCH_HISTORY = 10

export const useSearchInput = (
  containerRef: MutableRefObject<HTMLDivElement | null>,
) => {
  const [isFocused, setIsFocused] = useState(false)
  const [currentValue, setCurrentValue] = useState('')

  const [search, { loading: isSuggestionsLoading, data: results }] =
    useLazyQuery(QUERY_SEARCH_V2)
  const [isShowResults, setIsShowResults] = useState(false)
  const [isShowSearchHistory, setIsShowSearchHistory] = useState(false)

  useEffect(() => {
    if (isFocused && !isShowResults) {
      setIsShowSearchHistory(true)
    }
  }, [isFocused, isShowResults])

  const onChange = useMemo(
    () =>
      debounce((value: string) => {
        search({
          variables: {
            query: value,
            offset: 0,
            type: EntityType.REGION,
          },
        })

        setIsShowSearchHistory(!value)
        setIsShowResults(!!value)
        setCurrentValue(value)
      }, SEARCH_DEBOUNCE),
    [search],
  )

  useEffect(() => {
    return () => onChange.cancel()
  }, [onChange])

  useClickAway(containerRef, () => {
    setIsFocused(false)
    setIsShowSearchHistory(false)
    setIsShowResults(false)
  })

  const onClick = (suggestion: MarketplaceSearchSuggestion) => {
    setIsShowResults(false)

    const currentItems: MarketplaceSearchSuggestion[] = JSON.parse(
      sessionStorage.getItem(SEARCH_HISTORY_STORAGE_KEY) || '[]',
    )

    const duplicate = currentItems.findIndex(
      (item) => item.id === suggestion.id,
    )
    const deletionIndex =
      duplicate !== -1
        ? duplicate
        : currentItems.length >= MAX_LENGTH_SEARCH_HISTORY
        ? 0
        : null

    if (deletionIndex !== null) currentItems.splice(deletionIndex, 1)

    sessionStorage.setItem(
      SEARCH_HISTORY_STORAGE_KEY,
      JSON.stringify([...currentItems, suggestion]),
    )
  }

  return {
    isFocused,
    setIsFocused,
    setIsShowResults,
    onChange,
    isShowResults,
    onClick,
    suggestions: (results?.searchV2.Docs?.map((item) => item?.Entity) ??
      []) as SearchV2Summary_searchV2Summary_Buckets_Docs_Entity_Region[],
    isSuggestionsLoading,
    currentValue,
    isShowSearchHistory,
    setIsShowSearchHistory,
  }
}
