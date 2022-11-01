import { FC } from 'react'
import { ListingTransactionType } from '__generated__/globalTypes'
import styled from '@emotion/styled'

import { formatPrice } from '@/modules/utils/formatPrice'
import { mobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

type Props = {
  price: number
  isViewed?: boolean
  transactionType: ListingTransactionType
  className?: string
  withBiggerPrice?: boolean
}

export const ListingPriceBlock: FC<Props> = ({
  className,
  price,
  isViewed,
  transactionType,
  withBiggerPrice = false,
}) => {
  const chipText =
    transactionType === ListingTransactionType.FOR_SALE
      ? 'For sale'
      : 'For rent'

  const suffix =
    transactionType === ListingTransactionType.FOR_RENT ? '/mo' : ''

  return (
    <PriceBlock className={className}>
      <Price withBiggerPrice={withBiggerPrice} isViewed={isViewed}>
        ${formatPrice(price) + suffix}
      </Price>
      <Chip>{chipText}</Chip>
    </PriceBlock>
  )
}

const PriceBlock = styled.div`
  display: flex;
  justify-content: space-between;

  align-items: center;
  column-gap: 1.2rem;
`
const Price = styled.div<{ withBiggerPrice: boolean; isViewed?: boolean }>`
  font-weight: 500;
  letter-spacing: -0.04em;
  color: ${(props) =>
    props.isViewed
      ? getColorTheme('textDefaultSecondaryWrong')(props)
      : getColorTheme('sun')(props)};

  ${({ withBiggerPrice }) =>
    withBiggerPrice
      ? `
      font-size: 2.8rem;
      line-height: 3.6rem;

      ${mobileMedia} {
        font-size: 2.4rem;
        line-height: 3rem;
      }
      `
      : `
      font-size: 2rem;
      line-height: 2.4rem;
  `}
`
const Chip = styled.span`
  display: block;

  padding: 0.2rem 0.8rem;

  border-radius: 1rem;
  background-color: ${getColorTheme('moon')};

  font-size: 1.2rem;
  line-height: 1.6rem;
`
