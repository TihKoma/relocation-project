import { useEffect, useMemo, useRef, useState, VFC } from 'react'
import { useLazyQuery } from '@apollo/client'
import styled from '@emotion/styled'
import debounce from 'lodash/debounce'
import { useClickAway } from 'react-use'

import { useAnalytics } from '@/modules/analytics'
import { QUERY_GET_SUGGESTIONS, SearchType } from '@/modules/map'
import { Suggestion } from '@/modules/map'

import { Form } from './Form'
import { SearchHistoryPopup } from './SearchHistoryPopup'
import { SuggestionsPopup as SuggestionsPopupBase } from './SuggestionsPopup'

const SEARCH_DEBOUNCE = 300
export const SEARCH_HISTORY = 'searchHistory'
const MAX_LENGTH_SEARCH_HISTORY = 10

export type SearchHistory = Omit<Suggestion, '__typename' | 'slug'>

type Props = {
  initialValue?: string
  className?: string
  onChangePopupVisibility?: (isOpen: boolean) => void
}

export const SearchBarInput: VFC<Props> = ({
  initialValue,
  className,
  onChangePopupVisibility,
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const [currentValue, setCurrentValue] = useState('')
  const analytics = useAnalytics()

  const [getSuggestions, { loading: isSuggestionsLoading, data: suggestions }] =
    useLazyQuery(QUERY_GET_SUGGESTIONS)

  const [isShowPopup, setIsShowPopup] = useState(false)
  const [isShowSearchHistory, setIsShowSearchHistory] = useState(false)

  useEffect(() => {
    if (isFocused) {
      setIsShowSearchHistory(true)
    }
  }, [isFocused])

  useEffect(() => {
    onChangePopupVisibility?.(isShowPopup || isShowSearchHistory)
  }, [onChangePopupVisibility, isShowPopup, isShowSearchHistory])

  const onChange = useMemo(
    () =>
      debounce((value: string) => {
        getSuggestions({
          variables: { searchType: SearchType.REGION, query: value },
        })

        setIsShowSearchHistory(!value)
        setIsShowPopup(!!value)
        setCurrentValue(value)

        analytics?.search(value)
      }, SEARCH_DEBOUNCE),
    [analytics, getSuggestions],
  )

  useEffect(() => {
    return () => onChange.cancel()
  }, [onChange])

  const containerRef = useRef(null)
  useClickAway(containerRef, () => {
    setIsShowPopup(false)
    setIsShowSearchHistory(false)
  })

  const isPopupOpen = !!(isShowPopup && !isShowSearchHistory)

  const onClick = (suggestion: SearchHistory) => {
    setIsShowPopup(false)

    const currentItems: SearchHistory[] = JSON.parse(
      sessionStorage.getItem(SEARCH_HISTORY) || '[]',
    )

    const duplicate = currentItems.findIndex(
      (item) => item.entityId === suggestion.entityId,
    )
    const deletionIndex =
      duplicate !== -1
        ? duplicate
        : currentItems.length >= MAX_LENGTH_SEARCH_HISTORY
        ? 0
        : null

    if (deletionIndex !== null) currentItems.splice(deletionIndex, 1)

    sessionStorage.setItem(
      SEARCH_HISTORY,
      JSON.stringify([...currentItems, suggestion]),
    )
  }

  const onFocused = (value: boolean) => {
    setIsFocused(value)
  }

  return (
    <Container ref={containerRef} className={className}>
      <Form
        isFocused={isFocused}
        setIsFocused={onFocused}
        onSubmit={() => {
          setIsShowPopup(false)
          setIsShowSearchHistory(false)
        }}
        onChange={onChange}
        initialValue={initialValue}
      />
      {isPopupOpen && (
        <SuggestionsPopup
          onClick={onClick}
          items={suggestions?.getSuggestions}
          isLoading={isSuggestionsLoading}
          isFocused={isFocused}
          searchValue={currentValue}
        />
      )}

      {isShowSearchHistory && (
        <SearchHistoryPopup
          onClick={() => setIsShowSearchHistory(false)}
          hideSearchHistory={() => setIsShowSearchHistory(false)}
        />
      )}
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 4rem;

  position: relative;
`

const SuggestionsPopup = styled(SuggestionsPopupBase)`
  width: 100%;
  position: absolute;
  top: calc(100% + 0.4rem);
`
