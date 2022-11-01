import { VFC } from 'react'
import styled from '@emotion/styled'

import { NormalizedButton } from '@/components/ui-kit/Button'
import { StepSelect } from '@/modules/quiz'
import { mobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

type Value = Array<StepSelect['payload']['options'][number]['value']>
type Props = {
  value: Value
  options: StepSelect['payload']['options']
  subtitle: string
  onChange: (ids: Value) => void
}
export const ChooseWayBase: VFC<Props> = ({
  value,
  onChange,
  subtitle,
  options,
}) => {
  return (
    <Wrapper>
      <StepSubtitle>{subtitle}</StepSubtitle>
      <Container>
        {options.map((option) => {
          const isActive = value.includes(option.value)
          return (
            <List key={option.value}>
              <Item
                isActive={isActive}
                onClick={() => {
                  if (isActive) {
                    onChange(value.filter((id) => id !== option.value))
                  } else {
                    onChange([...value, option.value])
                  }
                }}
              >
                <Icon src={option.image} />
                <TextWrapper>
                  {option.title}
                  <Subtitle isActive={isActive}>{option.subtitle}</Subtitle>
                </TextWrapper>
              </Item>
            </List>
          )
        })}
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled.div``

const Container = styled.div`
  padding-top: 2.4rem;

  display: flex;
  flex-direction: column;

  gap: 2.4rem;

  font-size: 2rem;
  line-height: 2.4rem;
  text-align: center;
  letter-spacing: -0.04em;
  color: #12151f;

  ${mobileMedia} {
    gap: 1.6rem;

    font-size: 1.6rem;
    line-height: 2.2rem;
  }
`
const hoverStyle = `
  box-shadow: 0px 4px 16px 1px rgba(18, 21, 31, 0.08),
   0px 2px 4px 0px rgba(18, 21, 31, 0.08);
`
const StepSubtitle = styled.div`
  margin-top: 2.4rem;

  font-weight: 500;
  font-size: 2.8rem;
  line-height: 3.6rem;

  ${mobileMedia} {
    margin-top: 0;
    font-size: 2rem;
    line-height: 2.4rem;
  }
`

const List = styled.div``
const Item = styled(NormalizedButton)<{ isActive: boolean }>`
  width: 100%;
  padding: 3.3rem;

  display: flex;
  align-items: center;
  gap: 2.5rem;

  position: relative;

  background: #ffffff;
  border: ${(props) =>
    props.isActive
      ? `0.2rem solid ${getColorTheme('neptune600')(props)}`
      : `0.2rem solid ${getColorTheme('milkyway')(props)}`};
  border-radius: 1.2rem;

  transition: 225ms;

  font-size: 2rem;
  line-height: 2.4rem;
  font-weight: 500;

  ${mobileMedia} {
    padding: 1.6rem;

    gap: 1.2rem;

    font-size: 1.6rem;
    line-height: 2.2rem;
  }

  &:hover {
    ${hoverStyle}
  }

  ${(props) =>
    props.isActive
      ? `
    img {
      filter: brightness(0) saturate(100%) invert(16%) sepia(78%) saturate(4730%) hue-rotate(245deg) brightness(83%) contrast(89%);
    }
    color: ${getColorTheme('neptune600')(props)};`
      : ''}
`
const Icon = styled.img`
  width: 6.4rem;
  height: 6.4rem;

  ${mobileMedia} {
    width: 4.8rem;
    height: 4.8rem;
  }
`

const TextWrapper = styled.div`
  display: block;
  text-align: start;
`

const Subtitle = styled.div<{ isActive: boolean }>`
  margin-top: 0.4rem;

  font-size: 1.6rem;
  line-height: 2.4rem;
  font-weight: 400;
  color: #9ea3b2;

  ${mobileMedia} {
    font-size: 1.4rem;
    line-height: 2rem;
  }

  ${(props) =>
    props.isActive
      ? `
    color: ${getColorTheme('neptune600')(props)};`
      : ''}
`
