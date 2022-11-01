import { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useLazyQuery, useMutation } from '@apollo/client'
import styled from '@emotion/styled'
import { FormProvider, useForm } from 'react-hook-form'
import { usePreviousDistinct, useSessionStorage } from 'react-use'

import { Layout } from '@/components/shared/layout'
import { MetaTags } from '@/components/shared/MetaTags'
import { useRenderStep as useRenderStepBase } from '@/components/shared/Quiz'
import { Footer } from '@/components/shared/Quiz/shared/Footer'
import { useAuthorizationStore } from '@/modules/authorization'
import { useAuthGlobalModals } from '@/modules/authorization'
import { MUTATION_CREATE_QUIZ, QUERY_QUIZ, QUERY_QUIZZES } from '@/modules/quiz'
import { ROUTES } from '@/modules/router'
import {
  WHERE_META_KEYWORDS,
  WHERE_QUIZ_DESCRIPTION,
  WHERE_QUIZ_TITLE,
} from '@/modules/router/seo'
import {
  fullHDMedia,
  mobileMedia,
  notDesktopMedia,
  notMobileMedia,
} from '@/styles/media'
import { SCROLLBAR_DISPLAY_NONE_MIXIN } from '@/styles/mixins'

import { Frame as FrameBase } from './Frame'
import { HeaderMobile } from './HeaderMobile'
import { useAdhocDisableBackButton } from './use-adhoc-disable-back-button'

