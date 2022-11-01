import {
  FC,
  MutableRefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import styled from '@emotion/styled'

import { MarketplaceRegions_marketplaceRegions_cities as MarketplaceRegion } from '@/modules/marketplace/graphql/__generated__/MarketplaceRegions'

import { Form as FormBase } from '../Form'
import { useSearchInput } from '../use-search-input'
import { Popup as PopupBase } from './Popup'
import { SearchHistoryPopup } from './SearchHistoryPopup'

type Props = {
  containerRef: MutableRefObject<HTMLDivElement | null>
}
export const DesktopContent: FC<Props> = ({ containerRef }) => {
  const {
    isFocused,
    setIsFocused,
    onChange,
    isShowResults,
    onClick,
    suggestions,
    isSuggestionsLoading,
    currentValue,
    isShowSearchHistory,
    setIsShowSearchHistory,
  } = useSearchInput(containerRef)

  const isPopupOpen = !!(
    (isSuggestionsLoading || suggestions) &&
    isShowResults &&
    !isShowSearchHistory
  )

  const selectedItemIndex = useRef(-1)
  const [selectedItem, setSelectedItem] = useState<MarketplaceRegion | null>(
    null,
  )

  const allRegions = useMemo(() => {
    const { cities, counties, neighborhoods, states } = suggestions || {}

    return [
      ...(states || []),
      ...(counties || []),
      ...(cities || []),
      ...(neighborhoods || []),
    ]
  }, [suggestions])

  useEffect(() => {
    const handlerKeyDown = (event: KeyboardEvent) => {
      let i
      if (event.key === 'ArrowDown') {
        i =
          selectedItemIndex.current < allRegions.length - 1
            ? selectedItemIndex.current + 1
            : allRegions.length - 1
        setSelectedItem(allRegions[i])
        selectedItemIndex.current = i
      }

      if (event.key === 'ArrowUp') {
        i = selectedItemIndex.current > 0 ? selectedItemIndex.current - 1 : 0

        setSelectedItem(allRegions[i])
        selectedItemIndex.current = i
      }

      if (document && i) {
        const item = document.getElementById(allRegions[i]?.id || '')
        item?.focus()
        item?.scrollIntoView({ block: 'center' })
      }
    }

    document.addEventListener('keyup', handlerKeyDown)
    return () => document.removeEventListener('keyup', handlerKeyDown)
  }, [allRegions])

  return (
    <>
      <Form
        isFocused={isFocused}
        setIsFocused={setIsFocused}
        onChange={onChange}
      />
      {isPopupOpen && (
        <Popup
          onClick={onClick}
          items={suggestions}
          isLoading={isSuggestionsLoading}
          searchValue={currentValue}
          selectedItem={selectedItem}
          onSelectedItemChange={(id: string) => {
            const i = allRegions.findIndex((el) => el?.id === id)
            setSelectedItem(allRegions[i])
            selectedItemIndex.current = i
          }}
        />
      )}
      {isShowSearchHistory && (
        <SearchHistoryPopup
          onClick={() => setIsShowSearchHistory(false)}
          hideSearchHistory={() => setIsShowSearchHistory(false)}
        />
      )}
    </>
  )
}

const Popup = styled(PopupBase)`
  width: 100%;
`
const Form = styled(FormBase)`
  margin-bottom: 0.8rem;
`
