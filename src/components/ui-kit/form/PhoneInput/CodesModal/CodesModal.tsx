import { useEffect, useMemo, useState, VFC } from 'react'
import styled from '@emotion/styled'
import {
  Controller,
  ControllerRenderProps,
  FieldValues,
  useForm,
} from 'react-hook-form'

import { LoadingState } from '@/components/shared/LoadingState'
import { useCountryCodes } from '@/components/ui-kit/form/PhoneInput/useCountryCodes'
import { FieldSearchInput } from '@/components/ui-kit/form/SearchInput'
import { ArrowIcon } from '@/images'
import { CountryCode } from '@/modules/authorization'
import { mobileMedia } from '@/styles/media'
import { SCROLLBAR_DISPLAY_NONE_MIXIN } from '@/styles/mixins'
import { getColorTheme } from '@/styles/themes'

import { CodesList } from './CodesList'

const FORM_KEY = 'countrySearch'

type Props = {
  onClick: (value: CountryCode) => void
  closeModal: () => void
}
export const CodesModal: VFC<Props> = ({ onClick, closeModal }) => {
  const { countryCodes, loading, error } = useCountryCodes()

  const sortedCountryCodes = useMemo(() => {
    return (
      countryCodes?.sort((itemA, itemB) => {
        return itemA.name.localeCompare(itemB.name)
      }) ?? []
    )
  }, [countryCodes])

  const [filteredCountryCodes, setFilteredCountryCodes] =
    useState<CountryCode[]>()

  useEffect(() => {
    setFilteredCountryCodes(sortedCountryCodes)
  }, [sortedCountryCodes])

  const { control, resetField } = useForm({
    defaultValues: {
      countrySearch: '',
    },
  })

  const onSearch = (value: string) => {
    if (value) {
      const regexp = new RegExp(value, 'i')
      const filteredItems = sortedCountryCodes?.filter((item) => {
        return item.name.match(regexp)
      })
      setFilteredCountryCodes(filteredItems)
    } else {
      setFilteredCountryCodes(sortedCountryCodes)
    }
  }

  const onReset = () => {
    resetField(FORM_KEY)
    onSearch('')
  }

  return (
    <Container>
      <Title onClick={closeModal}>
        <ArrowIcon direction={'left'} />
        <span>Country/Region</span>
      </Title>
      <ContentWrapper>
        <Controller
          name={'countrySearch'}
          control={control}
          render={(input) => (
            <FieldSearchInput
              {...input}
              field={
                input.field as unknown as ControllerRenderProps<
                  FieldValues,
                  string
                >
              }
              onChange={onSearch}
              onReset={onReset}
              placeholder={'Search country/region'}
            />
          )}
        />
        <LoadingState loading={loading} error={error}>
          <ListWrapper>
            <CodesList items={filteredCountryCodes ?? []} onClick={onClick} />
          </ListWrapper>
        </LoadingState>
      </ContentWrapper>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  max-width: min(51.6rem, calc(100% - 3.2rem));
  height: 100%;
  max-height: min(65.8rem, calc(100% - 3.2rem));

  position: relative;

  display: grid;
  grid-template-rows: auto 1fr;

  overflow: hidden;
  border-radius: 1.6rem;
  background: ${getColorTheme('earth')};

  ${mobileMedia} {
    max-width: unset;
    max-height: unset;

    gap: 1.6rem;

    border-radius: unset;
  }
`
const Title = styled.div`
  padding: 1.6rem;

  display: grid;
  gap: 1.6rem;
  grid-auto-flow: column;
  align-items: center;
  justify-content: start;

  cursor: pointer;

  font-size: 2.8rem;

  ${mobileMedia} {
    gap: 3.2rem;

    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.08);

    font-size: 1.8rem;
  }
`
const ContentWrapper = styled.div`
  padding: 0 1.6rem 0 1.6rem;

  display: grid;
  grid-template-rows: auto 1fr;
  gap: 1.6rem;

  overflow: hidden;
`
const ListWrapper = styled.div`
  width: 100%;
  height: 100%;

  overflow: auto;
  ${SCROLLBAR_DISPLAY_NONE_MIXIN};
`
