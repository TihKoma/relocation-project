import { FC, ReactNode } from 'react'
import styled from '@emotion/styled'

import { mobileMedia } from '@/styles/media'
import { SCROLLBAR_DISPLAY_NONE_MIXIN } from '@/styles/mixins'
import { getColorTheme } from '@/styles/themes'

type Props = {
  legend: string
  grow?: boolean
  withHorizontalScroll?: boolean
  children: ReactNode
}

export const PropertyFiltersFieldset: FC<Props> = ({
  children,
  legend,
  grow,
  withHorizontalScroll,
}) => {
  return (
    <Fieldset>
      <Legend>{legend}</Legend>
      <Content grow={grow} withHorizontalScroll={withHorizontalScroll}>
        {children}
      </Content>
    </Fieldset>
  )
}

const Fieldset = styled.fieldset`
  display: grid;
  margin: 0;
  padding: 0;

  border: none;
`
const Legend = styled.legend`
  color: ${getColorTheme('sun')};
  line-height: 2.4rem;
  letter-spacing: -0.04em;
`
const Content = styled.div<Omit<Props, 'legend'>>`
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;

  padding-top: 1.2rem;
  padding-bottom: 2.4rem;

  ${({ grow }) =>
    grow &&
    `
    & > * {
      flex-grow: 1;
    }
  `}

  ${mobileMedia} {
    flex-wrap: nowrap;
    overflow-x: auto;
    ${SCROLLBAR_DISPLAY_NONE_MIXIN}

    ${({ withHorizontalScroll }) =>
      withHorizontalScroll &&
      `
      margin: 0 -1.6rem;

      & > * {
        flex-shrink: 0;

        &:first-of-type {
          margin-left: 1.6rem;
        }

        &:last-of-type {
          margin-right: 1.6rem;
        }
      }
    `}
  }
`
