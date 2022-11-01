import { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useLazyQuery, useMutation } from '@apollo/client'
import styled from '@emotion/styled'
import { FormProvider, useForm } from 'react-hook-form'
import { usePreviousDistinct } from 'react-use'

import { HeaderMobile as HeaderMobileBase } from '@/components/screens/where/Quiz/HeaderMobile'
import { ModalChangeLandmark } from '@/components/screens/where/Result/ModalChangeLandmark'
import { map } from '@/components/screens/where/Result/Quiz'
import { Button } from '@/components/ui-kit/Button'
import {
  MUTATION_CALC_QUIZ_RESULT,
  MUTATION_CREATE_QUIZ,
  QUERY_QUIZ,
  QUERY_QUIZZES,
  StepType,
} from '@/modules/quiz'
import { ROUTES } from '@/modules/router'
import { SCROLLBAR_DISPLAY_NONE_MIXIN } from '@/styles/mixins'

import { Frame as FrameBase } from './Frame'
import { useRenderStepWebView as useRenderStepWebViewBase } from './use-rander-step-web-view'

type Event = {
  type: string
  payload: {
    [index: string]: string
  }
}

export const QuizWebView: FC = () => {
  const router = useRouter()

  const quizId = router.query.quizId as string | undefined
  const stepId = router.query.currentStepId as string | undefined
  const isNewQuiz = !quizId

  const [currentStep, setCurrentStep] = useState(0)

  const [currentStepId, setCurrentStepId] = useState<string | null>(null)
  const prevStep = usePreviousDistinct(currentStep) || 0

  const [historySteps, setHistorySteps] = useState<string[]>([])

  const [isModalVisible, setModalVisible] = useState(false)

  const [createQuiz] = useMutation(MUTATION_CREATE_QUIZ, {
    refetchQueries: [QUERY_QUIZZES],
  })

  const [getQuiz, { data }] = useLazyQuery(QUERY_QUIZ)

  const [calcQuizResult] = useMutation(MUTATION_CALC_QUIZ_RESULT, {
    refetchQueries: [QUERY_QUIZ],
  })

  const changeQuiz = () => {
    if (quiz?.id) {
      calcQuizResult({ variables: { id: quiz?.id as string } })
    }
  }

  useEffect(() => {
    if (!quizId) {
      createQuiz().then(({ data: quiz }) => {
        if (quiz?.createQuiz) {
          getQuiz({
            variables: { id: quiz.createQuiz.id, position: 0, limit: 0 },
          })
        }
      })
    } else {
      getQuiz({
        variables: { id: quizId, position: 0, limit: 0 },
      })
    }
  }, [getQuiz, createQuiz, quizId])

  const quiz = data?.quiz
  const countStep = quiz?.steps.length ?? 0

  const isGoingForward = prevStep <= currentStep
  const isGoingBack = prevStep > currentStep

  const methods = useForm({
    defaultValues: isNewQuiz ? {} : map(quiz),
  })
  const { watch, handleSubmit, formState } = methods

  const stepRender = useRenderStep(
    {
      quiz,
      currentStep,
      currentStepId,
      historySteps,
    },
    {
      countStep,
    },
  )

  const isLastStep = stepRender?.entity === 'price'
  const isFirstStep = currentStep === 0

  const placeTypeStep = quiz?.steps.find(
    ({ entity }) => entity === 'place_type',
  )
  const landmarkStep = quiz?.steps.find(
    ({ type }) => type === StepType.LOCATIONS,
  )
  const isRegionGroupsStep = stepRender?.type === StepType.REGIONGROUPS

  const [chosenWay, setChosenWay] = useState('')
  const watchAllFields = watch()
  const currentWayChoice =
    (placeTypeStep?.id && watchAllFields[placeTypeStep?.id]) ?? null
  const isWayChanged = currentWayChoice !== chosenWay

  useEffect(() => {
    if (
      isNewQuiz &&
      quiz?.currentStepId &&
      !historySteps.includes(quiz?.currentStepId) &&
      isGoingForward
    ) {
      setHistorySteps((prevState) => [
        ...prevState,
        quiz?.currentStepId as string,
      ])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quiz?.currentStepId, historySteps])

  useEffect(() => {
    if (isNewQuiz && isFirstStep && isGoingBack && isWayChanged) {
      setHistorySteps((prevState) => [...prevState].slice(0, 1))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep, isWayChanged])

  useEffect(() => {
    if (stepId) {
      setCurrentStepId(stepId)
    }
  }, [stepId])

  useEffect(() => {
    if (!isNewQuiz && quiz) {
      methods.reset(map(quiz))
    }
  }, [isNewQuiz, methods, quiz])

  const sendEventToNative = (event: Event) => {
    try {
      // @ts-ignore
      window.webkit.messageHandlers.nativeAppCallbacks.postMessage(event)
    } catch (err) {
      console.error('Can not reach native code', err)
    }
  }

  const goBackButtonProps = {
    disabled: formState.isSubmitting,
    onClick: () => {
      if (isFirstStep && quiz?.id) {
        sendEventToNative({
          type: 'quiz_closed',
          payload: {
            quizId: quiz?.id,
          },
        })
      } else {
        setCurrentStep(Math.max(0, currentStep - 1))
      }
    },
    children: 'Back',
  }

  const submitButton = isNewQuiz ? (
    <>
      {(!isFirstStep || !!currentWayChoice) && (
        <ContinueButton
          size={'large'}
          type={'submit'}
          disabled={formState.isSubmitting}
        >
          {isLastStep ? 'Get results' : 'Continue'}
        </ContinueButton>
      )}
    </>
  ) : (
    <>
      {methods.formState.isDirty ? (
        <SubmitButton
          // @ts-ignore
          {...(isRegionGroupsStep && landmarkStep?.result?.features
            ? {
                onClick: () => {
                  setModalVisible(true)
                  sendEventToNative({
                    type: 'quiz_completed',
                    payload: {
                      quizId: quiz?.id as string,
                    },
                  })
                },
              }
            : {
                type: 'submit',
                onClick: () => {
                  sendEventToNative({
                    type: 'quiz_completed',
                    payload: {
                      quizId: quiz?.id as string,
                    },
                  })
                },
              })}
          disabled={methods.formState.isSubmitting} //TODO replace with loading state, when it will be added to design system
        >
          Apply
        </SubmitButton>
      ) : (
        <SubmitButton
          onClick={() =>
            sendEventToNative({
              type: 'quiz_closed',
              payload: {
                quizId: quiz?.id as string,
              },
            })
          }
        >
          Done
        </SubmitButton>
      )}
    </>
  )

  return (
    <FormProvider {...methods}>
      <HeaderMobile
        {...goBackButtonProps}
        withBackButton={isNewQuiz}
        withCloseButton
        onClose={() => {
          if (quiz?.id) {
            sendEventToNative({
              type: 'quiz_closed',
              payload: {
                quizId: quiz?.id,
              },
            })
          }
        }}
      />
      {stepRender && (
        <Container>
          <Wrapper>
            {isNewQuiz && <FrameWrapper>{stepRender.frame}</FrameWrapper>}
            <QuizWrapper>
              <ContainerForm
                onSubmit={handleSubmit(async (values) => {
                  if (isFirstStep) {
                    setChosenWay(Object.values(values)[0] as string)
                  }
                  await stepRender.submit(values)
                  !isNewQuiz && changeQuiz()
                  if (isLastStep && quiz?.id) {
                    router.push(
                      ROUTES.whereResult.calcUrl({ id: quiz.id }),
                      undefined,
                      {
                        shallow: true,
                      },
                    )
                    sendEventToNative({
                      type: 'quiz_completed',
                      payload: {
                        quizId: quiz.id,
                      },
                    })
                  } else {
                    setCurrentStep(Math.min(countStep - 1, currentStep + 1))
                  }
                })}
              >
                {stepRender.form}
                <Footer>{submitButton}</Footer>
              </ContainerForm>
            </QuizWrapper>
          </Wrapper>
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
                await stepRender.submit(values)
                changeQuiz()
                setModalVisible(false)
              })}
            />
          )}
        </Container>
      )}
    </FormProvider>
  )
}

