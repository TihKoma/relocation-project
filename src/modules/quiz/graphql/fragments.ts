import { gql } from '@apollo/client'

import { GeocodeFeature } from '@/modules/map'

import { StepType } from '../../../../__generated__/globalTypes'
import {
  QuizFields,
  QuizFields_steps_payload,
  QuizFields_steps_payload_QuizStepBubbles,
  QuizFields_steps_payload_QuizStepLocations,
  QuizFields_steps_payload_QuizStepMultiSelect,
  QuizFields_steps_payload_QuizStepRegionGroups,
  QuizFields_steps_payload_QuizStepSelect,
  QuizFields_steps_payload_QuizStepTabSliders,
  QuizFields_steps_result,
  QuizFields_steps_result_QuizStepResultBubbles,
  QuizFields_steps_result_QuizStepResultLocations,
  QuizFields_steps_result_QuizStepResultMultiSelect,
  QuizFields_steps_result_QuizStepResultRegionGroups,
  QuizFields_steps_result_QuizStepResultSelect,
  QuizFields_steps_result_QuizStepResultSlider,
} from './__generated__/QuizFields'

type Payloads = QuizFields_steps_payload
type Results = QuizFields_steps_result

type Step<
  Type extends StepType,
  Payload extends Payloads,
  Result extends Results,
> = {
  id: string
  type: Type
  entity:
    | 'place_type'
    | 'region_groups'
    | 'important_locations'
    | 'simple_features'
    | 'bedrooms'
    | 'price'
    | 'property_type'
  payload: Payload
  result: Result | null
}

export type StepLocations = Step<
  StepType.LOCATIONS,
  QuizFields_steps_payload_QuizStepLocations,
  Omit<QuizFields_steps_result_QuizStepResultLocations, 'features'> & {
    features: GeocodeFeature[]
  }
>
export type StepBubbles = Step<
  StepType.BUBBLES,
  QuizFields_steps_payload_QuizStepBubbles,
  QuizFields_steps_result_QuizStepResultBubbles
>
export type StepSelect = Step<
  StepType.SELECT,
  QuizFields_steps_payload_QuizStepSelect,
  QuizFields_steps_result_QuizStepResultSelect
>
export type StepMultiSelect = Step<
  StepType.MULTISELECT,
  QuizFields_steps_payload_QuizStepMultiSelect,
  QuizFields_steps_result_QuizStepResultMultiSelect
>
export type StepSlider = Step<
  StepType.TABSLIDERS,
  QuizFields_steps_payload_QuizStepTabSliders,
  QuizFields_steps_result_QuizStepResultSlider
>

export type StepRegionGroups = Step<
  StepType.REGIONGROUPS,
  QuizFields_steps_payload_QuizStepRegionGroups,
  QuizFields_steps_result_QuizStepResultRegionGroups
>

export type Steps = Array<
  | StepLocations
  | StepBubbles
  | StepSelect
  | StepMultiSelect
  | StepSlider
  | StepRegionGroups
>

export type Quiz = Omit<QuizFields, 'steps'> & { steps: Steps }
export const FRAGMENT_QUIZ_RESULT_FIELD = gql`
  fragment QuizResultField on QuizResult {
    locations {
      id
      subtitle
      neighborhood
      badges
      image
      score
      factorsScores {
        name
        image
        score
      }
      subscribed
      slug
    }
    areaExpanded
    searchAreas
  }
`

export const FRAGMENT_QUIZ_FIELDS = gql`
  ${FRAGMENT_QUIZ_RESULT_FIELD}
  fragment QuizFields on Quiz {
    state
    id
    userId
    currentStepId
    result {
      ...QuizResultField
    }
    steps {
      id
      type
      entity
      payload {
        ... on QuizStepLocations {
          title
          name
          placeholder
          images {
            desktop
            mobile
          }
        }
        ... on QuizStepBubbles {
          title
          name
          placeholder
          images {
            desktop
            mobile
          }
          bubbles {
            choiceId
            title
            image
            cantSelect
            color
            bubbles {
              choiceId
              title
              image
              cantSelect
              color
            }
          }
        }
        ... on QuizStepSelect {
          title
          subtitle
          choiceId
          name
          placeholder
          images {
            desktop
            mobile
          }
          options {
            value
            tabName
            title
            subtitle
            image
          }
        }
        ... on QuizStepMultiSelect {
          title
          choiceId
          name
          placeholder
          images {
            desktop
            mobile
          }
          options {
            tabName
            value
            title
            subtitle
            image
          }
        }
        ... on QuizStepTabSliders {
          title
          name
          placeholder
          choiceId
          images {
            desktop
            mobile
          }
          tabs {
            title
            slider {
              maxVal
              stepLen
              type
            }
          }
        }
        ... on QuizStepRegionGroups {
          title
          name
          placeholder
          images {
            desktop
            mobile
          }
        }
      }
      result {
        ... on QuizStepResultLocations {
          features
        }
        ... on QuizStepResultBubbles {
          choices
        }
        ... on QuizStepResultSelect {
          filter
          choiceId
        }
        ... on QuizStepResultMultiSelect {
          filters
          choiceId
        }
        ... on QuizStepResultSlider {
          choiceId
          type
          value
        }
        ... on QuizStepResultRegionGroups {
          regionGroups {
            id
            name
            title
            subtitle
          }
        }
      }
    }
  }
`
