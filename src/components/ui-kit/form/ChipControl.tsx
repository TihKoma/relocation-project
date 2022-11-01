import { forwardRef, ReactNode } from 'react'
import styled from '@emotion/styled'

import { getColorTheme } from '@/styles/themes'

type Props = {
  type: 'checkbox' | 'radio'
  children?: ReactNode
  iconLeft?: ReactNode
  iconRight?: ReactNode
  'data-test-id'?: string
} & JSX.IntrinsicElements['input']

export const ChipControl = forwardRef<HTMLInputElement, Props>(
  (
    {
      type,
      children,
      iconLeft,
      iconRight,
      'data-test-id': dataTestId = 'ChipControl',
      ...rest
    },
    ref,
  ) => {
    return (
      <Wrapper>
        <VisuallyHiddenInput
          type={type}
          ref={ref}
          data-test-id={`${dataTestId}:input`}
          {...rest}
        />
        <Container>
          {iconLeft}
          <div>{children}</div>
          {iconRight}
        </Container>
      </Wrapper>
    )
  },
)

const Wrapper = styled.label`
  display: inline-block;
`
const Container = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  column-gap: 0.8rem;

  padding: 0.8rem 2.2rem;

  background: ${getColorTheme('earth')};
  border: 2px solid ${getColorTheme('milkyway')};
  border-radius: 36px;

  color: ${getColorTheme('sun')};
  line-height: 2.4rem;
  font-weight: 500;
  cursor: pointer;
`
const VisuallyHiddenInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(50%);
  overflow: hidden;

  &:checked + ${Container} {
    border-color: ${getColorTheme('neptune')};
    color: ${getColorTheme('neptune')};

    svg {
      fill: ${getColorTheme('neptune')};
    }
  }

  @media (hover: hover) {
    &:hover {
      & + ${Container} {
        border-color: transparent;
        box-shadow: 0px 2px 4px rgba(18, 21, 31, 0.08),
          0px 4px 16px 1px rgba(18, 21, 31, 0.08);
      }
    }
  }
`
