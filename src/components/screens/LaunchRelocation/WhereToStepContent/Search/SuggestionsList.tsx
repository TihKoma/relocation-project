import { FC, useRef } from 'react'
import styled from '@emotion/styled'

import { NormalizedButton } from '@/components/ui-kit/Button'
import { ModalPortal } from '@/components/ui-kit/Modal'
import { ReactComponent as CloseIcon } from '@/images/close.svg'
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
          <Title>Where are you moving to?</Title>
          <Description>
            At the moment Nicity covers only relocation to United States
          </Description>
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
            autoFocus
            initialValue={selectedRegion?.name}
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
  margin-bottom: 0.8rem;
  padding: 1.6rem;

  position: relative;

  display: grid;
  grid-auto-flow: row;
  gap: 1.6rem;
  justify-content: space-between;
`
const Title = styled.div`
  font-weight: 500;
  font-size: 1.8rem;
  line-height: 2.4rem;
  color: ${getColorTheme('sun1000')};
`
const Description = styled.div`
  color: ${getColorTheme('sun')};
`
const Content = styled.div`
  padding: 0 1.6rem;
`
const Form = styled(FormBase)`
  height: 4rem;
  margin-bottom: 0.8rem;

  position: relative;
`
const ButtonCancel = styled(NormalizedButton)`
  position: absolute;
  top: 1.6rem;
  right: 1.6rem;
`
