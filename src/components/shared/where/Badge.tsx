import styled from '@emotion/styled'

import { getColorTheme } from '@/styles/themes'

export const Badge = styled.div`
  padding: 0 0.8rem;
  height: 2rem;

  display: flex;
  align-items: center;

  background: ${getColorTheme('sun200')};
  border-radius: 2.4rem;

  font-weight: 500;
  font-size: 1.2rem;
  line-height: 1.6rem;
  letter-spacing: -0.04em;
  color: ${getColorTheme('sun1000')};

  white-space: nowrap;
`
