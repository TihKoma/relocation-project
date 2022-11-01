import { useEffect, useMemo, useRef, VFC } from 'react'
import styled from '@emotion/styled'
import { useController } from 'react-hook-form'

import { SwitchButton as SwitchButtonBase } from '@/components/ui-kit/SwitchButton'
import { QuizStepSliderType, StepSlider } from '@/modules/quiz'
import { formatPrice } from '@/modules/utils/formatPrice'
import { mobileMedia } from '@/styles/media'

import { Slider } from './Slider'

type Props = {
  step: StepSlider
}

export const Price: VFC<Props> = ({
  step: {
    id,
    payload: { tabs },
  },
}) => {
  const { field } = useController({ name: id })
  const value = useMemo(() => {
    if (!field.value?.type) {
      return { type: QuizStepSliderType.RENT, value: 0 }
    }
    return field.value
  }, [field.value])

  const tabValueRef = useRef(
    useMemo(
      () => ({
        ...tabs.reduce((acc, { slider }) => {
          acc[slider.type] = 0
          return acc
        }, {} as Record<QuizStepSliderType, number>),
        [value.type]: value.value,
      }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [],
    ),
  )

  useEffect(() => {
    tabValueRef.current = {
      ...tabValueRef.current,
      [value.type]: value.value,
    }
  }, [value])

  const onChange = (type: QuizStepSliderType, value?: number) => {
    const newTabValue = {
      value: value ?? tabValueRef.current[type],
      type,
    }
    tabValueRef.current = {
      ...tabValueRef.current,
      [newTabValue.type]: newTabValue.value,
    }
    field.onChange(newTabValue)
  }

  const currentTab = tabs.find(
    ({ slider }) => slider.type === value.type,
  ) as StepSlider['payload']['tabs'][number]

  const tabsToRender = tabs.map(({ slider }) => ({
    name: `${slider.type.charAt(0)}${slider.type.slice(1).toLowerCase()}`,
    type: slider.type,
  }))

  return (
    <Container>
      <SwitchButton
        activeTab={value?.type}
        tabs={tabsToRender}
        onChange={(type) => onChange(type as QuizStepSliderType)}
      />
      <>
        <SubTitle>Up to</SubTitle>
        <Title>
          {value.value
            ? `$${formatPrice(value.value)}${
                value.value === currentTab.slider.maxVal ? '+' : ''
              }`
            : 'Doesn’t matter'}
        </Title>
        <Slider
          max={currentTab.slider.maxVal}
          step={currentTab.slider.stepLen}
          value={value.value}
          onChange={(newValue) => onChange(value.type, newValue)}
        />
        <LegendsContainer>
          <Legend>${formatPrice(currentTab.slider.stepLen)}</Legend>
          <Legend>${formatPrice(currentTab.slider.maxVal / 2)}</Legend>
          <Legend>${formatPrice(currentTab.slider.maxVal)}</Legend>
        </LegendsContainer>
      </>
    </Container>
  )
}

const Container = styled.div``

const SwitchButton = styled(SwitchButtonBase)`
  margin-bottom: 3.2rem;

  ${mobileMedia} {
    margin-bottom: 2.4rem;
    height: 4rem;

    font-size: 1.6rem;

    & > div {
      height: 3.2rem;
    }
  }
`

const Title = styled.div`
  margin-bottom: 2.4rem;

  user-select: none;

  font-weight: 500;
  font-size: 2.8rem;
  line-height: 3.6rem;
  text-align: center;
  letter-spacing: -0.04em;
  color: #3f37c9;
  ${mobileMedia} {
    font-size: 2.4rem;
    line-height: 2.8rem;
  }
`
const SubTitle = styled.div`
  margin-bottom: 0.4rem;

  user-select: none;

  font-weight: 500;
  font-size: 1.6rem;
  line-height: 2.2rem;
  text-align: center;
  letter-spacing: -0.04em;
  color: #3f37c9;
`
const LegendsContainer = styled.div`
  padding: 0 2.1rem;
  margin-bottom: 1rem;

  display: flex;
  justify-content: space-between;

  user-select: none;
`
const Legend = styled.div`
  user-select: none;

  font-size: 1.4rem;
  line-height: 2rem;
  color: #9ea9b2;
`
