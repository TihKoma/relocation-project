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
        onClick={() => {
          setIsScreenWithSuggestionsOpen(true)
        }}
        autoFocus={false}
        initialValue={selectedRegion?.name}
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
