import { FC, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { useMutation, useQuery } from '@apollo/client'
import styled from '@emotion/styled'
import { useLocalStorage, useSessionStorage } from 'react-use'

import { HeaderMobile } from '@/components/screens/where/Result/Header/Header'
import { Quiz } from '@/components/screens/where/Result/Quiz'
import { Sharing } from '@/components/screens/where/Result/SharingBanner/Sharing'
import { AreaLayout } from '@/components/shared/AreaLayout'
import { DescriptionWorkMatch } from '@/components/shared/DescriptionWorkMatch'
import { LoadingState } from '@/components/shared/LoadingState'
import { WhereResultsMap } from '@/components/shared/maps/WhereResultsMap'
import { MetaTags } from '@/components/shared/MetaTags'
import { SurveyMonkey } from '@/components/shared/SurveyMonkey/SurveyMonkey'
import { Loader } from '@/components/ui-kit/Loader'
import { ModalPortal } from '@/components/ui-kit/Modal'
import { ScrollableContainer, useAnalytics } from '@/modules/analytics'
import { useAuthorizationStore } from '@/modules/authorization'
import { useIsMobileDevice } from '@/modules/device'
import { useRestoreScroll } from '@/modules/feed'
import { useInfinityScroll } from '@/modules/infinity-scroll'
import { mapServiceLocator } from '@/modules/map'
import { MarkerFeature } from '@/modules/map/types'
import {
  MUTATION_CALC_QUIZ_RESULT,
  QUERY_QUIZ,
  Quiz as QuizType,
} from '@/modules/quiz'
import {
  WHERE_META_KEYWORDS,
  WHERE_RESULT_DESCRIPTION,
  WHERE_RESULT_TITLE,
} from '@/modules/router/seo'
import { useSurvey } from '@/modules/survey/SurveyContext'
import { mobileMedia, notMobileMedia } from '@/styles/media'
import { SCROLLBAR_DISPLAY_NONE_MIXIN } from '@/styles/mixins'
import { getColorTheme } from '@/styles/themes'

import { BannerByResultSteps, haveSomeAnswer } from './BannerByResultSteps'
import { Card } from './Card'
import { Header } from './Header'
import { Onboarding } from './Onboarding'

const START_LOCATIONS_PAGE = 0
const LOCATIONS_PAGE_LIMIT = 10
const SURVEY_DELAY_TIME = 20000

export const LAST_QUIZ_ID_STORAGE_KEY = 'last-quiz-id'
const ONBOARDING_WAS_SHOWN_STORAGE_KEY = 'onboarding-was-shown'

export const Result: FC = () => {
  return (
    <>
      <MetaTags
        title={WHERE_RESULT_TITLE}
        description={WHERE_RESULT_DESCRIPTION}
        keywords={WHERE_META_KEYWORDS}
      />
      <ResultMain />
    </>
  )
}

const ResultMain: FC = () => {
  const { showOnboarding, hideOnboarding } = useOnboarding(
    ONBOARDING_WAS_SHOWN_STORAGE_KEY,
  )

  const router = useRouter()

  const quizId =
    typeof router.query.id === 'string' ? router.query.id : undefined
  const [{ isLoggedIn }] = useAuthorizationStore()

  const [, setLastQuizId] = useLocalStorage(LAST_QUIZ_ID_STORAGE_KEY)

  useEffect(() => {
    if (!isLoggedIn && quizId) {
      setLastQuizId(quizId)
    }
  }, [isLoggedIn, quizId, setLastQuizId])

  const {
    data: { quiz } = {},
    fetchMore: fetchMoreLocations,
    loading,
  } = useQuery(QUERY_QUIZ, {
    variables: {
      id: quizId as string,
      position: START_LOCATIONS_PAGE,
      limit: LOCATIONS_PAGE_LIMIT,
    },
    ssr: false,
  })

  const [totalSessionsCount, setTotalSessionsCount, _] = useLocalStorage(
    'totalSessionsCount',
    0,
  )
  const [session, setSession] = useSessionStorage('currentSession')
  useEffect(() => {
    if (!session) {
      totalSessionsCount
        ? setTotalSessionsCount(totalSessionsCount + 1)
        : setTotalSessionsCount(1)
      setSession(1)
    }
  }, [totalSessionsCount, session, setTotalSessionsCount, setSession])

  const [markers, setMarkers] = useState<MarkerFeature[] | null>(null)
  const [calcQuizResult, { loading: isCalculating, called: calledQuizResult }] =
    useMutation(MUTATION_CALC_QUIZ_RESULT, {
      refetchQueries: [QUERY_QUIZ],
      onCompleted: () => {
        const mapFacade = mapServiceLocator.getWhereResultsMap()
        if (mapFacade) {
          mapFacade.resetMap()
          mapFacade.drawNeighborhoodsAndMarkersByBBox().then(() => {
            const markersToUpdate = mapFacade.getMarkers()
            setMarkers(markersToUpdate)
          })
        }
      },
    })

  useEffect(() => {
    if (quiz && !quiz?.result && quizId) {
      calcQuizResult({ variables: { id: quizId } })
    }
  }, [calcQuizResult, quizId, quiz?.result, quiz])

  const resultQuiz = quiz
  const quizLocations = quiz?.result?.locations
  const searchAreas = quiz?.result?.searchAreas

  const someAnswer = quiz?.steps && haveSomeAnswer(quiz.steps)

  const prevCommentsPage = useRef(START_LOCATIONS_PAGE)

  const nextCards = () => {
    prevCommentsPage.current = quizLocations?.length || 0

    fetchMoreLocations({
      variables: {
        position: prevCommentsPage.current,
        limit: LOCATIONS_PAGE_LIMIT,
      },
      // @ts-ignore
      updateQuery: (data, { fetchMoreResult }) => {
        return {
          ...data,
          quiz: {
            ...data?.quiz,
            result: {
              ...data?.quiz?.result,
              locations: [
                ...(data?.quiz?.result?.locations ?? []),
                ...(fetchMoreResult.quiz?.result?.locations ?? []),
              ],
            },
          },
        }
      },
    })
  }

  const infinityScroll = useInfinityScroll(nextCards)

  const locations = quizLocations

  const isLoading = isCalculating
  const analytics = useAnalytics()
  useEffect(() => {
    if ((locations?.length === 0 && quizId && !isLoading) || calledQuizResult) {
      // @ts-ignore
      analytics.resultsZeroResults({ quizId })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [analytics, quizId, locations?.length])

  //TODO: refactor get ref
  const [refState, setRef] = useState<HTMLDivElement | null>(null)
  const rootRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    return () => {
      setRef(null)
    }
  }, [])

  const {
    scrollableRef,
    onScrollRoot,
    targetRef,
    isShowShadow,
    isShowFilters,
  } = useStickHeader()

  const contentRef = useRef<HTMLDivElement>(null)
  useRestoreScroll(
    scrollableRef,
    'quiz-result-scroll-top',
    !loading,
    /.+\/where\?quizId.*/,
  )

  const elementToScrollIndex = 4

  const highlightNeighborhood = (id: string) => {
    const mapFacade = mapServiceLocator.getWhereResultsMap()
    mapFacade?.highlightNeighborhoodById(id, { reset: true })
  }

  const resetHighlight = (id: string) => {
    const mapFacade = mapServiceLocator.getWhereResultsMap()
    mapFacade?.resetNeighborhoodHighlightById(id)
  }

  // @ts-ignore
  const isAreaExpanded = resultQuiz?.areaExpanded
  const [isAlert, setAlert] = useState(isAreaExpanded)
  useEffect(() => {
    if (!quizId) {
      return
    }
    if (isAreaExpanded) {
      analytics.resultsAlert({ quizId, type: 'search_area_expanded' })
    }
  }, [analytics, isAreaExpanded, quizId])

  const [isShowDescriptionWorkMatch, setIsShowDescriptionWorkMatch] =
    useState(false)

  const [currentStep, setCurrentStep] = useState<null | string>(null)
  const [isShowStep, setIsShowStep] = useState(false)
  const openQuiz = (stepId: string) => {
    setIsShowStep(true)
    setCurrentStep(stepId)
  }
  const closeQuiz = () => setIsShowStep(false)
  const changeQuiz = () => {
    if (quiz?.id) {
      calcQuizResult({ variables: { id: quizId as string } })
    }
  }
  const { isReadyForSurvey, setIsReadyForSurvey } = useSurvey()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    if (isScrolled) {
      setTimeout(() => {
        setIsReadyForSurvey(true)
      }, SURVEY_DELAY_TIME)
    }
  }, [isScrolled, isReadyForSurvey, setIsReadyForSurvey])
  return (
    <>
      <AreaLayout
        withOffset
        withoutCloseButton
        customHeader={
          <HeaderMobile
            quiz={quiz as QuizType}
            onQuizOpen={openQuiz}
            isShowStep={isShowStep}
            isAlert={isAlert}
            onCloseAlert={() => setAlert(false)}
          />
        }
        map={() => (
          <Map
            withoutSearchParameters={!someAnswer}
            markers={markers}
            searchAreas={searchAreas}
          />
        )}
      >
        <QuizMobile isVisible={isShowStep} onRequestClose={closeQuiz}>
          <Quiz
            isVisible={isShowStep}
            onRequestClose={closeQuiz}
            quiz={quiz}
            currentStep={currentStep}
            onChangeCurrentStep={setCurrentStep}
            onChangeQuiz={changeQuiz}
            quizOffset={0}
          />
        </QuizMobile>
        <Container
          onTouchMove={(event) => {
            if (!isScrolled) {
              setIsScrolled(true)
            }
            setAlert(false)
            infinityScroll(event)
          }}
          onScroll={(event) => {
            if (!isScrolled) {
              setIsScrolled(true)
            }
            onScrollRoot(event)
            setAlert(false)
            infinityScroll(event)
          }}
          ref={(newRef) => {
            scrollableRef.current = newRef
            if (newRef !== null && newRef !== rootRef.current) {
              rootRef.current = newRef
              setRef(rootRef.current)
            }
          }}
        >
          <Header
            isShowShadow={isShowShadow}
            isShowFilters={isShowFilters}
            isShowStep={isShowStep}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            quiz={quiz as QuizType}
            onQuizOpen={openQuiz}
            onQuizClose={closeQuiz}
            onChangeQuiz={changeQuiz}
            isAlert={isAlert}
            onCloseAlert={() => setAlert(false)}
            ref={targetRef}
          />
          {!isCalculating && (
            <BannerByResultSteps steps={quiz?.steps} quizId={quizId} />
          )}
          <ContentWrapper isLoading={isCalculating} ref={contentRef}>
            <LoadingState
              loading={isCalculating}
              loadingComponent={<Loader withGradient />}
            >
              <Wrapper>
                {(!isCalculating &&
                  resultQuiz &&
                  locations?.map(
                    (
                      {
                        id,
                        badges,
                        subtitle,
                        neighborhood,
                        image,
                        factorsScores,
                        score,
                        subscribed,
                        slug,
                      },
                      index,
                    ) => {
                      return (
                        <CardWrapper key={id}>
                          <Card
                            scrollElement={refState}
                            index={index}
                            quizId={resultQuiz.id}
                            id={id}
                            badges={badges ?? []}
                            score={score}
                            subtitle={subtitle}
                            neighborhood={neighborhood}
                            image={image}
                            factorsScores={factorsScores}
                            subscribed={subscribed}
                            slug={slug}
                            isShowWarningNoHaveSearchParameters={
                              !quiz || !haveSomeAnswer(quiz.steps)
                            }
                            onHover={() => highlightNeighborhood(id)}
                            onLeave={() => resetHighlight(id)}
                            onInfoOpen={() => {
                              setIsShowDescriptionWorkMatch(true)
                            }}
                            totalSessionsCount={totalSessionsCount as number}
                          />
                          {index === elementToScrollIndex && <Sharing />}
                        </CardWrapper>
                      )
                    },
                  )) ??
                  null}
              </Wrapper>
              <DescriptionWorkMatch
                isVisible={isShowDescriptionWorkMatch}
                onRequestClose={setIsShowDescriptionWorkMatch}
              />
            </LoadingState>
          </ContentWrapper>
        </Container>
      </AreaLayout>
      <SurveyMonkey />
      <Onboarding isVisible={showOnboarding} onRequestClose={hideOnboarding} />
    </>
  )
}

