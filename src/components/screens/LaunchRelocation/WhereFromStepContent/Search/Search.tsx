import { FC, useState } from 'react'

import type { Region } from '../../types'
import { Form } from './Form'
import { SuggestionsList } from './SuggestionsList'

type Props = {
  selectRegion: (region: Region) => void
  selectedRegion: Region | null
}
export const Search: FC<Props> = ({ selectRegion, selectedRegion }) => {
  const [isScreenWithSuggestionsOpen, setIsScreenWithSuggestionsOpen] =
    useState(false)

  return (
    <>
      <Form
        initialValue={selectedRegion?.name}
        onClick={() => {
          setIsScreenWithSuggestionsOpen(true)
        }}
        autoFocus={false}
      />
      {isScreenWithSuggestionsOpen && (
        <SuggestionsList
          onRequestClose={setIsScreenWithSuggestionsOpen}
          selectRegion={selectRegion}
          selectedRegion={selectedRegion}
        />
      )}
    </>
  )
}
