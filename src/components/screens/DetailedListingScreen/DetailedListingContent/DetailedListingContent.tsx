import { Dispatch, FC, RefObject, SetStateAction } from 'react'
import styled from '@emotion/styled'

import { Gallery as GalleryBase, Media } from '@/components/shared/Gallery'
import { useAnalytics } from '@/modules/analytics'
import { DetailedListing } from '@/modules/listing'
import { mobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

import { LocalPostsPart } from './LocalPostsPart'
import { MainInfoPart } from './MainInfoPart'
import { OpenHousesPart } from './OpenHousesPart'
import { PropertyFactsPart } from './PropertyFactsPart'
import { QuizResultPart } from './QuizResultPart'

type SummaryRefs = {
  mainInfoRef: Dispatch<SetStateAction<HTMLElement | null>>
  quizResultPartRef: Dispatch<SetStateAction<HTMLElement | null>>
  whatLocalsSayRef: Dispatch<SetStateAction<HTMLElement | null>>
  propertyFactsRef: Dispatch<SetStateAction<HTMLElement | null>>
  openHousesRef: Dispatch<SetStateAction<HTMLElement | null>>
}

type Props = {
  detailedListingInfo: DetailedListing
  galleryRef: RefObject<HTMLDivElement>
  summaryRefs: SummaryRefs
  isNavBarVisible: boolean
}

export const DetailedListingContent: FC<Props> = ({
  detailedListingInfo,
  galleryRef,
  summaryRefs,
  isNavBarVisible,
}) => {
  const analytics = useAnalytics()

  const {
    mainInfoRef,
    quizResultPartRef,
    whatLocalsSayRef,
    propertyFactsRef,
    openHousesRef,
  } = summaryRefs

  const {
    listingInfo: { status },
  } = detailedListingInfo
  const isStatusShowed = status === 'Closed' || status === 'Pending'

  return (
    <Container>
      {detailedListingInfo.media && (
        <GalleryContainer>
          {isStatusShowed && (
            <ListingStatus status={status}>{status}</ListingStatus>
          )}
          <Gallery
            isMinimizedMobile
            ref={galleryRef}
            onOpen={() => {
              analytics.MPDetailedListingImageOpened()
            }}
            gallery={detailedListingInfo.media
              .filter((media: any) => media.type !== 'VIDEO')
              .map((media: any) => {
                return {
                  type: media.type,
                  src: media.url,
                } as Media
              })}
          />
        </GalleryContainer>
      )}
      <Content>
        {detailedListingInfo.property && (
          <MainInfoPart
            ref={mainInfoRef}
            id={detailedListingInfo.id}
            internalId={detailedListingInfo.internalID}
            isFavorite={detailedListingInfo.isFavorite || false}
            listingInfo={detailedListingInfo.listingInfo}
            propertyInfo={detailedListingInfo.property}
            isNavBarVisible={isNavBarVisible}
          />
        )}
        <QuizResultPart
          ref={quizResultPartRef}
          title={detailedListingInfo.property?.neighborhood || 'Neighboorhood'}
          regionId={detailedListingInfo.regionId}
          regionSlug={detailedListingInfo.slug}
        />
        {detailedListingInfo.details && (
          <PropertyFactsPart
            ref={propertyFactsRef}
            propertyFacts={detailedListingInfo.details}
            listingInfo={detailedListingInfo.listingInfo}
          />
        )}
        <LocalPostsPart
          ref={whatLocalsSayRef}
          point={detailedListingInfo.point}
          regionId={detailedListingInfo.regionId}
          regionSlug={detailedListingInfo.slug}
        />
        <OpenHousesPart
          ref={openHousesRef}
          openHouses={detailedListingInfo?.openHouses}
          associates={detailedListingInfo?.associates}
        />
        {detailedListingInfo.disclaimer && (
          <Disclaimer>{detailedListingInfo.disclaimer}</Disclaimer>
        )}
      </Content>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  padding: 0 1.6rem 2.4rem;

  z-index: 1;

  ${mobileMedia} {
    padding: 0;
  }
`
const GalleryContainer = styled.div`
  position: relative;
`
const Gallery = styled(GalleryBase)`
  flex-shrink: 0;

  margin-bottom: 2.4rem;

  ${mobileMedia} {
    margin-bottom: -1.6rem;
  }
`
const Content = styled.div`
  display: grid;
  row-gap: 24px;

  ${mobileMedia} {
    padding: 16px 16px 96px;

    flex-grow: 1;

    z-index: 1;

    background: ${getColorTheme('earth')};
    border-radius: 1.6rem 1.6rem 0 0;
  }
`
const Disclaimer = styled.p`
  margin: 0;

  font-size: 1.2rem;
  line-height: 1.6rem;
  color: ${getColorTheme('mercury')};
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
