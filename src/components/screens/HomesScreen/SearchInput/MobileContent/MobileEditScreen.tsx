import { FC, useRef } from 'react'
import styled from '@emotion/styled'

import { Form as FormBase } from '@/components/screens/HomesScreen/SearchInput/Form'
import { SearchHistory } from '@/components/screens/HomesScreen/SearchInput/SearchHistory'
import { SearchResults } from '@/components/screens/HomesScreen/SearchInput/SearchResults/SearchResults'
import { useSearchInput } from '@/components/screens/HomesScreen/SearchInput/use-search-input'
import { NormalizedButton } from '@/components/ui-kit/Button'
import { ModalPortal } from '@/components/ui-kit/Modal'
import { ReactComponent as CloseIcon } from '@/images/close.svg'
import { getColorTheme } from '@/styles/themes'

type Props = {
  onRequestClose: (value: boolean) => void
}
export const MobileEditScreen: FC<Props> = ({ onRequestClose }) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
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

  const isVisibleResults =
    (isSuggestionsLoading || suggestions) &&
    isShowResults &&
    !isShowSearchHistory

  return (
    <ModalPortal isVisible onRequestClose={onRequestClose}>
      <Container ref={containerRef}>
        <Toolbar>
          <Title>Enter city or neighborhood</Title>
          <ButtonCancel onClick={() => onRequestClose(false)}>
            <CloseIcon />
          </ButtonCancel>
        </Toolbar>
        <Content>
          <Form
            onSubmit={() => {}}
            onChange={onChange}
            isFocused={isFocused}
            setIsFocused={setIsFocused}
          />
          {isShowSearchHistory && (
            <SearchHistory
              onClick={() => setIsShowSearchHistory(false)}
              hideSearchHistory={() => setIsShowSearchHistory(false)}
            />
          )}
          {isVisibleResults && (
            <SearchResults
              onClick={onClick}
              items={suggestions}
              isLoading={isSuggestionsLoading}
              searchValue={currentValue}
            />
          )}
        </Content>
      </Container>
    </ModalPortal>
  )
}

const Container = styled.div`
  height: 100%;
  width: 100%;

  background-color: ${getColorTheme('earth')};
`
const Toolbar = styled.div`
  margin-bottom: 0.8rem;
  padding: 1.6rem;

  display: flex;
  justify-content: space-between;
`
const Title = styled.div`
  font-weight: 500;
  font-size: 1.8rem;
  line-height: 2.4rem;
  color: ${getColorTheme('sun1000')};
`
const Content = styled.div`
  padding: 0 1.6rem;
`
const Form = styled(FormBase)`
  height: 4rem;
  margin-bottom: 0.8rem;

  position: relative;
`
const ButtonCancel = styled(NormalizedButton)``
