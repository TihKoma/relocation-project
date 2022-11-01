import { FC } from 'react'
import { ListingTransactionType } from '__generated__/globalTypes'
import styled from '@emotion/styled'

import { getColorTheme } from '@/styles/themes'

type Props = {
  bedrooms: number
  bathrooms: number
  transactionType: ListingTransactionType
  livingAreaSquareFeet?: number | null
  pricePerSquareFoot?: number | null
  className?: string
  isViewed?: boolean
}

export const ListingPropertyCharacteristicsBlock: FC<Props> = ({
  bedrooms,
  bathrooms,
  transactionType,
  livingAreaSquareFeet,
  isViewed,
  pricePerSquareFoot,
  className,
}) => {
  const isForSale = transactionType === ListingTransactionType.FOR_SALE

  return (
    <PropertyCharacteristics className={className}>
      {bedrooms > 0 && (
        <RegularText isViewed={isViewed}>
          <MediumText>{bedrooms} </MediumText>
          bed
        </RegularText>
      )}
      {bathrooms > 0 && (
        <RegularText isViewed={isViewed}>
          <MediumText>{bathrooms} </MediumText>
          bath
        </RegularText>
      )}
      {Boolean(livingAreaSquareFeet) && (
        <RegularText isViewed={isViewed}>
          <MediumText>{livingAreaSquareFeet}&nbsp;</MediumText>
          sqft
        </RegularText>
      )}
      {isForSale && Boolean(pricePerSquareFoot) && (
        <RegularText isViewed={isViewed}>
          <MediumText>${pricePerSquareFoot}</MediumText>
          /sqft
        </RegularText>
      )}
    </PropertyCharacteristics>
  )
}

const PropertyCharacteristics = styled.div`
  display: grid;
  grid-auto-columns: max-content;
  grid-auto-flow: column;
  column-gap: 0.8rem;
`
const MediumText = styled.span`
  font-weight: 500;
  font-size: 1.4rem;
  line-height: 2rem;
  letter-spacing: -0.04em;
`
const RegularText = styled.span<{ isViewed?: boolean }>`
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 2rem;
  color: ${(props) =>
    props.isViewed
      ? getColorTheme('textDefaultSecondaryWrong')(props)
      : getColorTheme('sun')(props)};
`
