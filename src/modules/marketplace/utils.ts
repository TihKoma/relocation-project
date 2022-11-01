import isEmpty from 'lodash/isEmpty'
import omit from 'lodash/omit'
import pick from 'lodash/pick'

import {
  QuizFields_steps_payload_QuizStepSelect,
  QuizFields_steps_result_QuizStepResultMultiSelect,
  QuizFields_steps_result_QuizStepResultSelect,
  QuizFields_steps_result_QuizStepResultSlider,
} from '@/modules/quiz/graphql/__generated__/QuizFields'
import { Steps } from '@/modules/quiz/graphql/fragments'

import {
  ListingBathrooms,
  ListingBedrooms,
  ListingBuildingCondition,
  ListingBuildingType,
  ListingFilterInput,
  ListingTransactionType,
} from '../../../__generated__/globalTypes'

export const defaultPropertyFilters: ListingFilterInput = {
  transactionType: ListingTransactionType.FOR_SALE,
  buildingCondition: [
    ListingBuildingCondition.EXISTING,
    ListingBuildingCondition.NEW,
  ],
  bedrooms: ListingBedrooms.ROOMS_ANY,
  bathrooms: ListingBathrooms.ROOMS_ANY,
  buildingType: [
    ListingBuildingType.APARTMENTS,
    ListingBuildingType.CONDOS,
    ListingBuildingType.HOUSES,
    ListingBuildingType.MULTI_FAMILY,
    ListingBuildingType.OTHERS,
    ListingBuildingType.TOWNHOUSES,
  ],
  minPrice: null,
  maxPrice: null,
  minYearBuilt: null,
  maxYearBuilt: null,
  minSquareFeets: null,
  maxSquareFeets: null,
  minLotSize: null,
  maxLotSize: null,
}

const propertyFilterKeysWithNumericTypeValues: (keyof ListingFilterInput)[] = [
  'minPrice',
  'maxPrice',
  'minSquareFeets',
  'maxSquareFeets',
  'minYearBuilt',
  'maxYearBuilt',
  'minLotSize',
  'maxLotSize',
]

const propertyFilterKeysWithOtherTypeValues: (keyof ListingFilterInput)[] = [
  'transactionType',
  'buildingCondition',
  'bedrooms',
  'bathrooms',
  'buildingType',
]

export const mapQueryToFilters = (query: Record<string, any>) => {
  const nummericTypeValuesFilter = Object.fromEntries(
    Object.entries(pick(query, propertyFilterKeysWithNumericTypeValues))
      .filter(([_, value]) => Number(value) !== 0)
      .map(([key, value]) => [key, Number(value)]),
  )

  const otherTypeValuesFilter = pick(
    query,
    propertyFilterKeysWithOtherTypeValues,
  )

  const filter = { ...nummericTypeValuesFilter, ...otherTypeValuesFilter }

  return isEmpty(filter) ? defaultPropertyFilters : filter
}

export const mapQueryWithNewFilters = (
  filter: Partial<ListingFilterInput>,
  query: Record<string, any>,
) => {
  return {
    ...omit(query, [
      ...propertyFilterKeysWithNumericTypeValues,
      ...propertyFilterKeysWithOtherTypeValues,
    ]),
    ...Object.fromEntries(
      Object.entries(filter).filter(([_, value]) => !!value),
    ),
  }
}

const ROOMS_QUIZ_KEYS = ['Studio', '1', '2', '3', '4']
const ROOMS_FILTERS_VALUES = [
  ListingBedrooms.ROOMS_STUDIO,
  ListingBedrooms.ROOMS_1,
  ListingBedrooms.ROOMS_2,
  ListingBedrooms.ROOMS_3,
  ListingBedrooms.ROOMS_4,
]

export const mapQuizStepsToFilters = (
  steps: Steps,
): [keyof ListingFilterInput, any][] => {
  const filters: ListingFilterInput = {
    transactionType: defaultPropertyFilters.transactionType,
    bedrooms: defaultPropertyFilters.bedrooms,
    bathrooms: defaultPropertyFilters.bathrooms,
  }

  steps.forEach((step) => {
    if (!step.result) {
      return
    }

    filters.buildingCondition = [
      ListingBuildingCondition.EXISTING,
      ListingBuildingCondition.NEW,
      ListingBuildingCondition.PENDING,
    ]

    switch (step.entity) {
      case 'property_type': {
        const payload = step.result as
          | QuizFields_steps_result_QuizStepResultSelect
          | QuizFields_steps_result_QuizStepResultMultiSelect

        let values: ListingBuildingType[] = []

        if (payload?.__typename === 'QuizStepResultSelect') {
          values = getListingBuildingType(payload.filter)
        }

        if (payload?.__typename === 'QuizStepResultMultiSelect') {
          payload.filters?.forEach((filter) => {
            values = [...values, ...getListingBuildingType(filter)]
          })
        }

        filters.buildingType = values

        break
      }
      case 'bedrooms': {
        let value = ListingBedrooms.ROOMS_ANY

        const result =
          step.result as QuizFields_steps_result_QuizStepResultSelect
        const payload = step.payload as QuizFields_steps_payload_QuizStepSelect

        const userChoice = payload.options.find(
          (option) => option.value === result.filter,
        )

        if (userChoice?.title) {
          const index = ROOMS_QUIZ_KEYS.indexOf(userChoice.title)
          if (index > ROOMS_FILTERS_VALUES.length) {
            value = ListingBedrooms.ROOMS_5
          } else if (index >= 0) {
            value = ROOMS_FILTERS_VALUES[index]
          }
        }

        filters.bedrooms = value
        break
      }
      case 'price': {
        const result =
          step.result as QuizFields_steps_result_QuizStepResultSlider
        const value = result.value > 0 ? result.value : null

        filters.maxPrice = value
        filters.transactionType =
          result.type === 'BUY'
            ? ListingTransactionType.FOR_SALE
            : ListingTransactionType.FOR_RENT
        break
      }
    }
  })

  return Object.entries(filters).reduce((acc, [key, value]) => {
    if (value instanceof Array) {
      value.forEach((option) => {
        acc.push([key as keyof ListingFilterInput, option])
      })
    } else {
      acc.push([key as keyof ListingFilterInput, value])
    }

    return acc
  }, [] as [keyof ListingFilterInput, any][])
}

const getListingBuildingType = (typeId: string) => {
  let values: ListingBuildingType[] = []

  switch (typeId) {
    // Apartment, Condo, or Co-op
    case 'b4f00bd5-4308-4375-995e-6632fbeee627': {
      values = [ListingBuildingType.APARTMENTS, ListingBuildingType.CONDOS]
      break
    }
    // House or Townhouse
    case '9fdf3260-c258-49da-b558-ad4663782a3c': {
      values = [ListingBuildingType.HOUSES, ListingBuildingType.TOWNHOUSES]
      break
    }
  }

  return values
}

export const mapFiltersToQuery = (filters: ListingFilterInput) => {
  const query = Object.keys(filters)
    .map((key) => {
      const value = filters[key as keyof ListingFilterInput]
      if (value instanceof Array)
        return value.map((i) => `${key}=${i}`).join('&')
      return `${key}=${filters[key as keyof ListingFilterInput]}`
    })
    .join('&')

  return query
}
