import { FC, forwardRef, useRef } from 'react'
import styled from '@emotion/styled'
import {
  autoPlacement,
  offset,
  shift,
  useFloating,
} from '@floating-ui/react-dom'

import { Alert } from '@/components/screens/where/Result/Header/Alert'
import { NormalizedButton } from '@/components/ui-kit/Button'
import { ChevronIcon, LocationIcon as LocationIconBase } from '@/images'
import { Quiz as QuizType, StepRegionGroups, StepType } from '@/modules/quiz'
import { HOVER_TRANSITION_TIME } from '@/styles/const'
import {
  headerChangeMediaSecond,
  mobileMedia,
  notMobileMedia,
} from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

import { Quiz } from '../Quiz'
import { Tabs } from './Tabs'

type Props = {
  className?: string
  quiz: QuizType | null
  currentStep: string | null
  setCurrentStep: (stepId: string) => void
  onQuizOpen: (stepId: string) => void
  onQuizClose: () => void
  onChangeQuiz: () => void
  isShowStep: boolean
  isShowShadow: boolean
  isShowFilters: boolean
  onCloseAlert: () => void
  isAlert: boolean
}

export const Header = forwardRef<HTMLDivElement, Props>(
  (
    {
      className,
      quiz,
      currentStep,
      setCurrentStep,
      onQuizOpen,
      onQuizClose,
      onChangeQuiz,
      isShowStep,
      onCloseAlert,
      isAlert,
      isShowShadow,
      isShowFilters,
    },
    ref,
  ) => {
    const regionGroupsStep = quiz?.steps.find(
      ({ type }) => type === StepType.REGIONGROUPS,
    ) as StepRegionGroups | undefined

    const { x, y, reference, floating, strategy } = useFloating({
      middleware: [offset(20), autoPlacement(), shift()],
    })

    const titleRef = useRef<HTMLDivElement>(null)
    const quizOffset = titleRef?.current?.getBoundingClientRect().left

    const region =
      regionGroupsStep?.result?.regionGroups
        ?.map(({ name }) => {
          const [city, region] = name.split(', ')
          return `${city} (${region})`
        })
        .join(', ') || 'United States'

    return (
      <>
        <SubHeader isShowShadow={isShowShadow} isShowFilters={isShowFilters}>
          <SubHeaderText>Results</SubHeaderText>
          <TitleWrapper ref={reference}>
            <Title
              onClick={
                regionGroupsStep && (() => onQuizOpen(regionGroupsStep.id))
              }
              // @ts-ignore
              ref={titleRef}
            >
              <LocationIcon />
              <City>{region}</City>
              <ButtonArrowLocation>
                <ChevronIcon direction={isShowStep ? 'top' : 'bottom'} />
              </ButtonArrowLocation>
            </Title>
          </TitleWrapper>
          {isAlert && (
            <Alert
              ref={floating}
              style={{ position: strategy, top: y ?? '', left: x ?? '' }}
              onClick={onCloseAlert}
            />
          )}
        </SubHeader>
        <Container
          className={className}
          ref={ref}
          isShowFilters={isShowFilters}
        >
          <QuizWrapper>
            <Quiz
              isVisible={isShowStep}
              onRequestClose={onQuizClose}
              quiz={quiz}
              currentStep={currentStep}
              onChangeCurrentStep={setCurrentStep}
              onChangeQuiz={onChangeQuiz}
              quizOffset={quizOffset as number}
            />
          </QuizWrapper>
          {quiz && <Tabs steps={quiz.steps} onOpen={onQuizOpen} />}
        </Container>
      </>
    )
  },
)

export const HeaderMobile: FC<
  Omit<
    Props,
    | 'onQuizClose'
    | 'onChangeQuiz'
    | 'isShowShadow'
    | 'isShowFilters'
    | 'currentStep'
    | 'setCurrentStep'
  >
> = ({ quiz, onQuizOpen, isShowStep, onCloseAlert, isAlert }) => {
  const regionGroupsStep = quiz?.steps.find(
    ({ type }) => type === StepType.REGIONGROUPS,
  ) as StepRegionGroups | undefined

  const { x, y, reference, floating, strategy } = useFloating({
    middleware: [offset(20), autoPlacement(), shift()],
  })

  const region =
    regionGroupsStep?.result?.regionGroups
      ?.map(({ name }) => {
        const [city, region] = name.split(', ')
        return `${city} (${region})`
      })
      .join(', ') || 'United States'

  return (
    <SubHeaderMobile>
      <Title
        onClick={regionGroupsStep && (() => onQuizOpen(regionGroupsStep.id))}
        ref={reference}
      >
        <LocationIcon />
        <City>{region}</City>
        <ButtonArrowLocation>
          <ChevronIcon direction={isShowStep ? 'top' : 'bottom'} />
        </ButtonArrowLocation>
      </Title>
      {isAlert && (
        <Alert
          ref={floating}
          style={{ position: strategy, top: y ?? '', left: x ?? '' }}
          onClick={onCloseAlert}
        />
      )}
    </SubHeaderMobile>
  )
}

