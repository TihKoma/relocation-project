import { FC } from 'react'
import styled from '@emotion/styled'

import { getColorTheme } from '@/styles/themes'

import { SearchHistory } from '../SearchHistory'

type Props = {
  onClick?: () => void
  hideSearchHistory: () => void
}

export const SearchHistoryPopup: FC<Props> = ({
  onClick,
  hideSearchHistory,
}) => {
  return (
    <Container>
      <SearchHistory onClick={onClick} hideSearchHistory={hideSearchHistory} />
    </Container>
  )
}

const Container = styled.div`
  width: 100%;

  background: ${getColorTheme('earth')};
  border-radius: 1.2rem;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.08),
    0px 3.78px 33.4221px rgba(0, 0, 0, 0.0503198),
    0px 41.7776px 33.4221px rgba(0, 0, 0, 0.0503198);
`
