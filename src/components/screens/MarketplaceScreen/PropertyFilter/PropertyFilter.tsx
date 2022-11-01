import { FC } from 'react'
import {
  ListingFilterInput,
  ListingTransactionType,
} from '__generated__/globalTypes'
import styled from '@emotion/styled'
import { FormProvider, useForm } from 'react-hook-form'

import { Button } from '@/components/ui-kit/Button'
import { CrossIcon } from '@/images'
import { useAnalytics } from '@/modules/analytics'
import {
  defaultPropertyFilters,
  usePropertyFilter,
} from '@/modules/marketplace'
import { mobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

import { BathroomsPart } from './components/BathroomsPart'
import { BedroomsPart } from './components/BedroomsPart'
import { BuildingConditionPart } from './components/BuildingConditionPart'
import { BuildingTypePart } from './components/BuildingTypePart'
import { LotSizePart } from './components/LotSizePart'
import { PricePart } from './components/PricePart'
import { SquareFeetsPart } from './components/SquareFeetsPart'
import { TransactionTypePart } from './components/TransactionTypePart'
import { YearBuiltPart } from './components/YearBuiltPart'
import { omitEmptyFormValues } from './utils'

type Props = {
  onRequestClose: (value: boolean) => void
}

export const PropertyFilter: FC<Props> = ({ onRequestClose }) => {
  const { filter, setFilter } = usePropertyFilter()
  const analytics = useAnalytics()
  const { handleSubmit, reset, watch, ...restFormMethods } =
    useForm<ListingFilterInput>({
      defaultValues: filter,
      mode: 'onChange',
    })
  const handlePopupClose = () => onRequestClose(false)

  const handleFormSubmit = handleSubmit((data) => {
    const parsedFormValues = omitEmptyFormValues<ListingFilterInput>(data)
    handlePopupClose()
    setFilter(parsedFormValues)
  })

  return (
    <FormProvider {...{ handleSubmit, reset, watch, ...restFormMethods }}>
      <Form onSubmit={handleFormSubmit}>
        <div>
          <FormHeader>
            <FormHeading>Filters</FormHeading>
            <ButtonsContainer>
              <Button
                size={'small'}
                viewType={'ghost'}
                onClick={() => {
                  reset(defaultPropertyFilters)
                }}
              >
                Reset all
              </Button>
              <Button
                size={'small'}
                viewType={'ghost'}
                onClick={handlePopupClose}
                data-test-id={'marketplace-sorting-modal:close-button'}
                Icon={<CrossIcon />}
              />
            </ButtonsContainer>
          </FormHeader>
          <TransactionTypePart />
          <PricePart title={'Price'} />
          {watch('transactionType') === ListingTransactionType.FOR_SALE && (
            <BuildingConditionPart />
          )}
          <BedroomsPart />
          <BathroomsPart />
          <BuildingTypePart />
          <SquareFeetsPart />
          <LotSizePart />
          <YearBuiltPart />
          <SubmitButton
            type={'submit'}
            viewType={'primary'}
            onClick={() => {
              analytics.MPFiltersApplyClick()
            }}
          >
            Done
          </SubmitButton>
        </div>
      </Form>
    </FormProvider>
  )
}

const Form = styled.form`
  position: relative;
  height: 75vh;

  padding: 1.6rem 2.4rem 2.4rem;

  overflow-y: auto;

  ${mobileMedia} {
    height: 100%;
    overflow-x: hidden;
    padding: 1.6rem;
  }
`
const FormHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 2.4rem;
`
const FormHeading = styled.span`
  color: ${getColorTheme('sun')};
  font-size: 2.8rem;
  line-height: 3.6rem;
  letter-spacing: -0.04em;
`
const ButtonsContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  column-gap: 0.8rem;
`
const SubmitButton = styled(Button)`
  position: sticky;
  bottom: 0;
  z-index: 2;

  width: 100%;
`
