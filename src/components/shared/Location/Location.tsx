import { forwardRef, ReactElement, useImperativeHandle, useState } from 'react'
import styled from '@emotion/styled'
import {
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  FormProvider,
  useForm,
  UseFormStateReturn,
} from 'react-hook-form'

import { ModalController } from '@/components/ui-kit/Modal'
import { mobileMedia, notMobileMedia } from '@/styles/media'

import { Footer, HEIGHT_FOOTER_DESKTOP, HEIGHT_FOOTER_MOBILE } from './Footer'
import { Header } from './Header'
import { CommonLocationFeatureProps, FormModel } from './types'

export type Value = FormModel['location']
type Props = {
  onSubmit?: (location: Value) => void
  onBlur?: () => void
  value?: Value
  onSearch: (value: string) => void
  description?: string | null
  buttonText: string
  onReset?: () => void
  renderMap: (input: {
    field: ControllerRenderProps<FieldValues, 'location'>
    fieldState: ControllerFieldState
    formState: UseFormStateReturn<FieldValues>
  }) => ReactElement
  renderSearchItem: (
    item: Value,
    closeSearchResults: () => void,
  ) => ReactElement | null
} & Pick<ModalController, 'onRequestClose'> &
  CommonLocationFeatureProps

export type LocationRef = {
  setPlacesSearch: (values: Exclude<Value, null>[]) => void
  setValue(
    name: 'location',
    value: FormModel['location'],
    options: Record<string, any>,
  ): void
  setValue(
    name: 'search',
    value: FormModel['search'],
    options: Record<string, any>,
  ): void
}

export const Location = forwardRef<LocationRef, Props>(
  (
    {
      onRequestClose,
      onBack,
      onReset,
      onSearch,
      title,
      renderSearchItem,
      onSubmit,
      buttonText,
      value,
      withCloseButton,
      description,
      filterSearch,
      error,
      renderMap,
    },
    ref,
  ) => {
    const methods = useForm<FormModel>({
      defaultValues: {
        search: value?.properties.fullAddress ?? '',
        location: value,
      },
    })

    const [searchResult, setPlacesSearch] = useState<Exclude<Value, null>[]>([])

    const { setValue } = methods

    useImperativeHandle(
      ref,
      () => ({
        setValue,
        setPlacesSearch,
      }),
      [setValue, setPlacesSearch],
    )

    const onClose = () => {
      onRequestClose(false)
    }

    const onResetFields = () => {
      setValue('search', '', { shouldDirty: false })
      setValue('location', null, { shouldDirty: false })
      setPlacesSearch([])
      onReset?.()
    }

    return (
      <FormProvider {...methods}>
        <Header
          onClose={onClose}
          withCloseButton={withCloseButton}
          description={description}
          onBack={onBack}
          title={title}
        />
        <Form>
          {error && (
            <>
              {error.split('/').length === 1 ? (
                <Error>{error}</Error>
              ) : (
                <Error>
                  {error.split('/')[0]}
                  <ErrorSubtitle>{error.split('/')[1]}</ErrorSubtitle>
                </Error>
              )}
            </>
          )}
          <Controller name={'location'} render={renderMap} />
          <PlugFooter />
          <Footer
            onReset={onResetFields}
            buttonText={buttonText}
            filterSearch={filterSearch}
            onSearch={onSearch}
            onClose={onClose}
            searchResult={searchResult}
            renderSearchItem={renderSearchItem}
            onSubmit={onSubmit}
            methods={methods}
          />
        </Form>
      </FormProvider>
    )
  },
)

const Form = styled.form`
  margin-bottom: -24px;

  position: relative;
  overflow: hidden;

  ${mobileMedia} {
    margin: 0 -16px -16px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
`
const PlugFooter = styled.div`
  ${mobileMedia} {
    height: ${HEIGHT_FOOTER_MOBILE};
  }

  ${notMobileMedia} {
    height: ${HEIGHT_FOOTER_DESKTOP};
  }
`
const Error = styled.div`
  padding: 16px 5px;

  position: absolute;
  top: 0;
  left: 0;
  right: 0;

  z-index: 10;

  background: #f24852;
  border-radius: 16px;

  text-align: center;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: -0.04em;
  color: #ffffff;
`

const ErrorSubtitle = styled.div`
  margin-bottom: 0.4rem;

  font-size: 1.4rem;
  line-height: 2rem;
`
