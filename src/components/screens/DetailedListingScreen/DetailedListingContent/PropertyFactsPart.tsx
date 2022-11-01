import { forwardRef, useState } from 'react'
import styled from '@emotion/styled'

import { Button } from '@/components/ui-kit/Button'
import { ListingInfo } from '@/modules/listing'
import { GetDetailedListing_getDetailedListing_details } from '@/modules/listing/graphql/__generated__/GetDetailedListing'
import { mobileMedia, notDesktopMedia, notMobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

import { PartContainer as PartContainerBase } from './PartContainer'
import { PartTitle } from './PartTitle'

type Props = {
  propertyFacts: (GetDetailedListing_getDetailedListing_details | null)[]

  listingInfo: ListingInfo
}

export const PropertyFactsPart = forwardRef<HTMLDivElement, Props>(
  ({ propertyFacts }, ref) => {
    const [isShowMore, setIsShowMore] = useState(false)

    const transformedPropertyFacts = isShowMore
      ? propertyFacts
      : propertyFacts.slice(0, 2)

    return (
      <PartContainer ref={ref}>
        <PartTitle title={'Property facts'} css={{ marginBottom: '2.4rem' }} />

        {transformedPropertyFacts.map((property) => (
          <PropertyFactContainer>
            <PropertyFactTitle> {property?.title} </PropertyFactTitle>
            <Content>
              {property?.items?.map((item) => (
                <PropertyFactItem>
                  <PropertyName>
                    {item?.value ? `${item?.key}:` : item?.key}
                  </PropertyName>
                  <PropertyValue>{item?.value}</PropertyValue>
                </PropertyFactItem>
              ))}
            </Content>
          </PropertyFactContainer>
        ))}

        {isShowMore ? (
          <ButtonSeeMore
            size={'small'}
            viewType={'secondary'}
            onClick={() => setIsShowMore(false)}
          >
            See less
          </ButtonSeeMore>
        ) : (
          <ButtonSeeMore
            size={'small'}
            viewType={'secondary'}
            onClick={() => setIsShowMore(true)}
          >
            See more
          </ButtonSeeMore>
        )}
      </PartContainer>
    )
  },
)

const PartContainer = styled(PartContainerBase)`
  row-gap: 2.4rem;
`
const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: start;
  column-gap: 4rem;

  ${notDesktopMedia} {
    grid-template-columns: 1fr;
  }
`
const PropertyName = styled.span`
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 2rem;
  letter-spacing: -0.04em;
  color: ${getColorTheme('textDefaultSecondary')};
`
const PropertyValue = styled.span`
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 2rem;
  letter-spacing: -0.04em;
  color: ${getColorTheme('textDefaultPrimary')};
`
const PropertyFactContainer = styled.div``
const PropertyFactTitle = styled.div`
  display: flex;
  width: 100%;

  padding-bottom: 0.8rem;
  margin-bottom: 0.8rem;

  font-weight: 500;

  border-bottom: 1px solid ${getColorTheme('sun50')};
`
export const PropertyFactItem = styled.ul`
  display: flex;
  justify-content: space-between;
  flex-flow: row wrap;

  margin: 0 0 0.8rem 0;
  padding: 0;

  list-style: none;
  overflow: hidden;
  transition: max-height 150ms;
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 2.4rem;
  color: ${getColorTheme('sun')};

  ${notDesktopMedia} {
    row-gap: 4px;
  }
`
const ButtonSeeMore = styled(Button)`
  ${notMobileMedia} {
    margin-right: auto;
  }
  ${mobileMedia} {
    margin-bottom: 1.8rem;
  }
`