const Container = styled.div<{ isShowFilters: boolean }>`
  margin: 0 -1.6rem;
  padding: 0 1.6rem;

  ${mobileMedia} {
    padding: 2.4rem 0 0 1.6rem;

    background: ${getColorTheme('earth')};
  }

  transition: top 0.5s ease;

  ${notMobileMedia} {
    ${(props) =>
      props.isShowFilters
        ? `
      padding: 1.6rem 1.6rem 0;
      
      position: sticky;
      top: 5.2rem;
      left: -1.6rem;
      right: -1.6rem;
      
      z-index: 90;
      
      background: ${getColorTheme('earth')(props)};
      border-radius: 0 0 2.4rem 2.4rem;
      box-shadow: 0 4px 12px rgba(158, 169, 178, 0.08), 0 2px 4px rgba(0, 0, 0, 0.08), 0 3.78px 33.4221px rgba(0, 0, 0, 0.08);
      
      & > div {
        background: ${getColorTheme('earth')(props)};
      }`
        : `
      background: ${getColorTheme('sun50')(props)};
      `}
  }
`
const QuizWrapper = styled.div`
  ${mobileMedia} {
    display: none;
  }
`
const SubHeader = styled.div<{ isShowShadow: boolean; isShowFilters: boolean }>`
  padding: 1.4rem 1.4rem 1.4rem 2.5rem;

  display: flex;
  justify-content: space-between;

  ${({ isShowShadow, isShowFilters }) =>
    isShowShadow && !isShowFilters
      ? 'box-shadow: 0 4px 12px rgba(158, 169, 178, 0.08), 0 2px 4px rgba(0, 0, 0, 0.08), 0 3.78px 33.4221px rgba(0, 0, 0, 0.08);'
      : ''}

  ${notMobileMedia} {
    margin: 0 -1.6rem;
    position: sticky;
    top: 0;
    left: -1.6rem;
    right: -1.6rem;
    z-index: 100;
  }

  background: ${getColorTheme('earth')};
  border-radius: 2.4rem;

  ${mobileMedia} {
    display: none;
  }
`
const SubHeaderMobile = styled.div`
  ${notMobileMedia} {
    display: none;
  }

  ${mobileMedia} {
    width: 100%;
    padding: 0.8rem;

    position: fixed;
    top: 0;
    left: 0;
    right: 0;

    background: transparent;
  }
`
const SubHeaderText = styled.div`
  display: flex;
  align-items: center;

  ${mobileMedia} {
    display: none;
  }

  font-size: 2.8rem;
  line-height: 3.6rem;
  color: ${getColorTheme('sun1000')};
`
const TitleWrapper = styled.div``

const Title = styled(NormalizedButton)`
  padding: 0.8rem 1.6rem;

  display: flex;
  align-items: center;
  gap: 1.1rem;

  border: 1px solid #e2e5ec;
  border-radius: 1.2rem;

  ${headerChangeMediaSecond} {
    width: 32rem;
  }

  ${mobileMedia} {
    width: 100%;
    background: ${getColorTheme('earth')};
  }
`
const LocationIcon = styled(LocationIconBase)`
  flex-shrink: 0;

  fill: ${getColorTheme('sun500')};
`
const City = styled.div`
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 2.4rem;
  color: #12151f;

  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;

  ${mobileMedia} {
    line-height: 2.2rem;
  }
`
const ButtonArrowLocation = styled.div`
  width: 2.4rem;
  height: 2.4rem;
  margin-left: auto;

  background: #ffffff;
  border-radius: 3.2rem;

  transition: ${HOVER_TRANSITION_TIME};

  ${Title}:hover & {
    box-shadow: 0 4px 12px rgba(158, 169, 178, 0.08),
      0 2px 4px rgba(0, 0, 0, 0.08), 0 3.78px 33.4221px rgba(0, 0, 0, 0.08);
  }

  display: flex;
  align-items: center;
  justify-content: center;
`
