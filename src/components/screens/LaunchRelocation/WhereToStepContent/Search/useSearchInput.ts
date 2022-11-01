import { MutableRefObject, useEffect, useMemo, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import debounce from 'lodash/debounce'
import { useClickAway } from 'react-use'

import {
  MarketplaceSearchSuggestion,
  QUERY_MARKETPLACE_REGIONS,
} from '@/modules/marketplace'

const SEARCH_HISTORY_STORAGE_KEY = 'relocation-search-history'

const SEARCH_DEBOUNCE = 300
const MAX_LENGTH_SEARCH_HISTORY = 10

export const useSearchInput = (
  containerRef: MutableRefObject<HTMLDivElement | null>,
) => {
  const [isFocused, setIsFocused] = useState(false)
  const [currentValue, setCurrentValue] = useState('')
  const [getSuggestions, { loading: isSuggestionsLoading, data: suggestions }] =
    useLazyQuery(QUERY_MARKETPLACE_REGIONS)
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
        getSuggestions({
          variables: { input: { query: value } },
        })

        setIsShowSearchHistory(!value)
        setIsShowResults(!!value)
        setCurrentValue(value)
      }, SEARCH_DEBOUNCE),
    [getSuggestions],
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
    suggestions: suggestions?.marketplaceRegions,
    isSuggestionsLoading,
    currentValue,
    isShowSearchHistory,
    setIsShowSearchHistory,
  }
}
