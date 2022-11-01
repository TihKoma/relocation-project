import { ReactElement, useCallback, useRef, useState, VFC } from 'react'
import styled from '@emotion/styled'
import {
  ControllerRenderProps,
  FieldValues,
  UseFormReturn,
} from 'react-hook-form'
import { Controller } from 'react-hook-form'
import { useClickAway, useKey } from 'react-use'

import { Placeholder as PlaceholderBase } from '@/components/shared/Location/Placeholder'
import { Tip as TipBase } from '@/components/shared/Location/Tip'
import { Button as ButtonBase } from '@/components/ui-kit/Button'
import { FieldSearchInput } from '@/components/ui-kit/form/SearchInput'
import { mobileMedia, notMobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

import { Value } from './Location'
import { FormModel } from './types'

export const HEIGHT_FOOTER_DESKTOP = '90px'
export const HEIGHT_FOOTER_MOBILE = '154px'

type Props = {
  filterSearch?: (item: Exclude<Value, null>) => boolean
  onClose: () => void
  onSubmit?: (location: FormModel['location']) => void
  methods: UseFormReturn<FormModel, object>
  value?: FormModel['location']
  onSearch: (value: string) => void
  searchResult: Exclude<Value, null>[]
  renderSearchItem: (
    item: Value,
    closeSearchResults: () => void,
  ) => ReactElement | null
  buttonText: string
  onReset: () => void
}

export const Footer: VFC<Props> = ({
  filterSearch,
  buttonText,
  onSubmit,
  methods,
  onSearch,
  onReset,
  renderSearchItem,
  onClose,
  searchResult,
}) => {
  const { handleSubmit, formState, watch } = methods

  const footerRef = useRef(null)
  const [isShowSearchList, setIsShowSearchList] = useState(false)

  const closeSearchResult = useCallback(() => {
    setIsShowSearchList(false)
  }, [setIsShowSearchList])

  useClickAway(footerRef, () => setIsShowSearchList(false))

  const [locationValue] = watch(['location'])

  const submit = handleSubmit(({ location }) => {
    onSubmit?.(location)
    onClose()
  })

  const filteredSearchResult = filterSearch
    ? searchResult.filter((item) => filterSearch(item))
    : searchResult

  const isButtonDisabled = !formState.isDirty || !locationValue

  const onPressEnter = () => {
    if (!isButtonDisabled) {
      submit()
    }
  }
  // TODO make formSubmit natively w/o useKey
  useKey('Enter', onPressEnter)

  return (
    <Container isShowList={isShowSearchList} ref={footerRef}>
      <Controller
        name={'search'}
        render={(input) => (
          <FieldSearchInput
            {...input}
            field={input.field as ControllerRenderProps<FieldValues, string>}
            onFocus={() => {
              setIsShowSearchList(true)
              if (input.field.value.length > 0) {
                onSearch(input.field.value)
              }
            }}
            onChange={(value) => {
              if (value.length > 0) {
                onSearch(value)
              }
            }}
            onReset={onReset}
          />
        )}
      />
      <Button
        viewType={'primary'}
        disabled={isButtonDisabled}
        onClick={submit}
        isShowSearchList={isShowSearchList}
      >
        {buttonText}
      </Button>
      <Controller
        name={'location'}
        render={() => (
          <List>
            {filteredSearchResult.length === 0 ? (
              <Controller
                name={'search'}
                render={(input) =>
                  input.field.value ? (
                    <Placeholder search={input.field.value} />
                  ) : (
                    <Tip />
                  )
                }
              />
            ) : (
              filteredSearchResult.map((item) =>
                renderSearchItem(item, closeSearchResult),
              )
            )}
          </List>
        )}
      />
    </Container>
  )
}

export const SearchItem = styled.div`
  padding: 12px 16px;
  font-size: 14px;
  line-height: 22px;
  color: #aaabad;

  cursor: pointer;
  border-bottom: 1px solid #f0f1f7;

  &:hover {
    color: ${getColorTheme('pluto')};

    & > div {
      color: ${getColorTheme('pluto')};
    }
  }
`
export const SearchItemTitle = styled.div`
  margin-bottom: 4px;

  font-size: 16px;
  line-height: 26px;
  color: #2b2d33;
`

const Container = styled.div<{ isShowList: boolean }>`
  position: absolute;

  height: 90%;
  max-height: 475px;
  width: 100%;
  padding-top: 16px;

  display: grid;

  ${({ isShowList }) =>
    isShowList
      ? `transform: translateY(calc(-100% + ${HEIGHT_FOOTER_MOBILE}));`
      : 'transform: translateY(0);'}

  transition: 0.275s;

  z-index: 1000;
  background: white;

  ${notMobileMedia} {
    grid-template-columns: 1fr auto;
    grid-template-rows: auto 1fr;
    gap: 0 16px;
  }

  ${mobileMedia} {
    max-height: 330px;
    padding-left: 16px;
    padding-right: 16px;

    grid-template-columns: 1fr;
    grid-template-rows: auto auto 1fr;
    gap: 3px 0;

    top: calc(100% - ${HEIGHT_FOOTER_MOBILE});
  }

  ${notMobileMedia} {
    top: calc(100% - ${HEIGHT_FOOTER_DESKTOP});
    ${({ isShowList }) =>
      isShowList
        ? `transform: translateY(calc(-100% + ${HEIGHT_FOOTER_DESKTOP}));`
        : 'transform: translateY(0);'}
  }
`
const Placeholder = styled(PlaceholderBase)`
  margin: auto;
`
const Tip = styled(TipBase)`
  margin: auto;
`
const List = styled.div`
  height: 100%;
  overflow-y: auto;

  display: flex;
  flex-direction: column;

  ${notMobileMedia} {
    grid-column: span 2;
  }
`
const Button = styled(ButtonBase)<{ isShowSearchList: boolean }>`
  ${notMobileMedia} {
    width: 158px;
  }
  ${mobileMedia} {
    margin-bottom: 13px;

    ${(props) => (props.isShowSearchList ? 'display: none;' : '')}
  }
`
