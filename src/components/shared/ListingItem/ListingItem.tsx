import { FC, useCallback } from 'react'
import Link from 'next/link'
import styled from '@emotion/styled'

import { FavoriteButton as FavoriteButtonBase } from '@/components/shared/ListingItem/FavoriteButton'
import { Button } from '@/components/ui-kit/Button'
import { useAnalytics, useCallbackWhenChangeVisible } from '@/modules/analytics'
import { useIsMobileDevice } from '@/modules/device'
import { OverviewListing } from '@/modules/marketplace'
import { ROUTES } from '@/modules/router'
import { mobileMedia, notDesktopMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

import { useContactFormModal } from '../ContactFormModal/contact-form-modal-context'
import { ListingPriceBlock } from '../ListingPriceBlock'
import { ListingPropertyCharacteristicsBlock } from '../ListingPropertyCharacteristicsBlock'
import { ListingItemGallery } from './ListingItemGallery'

type Props = {
  className?: string
  quizId?: string
  onClick?: () => void
  onFavoriteButtonClick?: (newValue: boolean) => void
  onHover?: (id: string) => void
  onLeave?: (id: string) => void
} & Pick<
  OverviewListing,
  | 'id'
  | 'media'
  | 'listingInfo'
  | 'associates'
  | 'isViewed'
  | 'isFavorite'
  | 'regionSlug'
  | 'internalID'
>

export const ListingItem: FC<Props> = ({
  id,
  internalID,
  className,
  quizId,
  isViewed,
  isFavorite,
  associates,
  onClick,
  onFavoriteButtonClick,
  onHover,
  onLeave,
  regionSlug,
  listingInfo: {
    status,
    transactionType,
    price,
    address,
    unit,
    bedrooms,
    bathrooms,
    livingAreaSquareFeet,
    pricePerSquareFoot,
    propertyType,
  },
  media,
}) => {
  const analytics = useAnalytics()

  const MPFeedListingPreviewShown = useCallback(() => {
    analytics.MPFeedListingPreviewShown(id)
  }, [id, analytics])
  const ref = useCallbackWhenChangeVisible(MPFeedListingPreviewShown)
  const isStatusShowed = status === 'Closed' || status === 'Pending'

  const isMobile = useIsMobileDevice()
  const { showContactFormModal } = useContactFormModal()

  return (
    <div onMouseEnter={() => onHover?.(id)} onMouseLeave={() => onLeave?.(id)}>
      <Link
        href={ROUTES.detailedListing.calcUrl({
          listingId: id,
          address,
          areaSlug: regionSlug,
          unit,
          quizId,
        })}
        passHref
      >
        <Container className={className} ref={ref} onClick={onClick}>
          {media && media.length > 0 && (
            <GalleryContainer>
              {isStatusShowed && (
                <ListingStatus status={status}>{status}</ListingStatus>
              )}
              <FavoriteButton
                id={id}
                isSelected={isFavorite}
                onClick={onFavoriteButtonClick}
              />
              <ListingItemGallery gallery={media} isViewed={isViewed} />
            </GalleryContainer>
          )}
          <Content>
            <ListingPriceBlock
              isViewed={isViewed}
              transactionType={transactionType}
              price={price}
            />
            <MediumText isViewed={isViewed}>{address}</MediumText>
            <ListingPropertyCharacteristicsBlock
              bedrooms={bedrooms}
              isViewed={isViewed}
              bathrooms={bathrooms}
              transactionType={transactionType}
              livingAreaSquareFeet={livingAreaSquareFeet}
              pricePerSquareFoot={pricePerSquareFoot}
            />
            <FooterContainer>
              {associates && (
                <ListingAuthor isViewed={isViewed}>
                  Listing by: {associates.brokerName}
                </ListingAuthor>
              )}
              <CtaButton
                viewType={isMobile ? 'primary' : 'tertiary'}
                fullWidth={isMobile}
                size={isMobile ? 'small' : 'small'}
                onClick={(e) => {
                  e.preventDefault()
                  analytics.MPListingPreviewContactAgentClick(id)
                  showContactFormModal(id, internalID, propertyType)
                }}
              >
                Contact Agent
              </CtaButton>
            </FooterContainer>
          </Content>
        </Container>
      </Link>
    </div>
  )
}

const Container = styled.a`
  position: relative;

  display: grid;
  grid-template-columns: minmax(0, 45fr) 55fr;

  border-radius: 1.2rem;
  background-color: ${getColorTheme('earth')};

  cursor: pointer;

  ${notDesktopMedia} {
    grid-template-columns: minmax(0, 1fr);
  }
`
const Content = styled.div`
  padding: 1.6rem;

  display: grid;
  row-gap: 0.4rem;

  text-align: start;
`
const MediumText = styled.span<{ isViewed?: boolean }>`
  font-weight: 500;
  font-size: 1.4rem;
  line-height: 2rem;
  letter-spacing: -0.04em;
  color: ${(props) =>
    props.isViewed
      ? getColorTheme('textDefaultSecondaryWrong')(props)
      : getColorTheme('sun')(props)};
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
const ListingAuthor = styled(RegularText)`
  display: flex;
  align-self: center;
  padding-right: 0.5rem;

  color: ${getColorTheme('textDefaultSecondary')};

  ${mobileMedia} {
    align-self: start;
    margin-bottom: 1.2rem;
  }
`
const FavoriteButton = styled(FavoriteButtonBase)`
  position: absolute;
  right: 1.6rem;
  top: 1.6rem;

  z-index: 2;
`
const GalleryContainer = styled.div`
  position: relative;
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
const CtaButton = styled(Button)``
const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;

  ${mobileMedia} {
    flex-direction: column;
  }
`
