import { forwardRef } from 'react'
import styled from '@emotion/styled'
import { format } from 'date-fns'

import { useAnalytics } from '@/modules/analytics'
import { DetailedListing } from '@/modules/listing'
import { notDesktopMedia } from '@/styles/media'

import { PartContainer } from './PartContainer'
import { PartTitle } from './PartTitle'
import { PropertiesList } from './PropertiesList'

type Props = Pick<DetailedListing, 'associates' | 'openHouses'>

export const OpenHousesPart = forwardRef<HTMLDivElement, Props>(
  ({ associates, openHouses }, ref) => {
    const { agentName, brokerName, leadEmail, source, sourceURL } =
      associates ?? {}
    const analytics = useAnalytics()
    const hasOpenHouses = openHouses && openHouses?.length !== 0

    return (
      <PartContainer ref={ref}>
        {hasOpenHouses && <PartTitle title={'Open Houses'} />}
        <Content>
          {hasOpenHouses && (
            <PropertiesList>
              {openHouses.map(({ from, till }) => {
                const formattedFrom = format(new Date(from), 'EEEE, MMM d, h a')
                const formattedTill = format(new Date(till), 'h a')

                return (
                  <li key={from}>{`${formattedFrom} - ${formattedTill}`}</li>
                )
              })}
            </PropertiesList>
          )}
          <PropertiesList>
            {brokerName && <li>{`Listing by: ${brokerName}`}</li>}
            <li>{agentName}</li>
            {leadEmail && <li>{leadEmail}</li>}
            {source && <li>{`Source: ${source}`}</li>}
            {sourceURL && (
              <li>
                <a
                  href={sourceURL}
                  target={'_blank'}
                  onClick={() => {
                    analytics.MPDetailedListingOriginalOpen()
                  }}
                  rel={'noreferrer'}
                >
                  View original listing
                </a>
              </li>
            )}
          </PropertiesList>
        </Content>
      </PartContainer>
    )
  },
)

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: start;
  column-gap: 40px;

  ${notDesktopMedia} {
    grid-template-columns: 1fr;
    row-gap: 24px;
  }
`
