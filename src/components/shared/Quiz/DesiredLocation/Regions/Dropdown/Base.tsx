import React, { forwardRef, useRef, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import styled from '@emotion/styled'
import { useClickAway } from 'react-use'

import { Input } from '@/components/ui-kit/form/Input'
import { TextHighlighter } from '@/components/ui-kit/TextHighlighter'
import { useAnalytics } from '@/modules/analytics'
import { FindQuizRegionGroups_findQuizRegionGroups } from '@/modules/quiz/graphql/__generated__/FindQuizRegionGroups'
import { FIND_QUIZ_REGION_GROUPS } from '@/modules/quiz/graphql/queries'
import { composeRefs } from '@/modules/utils/composeRefs'
import { AVERAGE_TYPING_TIME, useDebounce } from '@/modules/utils/useDebounce'
import { SCROLLBAR_DISPLAY_NONE_MIXIN } from '@/styles/mixins'

import { Placeholder } from '../../../shared/Placeholder'
import { highlightClassName, SubTitle, Title } from '../../../shared/shared'

export type Value = FindQuizRegionGroups_findQuizRegionGroups[]

export type Props = {
  value: Value
  label: string
  onChange: (value: Value) => void
  className?: string
}
const LIMIT_LOCATIONS = 5

export const DropdownBase = forwardRef<HTMLInputElement, Props>(
  ({ className, value: regions, onChange, label }, ref) => {
    const [value, setValue] = useState('')
    const [isShowList, setIsShowList] = useState(false)
    const containerRef = useRef(null)
    useClickAway(containerRef, () => setIsShowList(false))
    const analytics = useAnalytics()

    const [regionSearch, setRegionSearch] = useState<
      FindQuizRegionGroups_findQuizRegionGroups[]
    >([])

    const [findQuizRegionGroups] = useLazyQuery(FIND_QUIZ_REGION_GROUPS)

    const searchRegion = useDebounce(
      (search: string) =>
        findQuizRegionGroups({
          variables: { query: search },
        }).then(({ data }) => {
          if (data?.findQuizRegionGroups) {
            setRegionSearch(data?.findQuizRegionGroups)
          }
        }),
      AVERAGE_TYPING_TIME,
    )

    const filterRegionsSearch = ({
      id,
    }: Omit<
      FindQuizRegionGroups_findQuizRegionGroups,
      '__typename'
    >): boolean => {
      return !regions.map(({ id }) => id).includes(id)
    }

    const filteredRegionsSearch = regionSearch.filter(
      ({ id, name, title, subtitle }) =>
        filterRegionsSearch({ id, name, title, subtitle }),
    )

    const inputRef = useRef<HTMLInputElement>(null)

    return (
      <Container
        ref={containerRef}
        className={className}
        isShowList={isShowList}
        value={value}
      >
        <Input
          ref={composeRefs([inputRef, ref])}
          label={label}
          value={value}
          onChange={(search) => {
            if (search.length === 1) {
              analytics?.areaInputTry({ source: 'quiz' })
            }
            searchRegion(search)
            setValue(search)
          }}
          onFocus={() => setIsShowList(true)}
          prefix={({ magnifierIcon }) => magnifierIcon}
          suffix={({ crossButton }) => crossButton}
        />
        {isShowList && value && regionSearch && (
          <List>
            {filteredRegionsSearch.length > 0 ? (
              filteredRegionsSearch.slice(0, LIMIT_LOCATIONS).map((region) => {
                const { title, subtitle } = region
                return (
                  <Item
                    onClick={() => {
                      analytics?.areaInputSuccess({ source: 'quiz' })
                      onChange([...regions, region])
                      setValue('')
                      setIsShowList(false)
                    }}
                  >
                    <Title>
                      <TextHighlighter
                        text={title}
                        match={value}
                        highlight={highlightClassName}
                      />
                    </Title>
                    <SubTitle>{subtitle}</SubTitle>
                  </Item>
                )
              })
            ) : (
              <Placeholder
                title={`Nothing was found within coverage area`}
                tip={`Please try again`}
              />
            )}
          </List>
        )}
      </Container>
    )
  },
)

const Container = styled.div<{ isShowList: boolean; value: string }>`
  ${({ isShowList, value }) =>
    isShowList && value ? 'margin-bottom: 20.3rem;' : ''}
  position: relative;
`
const List = styled.ul`
  margin: 0;
  padding: 0.8rem 0;
  max-height: 20.3rem;

  position: absolute;
  top: 100%;
  left: 0;
  right: 0;

  overflow-y: auto;

  background: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08),
    0 3.78px 33.4221px rgba(0, 0, 0, 0.0503198);
  border-radius: 1.2rem;

  ${SCROLLBAR_DISPLAY_NONE_MIXIN}
`
const Item = styled.li`
  padding: 0.8rem 1.6rem;

  transition: background 225ms;

  &:hover {
    background: #f0f1f7;
  }
`