export const Quiz: FC = () => {
  const [{ isLoggedIn }] = useAuthorizationStore()
  const [, setQuizId] = useSessionStorage('quizId')

  const router = useRouter()
  const [createQuiz] = useMutation(MUTATION_CREATE_QUIZ, {
    refetchQueries: [QUERY_QUIZZES],
  })
  const [currentStep, setCurrentStep] = useState(0)
  const prevStep = usePreviousDistinct(currentStep) || 0

  useAdhocDisableBackButton()

  const [getQuiz, { data }] = useLazyQuery(QUERY_QUIZ)
  useEffect(() => {
    createQuiz().then(({ data: quiz }) => {
      if (quiz?.createQuiz) {
        getQuiz({
          variables: { id: quiz.createQuiz.id, position: 0, limit: 0 },
        })
      }
    })
  }, [getQuiz, createQuiz])
  const quiz = data?.quiz

  const [historySteps, setHistorySteps] = useState<string[]>([])
  const isGoingForward = prevStep <= currentStep
  useEffect(() => {
    if (
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

  const methods = useForm({
    defaultValues: {},
  })

  const countStep = quiz?.steps.length ?? 0

  const stepRender = useRenderStep(
    {
      quiz,
      currentStep,
      historySteps,
    },
    {
      countStep,
    },
  )

  const { handleSubmit, formState, watch } = methods
  const isLastStep = stepRender?.entity === 'price'
  const isFirstStep = currentStep === 0

  const isGoingBack = prevStep > currentStep

  const [chosenWay, setChosenWay] = useState('')
  const watchAllFields = watch()
  const currentWayChoice = Object.values(watchAllFields)[0]
  const isWayChanged = currentWayChoice !== chosenWay

  useEffect(() => {
    if (isFirstStep && isGoingBack && isWayChanged) {
      setHistorySteps((prevState) => [...prevState].slice(0, 1))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep, isWayChanged])

  const goBackButtonProps = {
    disabled: formState.isSubmitting,
    onClick: () => {
      if (isFirstStep) {
        router.push(ROUTES.where.calcUrl(), undefined, { shallow: true })
      } else {
        setCurrentStep(Math.max(0, currentStep - 1))
      }
    },
    children: 'Back',
  }

  const [isNotHavePermission, showModal] = useAuthGlobalModals('quiz')

  const goToResults = () => {
    if (quiz?.id) {
      router.push(ROUTES.whereResult.calcUrl({ id: quiz.id }), undefined, {
        shallow: true,
      })
    }
  }

  return (
    <FormProvider {...methods}>
      <MetaTags
        title={WHERE_QUIZ_TITLE}
        description={WHERE_QUIZ_DESCRIPTION}
        keywords={WHERE_META_KEYWORDS}
      />
      <Layout isLoginUnskippable redirect={goToResults}>
        {stepRender && (
          <Container>
            <Wrapper>
              <HeaderMobile
                {...goBackButtonProps}
                withBackButton
                withCloseButton
              />
              <FrameWrapper>{stepRender.frame}</FrameWrapper>
              <QuizWrapper>
                <ContainerForm
                  onSubmit={handleSubmit(async (values) => {
                    if (isFirstStep) {
                      setChosenWay(Object.values(values)[0] as string)
                    }
                    await stepRender.submit(values)
                    if (isLastStep && quiz?.id) {
                      if (!isLoggedIn) {
                        setQuizId(quiz?.id)
                      }
                      isNotHavePermission ? showModal() : goToResults()
                    } else {
                      setCurrentStep(Math.min(countStep - 1, currentStep + 1))
                    }
                  })}
                >
                  {stepRender.form}
                  <Footer
                    isFirstStep={isFirstStep}
                    isLastStep={isLastStep}
                    isSubmitting={formState.isSubmitting}
                    hasValue={!!currentWayChoice}
                    goBackButtonProps={goBackButtonProps}
                  />
                </ContainerForm>
              </QuizWrapper>
            </Wrapper>
          </Container>
        )}
      </Layout>
    </FormProvider>
  )
}

const useRenderStep = (
  { quiz, currentStep, historySteps }: Parameters<typeof useRenderStepBase>[0],
  { countStep }: { countStep: number },
):
  | (Exclude<ReturnType<typeof useRenderStepBase>, null> & {
      frame: JSX.Element
    })
  | null => {
  const props = useRenderStepBase({ quiz, currentStep, historySteps })
  const step = quiz?.steps.find((step) => step.id === historySteps[currentStep])
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

const FrameWrapper = styled.div`
  padding: 4rem 5.6rem 4.8rem 3.2rem;

  ${notDesktopMedia} {
    padding: 4rem 2.4rem 7.2rem;
  }

  ${mobileMedia} {
    padding: 0;
    margin: 0.8rem 0 1.6rem;
  }

  ${notMobileMedia} {
    position: sticky;
    top: 0;
  }

  display: flex;
  flex-direction: column;

  ${fullHDMedia} {
    padding: 7.2rem 11.2rem 8rem 3.2rem;
  }
`
const Frame = styled(FrameBase)`
  flex-grow: 1;
`

const Container = styled.div`
  ${mobileMedia} {
    height: 100%;

    position: fixed;
    left: 0;
    right: 0;
    z-index: 900;

    display: flex;

    background: white;
  }
  ${notMobileMedia} {
    height: 100%;
    margin-left: -2.4rem;
    margin-right: -2.4rem;

    overflow: hidden;
  }

  &::after {
    ${notMobileMedia} {
      content: '';
      position: absolute;
      top: 6rem;
      bottom: 0;
      left: 0;
      width: calc(50% - 1.2rem);
      background: linear-gradient(
        180deg,
        #f0f1f7 0%,
        rgba(240, 241, 247, 0) 100%
      );
      z-index: -1;
    }
  }
`
const Wrapper = styled.div`
  max-width: 192rem;
  margin: 0 auto;

  box-shadow: inset 0px 4px 14px -1px rgba(18, 21, 31, 0.08);

  ${notMobileMedia} {
    height: 100%;
    display: grid;
    grid-template-columns: calc(50% - 1.2rem) 1fr;

    padding: 0 10rem;
  }

  ${notDesktopMedia} {
    padding: 0;
  }

  ${mobileMedia} {
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    padding: 0 1.6rem;

    overflow-x: hidden;
  }

  ${fullHDMedia} {
    padding: 0 15rem;
  }

  ${SCROLLBAR_DISPLAY_NONE_MIXIN}
`
const QuizWrapper = styled.div`
  padding: 4.8rem 3.2rem 0 5.6rem;

  ${notMobileMedia} {
    overflow-y: auto;
  }

  display: flex;
  flex-direction: column;
  flex-grow: 1;

  ${notDesktopMedia} {
    padding: 4.4rem 2.4rem 0;
  }

  ${mobileMedia} {
    padding: 0;
  }

  ${fullHDMedia} {
    padding: 8rem 3.2rem 0 11.2rem;
  }

  ${SCROLLBAR_DISPLAY_NONE_MIXIN}
`
const ContainerForm = styled.form`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`
