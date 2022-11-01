import { css } from '@emotion/css'
import styled from '@emotion/styled'

import { NormalizedButton } from '@/components/ui-kit/Button'
import { CrossInCircleIcon as CrossInCircleIconBase } from '@/images'
import { getColorTheme } from '@/styles/themes'

export const titleSelectedAddresses = `Choose a landmark`
export const titleSelectedRegions = `Choose a place`

export const highlightClassName = css`
  color: #12151f;
`

export const List = styled.ul`
  margin: 0 0 2.4rem 0;
  padding: 0;

  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`

export const Item = styled.li`
  padding: 0.8rem 1.6rem;

  border: 2px solid ${getColorTheme('neptune')};
  border-radius: 1.2rem;

  color: ${getColorTheme('neptune')};

  display: grid;
  gap: 0.2rem 0.8rem;
  grid-template-rows: auto auto;
  grid-template-columns: 1fr 2.4rem;
`
export const CrossButton = styled(NormalizedButton)`
  grid-row: span 2;
  align-self: center;
  justify-self: flex-start;
`

export const CrossInCircleIcon = styled(CrossInCircleIconBase)`
  stroke: ${getColorTheme('neptune')};

  & path {
    fill: ${getColorTheme('neptune')};
    stroke: ${getColorTheme('neptune')};
  }
`

export const SelectedItemTitle = styled.div`
  margin-bottom: 0.2rem;

  font-size: 1.6rem;
  line-height: 2.4rem;
`

export const SelectedItemSubTitle = styled.div`
  font-size: 1.4rem;
  line-height: 2rem;
`

export const TitleModal = styled.div`
  margin-bottom: 1.6rem;

  position: relative;

  font-weight: 500;
  font-size: 2.8rem;
  line-height: 3.6rem;
  letter-spacing: -0.04em;
  color: #12151f;
`
export const SubTitleMobile = styled.div`
  margin-bottom: 2.4rem;

  font-size: 1.6rem;
  line-height: 2.4rem;
  letter-spacing: -0.04em;
`

export const Title = styled.div`
  margin-bottom: 0.2rem;

  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 1.6rem;
  line-height: 2.2rem;
  letter-spacing: -0.04em;
  color: ${getColorTheme('mercury')};
`
export const SubTitle = styled.div`
  height: 2rem;

  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 1.4rem;
  line-height: 2rem;
  color: ${getColorTheme('davida')};
`