const useStickHeader = () => {
  const scrollableRef = useRef<HTMLDivElement | null>(null)
  const targetRef = useRef<HTMLDivElement>(null)
  const state = useRef({
    leftInitial: 0,
    topInitial: 0,
    prevScrollTop: 0,
    state: 'initial' as 'reset' | 'showed' | 'showing' | 'initial' | 'hiding',
  })

  useEffect(() => {
    if (!scrollableRef.current || !targetRef.current) {
      console.error('have not elements')
      return
    }
    const scrollableBounding = scrollableRef.current.getBoundingClientRect()
    const targetBounding = targetRef.current.getBoundingClientRect()
    state.current.topInitial = targetBounding.y - scrollableBounding.y
    state.current.leftInitial = targetBounding.x - scrollableBounding.x
  }, [])
  const [isShowShadow, setIsShowShadow] = useState(false)
  const [isShowFilters, setShowFilters] = useState(false)
  const onScrollRoot = (event: any) => {
    if (!scrollableRef.current || !targetRef.current) {
      console.error('have not elements')
      return
    }
    const scrollTop = event.target.scrollTop
    const targetBounding = targetRef.current?.getBoundingClientRect()
    const directionUp = state.current.prevScrollTop > scrollTop
    state.current.prevScrollTop = scrollTop
    if (scrollTop <= 0) {
      state.current.state = 'initial'
      setIsShowShadow(false)
      setShowFilters(false)
      return
    }

    if (directionUp) {
      setShowFilters(true)
      if (state.current.state === 'reset') {
        state.current.state = 'showing'
      } else if (
        scrollTop <=
        parseInt(targetRef.current.style.top || '0') - state.current.topInitial
      ) {
        state.current.state = 'showed'
      }
    } else {
      if (
        state.current.state === 'showed' ||
        state.current.state === 'showing'
      ) {
        state.current.state = 'hiding'
        setShowFilters(false)
      } else if (
        parseInt(targetRef.current.style.top || '0') <=
        scrollTop - targetBounding.height - state.current.topInitial
      ) {
        state.current.state = 'reset'
      }
    }

    if (state.current.state !== 'initial') {
      setIsShowShadow(true)
    }
  }
  return {
    scrollableRef,
    onScrollRoot,
    targetRef,
    isShowShadow,
    isShowFilters,
  }
}

