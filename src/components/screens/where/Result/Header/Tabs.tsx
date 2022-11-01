import { VFC } from 'react'
import styled from '@emotion/styled'

import { haveSomeAnswer } from '@/components/screens/where/Result/BannerByResultSteps'
import { NormalizedButton } from '@/components/ui-kit/Button'
import { ChevronIcon, SettingsIcon } from '@/images'
import { DELIMETR, Quiz, StepType } from '@/modules/quiz'
import { HOVER_TRANSITION_TIME } from '@/styles/const'
import { mobileMedia, notMobileMedia } from '@/styles/media'
import { SCROLLBAR_DISPLAY_NONE_MIXIN } from '@/styles/mixins'
import { getColorTheme } from '@/styles/themes'

import { Counter } from './shared'

type Props = {
  steps: Quiz['steps']
  onOpen: (id: string) => void
}
export const Tabs: VFC<Props> = ({ steps, onOpen }) => {
  const id = steps.filter(({ type }) => type !== StepType.LOCATIONS)[0].id
  const stepsToRender = [
    ...steps.filter(
      ({ entity, result }) => entity !== 'place_type' && result === null,
    ),
    ...steps.filter(
      ({ entity, result }) => entity !== 'place_type' && result !== null,
    ),
  ]

  const someAnswer = haveSomeAnswer(
    stepsToRender.filter(({ type }) => type !== StepType.REGIONGROUPS),
  )

  return (
    <Container>
      <SettingsButtton onClick={() => onOpen(id)} someAnswer={someAnswer}>
        <SettingsIcon />
      </SettingsButtton>
      {stepsToRender.map((step) => {
        const {
          id,
          payload: { name, placeholder },
        } = step

        const otherProps = {
          key: id,
          onClick: () => onOpen(id),
          isShowPlaceholder: false,
        }

        switch (step.type) {
          case StepType.LOCATIONS: {
            return null
          }
          case StepType.REGIONGROUPS: {
            return null
          }
          case StepType.BUBBLES: {
            const choices = step.result?.choices
            if (!choices?.length) {
              return (
                <Tab {...otherProps} isShowPlaceholder>
                  <span>{placeholder}</span>
                  <ButtonArrow>
                    <ChevronIcon direction={'bottom'} />
                  </ButtonArrow>
                </Tab>
              )
            }
            const firstBubble = step.payload.bubbles.find(
              ({ choiceId }) => choiceId === choices[0],
            )
            return (
              <Tab {...otherProps}>
                {firstBubble?.title}
                {choices.length > 1 ? (
                  <Counter>+{choices.length - 1}</Counter>
                ) : null}
                <ButtonArrow>
                  <ChevronIcon direction={'bottom'} />
                </ButtonArrow>
              </Tab>
            )
          }
          case StepType.SELECT: {
            if (!step.result?.filter) {
              return (
                <Tab {...otherProps} isShowPlaceholder>
                  {placeholder}
                  <ButtonArrow>
                    <ChevronIcon direction={'bottom'} />
                  </ButtonArrow>
                </Tab>
              )
            }
            return (
              <Tab {...otherProps}>
                {step.payload.options.find(
                  ({ value }) => value === step.result?.filter,
                )?.tabName ?? ''}
                <ButtonArrow>
                  <ChevronIcon direction={'bottom'} />
                </ButtonArrow>
              </Tab>
            )
          }
          case StepType.MULTISELECT: {
            const filters = step.result?.filters
            if (!filters) {
              return (
                <Tab {...otherProps} isShowPlaceholder>
                  {placeholder}
                  <ButtonArrow>
                    <ChevronIcon direction={'bottom'} />
                  </ButtonArrow>
                </Tab>
              )
            }
            return (
              <Tab {...otherProps}>
                {step.payload.options.find(({ value }) =>
                  filters.includes(value),
                )?.tabName ?? ''}
                {filters.length > 1 ? (
                  <Counter>+{filters.length - 1}</Counter>
                ) : null}
                <ButtonArrow>
                  <ChevronIcon direction={'bottom'} />
                </ButtonArrow>
              </Tab>
            )
          }
          case StepType.TABSLIDERS: {
            if (!step.result?.type) {
              return (
                <Tab {...otherProps} isShowPlaceholder>
                  {placeholder}
                  <ButtonArrow>
                    <ChevronIcon direction={'bottom'} />
                  </ButtonArrow>
                </Tab>
              )
            }
            return (
              <Tab {...otherProps}>
                {name.replace(DELIMETR, String(step.result.value)) + '$'}
                <ButtonArrow>
                  <ChevronIcon direction={'bottom'} />
                </ButtonArrow>
              </Tab>
            )
          }
          default:
            // eslint-disable-next-line no-console
            console.error('have hot handler tab ')
            return null
        }
      })}
    </Container>
  )
}

const Container = styled.div`
  padding: 1.6rem 0;

  display: grid;
  gap: 0.8rem;
  grid-auto-flow: column;
  grid-auto-columns: max-content;

  overflow-x: scroll;

  ${notMobileMedia} {
    background: ${getColorTheme('sun50')};
  }

  ${mobileMedia} {
    padding: 0 1.6rem 1.6rem 0;

    grid-column: 3 span;

    -webkit-overflow-scrolling: touch;
  }

  ${SCROLLBAR_DISPLAY_NONE_MIXIN};
`
const Tab = styled(NormalizedButton)<{ isShowPlaceholder: boolean }>`
  padding: 0.8rem 1.2rem;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.7rem;

  background: #ffffff;
  border: ${(props) =>
    props.isShowPlaceholder
      ? `2px solid ${getColorTheme('sun200')(props)}`
      : `2px solid ${getColorTheme('neptune600')(props)}`};

  border-radius: 4rem;

  white-space: nowrap;
  font-weight: 500;
  font-size: 1.4rem;
  line-height: 2rem;

  transition: ${HOVER_TRANSITION_TIME};

  ${notMobileMedia} {
    &:hover {
      box-shadow: 0 4px 12px rgba(158, 169, 178, 0.08),
        0 2px 4px rgba(0, 0, 0, 0.08), 0 3.78px 12.4221px rgba(0, 0, 0, 0.08);
    }
  }
`

const ButtonArrow = styled.div`
  ${notMobileMedia} {
    width: 1rem;
    height: 0.8rem;

    background: #ffffff;
    border-radius: 3.2rem;

    transition: ${HOVER_TRANSITION_TIME};

    ${Tab}:hover & {
      box-shadow: 0 4px 12px rgba(158, 169, 178, 0.08),
        0 2px 4px rgba(0, 0, 0, 0.08), 0 3.78px 33.4221px rgba(0, 0, 0, 0.08);
    }
  }

  display: flex;
  align-items: center;
  justify-content: center;
`

const SettingsButtton = styled(NormalizedButton)<{ someAnswer: boolean }>`
  width: 4rem;
  height: 4rem;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #ffffff;
  border: ${(props) =>
    props.someAnswer
      ? `2px solid ${getColorTheme('neptune600')(props)}`
      : `2px solid ${getColorTheme('sun200')(props)};`};
  border-radius: 50%;

  transition: ${HOVER_TRANSITION_TIME};

  ${notMobileMedia} {
    &:hover {
      box-shadow: 0 4px 12px rgba(158, 169, 178, 0.08),
        0 2px 4px rgba(0, 0, 0, 0.08), 0 3.78px 12.4221px rgba(0, 0, 0, 0.08);
    }
  }
  ${mobileMedia} {
    display: none;
  }
`
