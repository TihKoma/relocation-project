import { VFC } from 'react'
import styled from '@emotion/styled'

import { CommentsCounterIcon } from '@/images'

type Props = {
  className?: string
  counter: number
}

export const CommentsCounter: VFC<Props> = ({ className, counter }) => {
  return (
    <Counter className={className}>
      {counter}
      <Icon />
    </Counter>
  )
}

const Counter = styled.div`
  font-size: 14px;
  color: #9ea9b2;
  display: flex;
  align-items: center;
`

const Icon = styled(CommentsCounterIcon)`
  margin-left: 0.7rem;
`
