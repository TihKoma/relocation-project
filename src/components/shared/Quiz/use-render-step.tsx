import { useEffect } from 'react'
import { useApolloClient } from '@apollo/client'
import isEqual from 'lodash/isEqual'

import { ChooseWay } from '@/components/shared/Quiz/ChooseWay'
import { Landmark } from '@/components/shared/Quiz/Landmark'
import { useAnalytics } from '@/modules/analytics'
import {
  MUTATION_UPDATE_BUBBLES,
  MUTATION_UPDATE_LOCATIONS,
  MUTATION_UPDATE_MULTI_SELECT,
  MUTATION_UPDATE_REGIONGROUPS,
  MUTATION_UPDATE_SELECT,
  MUTATION_UPDATE_SLIDER,
  Quiz,
  Quiz as QuizType,
  QuizStepSliderType,
  StepType,
} from '@/modules/quiz'

import { QuizRegionGroupInput } from '../../../../__generated__/globalTypes'
import { Bubbles } from './Bubbles'
import { DesiredLocationForm } from './DesiredLocation'
import { Price } from './Price'
import { MultiSelect, Select } from './Select'

export const useRenderStep = ({
  quiz,
  currentStep,
  historySteps,
}: {
  quiz?: QuizType | null
  currentStep: number
  historySteps: Array<string>
}) => {
  const client = useApolloClient()

  const step = quiz?.steps.find((step) => step.id === historySteps[currentStep])

  const analytics = useAnalytics()

  useEffect(() => {
    if (step?.entity && quiz?.id) {
      let stepName:
        | Quiz['steps'][number]['entity']
        | 'flexibility'
        | 'search_area'
      if (step.entity === 'place_type') {
        stepName = 'flexibility'
      } else if (step.entity === 'region_groups') {
        stepName = 'search_area'
      } else {
        stepName = step.entity
      }
      analytics?.quizStepStart({ quizId: quiz.id, stepName })
    }
  }, [step?.entity, quiz?.id, analytics])

  if (!step || !quiz) {
    return null
  }

  const submitStep = (step: QuizType['steps'][number]) => {
    switch (step.type) {
      case StepType.BUBBLES:
        return async (values: Record<string, unknown>) => {
          const choices = values[step.id] || []
          if (
            Array.isArray(choices) &&
            !isEqual(choices, step.result?.choices)
          ) {
            return client.mutate({
              mutation: MUTATION_UPDATE_BUBBLES,
              variables: {
                id: quiz.id,
                stepId: step.id,
                input:
                  choices.length === 0
                    ? null
                    : {
                        choices,
                      },
              },
            })
          } else {
            // eslint-disable-next-line no-console
            console.error('bubbles not array')
          }
        }
      case StepType.SELECT:
        return async (values: Record<string, unknown>) => {
          const filter = values[step.id] || null
          if (filter !== undefined) {
            return client.mutate({
              mutation: MUTATION_UPDATE_SELECT,
              variables: {
                id: quiz.id,
                stepId: step.id,
                // @ts-ignore
                input:
                  filter === null
                    ? null
                    : {
                        choiceId: step.payload.choiceId,
                        filter,
                      },
              },
            })
          }
          // eslint-disable-next-line no-console
          console.error('filter not string')
        }
      case StepType.MULTISELECT:
        return async (values: Record<string, unknown>) => {
          const filters = values[step.id] || []
          if (
            Array.isArray(filters) &&
            !isEqual(filters, step.result?.filters)
          ) {
            return client.mutate({
              mutation: MUTATION_UPDATE_MULTI_SELECT,
              variables: {
                id: quiz.id,
                stepId: step.id,
                input:
                  filters.length === 0
                    ? null
                    : {
                        choiceId: step.payload.choiceId,
                        filters,
                      },
              },
            })
          } else {
            // eslint-disable-next-line no-console
            console.error('filter not array')
          }
        }
      case StepType.LOCATIONS:
        return async (values: Record<string, any>) => {
          const features = values[step.id]?.features || []
          if (
            !Array.isArray(features) ||
            isEqual(features, step.result?.features)
          ) {
            return
          }
          return client.mutate({
            mutation: MUTATION_UPDATE_LOCATIONS,
            variables: {
              id: quiz.id,
              stepId: step.id,
              input:
                features.length === 0
                  ? null
                  : {
                      features,
                    },
            },
          })
        }
      case StepType.TABSLIDERS:
        return async (
          values: Record<string, { type: string; value: number }>,
        ) => {
          const answer = values[step.id]
          if (
            !answer ||
            (answer.type === step.result?.type &&
              answer.value === step.result?.value)
          ) {
            return
          }
          return client.mutate({
            mutation: MUTATION_UPDATE_SLIDER,
            variables: {
              id: quiz.id,
              stepId: step.id,
              input:
                answer.value === 0
                  ? undefined
                  : {
                      choiceId: step.payload.choiceId,
                      type: answer.type as QuizStepSliderType,
                      value: answer.value,
                    },
            },
          })
        }
      case StepType.REGIONGROUPS:
        return async (values: Record<string, unknown>) => {
          const regionGroups =
            (values[step.id] as Array<QuizRegionGroupInput>) || []
          const input =
            regionGroups.length > 0
              ? regionGroups.map(({ id, name }) => ({
                  id,
                  name,
                }))
              : []
          if (
            !Array.isArray(regionGroups) ||
            isEqual(regionGroups, step.result?.regionGroups)
          ) {
            return
          }
          return client.mutate({
            mutation: MUTATION_UPDATE_REGIONGROUPS,
            variables: {
              id: quiz.id,
              stepId: step.id,
              input:
                regionGroups.length === 0
                  ? null
                  : {
                      regionGroups: input,
                    },
            },
          })
        }
    }
  }
  const submit = async (values: Record<string, unknown>): Promise<void> => {
    try {
      // @ts-ignore
      await submitStep(step)(values)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
    }
  }

  switch (step.type) {
    case StepType.SELECT:
      return step.entity === 'place_type'
        ? {
            type: step.type,
            entity: step.entity,
            form: <ChooseWay key={step.id} step={step} />,
            submit,
          }
        : {
            type: step.type,
            entity: step.entity,
            form: <Select key={step.id} step={step} />,
            submit,
          }
    case StepType.BUBBLES:
      return {
        type: step.type,
        entity: step.entity,
        form: <Bubbles key={step.id} quizId={quiz.id} step={step} />,
        submit,
      }
    case StepType.MULTISELECT:
      return {
        type: step.type,
        entity: step.entity,
        form: <MultiSelect key={step.id} step={step} />,
        submit,
      }
    case StepType.LOCATIONS:
      return {
        type: step.type,
        entity: step.entity,
        form: <Landmark key={step.id} step={step} />,
        submit,
      }

    case StepType.TABSLIDERS:
      return {
        type: step.type,
        entity: step.entity,
        form: <Price key={step.id} step={step} />,
        submit,
      }

    case StepType.REGIONGROUPS:
      return {
        type: step.type,
        entity: step.entity,
        form: <DesiredLocationForm key={step.id} step={step} />,
        submit,
      }
  }
}
