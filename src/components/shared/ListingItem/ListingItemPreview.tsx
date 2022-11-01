import { forwardRef } from 'react'
import styled from '@emotion/styled'

import { FavoriteButton as FavoriteButtonBase } from '@/components/shared/ListingItem/FavoriteButton'
import { ListingInfo, Media } from '@/modules/listing'
import { getColorTheme } from '@/styles/themes'

import { ListingPriceBlock } from '../ListingPriceBlock'
import { ListingPropertyCharacteristicsBlock } from '../ListingPropertyCharacteristicsBlock'
import { ListingItemGallery } from './ListingItemGallery'

type Props = {
  onClick?: () => void
  className?: string
  listingInfo: Omit<ListingInfo, '__typename'>
  media: Media[] | null
  isViewed?: boolean
  isFavorite: boolean
  listingId: string
  onFavoriteButtonClick?: (newValue: boolean) => void
}

export const ListingItemPreview = forwardRef<HTMLLIElement, Props>(
  (
    {
      listingId,
      isFavorite,
      onFavoriteButtonClick,
      className,
      onClick,
      listingInfo: {
        status,
        transactionType,
        price,
        bedrooms,
        bathrooms,
        livingAreaSquareFeet,
      },
      media,
      isViewed,
    },
    ref,
  ) => {
    const isStatusShowed = status === 'Closed' || status === 'Pending'

    return (
      <Container className={className} onClick={onClick} ref={ref}>
        {isStatusShowed && (
          <ListingStatus status={status}>{status}</ListingStatus>
        )}
        <FavoriteButton
          id={listingId}
          isSelected={isFavorite}
          onClick={onFavoriteButtonClick}
        />
        {media && media.length > 0 && (
          <ListingItemGallery gallery={media} isViewed={isViewed} />
        )}
        <Content>
          <ListingPriceBlock
            transactionType={transactionType}
            price={price}
            isViewed={isViewed}
          />
          <ListingPropertyCharacteristicsBlock
            isViewed={isViewed}
            bedrooms={bedrooms}
            bathrooms={bathrooms}
            transactionType={transactionType}
            livingAreaSquareFeet={livingAreaSquareFeet}
          />
        </Content>
      </Container>
    )
  },
)

const Container = styled.li`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 1.6rem;

  border-radius: 1.2rem;
  background-color: ${getColorTheme('earth')};
`
const Content = styled.div`
  display: grid;
  row-gap: 0.8rem;

  padding: 0 1.6rem 1.6rem;
`
const FavoriteButton = styled(FavoriteButtonBase)`
  position: absolute;
  right: 1.6rem;
  top: 1.6rem;

  z-index: 2;
`
const ListingStatus = styled.div<{ status: 'Pending' | 'Closed' }>`
  position: absolute;

  top: 1.6rem;
  left: 1.6rem;
  padding: 0.2rem 0.8rem;

  z-index: 2;

  color: white;
  font-weight: 400;
  font-size: 1.2rem;
  line-height: 1.6rem;

  border-radius: 1.2rem;

  background-color: ${(props) =>
    props.status === 'Pending'
      ? getColorTheme('saturn')
      : getColorTheme('mars')};
`
