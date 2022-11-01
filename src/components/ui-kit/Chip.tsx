import styled from '@emotion/styled'

import { NormalizedButton } from '@/components/ui-kit/Button'

export const Chip = styled(NormalizedButton)`
  height: 40px;
  padding: 0 16px;

  display: grid;
  gap: 10px;
  grid-auto-flow: column;
  align-items: center;

  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  background-color: ${(props) => props.theme.moon};
  border-radius: 16px;

  font-size: 16px;
  line-height: 20px;
  letter-spacing: -0.06em;
  color: ${(props) => props.theme.sun};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.mercury};
  }
`
