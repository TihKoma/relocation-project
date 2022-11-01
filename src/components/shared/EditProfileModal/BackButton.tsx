import { FC, ReactNode } from 'react'
import styled from '@emotion/styled'

import { NormalizedButton } from '@/components/ui-kit/Button'
import { ArrowIcon } from '@/images'
import { mobileMedia } from '@/styles/media'

type Props = {
  onClick: () => void
  children: ReactNode
}
export const BackButton: FC<Props> = ({ onClick, children }) => {
  return (
    <Button onClick={onClick}>
      <ArrowIcon direction={'left'} />
      {children}
    </Button>
  )
}

const Button = styled(NormalizedButton)`
  padding: 1.6rem 2.4rem;

  display: grid;
  justify-content: start;
  align-items: center;
  gap: 1.6rem;
  grid-auto-flow: column;

  cursor: pointer;

  font-size: 2.8rem;

  ${mobileMedia} {
    font-size: 1.8rem;
  }
`
