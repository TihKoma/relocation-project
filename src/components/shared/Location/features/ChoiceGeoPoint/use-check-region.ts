import { useState } from 'react'
import { useApolloClient } from '@apollo/client'

import {
  QUERY_CHECK_POINTS_FOR_QUIZ,
  QUERY_IS_POINT_INSIDE_ANY_REGION,
} from '@/modules/map/graphql/queries'

import { PointInput } from '../../../../../../__generated__/globalTypes'

export const useCheckRegionForQuiz = (
  errorMessage = 'The location is outside',
): [string, (choicePoints: PointInput[]) => Promise<boolean>] => {
  const client = useApolloClient()
  const [locationError, setLocationError] = useState('')

  const checkIsRegion = async (choicePoints: PointInput[]) => {
    if (choicePoints.length === 0) {
      return false
    }
    const {
      data: { checkPointsForQuiz },
    } = await client.query({
      query: QUERY_CHECK_POINTS_FOR_QUIZ,
      variables: {
        points: choicePoints,
      },
    })

    const errorDescription = checkPointsForQuiz?.description
    const isPointInsideAnyRegion = checkPointsForQuiz?.status || false

    if (isPointInsideAnyRegion) {
      setLocationError('')
    } else {
      errorDescription === 'points are too far away'
        ? setLocationError(
            'You can only add landmarks that are 40 miles away/Please choose another location, or edit previously added landmarks',
          )
        : setLocationError(errorMessage)
    }

    return isPointInsideAnyRegion
  }

  return [locationError, checkIsRegion]
}

export const useCheckRegion = (
  errorMessage = 'The location is outside',
): [string, (choicePoints: PointInput[]) => Promise<boolean>] => {
  const client = useApolloClient()
  const [locationError, setLocationError] = useState('')

  const checkIsRegion = async (choicePoints: PointInput[]) => {
    const { data } = await client.query({
      query: QUERY_IS_POINT_INSIDE_ANY_REGION,
      variables: {
        point: {
          long: choicePoints[0].long,
          lat: choicePoints[0].lat,
        },
      },
    })
    const isPointInsideAnyRegion = data?.isPointInsideAnyRegion?.status ?? false

    if (isPointInsideAnyRegion) {
      setLocationError('')
    } else {
      setLocationError(errorMessage)
    }

    return isPointInsideAnyRegion
  }

  return [locationError, checkIsRegion]
}
