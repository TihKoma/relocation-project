import { FC, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import isEqual from 'lodash/isEqual'
import { UseControllerReturn } from 'react-hook-form/dist/types/controller'

import {
  createFeatureCollection,
  mapFeatureCollection,
} from '@/components/shared/Quiz/Landmark/Addresses/Dropdown/Base'
import { QuizFields_steps_result_QuizStepResultLocations } from '@/modules/quiz/graphql/__generated__/QuizFields'
import { getColorTheme } from '@/styles/themes'

import { PointInput } from '../../../../../../__generated__/globalTypes'
import { Dropdown, Value } from './Dropdown'
import { SelectedAddresses } from './SelectedAddresses'

type Props = {
  value?: Value | Value['features'] // TODO fix types in normal way. We have different input in edit and create quiz
  onChange: (value: Value) => void
  stepResult: QuizFields_steps_result_QuizStepResultLocations | null
}
const Addresses: FC<Props> = ({ value, onChange, stepResult }) => {
  const currentValue: Value | undefined = (value as Value)?.features
    ? (value as Value)
    : createFeatureCollection(value as Value['features'])
  const [choicePoints, setChoicePoints] = useState<Array<PointInput>>([])

  useEffect(() => {
    if (stepResult !== null) {
      const stepResultChoicePoints = stepResult.features.map(
        ({ geometry: { coordinates } }) => {
          const [long, lat] = coordinates
          return { long, lat }
        },
      )
      setChoicePoints(stepResultChoicePoints)
    }
  }, [stepResult])

  return (
    <>
      {currentValue && (
        <SelectedAddresses
          addresses={currentValue}
          removeAddresses={(address) => {
            const [long, lat] = address.geometry.coordinates
            setChoicePoints(
              [...choicePoints].filter(
                (point) => !isEqual(point, { long, lat }),
              ),
            )
            onChange(
              mapFeatureCollection((features) =>
                features.filter(({ id }) => id !== address.id),
              )(currentValue),
            )
          }}
        />
      )}
      {currentValue?.features &&
      currentValue.features?.length > limitAddresses ? (
        <Warning>
          Up to four different locations are currently supported
        </Warning>
      ) : (
        <Dropdown
          value={currentValue}
          onChange={onChange}
          choicePoints={choicePoints}
          setChoicePoints={setChoicePoints}
        />
      )}
    </>
  )
}
const limitAddresses = 4

const Warning = styled.div`
  font-size: 1.4rem;
  line-height: 2rem;
  color: ${getColorTheme('saturn')};
`

export const FieldAddresses: FC<
  UseControllerReturn & Omit<Props, 'value' | 'onChange'>
> = ({
  field: {
    // for remove warning about component without forwardRef
    ref: _,
    ...field
  },
  ...props
}) => {
  return <Addresses {...field} {...props} />
}
