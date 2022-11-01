import { useCallback, useEffect, useState, VFC } from 'react'
import { useLazyQuery } from '@apollo/client'
import styled from '@emotion/styled'
import { Controller, ControllerRenderProps, FieldValues } from 'react-hook-form'

import { FieldFiles } from '@/components/shared/PostForm/Files'
import { Chip } from '@/components/ui-kit/Chip'
import { ReactComponent as LocationIcon } from '@/images/location.svg'
import { QUERY_TAG_SUGGESTIONS } from '@/modules/tag'
import { useDebounce } from '@/modules/utils/useDebounce'
import { notMobileMedia } from '@/styles/media'
import { SCROLLBAR_DISPLAY_NONE_MIXIN } from '@/styles/mixins'
import { getColorTheme } from '@/styles/themes'

import { FORM_DESKTOP_FLEX_BASIS, FORM_PADDING } from '../../consts'

const TAG_SUGGESTIONS_DEBOUNCE = 300

type Props = {
  onLocationClick: () => void
  selectedTag: string | null
  onTagClick: (suggestion: string) => void
}

export const Toolbar: VFC<Props> = ({
  selectedTag,
  onLocationClick,
  onTagClick,
}) => {
  const [suggestions, setSuggestions] = useState<string[]>([])

  const [fetchTagSuggestions, { data, variables }] = useLazyQuery(
    QUERY_TAG_SUGGESTIONS,
    {
      onCompleted: (data) => {
        setSuggestions(
          data.tagSuggestions?.filter(
            (item) => item !== selectedTag?.slice(1),
          ) ?? [],
        )
      },
    },
  )

  const loadTagSuggestions = useDebounce(async (selectedTag: string) => {
    fetchTagSuggestions({
      variables: { query: selectedTag },
    })
  }, TAG_SUGGESTIONS_DEBOUNCE)

  const setPreviousSuggestions = useCallback(() => {
    if (selectedTag && data && variables?.query === selectedTag.slice(1)) {
      setSuggestions(
        data.tagSuggestions?.filter((item) => item !== selectedTag?.slice(1)) ??
          [],
      )
    }
  }, [data, variables, selectedTag])

  useEffect(() => {
    if (selectedTag) {
      // if last query has the same variables, put old results to suggestions, because it doesn't trigger onCompleted
      setPreviousSuggestions()
      loadTagSuggestions(selectedTag.slice(1))
      return
    }
    setSuggestions([])
  }, [setPreviousSuggestions, loadTagSuggestions, selectedTag])

  return (
    <Container>
      {suggestions.length ? (
        <TagsContainer>
          <TagsList>
            {suggestions.map((tag) => {
              return <Tag onClick={() => onTagClick(`#${tag}`)}>#{tag}</Tag>
            })}
          </TagsList>
        </TagsContainer>
      ) : (
        <>
          <Controller
            name={'media'}
            render={(input) => (
              <FieldFiles
                {...input}
                data-test-id={'create-post:attach-file'}
                field={
                  input.field as ControllerRenderProps<FieldValues, string>
                }
              />
            )}
          />
          <Chip onClick={onLocationClick}>
            <LocationIcon />
            Location
          </Chip>
        </>
      )}
    </Container>
  )
}

const Container = styled.div`
  margin-top: auto;

  display: grid;
  grid-auto-flow: column;
  justify-content: start;
  gap: 1.6rem;
`

const TagsContainer = styled.div`
  overflow-x: auto;

  ${SCROLLBAR_DISPLAY_NONE_MIXIN}

  ${notMobileMedia} {
    max-width: calc(
      ${FORM_DESKTOP_FLEX_BASIS} - ${FORM_PADDING} - ${FORM_PADDING}
    );
  }
`

const TagsList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-auto-flow: column;
  column-gap: 1.6rem;
`

const Tag = styled.li`
  padding: 0.8rem 1.6rem;

  border: 2px solid #3f37c9;
  border-radius: 16px;

  cursor: pointer;

  color: #3f37c9;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: -0.06em;

  &:hover {
    border-color: ${getColorTheme('sun')};
    color: ${getColorTheme('sun')};
  }
`
