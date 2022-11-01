import { VFC } from 'react'
import styled from '@emotion/styled'

import {
  PlaceholderRegion1,
  PlaceholderRegion2,
  PlaceholderRegion3,
} from '@/images/placeholder-region'
import { getColorTheme } from '@/styles/themes'

type Props = {
  src: string | null
  className?: string
  index: number
}

const placeholders = [
  PlaceholderRegion1.src,
  PlaceholderRegion2.src,
  PlaceholderRegion3.src,
]

export const Preview: VFC<Props> = ({ index, src, className }) => {
  return (
    <Image
      className={className}
      isPlaceholder={src === null}
      src={src ?? placeholders[index % placeholders.length]}
      loading={'lazy'}
    />
  )
}

const Image = styled.img<{ isPlaceholder: boolean }>`
  width: 100%;
  height: 100%;

  ${({ isPlaceholder }) =>
    isPlaceholder
      ? `
    padding: 16px;
    object-fit: contain;
  `
      : 'object-fit: cover;'}

  background-color: ${getColorTheme('milkyway')};

  border-radius: 12px;
`
