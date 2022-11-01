import { css } from '@emotion/css'
import styled from '@emotion/styled'
import { FormProvider, useForm } from 'react-hook-form'

import { Button } from '@/components/ui-kit/Button'
import { DropdownButton } from '@/components/ui-kit/DropdownButton'
import { usePropertyFilter } from '@/modules/marketplace'
import { getAbbreviatedTotalCount } from '@/modules/utils'
import { mobileMedia } from '@/styles/media'

import { PricePart } from '../../../PropertyFilter/components/PricePart'

type PriceForm = {
  minPrice?: number | null
  maxPrice?: number | null
}

export const PriceFilter = () => {
  const { filter, setFilter } = usePropertyFilter()

  const { handleSubmit, reset, ...restFormMethods } = useForm<PriceForm>({
    defaultValues: { maxPrice: filter.maxPrice, minPrice: filter.minPrice },
    mode: 'onChange',
  })

  const handleFormSubmit = (closeDropdown: () => void) =>
    handleSubmit((data) => {
      setFilter({ ...filter, minPrice: data.minPrice, maxPrice: data.maxPrice })
      closeDropdown()
    })

  const minPrice = getAbbreviatedTotalCount(filter.minPrice || 0)
  const maxPrice = getAbbreviatedTotalCount(filter.maxPrice || 0)
  const title =
    filter.minPrice && filter.maxPrice
      ? `$${minPrice} - $${maxPrice}`
      : filter.minPrice
      ? `$${minPrice}+`
      : filter.maxPrice
      ? `up to $${maxPrice}`
      : 'Price'

  const isSelected = !!(filter.minPrice || filter.maxPrice)

  return (
    <DropdownButton
      title={title}
      isPopupPortal
      withArrow
      isSelected={isSelected}
    >
      {({ closeDropdown }) => {
        return (
          <FormProvider {...{ handleSubmit, reset, ...restFormMethods }}>
            <Form onSubmit={handleFormSubmit(closeDropdown)}>
              <PricePart fieldClassName={FieldStyle} />
              <SubmitButton type={'submit'} viewType={'primary'}>
                Apply
              </SubmitButton>
            </Form>
          </FormProvider>
        )
      }}
    </DropdownButton>
  )
}

const SubmitButton = styled(Button)`
  position: sticky;
  bottom: 0;
  z-index: 2;

  width: 100%;
  height: 4rem;
`
const Form = styled.form`
  position: relative;

  padding: 1rem 2.4rem 1.5rem;

  overflow-y: auto;

  ${mobileMedia} {
    height: 100%;
    overflow-x: hidden;
    padding: 1.6rem;
  }
`
const FieldStyle = css`
  width: 16rem;
`
