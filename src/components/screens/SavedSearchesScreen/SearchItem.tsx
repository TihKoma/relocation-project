import { FC, useMemo, useState } from 'react'
import Link from 'next/link'
import { ApolloQueryResult, useMutation } from '@apollo/client'
import styled from '@emotion/styled'
import { toLower, upperFirst } from 'lodash'

import { Button as ButtonBase } from '@/components/ui-kit/Button'
import { Switch } from '@/components/ui-kit/Switch/Switch'
import { ReactComponent as DeleteIconBase } from '@/images/delete-icon.svg'
import { useIsMobileDevice } from '@/modules/device'
import {
  SavedListingsSearches,
  SavedListingsSearches_savedListingsSearches,
  SavedListingsSearches_savedListingsSearches_query,
} from '@/modules/listing/graphql/__generated__/SavedListingsSearches'
import {
  DELETE_LISTINGS_SAVED_SEARCH,
  UPDATE_SAVED_LISTINGS_SEARCH_NOTIFICATION_SETTINGS,
} from '@/modules/listing/graphql/mutations'
import { QUERY_SAVED_LISTINGS_SEARCHES } from '@/modules/listing/graphql/queries'
import { ROUTES } from '@/modules/router'
import { formatTime } from '@/modules/utils/text/format-time'
import { desktopMedia, mobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

import { DeletionAlert } from './DeletionAlert'
import { EnterContactsModal } from './EnterContacts/EnterContactsModal'

const MONTH_NAMES = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

type Props = {
  hasEmail: boolean
  searchData: SavedListingsSearches_savedListingsSearches

  refetchSavedSearches?: (
    variables?:
      | Partial<{
          [key: string]: any
        }>
      | undefined,
  ) => Promise<ApolloQueryResult<SavedListingsSearches>>
}

export const SearchItem: FC<Props> = ({
  hasEmail,
  searchData,
  refetchSavedSearches,
}) => {
  const isMobile = useIsMobileDevice()
  const [isDeletionAlertVisible, setIsDeletionAlertVisible] = useState(false)
  const [isEmailModalVisible, setIsEmailModalVisible] = useState(false)

  const [deleteSearch] = useMutation(DELETE_LISTINGS_SAVED_SEARCH, {
    refetchQueries: [QUERY_SAVED_LISTINGS_SEARCHES],
  })

  const [changeNotificationSettings] = useMutation(
    UPDATE_SAVED_LISTINGS_SEARCH_NOTIFICATION_SETTINGS,
    {
      refetchQueries: [QUERY_SAVED_LISTINGS_SEARCHES],
    },
  )

  const {
    id,
    createdAt,
    regionName,
    query: { __typename, regionSlug, ...query },
    notificationSettings: { sendEmailNotification },
  } = searchData

  const transformedDate = useMemo(() => {
    const date = new Date(createdAt)
    return getTransformedDate(date)
  }, [createdAt])

  const searchParams = useMemo(() => getTransformedSearchParams(query), [query])

  const filters = useMemo(() => getTransformedFilters(query), [query]) // url params

  const onNotificationChange = async (value: boolean) => {
    await changeNotificationSettings({
      variables: { id, settings: { sendEmailNotification: value } },
    })

    refetchSavedSearches?.()
  }

  const onClickNotificationChange = (value: boolean) => {
    if (!hasEmail) {
      setIsEmailModalVisible(true)
      return false
    } else onNotificationChange(value)
  }

  return (
    <>
      {isEmailModalVisible && (
        <EnterContactsModal
          defaultScreen={'email-enter'}
          onSuccessConfirmEmail={() => onNotificationChange(true)}
          onRequestClose={() => {
            setIsEmailModalVisible(false)
          }}
        />
      )}

      <Container>
        <DeletionAlert
          isVisible={isDeletionAlertVisible}
          onRequestClose={setIsDeletionAlertVisible}
          onDeleteClick={async () => {
            await deleteSearch({ variables: { id } })
            setIsDeletionAlertVisible(false)
          }}
        />

        <SearchDate> {transformedDate} </SearchDate>

        <DeleteIcon
          isVisible={isMobile}
          onClick={() => setIsDeletionAlertVisible(true)}
        />
        <Break />

        <Content>
          <AboutSearch>
            <AreaTitle> {regionName} </AreaTitle>
            <Filters>{searchParams}</Filters>
          </AboutSearch>

          <NotificationsContainer>
            <Description>
              <NotificationsTitle>Email notifications</NotificationsTitle>
              <NotificationsSubTitle>
                We will send new listings once a day
              </NotificationsSubTitle>
            </Description>
            <Switch
              defaultValue={sendEmailNotification}
              onChange={onClickNotificationChange}
              size={'small'}
            />
          </NotificationsContainer>

          {regionSlug && (
            <Link
              href={ROUTES.areaRealEstate.calcUrl({
                regionSlug: regionSlug,
                filters,
              })}
            >
              <Button viewType={'primary'} size={'medium'}>
                View Listings
              </Button>
            </Link>
          )}

          <DeleteIcon
            isVisible={!isMobile}
            onClick={() => setIsDeletionAlertVisible(true)}
          />
        </Content>
      </Container>
    </>
  )
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;

  width: 100%;

  margin-bottom: 1.8rem;
  padding: 1.6rem;

  border: 1px solid ${getColorTheme('sun200')};
  border-radius: 1.6rem;
  transition-duration: 0.3s;

  &:hover {
    box-shadow: 0 2px 4px rgb(18 21 31 / 8%), 0 4px 16px 1px rgb(18 21 31 / 8%);
  }
`
const SearchDate = styled.div`
  display: block;
  align-self: center;

  padding: 0.2rem 0.8rem;
  margin-bottom: 2rem;

  background-color: ${getColorTheme('sun200')};
  border-radius: 2.4rem;

  font-weight: 500;
  font-size: 1.2rem;
  line-height: 1.6rem;
  color: ${getColorTheme('sun1000')};

  &::after {
    content: '';
    width: 100%;
  }
`
const Break = styled.div`
  ${desktopMedia} {
    width: 100%;
  }
`
const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;

  ${mobileMedia} {
    flex-direction: column;
  }
`
const AboutSearch = styled.div`
  display: flex;
  flex-direction: column;

  margin-bottom: 1.6rem;

  ${mobileMedia} {
    width: 100%;
    order: 1;
  }
`
const AreaTitle = styled.div`
  margin-bottom: 0.8rem;

  font-weight: 500;
  font-size: 2rem;
  line-height: 2.4rem;
  color: ${getColorTheme('sun1000')};
`
const Filters = styled.div`
  display: flex;
  flex-wrap: wrap;

  font-weight: 400;
  font-size: 1.4rem;
  line-height: 2rem;
  color: ${getColorTheme('sun1000')};

  ${mobileMedia} {
    flex-wrap: wrap;
  }
`
const SeparatingPoint = styled.div`
  display: flex;
  align-self: center;

  height: 0.4rem;
  width: 0.4rem;
  margin: 0 0.6rem;

  background-color: ${getColorTheme('sun')};
  border-radius: 50%;
`
const NotificationsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-right: 2.4rem;
  margin-left: auto;

  ${mobileMedia} {
    width: 100%;

    margin: 0;
    padding-top: 1.6rem;

    justify-content: space-between;
    order: 3;

    border-top: 1px solid ${getColorTheme('sun200')};
  }
`
const Description = styled.div`
  margin-right: 1.6rem;
`
const NotificationsTitle = styled.div`
  display: flex;
  justify-content: right;

  font-weight: 400;
  font-size: 1.6rem;
  line-height: 2.4rem;
  color: ${getColorTheme('sun1000')};

  ${mobileMedia} {
    justify-content: left;
  }
`
const NotificationsSubTitle = styled.div`
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 2rem;
  white-space: nowrap;
  color: ${getColorTheme('sun1000')};

  ${mobileMedia} {
    justify-content: left;
  }
`
const Button = styled(ButtonBase)`
  display: flex;
  margin-right: 2.4rem;

  ${mobileMedia} {
    width: 100%;

    margin-right: 0;
    margin-bottom: 1.6rem;

    order: 2;
  }
`
const DeleteIcon = styled(DeleteIconBase)<{ isVisible: boolean }>`
  display: ${({ isVisible }) => (isVisible ? 'flex' : 'none')};
  align-self: center;

  min-width: 2.4rem;

  order: 0;
  cursor: pointer;

  ${desktopMedia} {
    margin-right: 0.8rem;
  }

  ${mobileMedia} {
    margin-left: auto;
    margin-bottom: 2rem;
  }
`

type Query = Omit<
  SavedListingsSearches_savedListingsSearches_query,
  '__typename' | 'regionSlug'
>
const getTransformedSearchParams = ({
  minPrice,
  maxPrice,
  minLotSize,
  maxLotSize,
  minYearBuilt,
  maxYearBuilt,
  minSquareFeets,
  maxSquareFeets,
  bathrooms,
  bedrooms,
  ...query
}: Query) => {
  const bath = bathrooms.split('_')[1]
  const bed = bedrooms.split('_')[1]

  const ranges = {
    bathrooms: bath !== 'ANY' ? `${bath}+ bath` : `${bath} bath`,
    bedrooms: bed !== 'ANY' ? `${bed}+ bed` : `${bed} bed`,
    price: getRangeString(
      '',
      minPrice ? `$${minPrice}` : '',
      maxPrice ? `$${maxPrice}` : '',
    ),
    lotSize: getRangeString('Lot size', minLotSize, maxLotSize),
    yearBuilt: getRangeString('Year built', minYearBuilt, maxYearBuilt),
    squareFeets: getRangeString('Square feets', minSquareFeets, maxSquareFeets),
  }

  return Object.values({ ...ranges, ...query })
    .filter((el) => el !== null && typeof el !== 'number')
    .map((value, i, array) => {
      if (!value) return

      let item = value
      if (Array.isArray(value))
        item = value.map((i) => toUpperFirst(i)).join(', ')

      if (typeof value === 'string')
        item = toUpperFirst(value.replace('_', ' '))

      if (i === array.length - 1) return item

      return (
        <>
          {item} <SeparatingPoint />
        </>
      )
    })
}

const getRangeString = (
  name: string,
  min: number | string | null,
  max: number | string | null,
) => {
  if (!min && !max) return null

  const range =
    min && max ? `${min} - ${max}` : min ? `${min}+` : `Up to ${max}`
  return `${name} ${range}`
}

const toUpperFirst = (value: string) => {
  return upperFirst(toLower(value))
}

const getTransformedDate = (date: Date) => {
  const currentDay = new Date().getDate()
  const currentYear = new Date().getUTCFullYear()

  if (currentDay === date.getDate()) return 'Today at ' + formatTime(date)

  const year = currentYear !== date.getFullYear() ? date.getFullYear() : ''
  return date.getDate() + ' ' + MONTH_NAMES[date.getUTCMonth()] + ' ' + year
}

const getTransformedFilters = (
  query: Omit<
    SavedListingsSearches_savedListingsSearches_query,
    '__typename' | 'regionSlug'
  >,
) => {
  return `?${Object.keys(query)
    .filter((key) => query[key as keyof typeof query] !== null)
    .map((key) => {
      const value = query[key as keyof typeof query]
      if (Array.isArray(value)) return value.map((v) => `${key}=${v}`).join('&')
      else return `${key}=${value}`
    })
    .join('&')}`
}