const useOnboarding = (key: string) => {
  const [onboardingWasShown, setOnboardingWasShown] = useLocalStorage(key)

  const hideOnboarding = () => setOnboardingWasShown(true)

  const isMobile = useIsMobileDevice()

  return {
    showOnboarding: !onboardingWasShown && isMobile,
    hideOnboarding,
  }
}

const Container = styled(ScrollableContainer)`
  padding: 0 1.6rem 1.6rem;
  height: 100%;

  display: flex;
  flex-direction: column;

  position: relative;

  overflow-x: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;

  ${SCROLLBAR_DISPLAY_NONE_MIXIN};

  ${notMobileMedia} {
    border-radius: 16px;
    background: ${getColorTheme('sun50')};
  }
  ${mobileMedia} {
    padding-top: 0;
  }
`

const Wrapper = styled.div``

const ContentWrapper = styled.div<{ isLoading: boolean }>`
  height: 100%;
  margin: -1.6rem;
  padding: 1.6rem;

  ${mobileMedia} {
    ${(props) =>
      props.isLoading
        ? 'margin-top: 1.6rem'
        : `background: ${getColorTheme('sun50')(props)}`};

    border-radius: 2.4rem 2.4rem 0 0;
  }
`
const Map = styled(WhereResultsMap)`
  width: 100%;
  height: 100%;
`

const CardWrapper = styled.div`
  &:not(:last-child) {
    margin-bottom: 16px;
  }
`

const QuizMobile = styled(ModalPortal)`
  ${notMobileMedia} {
    display: none;
  }
`