const useRenderStep = (
  {
    quiz,
    currentStep,
    currentStepId,
    historySteps,
  }: Parameters<typeof useRenderStepWebViewBase>[0],
  { countStep }: { countStep: number },
):
  | (Exclude<ReturnType<typeof useRenderStepWebViewBase>, null> & {
      frame: JSX.Element
    })
  | null => {
  const router = useRouter()

  const quizId = router.query.quizId as string | undefined

  const props = useRenderStepWebViewBase({
    quiz,
    currentStep,
    currentStepId,
    historySteps,
  })
  const step = quizId
    ? quiz?.steps.find((step) => step.id === currentStepId)
    : quiz?.steps.find((step) => step.id === historySteps[currentStep])

  if (!step || props === null) {
    return null
  }
  const frameProps = {
    title: step.payload.title,
    countStep,
    currentStep: currentStep + 1,
    srcDesktop: step.payload.images.desktop,
    srcMobile: step.payload.images.mobile,
  }
  return {
    ...props,
    frame: <Frame {...frameProps} />,
  }
}

const HeaderMobile = styled(HeaderMobileBase)`
  margin: 0;
`

const FrameWrapper = styled.div`
  padding: 0;
  margin: 0.8rem 0 1.6rem;

  display: flex;
  flex-direction: column;
`
const Frame = styled(FrameBase)`
  flex-grow: 1;
`

const Container = styled.div`
  height: 100%;

  position: fixed;
  left: 0;
  right: 0;
  z-index: 900;

  display: flex;

  background: white;
`
const Wrapper = styled.div`
  max-width: 192rem;
  margin: 0 auto;
  padding: 0 1.6rem;

  display: flex;
  flex-direction: column;
  flex-grow: 1;

  overflow-x: hidden;

  ${SCROLLBAR_DISPLAY_NONE_MIXIN}
`
const QuizWrapper = styled.div`
  padding: 0;

  display: flex;
  flex-direction: column;
  flex-grow: 1;

  ${SCROLLBAR_DISPLAY_NONE_MIXIN}
`
const ContainerForm = styled.form`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

const Footer = styled.div`
  padding: 2.2rem 0 5.8rem;
  margin: auto 0 5.6rem;

  background: linear-gradient(
    0deg,
    #ffffff 41.52%,
    rgba(255, 255, 255, 0) 100%
  );

  position: sticky;
  bottom: 5.6rem;

  display: flex;
  justify-content: space-between;

  pointer-events: none;
`

const ContinueButton = styled(Button)`
  width: 100%;
  margin-left: auto;

  pointer-events: auto;
`

const SubmitButton = styled(Button)`
  width: 100%;

  pointer-events: auto;
`
