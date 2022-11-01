import { FC, ReactElement } from 'react'
import styled from '@emotion/styled'

import { NormalizedButton } from '@/components/ui-kit/Button'
import { getColorTheme } from '@/styles/themes'

type ButtonType = {
  name?: string
  type: string | number
  icon?: ReactElement
  counter?: number
  disabled?: boolean
}

type Props = {
  buttons: Array<ButtonType>
  groupStyle?: 'collapsed' | 'separate'
  'data-test-id'?: string
  onChange: (type: string | number) => void
  value: string | number
  className?: string
}

export const SegmentedButton: FC<Props> = ({
  value,
  buttons,
  groupStyle = 'collapsed',
  onChange,
  className,
  ...restProps
}) => {
  const dataTestId = restProps['data-test-id'] || 'segmentedButton'

  return (
    <Container groupStyle={groupStyle} className={className}>
      {buttons.map(({ name, type, icon, counter, disabled }) => {
        return (
          <Button
            key={type}
            onClick={() => onChange(type)}
            isActive={value === type}
            groupStyle={groupStyle}
            data-test-id={dataTestId}
            disabled={disabled}
            {...restProps}
          >
            {icon && icon}
            {name && name}
            {counter && <Counter>{counter}+</Counter>}
          </Button>
        )
      })}
    </Container>
  )
}

const Container = styled.div<{ groupStyle: 'collapsed' | 'separate' }>`
  height: 4rem;

  display: flex;

  font-size: 1.6rem;

  ${({ groupStyle }) => (groupStyle === 'separate' ? 'gap: 1.2rem' : '')}
`

const Button = styled(NormalizedButton)<{
  isActive: boolean
  groupStyle: 'collapsed' | 'separate'
}>`
  padding: 0.8rem;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  flex: 1 1 0;

  position: relative;

  border: ${(props) =>
    props.isActive
      ? `
      2px solid ${getColorTheme('neptune600')(props)};
      z-index: 1;
      `
      : `2px solid ${getColorTheme('sun200')(props)}`};

  ${({ groupStyle }) =>
    groupStyle === 'collapsed'
      ? `
        &:not(:last-of-type) {
          margin-right: -2px;
        }
        
        &:first-of-type {
          border-radius: 4rem 0 0 4rem;
        }
        &:last-of-type {
          border-radius: 0 4rem 4rem 0;
        }`
      : `border-radius: 4rem;`};

  &:hover {
    color: ${getColorTheme('neptune600')};
    border: ${(props) =>
      props.isActive
        ? `2px solid ${getColorTheme('pluto')(props)}`
        : `2px solid ${getColorTheme('neptune600')(props)}`};
    z-index: 1;

    & > div {
      color: ${getColorTheme('sun1000')};
    }

    & > svg > path {
      fill: ${getColorTheme('neptune600')};
    }
  }

  &:disabled {
    color: ${getColorTheme('sun500')};
    pointer-events: none;

    & > svg > path {
      fill: ${getColorTheme('sun500')};
    }
  }
`

const Counter = styled.div`
  padding: 0 0.4rem;

  display: flex;

  font-weight: 500;
  font-size: 1.4rem;
  line-height: 2rem;

  background: ${getColorTheme('sun200')};
  border-radius: 2.4rem;
`
