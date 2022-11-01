import { FC, Fragment, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'

import { Alert } from '@/components/shared/Alert'
import { SharePopup as SharePopupBase } from '@/components/shared/ShareDropdown'
import {
  Option,
  Options as OptionsBase,
} from '@/components/ui-kit/form/Options'
import { AlertIcon, CrossInCircleIcon, ShareIcon } from '@/images'
import {
  DELIMETR,
  Quiz,
  StepBubbles,
  StepLocations,
  StepType,
} from '@/modules/quiz'
import { ROUTES } from '@/modules/router'
import { API_HOST } from '@/modules/utils/config'
import { useOutsideClick } from '@/modules/utils/use-outside-click'
import { HOVER_TRANSITION_TIME } from '@/styles/const'
import { mobileMedia, notMobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

import { useRemoveQuizWithUndo } from './toast'

type Props = {
  className?: string
  quiz: Quiz
  onEnter: (quizId: string) => void
  onLeave: () => void
}

export const Card: FC<Props> = ({ quiz, onEnter, onLeave, ...props }) => {
  const router = useRouter()
  const { locations, results, factors } = useMemo(() => {
    const locationsStep = quiz.steps.find(
      ({ type }) => type === StepType.LOCATIONS,
    ) as StepLocations | undefined
    const locations = locationsStep?.result?.features

    const factorsStep = quiz.steps.find(
      ({ type }) => type === StepType.BUBBLES,
    ) as StepBubbles | undefined
    const factors =
      (factorsStep?.result?.choices
        .map(
          (id) =>
            factorsStep?.payload.bubbles.find(({ choiceId }) => choiceId === id)
              ?.title,
        )
        .filter((x) => x) as string[]) ?? []

    const otherSteps = quiz.steps.filter(
      ({ type }) => ![StepType.BUBBLES, StepType.LOCATIONS].includes(type),
    )
    const results = otherSteps
      .map((step) => {
        let result = null
        switch (step.type) {
          case StepType.SELECT: {
            result =
              step.payload.options.find(
                ({ value }) => value === step.result?.filter,
              )?.tabName ?? null
            break
          }
          case StepType.MULTISELECT: {
            if (step.result?.filters) {
              const filtered = step.payload.options.filter(({ value }) => {
                return step.result?.filters.includes(value)
              })
              result =
                filtered.length > 0
                  ? filtered.map(({ tabName }) => tabName).join(', ') ?? null
                  : null
            } else {
              result = null
            }
            break
          }
          case StepType.TABSLIDERS: {
            if (step.result?.value) {
              result =
                step.payload.name.replace(DELIMETR, String(step.result.value)) +
                '$'
            } else {
              result = null
            }
            break
          }
          default:
            result = null
        }

        return { id: step.id, result }
      })
      .filter(({ result }) => result !== null) as Array<{
      id: string
      result: string
    }>
    return { locations, results, factors }
  }, [quiz])
  const [isShowSharePopup, setIsShowSharePopup] = useState(false)
  const closeSharePopup = () => setIsShowSharePopup(false)
  const openSharePopup = () => setIsShowSharePopup(true)
  const refRoot = useOutsideClick<HTMLDivElement>(closeSharePopup)
  const resultUrl = ROUTES.whereResult.calcUrl({ id: quiz.id })
  const [isShowAlert, setIsShowAlert] = useState(false)
  const isBreakChangesInQuiz = quiz.state === 'IRRELEVANT'
  const isMinorChangesInQuiz = quiz.state === 'STALE'

  const removeQuiz = useRemoveQuizWithUndo(quiz.id, 5000)

  const content = (
    <Container
      {...props}
      onMouseEnter={() => onEnter(quiz.id)}
      onMouseLeave={onLeave}
      onClick={() => isBreakChangesInQuiz && setIsShowAlert(true)}
    >
      <Wrapper>
        <Alert
          isVisible={isShowAlert}
          onRequestClose={setIsShowAlert}
          onClick={() => router.push(ROUTES.whereQuiz.calcUrl())}
          image={<AlertIcon />}
          title={
            'We have big update of Where and you need to pass the quiz again'
          }
          onCancel={(event) => {
            setIsShowAlert(false)
            event.stopPropagation()
          }}
          buttonText={'Okay'}
        />
        <LocationWrapper>
          {isBreakChangesInQuiz && <Label>There are updates in quiz</Label>}
          {isMinorChangesInQuiz && (
            <Label>There are updates in feature scores</Label>
          )}
          <MainLocation>{quiz.result?.searchAreas.join(', ')}</MainLocation>
          {isShowSharePopup && (
            <SharePopup
              ref={refRoot}
              url={`${API_HOST}${resultUrl}`}
              contentType={'match'}
              onClose={closeSharePopup}
              onClick={(event) => event.stopPropagation()}
            />
          )}
          {locations && locations.length > 0 && (
            <Location>
              <WrapperLocationText
                title={String(locations[0]?.properties?.fullAddress)}
              >
                Nearby: {locations[0]?.properties?.fullAddress}
              </WrapperLocationText>
              {locations.length > 1 && (
                <Counter>+{locations.length - 1}</Counter>
              )}
            </Location>
          )}
        </LocationWrapper>
        <Options
          onOpenChange={closeSharePopup}
          onClick={(event) => event.stopPropagation()}
        >
          <Option
            icon={<CrossInCircleIcon style={{ width: '20px' }} />}
            onClick={removeQuiz}
          >
            Delete from history
          </Option>
          <Option
            icon={<ShareIcon style={{ width: '20px' }} />}
            onClick={openSharePopup}
          >
            Share quiz results
          </Option>
        </Options>
      </Wrapper>
      <Results>
        {results.map(({ id, result }, index, array) => (
          <Fragment key={id}>
            {array.length - 1 === index ? (
              result
            ) : (
              <>
                {result}
                <Point />
              </>
            )}
          </Fragment>
        ))}
      </Results>
      <Factors>
        {factors.map((factor) => (
          <Factor key={factor}>{factor}</Factor>
        ))}
      </Factors>
    </Container>
  )
  if (isBreakChangesInQuiz) {
    return content
  }
  return (
    <Link href={resultUrl} passHref shallow>
      {content}
    </Link>
  )
}

const Container = styled.div`
  padding: 1.6rem;

  display: block;

  transition: ${HOVER_TRANSITION_TIME};

  background: ${getColorTheme('earth')};
  &:hover {
    box-shadow: 0 0.4rem 1.2rem rgba(158, 169, 178, 0.08),
      0 0.2rem 0.4rem rgba(0, 0, 0, 0.08),
      0 0.378rem 3.34221rem rgba(0, 0, 0, 0.08);
  }
  border-radius: 1.2rem;

  cursor: pointer;
`
const LocationWrapper = styled.div``
const Wrapper = styled.div`
  margin-bottom: 1.2rem;

  position: relative;

  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
`
const MainLocation = styled.div`
  margin-bottom: 0.2rem;

  font-weight: 500;
  font-size: 2rem;
  line-height: 2.4rem;
  letter-spacing: -0.04em;
  color: ${getColorTheme('sun')};
`
const Location = styled.div`
  display: flex;

  font-size: 1.4rem;
  line-height: 2rem;
  color: ${getColorTheme('sun')};

  ${mobileMedia} {
    align-items: center;
  }
`
const Factors = styled.div`
  margin-right: -0.6rem;
  margin-bottom: -0.6rem;

  display: flex;
  flex-wrap: wrap;
`
const Factor = styled.div`
  padding: 0 0.8rem;
  height: 2rem;
  margin-bottom: 0.6rem;
  margin-right: 0.6rem;

  display: flex;
  align-items: center;

  background: ${getColorTheme('moon')};
  border-radius: 1.2rem;
`
const Counter = styled.div`
  margin-left: 0.4rem;
  padding: 0 0.4rem;

  display: flex;
  align-items: center;

  background: #e2e6ec;
  border-radius: 50%;

  font-weight: 500;
  font-size: 1.2rem;
  line-height: 1.6rem;
  letter-spacing: -0.04em;
  color: ${getColorTheme('sun')};
`
const WrapperLocationText = styled.div`
  height: 1.9rem;

  overflow: hidden;

  text-overflow: ellipsis;
  white-space: nowrap;

  ${mobileMedia} {
    display: inline-block;
  }
  ${notMobileMedia} {
    text-align: left;
  }
`
const Results = styled.div`
  margin-bottom: 0.8rem;

  display: flex;
  align-items: center;
  flex-wrap: wrap;

  font-size: 1.4rem;
  line-height: 2rem;
  color: ${getColorTheme('sun')};
`
const Point = styled.div`
  margin: 0 0.6rem;
  height: 0.4rem;
  width: 0.4rem;

  background-color: ${getColorTheme('sun')};
  border-radius: 50%;
`
const Options = styled(OptionsBase)``
const SharePopup = styled(SharePopupBase)`
  position: absolute;
  top: 0;
  right: 0;

  z-index: 100;
`
const Label = styled.span`
  height: 2rem;
  padding: 0 0.8rem;
  margin-bottom: 0.6rem;

  display: inline-flex;
  align-items: center;

  background: #f58648;
  border-radius: 2.4rem;

  font-weight: 500;
  font-size: 1.2rem;
  line-height: 1.6rem;
  letter-spacing: -0.04em;
  color: #ffffff;
`
