import { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'
import capitalize from 'lodash/capitalize'

import { TitleWithTooltip as TitleWithTooltipBase } from '@/components/screens/where/Area/drillDown/TitleWithTooltip'
import { ScoresComponent } from '@/components/shared/where/Scores'
import { GetDrillDownMedianPrice_getDrillDownMedianPrice_data } from '@/modules/drilldown/graphql/__generated__/GetDrillDownMedianPrice'
import { QUERY_GET_DRILL_DOWN_MEDIAN_PRICE } from '@/modules/drilldown/graphql/queries'
import { headerChangeMediaSecond } from '@/styles/media'

import {
  HousingPropertyType,
  HousingRooms,
  HousingTransactionType,
} from '../../../../../../../../__generated__/globalTypes'
import { ChartContainer } from '../../styles'
import { Filter } from './Filter'

type DataForScores = {
  id: string
  name: string
  value: number
  color: string
}

export type PropertyType = {
  index: HousingPropertyType
  label: HousingPropertyType[keyof HousingPropertyType]
  isActive: boolean
}
export type RoomsType = {
  index: HousingRooms
  label: HousingRooms[keyof HousingRooms]
  isActive: boolean
}
export type TransactionType = {
  index: HousingTransactionType
  label: HousingTransactionType[keyof HousingTransactionType]
  isActive: boolean
}

export const MedianPriceScoresWithSelectors: FC = () => {
  const router = useRouter()
  const { regionSlug } = router.query

  const [propertyType, setPropertyType] = useState<PropertyType | null>(null)
  const [roomsType, setRoomsType] = useState<RoomsType | null>(null)
  const [transactionType, setTransactionType] =
    useState<TransactionType | null>(null)

  const [propertyTypeOptions, setPropertyTypeOptions] = useState<
    PropertyType[] | null
  >()
  const [roomsCountOptions, setRoomsCountOptions] = useState<
    RoomsType[] | null
  >()
  const [transactionTypeOptions, setTransactionTypeOptions] = useState<
    TransactionType[] | null
  >(null)

  const [dataForScores, setDataForScores] = useState<DataForScores[]>([])

  const { data } = useQuery(QUERY_GET_DRILL_DOWN_MEDIAN_PRICE, {
    variables: {
      input: {
        locationSlug: typeof regionSlug === 'string' ? regionSlug : '',
        propertyType: propertyType?.index,
        roomsType: roomsType?.index,
        transactionType: transactionType?.index,
      },
    },
  })

  useEffect(() => {
    const propertyData = data?.getDrillDownMedianPrice.filters?.propertyType
    const requestedProperty = propertyData?.find((item) => item.inRequest)

    if (requestedProperty) {
      setPropertyType({
        index: requestedProperty.type,
        label: capitalize(requestedProperty.name),
        isActive: requestedProperty.isActive,
      })
    }
    if (propertyData) {
      setPropertyTypeOptions(
        propertyData.map((item) => {
          return {
            index: item.type,
            label: capitalize(item.name),
            isActive: item.isActive,
          }
        }),
      )
    }

    const roomsData = data?.getDrillDownMedianPrice.filters?.rooms
    const requestedRooms = roomsData?.find((item) => item.inRequest)
    if (requestedRooms) {
      setRoomsType({
        index: requestedRooms.type,
        label: capitalize(requestedRooms.name),
        isActive: requestedRooms.isActive,
      })
    }
    if (roomsData) {
      setRoomsCountOptions(
        roomsData
          .map((item) => {
            return {
              index: item.type,
              label: capitalize(item.name),
              isActive: item.isActive,
            }
          })
          .sort((a, b) => a.label.localeCompare(b.label)),
      )
    }

    const transactionData = data?.getDrillDownMedianPrice.filters?.tradeType
    const requestedTransaction = transactionData?.find((item) => item.inRequest)
    if (requestedTransaction) {
      setTransactionType({
        index: requestedTransaction.type,
        label: capitalize(requestedTransaction.name),
        isActive: requestedTransaction.isActive,
      })
    }
    if (transactionData) {
      setTransactionTypeOptions(
        transactionData.map((item) => {
          return {
            index: item.type,
            label: capitalize(item.name),
            isActive: item.isActive,
          }
        }),
      )
    }
  }, [data])

  useEffect(() => {
    if (data?.getDrillDownMedianPrice?.data?.length) {
      const newScoresData = transformDataForScores(
        data?.getDrillDownMedianPrice.data?.filter(
          (data) => data,
        ) as GetDrillDownMedianPrice_getDrillDownMedianPrice_data[],
        typeof regionSlug === 'string' ? regionSlug : '',
      )
      setDataForScores(newScoresData)
    }
  }, [data, regionSlug])

  return (
    <Container>
      <Header>
        <TitleWithTooltip
          title={'Median price'}
          tooltipText={
            'Median price in the area based on available listings. Use the controls to change the property parameters.'
          }
        />
        {propertyType && roomsType && transactionType && (
          <FiltersWrapper>
            {transactionTypeOptions && (
              <Filter
                selectedOption={transactionType}
                onSelect={(option) =>
                  setTransactionType(
                    option as {
                      label: HousingTransactionType[keyof HousingTransactionType]
                      index: HousingTransactionType
                      isActive: boolean
                    },
                  )
                }
                options={transactionTypeOptions}
              />
            )}
            {propertyTypeOptions && (
              <Filter
                selectedOption={propertyType}
                onSelect={(option) =>
                  setPropertyType(
                    option as {
                      label: string
                      index: HousingPropertyType
                      isActive: boolean
                    },
                  )
                }
                options={propertyTypeOptions}
              />
            )}
            {roomsCountOptions && (
              <Filter
                selectedOption={roomsType}
                onSelect={(option) =>
                  setRoomsType(
                    option as {
                      label: string
                      index: HousingRooms
                      isActive: boolean
                    },
                  )
                }
                options={roomsCountOptions}
              />
            )}
          </FiltersWrapper>
        )}
      </Header>
      {dataForScores.length ? (
        <ScoresComponent scores={dataForScores} type={'price'} />
      ) : null}
    </Container>
  )
}

const transformDataForScores = (
  data: GetDrillDownMedianPrice_getDrillDownMedianPrice_data[],
  currentLocationSlug: string,
): DataForScores[] => {
  return data.map((item) => {
    const isCurrentRegion = item.locationSlug === currentLocationSlug
    return {
      id: item.locationId,
      name: item.locationName,
      value: item.MedianPrice,
      color: isCurrentRegion ? '#B59AF8' : '#E2E5EC',
    }
  })
}
const Container = styled(ChartContainer)`
  justify-items: unset;
  gap: 2rem;
`
const Header = styled.div`
  width: 100%;

  display: grid;
  grid-auto-flow: row;
  justify-items: start;
  gap: 0.8rem;

  ${headerChangeMediaSecond} {
    display: flex;
    justify-content: space-between;
  }

  overflow: hidden;
`
const FiltersWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
`
const TitleWithTooltip = styled(TitleWithTooltipBase)`
  font-size: 1.8rem;
`
