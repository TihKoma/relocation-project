import { forwardRef } from 'react'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'

import { useContactFormModal } from '@/components/shared/ContactFormModal/contact-form-modal-context'
import { FavoriteButton } from '@/components/shared/ListingItem/FavoriteButton'
import { ListingPriceBlock } from '@/components/shared/ListingPriceBlock'
import { ListingPropertyCharacteristicsBlock } from '@/components/shared/ListingPropertyCharacteristicsBlock'
import { ShareDropdown } from '@/components/shared/ShareDropdown'
import { Button } from '@/components/ui-kit/Button'
import { TextCollapse } from '@/components/ui-kit/TextCollapse'
import { ShareIcon } from '@/images/postActions'
import { useAnalytics } from '@/modules/analytics'
import { useIsMobileDevice } from '@/modules/device'
import { ListingInfo, ListingPropertyFacts } from '@/modules/listing'
import { mobileMedia, notDesktopMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

type Props = {
  listingInfo: ListingInfo
  propertyInfo: ListingPropertyFacts
  isNavBarVisible: boolean
  isFavorite: boolean
  id: string
  internalId: string
}

export const MainInfoPart = forwardRef<HTMLDivElement, Props>(
  (
    {
      isFavorite,
      id,
      internalId,
      listingInfo: {
        transactionType,
        price,
        address,
        bedrooms,
        bathrooms,
        livingAreaSquareFeet,
        pricePerSquareFoot,
        propertyType,
      },
      propertyInfo: { city, description },
      isNavBarVisible,
    },
    ref,
  ) => {
    const { asPath } = useRouter()
    const currentPageUrl = `${process.env.NEXT_PUBLIC_API_HOST}${asPath}`
    const analytics = useAnalytics()

    const isMobile = useIsMobileDevice()

    const { showContactFormModal } = useContactFormModal()

    return (
      <MainInfoGrid ref={ref}>
        <CustomListingPriceBlock
          withBiggerPrice
          transactionType={transactionType}
          price={price}
        />
        <ActionsBlock isVisible={!isNavBarVisible}>
          <FavoriteButton id={id} isSelected={isFavorite} />
          <ShareDropdown url={currentPageUrl} contentType={'region'}>
            <Button
              size={'small'}
              Icon={<ShareIcon />}
              viewType={isMobile ? 'secondary' : 'ghost'}
              backgroundUnderButton={isMobile ? 'map' : 'default'}
            />
          </ShareDropdown>
        </ActionsBlock>
        <AddressBlock>
          <MediumText>{address}</MediumText>
          <RegularText>{city}</RegularText>
        </AddressBlock>
        <CustomListingPropertyCharacteristicsBlock
          bedrooms={bedrooms}
          bathrooms={bathrooms}
          transactionType={transactionType}
          livingAreaSquareFeet={livingAreaSquareFeet}
          pricePerSquareFoot={pricePerSquareFoot}
        />
        <CtaButton
          size={'small'}
          onClick={() => {
            analytics.MPDetailedListingContactAgentClick()
            showContactFormModal(id, internalId, propertyType)
          }}
          isVisible={!isNavBarVisible || isMobile}
        >
          Get Connected
        </CtaButton>
        <TextCollapseDescription countRow={3}>
          {description}
        </TextCollapseDescription>
      </MainInfoGrid>
    )
  },
)

const MainInfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr max-content min-content;
  gap: 1.2rem 0.8rem;
`
const CustomListingPriceBlock = styled(ListingPriceBlock)`
  justify-content: normal;

  column-gap: 1.2rem;
  grid-column: 1 / 3;
  grid-row: 1 / 2;

  ${mobileMedia} {
    justify-content: space-between;
  }
`
const ActionsBlock = styled.div<{ isVisible: boolean }>`
  display: grid;
  grid-auto-flow: column;
  grid-column: -2 / -1;
  grid-row: 1 / 2;

  transition: 1s;
  transform: ${({ isVisible }) => (isVisible ? 'none' : 'scale(0)')};

  ${mobileMedia} {
    position: absolute;
    top: 1.6rem;
    right: 1.6rem;
    grid-column-gap: 1.6rem;
  }
`
const MediumText = styled.span`
  font-weight: 500;
  font-size: 1.6rem;
  line-height: 2.2rem;
  letter-spacing: -0.04em;
  color: ${getColorTheme('sun')};

  ${mobileMedia} {
    font-size: 1.4rem;
    line-height: 2rem;
  }
`
const RegularText = styled.span`
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 2.4rem;
  color: ${getColorTheme('textDefaultSecondary')};

  ${mobileMedia} {
    font-size: 1.4rem;
    line-height: 2rem;
  }
`
const AddressBlock = styled.div`
  display: grid;
  column-gap: 0.4rem;
  grid-column: 1 / -1;
  grid-row: 2 / 3;

  ${mobileMedia} {
    column-gap: 0.2rem;
  }
`
const CustomListingPropertyCharacteristicsBlock = styled(
  ListingPropertyCharacteristicsBlock,
)`
  column-gap: 1.2rem;
  grid-column: 1 / 2;
  grid-row: 3 / 4;

  ${notDesktopMedia} {
    grid-column: 1 / -1;
  }
`
const CtaButton = styled(Button)<{ isVisible: boolean }>`
  grid-column: -3 / -1;
  grid-row: 2 / 4;
  align-self: end;

  transition: 1s;
  transform: ${({ isVisible }) => (isVisible ? 'none' : 'scale(0)')};

  ${notDesktopMedia} {
    grid-column: 1 / -1;
    grid-row: 4 / 5;
  }
  ${mobileMedia} {
    position: absolute;
    top: max(100% - 7.2rem, 250px);
    bottom: 100%;
    left: 1.6rem;

    width: calc(100% - 2 * 1.6rem);

    z-index: 2;
  }
`
const TextCollapseDescription = styled(TextCollapse)`
  grid-column: 1 / -1;
  grid-row: 4 / 5;

  ${notDesktopMedia} {
    grid-row: 5 / 6;
  }
`
