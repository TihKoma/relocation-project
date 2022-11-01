import { FC, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { FormProvider, useForm } from 'react-hook-form'

import { ModalChangeLandmark } from '@/components/screens/where/Result/ModalChangeLandmark'
import { useRenderStep } from '@/components/shared/Quiz'
import { Button, NormalizedButton } from '@/components/ui-kit/Button'
import { ModalController } from '@/components/ui-kit/Modal'
import { CrossIcon } from '@/images'
import { useAnalytics } from '@/modules/analytics'
import { mapServiceLocator } from '@/modules/map'
import { USA_BBOX } from '@/modules/mock'
import { Quiz as QuizType, StepType } from '@/modules/quiz'
import { useOutsideClick } from '@/modules/utils/use-outside-click'
import { mobileMedia, notMobileMedia } from '@/styles/media'
import { SCROLLBAR_DISPLAY_NONE_MIXIN } from '@/styles/mixins'
import { getColorTheme } from '@/styles/themes'

type Props = {
  quiz?: QuizType | null
  currentStep: string | null
  onChangeCurrentStep: (stepId: string) => void
  onChangeQuiz: () => void
  quizOffset: number
} & ModalController

export const Quiz: FC<Props> = ({
  isVisible,
  onRequestClose,
  quiz,
  currentStep,
  onChangeCurrentStep,
  onChangeQuiz,
  quizOffset,
}) => {
  const methods = useForm({
    defaultValues: map(quiz),
  })

  useEffect(() => {
    if (quiz) {
      methods.reset(map(quiz))
    }
  }, [methods, quiz])
  useEffect(() => {
    if (isVisible === false) {
      methods.reset(map(quiz))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible, methods])

  const close = () => {
    onRequestClose(false)
  }

  const containerRef = useOutsideClick<HTMLFormElement>(close)

  const historySteps = quiz?.steps.map((step) => step.id) as Array<string>
  const renderStep = useRenderStep({
    quiz,
    currentStep: quiz?.steps.findIndex(({ id }) => id === currentStep) ?? -1,
    historySteps,
  })
  const landmarkRenderStep = useRenderStep({
    quiz,
    currentStep:
      quiz?.steps.findIndex(({ type }) => type === StepType.LOCATIONS) ?? -1,
    historySteps,
  })
  const regionGroupStep = quiz?.steps.find(
    ({ type }) => type === StepType.REGIONGROUPS,
  )
  const placeTypeStep = quiz?.steps.find(
    ({ entity }) => entity === 'place_type',
  )
  const landmarkStep = quiz?.steps.find(
    ({ type }) => type === StepType.LOCATIONS,
  )
  const isRegionGroupsStep = renderStep?.type === StepType.REGIONGROUPS

  const analytics = useAnalytics()

  const [isModalVisible, setModalVisible] = useState(false)

  const [isShowShadow, setIsShowShadow] = useState(false)

  if (!renderStep || !quiz || !isVisible) {
    return null
  }

  return (
    <>
      <FormProvider {...methods}>
        <Container
          quizOffset={quizOffset}
          onScroll={(event) => {
            setIsShowShadow((event.target as HTMLFormElement).scrollTop !== 0)
          }}
          ref={containerRef}
          onSubmit={methods.handleSubmit(async (values) => {
            if (isRegionGroupsStep) {
              const mapFacade = mapServiceLocator.getWhereResultsMap()
              mapFacade?.fitBbox(USA_BBOX)
              mapFacade?.clearMarkers()
            }
            await renderStep?.submit(values)
            analytics.resultsAnswersUpdated({ quizId: quiz?.id as string })
            onChangeQuiz()
            close()
          })}
          isRegionGroupsStep={isRegionGroupsStep}
          onClick={(event) => event.stopPropagation()}
        >
          <Header isShowShadow={isShowShadow}>
            <Title isRegionGroupsStep={isRegionGroupsStep}>
              {isRegionGroupsStep ? 'Edit search area' : `Edit parameters`}
              <CloseButton
                size={'small'}
                viewType={'ghost'}
                onClick={close}
                isRegionGroupsStep={isRegionGroupsStep}
                Icon={<CrossIcon />}
              />
            </Title>
            {!isRegionGroupsStep && (
              <Tabs>
                {quiz?.steps.map(({ id, entity, payload: { placeholder } }) => {
                  if (id === regionGroupStep?.id || id === placeTypeStep?.id) {
                    return null
                  }
                  return (
                    <Tab
                      key={id}
                      isActive={id === currentStep}
                      onClick={methods.handleSubmit(async (values) => {
                        await renderStep.submit(values)
                        analytics.resultsAnswersUpdated({ quizId: quiz.id })
                        onChangeQuiz()
                        onChangeCurrentStep(id)
                      })}
                    >
                      {entity === 'important_locations'
                        ? 'Landmarks'
                        : placeholder}
                    </Tab>
                  )
                })}
              </Tabs>
            )}
          </Header>
          <FormWrapper>{renderStep.form}</FormWrapper>
          <Footer>
            {methods.formState.isDirty ? (
              <SubmitButton
                isRegionGroupsStep={isRegionGroupsStep}
                {...(isRegionGroupsStep &&
                // @ts-ignore
                landmarkStep?.result?.features
                  ? {
                      onClick: () => {
                        setModalVisible(true)
                      },
                    }
                  : { type: 'submit' })}
                disabled={methods.formState.isSubmitting} //TODO replace with loading state, when it will be added to design system
              >
                Apply
              </SubmitButton>
            ) : (
              <SubmitButton
                onClick={close}
                isRegionGroupsStep={isRegionGroupsStep}
              >
                Done
              </SubmitButton>
            )}
          </Footer>
        </Container>
      </FormProvider>
      {isModalVisible && (
        <ModalChangeLandmark
          isVisible={isModalVisible}
          onRequestClose={setModalVisible}
          onSubmit={methods.handleSubmit(async (values) => {
            // @ts-ignore
            await landmarkRenderStep.submit({
              ...values,
              // @ts-ignore
              [landmarkStep?.id]: undefined,
            })
            await renderStep.submit(values)
            analytics.resultsAnswersUpdated({ quizId: quiz.id })
            onChangeQuiz()
            setModalVisible(false)
            close()
          })}
        />
      )}
    </>
  )
}

export const map = (quiz?: QuizType | null) => {
  return quiz?.steps.reduce((acc, step) => {
    switch (step.type) {
      case StepType.LOCATIONS: {
        acc[step.id] = step.result?.features || []
        break
      }
      case StepType.BUBBLES: {
        acc[step.id] = step.result?.choices || []
        break
      }
      case StepType.SELECT: {
        acc[step.id] = step.result?.filter || null
        break
      }
      case StepType.MULTISELECT: {
        acc[step.id] = step.result?.filters || []
        break
      }
      case StepType.TABSLIDERS: {
        acc[step.id] =
          {
            type: step.result?.type,
            value: step.result?.value,
          } || {}
        break
      }
      case StepType.REGIONGROUPS: {
        acc[step.id] = step.result?.regionGroups || []
        break
      }
    }
    return acc
  }, {} as Record<string, any>)
}

const Container = styled.form<{
  isRegionGroupsStep: boolean
  quizOffset: number
}>`
  ${notMobileMedia} {
    ${({ isRegionGroupsStep }) =>
      isRegionGroupsStep ? '' : 'height: calc(100vh - 10.8rem)'};

    position: absolute;
    ${({ isRegionGroupsStep, quizOffset }) =>
      isRegionGroupsStep
        ? `
        max-width: 47.6rem;
        position: fixed;
        left: ${quizOffset / 10}rem;
        top: 14.2rem;`
        : `
        left: 0;
        right: 0;
        top: 0;`}
  }
  ${mobileMedia} {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    border-radius: 0;
  }

  z-index: 1000;

  display: flex;
  flex-direction: column;

  overflow-y: auto;

  background: ${getColorTheme('earth')};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08),
    0 3.78px 33.4221px rgba(0, 0, 0, 0.06);
  border-radius: 16px;

  ${SCROLLBAR_DISPLAY_NONE_MIXIN};
`
const FormWrapper = styled.div`
  padding: 0 24px;
`
const Header = styled.div<{ isShowShadow: boolean }>`
  padding: 16px 24px 0;
  margin-bottom: 24px;

  position: sticky;
  top: 0;
  z-index: 10;

  background-color: ${getColorTheme('earth')};

  ${({ isShowShadow }) =>
    isShowShadow ? `border-bottom: 1px solid ${getColorTheme('moon')};` : ''}

  ${({ isShowShadow }) =>
    isShowShadow
      ? `
    box-shadow: 0 2px 32px rgba(0, 0, 0, 0.0503198);
  `
      : ''};
`
const SubmitButton = styled(Button)<{ isRegionGroupsStep: boolean }>`
  width: 100%;

  pointer-events: auto;
`
const Footer = styled.div`
  padding: 2.4rem;
  margin-top: auto;

  position: sticky;
  bottom: 0;

  display: flex;
  justify-content: center;

  pointer-events: none;

  background: linear-gradient(
    1.1deg,
    #ffffff 1.28%,
    rgba(255, 255, 255, 0) 99.39%
  );

  ${mobileMedia} {
    padding-bottom: 16px;
  }
`
const Title = styled.div<{ isRegionGroupsStep: boolean }>`
  display: flex;

  ${notMobileMedia} {
    ${({ isRegionGroupsStep }) =>
      isRegionGroupsStep ? 'flex-direction: column;' : 'align-items: center;'}
  }

  font-weight: 500;
  font-size: 2.8rem;
  line-height: 3.6rem;
  letter-spacing: -0.04em;
`
const CloseButton = styled(Button)<{ isRegionGroupsStep: boolean }>`
  ${notMobileMedia} {
    ${({ isRegionGroupsStep }) => (isRegionGroupsStep ? 'display: none' : '')};
  }
  margin-left: auto;
`

const Tabs = styled.div`
  padding: 0 24px;
  margin: 16px -24px 0;

  display: flex;
  gap: 1.6rem;

  overflow-x: auto;

  ${SCROLLBAR_DISPLAY_NONE_MIXIN};
`
const Tab = styled(NormalizedButton)<{ isActive: boolean }>`
  padding: 9px 0;

  border-bottom: 2px solid transparent;
  ${(props) =>
    props.isActive
      ? `
          border-color: ${getColorTheme('neptune600')(props)};
          color: ${getColorTheme('neptune600')(props)};
        `
      : ''}

  white-space: nowrap;
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 2rem;
  letter-spacing: -0.04em;
`
