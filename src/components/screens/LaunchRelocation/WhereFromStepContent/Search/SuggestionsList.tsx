import { FC, useRef } from 'react'
import styled from '@emotion/styled'

import { Button } from '@/components/ui-kit/Button'
import { ModalPortal } from '@/components/ui-kit/Modal'
import { CrossIcon } from '@/images'
import { getColorTheme } from '@/styles/themes'

import { Region } from '../../types'
import { Form as FormBase } from './Form'
import { SearchResults } from './SearchResults'
import { useSearchInput } from './useSearchInput'

type Props = {
  onRequestClose: (value: boolean) => void
  selectRegion: (region: Region) => void
  selectedRegion: Region | null
}
export const SuggestionsList: FC<Props> = ({
  onRequestClose,
  selectRegion,
  selectedRegion,
}) => {
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
  } = useSearchInput(containerRef)

  const isVisibleResults =
    (isSuggestionsLoading || suggestions) &&
    isShowResults &&
    !isShowSearchHistory

  const onItemClick = (item: Region) => {
    selectRegion(item)
    onClick(item)
  }

  return (
    <ModalPortal isVisible onRequestClose={onRequestClose}>
      <Container ref={containerRef}>
        <Toolbar>
          <Title>Where are you moving from?</Title>
          <Button
            size={'small'}
            viewType={'ghost'}
            Icon={<CrossIcon />}
            onClick={() => onRequestClose(false)}
          />
        </Toolbar>
        <Content>
          <Form
            onSubmit={() => {}}
            onChange={onChange}
            isFocused={isFocused}
            setIsFocused={setIsFocused}
            initialValue={selectedRegion?.name}
            autoFocus
          />
          {isVisibleResults && (
            <SearchResults
              onClick={onItemClick}
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
  padding: 1.6rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
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
