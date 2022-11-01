import { FC } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'

import { DrillDownType, QUERY_GET_DRILL_DOWNS } from '@/modules/drilldown'
import {
  GetDrillDowns_getDrillDowns_DrillDownPublicTransportationLocation,
  GetDrillDowns_getDrillDowns_DrillDownPublicTransportationLocation_proximityPoints,
} from '@/modules/drilldown/graphql/__generated__/GetDrillDowns'
import { mobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

type ProximityPoints =
  GetDrillDowns_getDrillDowns_DrillDownPublicTransportationLocation_proximityPoints

type Props = {
  isModal?: boolean
}

export const Proximity: FC<Props> = ({ isModal }) => {
  const router = useRouter()
  const { regionSlug } = router.query

  const { data } = useQuery(QUERY_GET_DRILL_DOWNS, {
    skip: !regionSlug || typeof regionSlug !== 'string',
    variables: {
      input: {
        locationSlug: regionSlug as string,
        drillDownType: DrillDownType.PUBLIC_TRANSPORTATION,
      },
    },
    ssr: false,
  })

  const drillDowns = (data?.getDrillDowns ??
    []) as GetDrillDowns_getDrillDowns_DrillDownPublicTransportationLocation[]
  const dataOfCurrentRegion = drillDowns.find(
    (item) => item?.locationSlug === regionSlug,
  ) as GetDrillDowns_getDrillDowns_DrillDownPublicTransportationLocation

  const proximityPoints = dataOfCurrentRegion?.proximityPoints || []

  return (
    <Container
      isModal={isModal}
      proximityPointsLength={proximityPoints?.length}
    >
      {proximityPoints.length > 0
        ? ([...proximityPoints] as ProximityPoints[])
            .sort((a, b) => a.time - b.time)
            .map(({ title, address, time }, index) => {
              const timeFactor =
                index >= 2 ||
                // @ts-ignore
                (dataOfCurrentRegion?.proximityPoints.length === 2 &&
                  index === 1)
                  ? 'bad'
                  : 'good'
              return (
                <LocationInfo>
                  <AddressTime timeFactor={timeFactor}>{time}m</AddressTime>
                  <AddressTitle>{title}</AddressTitle>
                  <AddressSubtitle>{address}</AddressSubtitle>
                </LocationInfo>
              )
            })
        : null}
    </Container>
  )
}

const Container = styled.div<{
  isModal: boolean | undefined
  proximityPointsLength: number
}>`
  width: 100%;

  ${({ isModal, proximityPointsLength }) =>
    isModal || proximityPointsLength === 1
      ? `
      display: flex;
      flex-direction: column;
      gap: 1.6rem;
      `
      : `
      display: grid;
     
      gap: 1.6rem 3.2rem;
      align-items: center;
      `};

  ${({ isModal, proximityPointsLength }) =>
    !isModal && proximityPointsLength > 2
      ? `
      grid-template-rows: repeat(2, 1fr);
      grid-auto-flow: column;`
      : `
       grid-template-columns: repeat(2, 1fr);
      `}

  ${mobileMedia} {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
  }
`

const AddressTime = styled.div<{ timeFactor: 'good' | 'bad' }>`
  padding: 1rem 1.6rem;

  display: flex;
  align-items: center;
  justify-content: center;

  grid-row: 1/3;

  font-weight: 500;
  font-size: 1.6rem;
  line-height: 2.4rem;

  // TODO: add color to themes
  background: ${({ timeFactor }) =>
    timeFactor === 'good'
      ? `rgba(126, 203, 121, 0.5)`
      : `rgba(245, 134, 72, 0.5)`};
  border-radius: 1.2rem;
`

const AddressTitle = styled.div`
  font-size: 1.6rem;
  line-height: 2.4rem;

  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`

const AddressSubtitle = styled.div`
  font-size: 1.4rem;
  line-height: 2rem;

  color: ${getColorTheme('sun500')};

  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  ${mobileMedia} {
    font-size: 1.2rem;
    line-height: 1.6rem;
  }
`

const LocationInfo = styled.div`
  height: 5.6rem;

  display: grid;
  grid-template-columns: 5.6rem 1fr;
  grid-template-rows: repeat(2, 1fr);
  gap: 0.4rem 1.2rem;
`
