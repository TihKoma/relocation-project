import { FC, useMemo } from 'react'
import styled from '@emotion/styled'

import { reactionsEmojis } from '@/images/reactions'
import { Reactions } from '@/modules/feed'
import { ReactionType } from '@/modules/reaction'

type Props = {
  reactions?: Reactions
  className?: string
}

export const ReactionsCounter: FC<Props> = ({ className, reactions }) => {
  const reactionsList: JSX.Element[] = useMemo(() => {
    if (!reactions) {
      return []
    }

    const filteredReactions: [string, number][] = Object.entries(
      reactions,
    ).filter(([key]) => key !== 'total' && key !== '__typename')
    return filteredReactions
      .sort(([, aValue], [, bValue]) => bValue - aValue)
      .reduce((acc, [key, value]) => {
        const reactionName = key.toUpperCase() as ReactionType
        const Emoji = reactionsEmojis?.find(
          (item) => item.type === reactionName,
        )?.Emoji

        if (value && Emoji) {
          acc.push(
            <Reaction key={key}>
              <Emoji />
            </Reaction>,
          )
        }

        return acc
      }, [] as JSX.Element[])
  }, [reactions])

  const total = reactions?.total || 0

  return (
    <ReactionsList className={className} reactionsCount={reactionsList.length}>
      {total > 0 && (
        <>
          <ReactionsTypes>{reactionsList}</ReactionsTypes>
          <Counter>{total}</Counter>
        </>
      )}
    </ReactionsList>
  )
}

const ReactionsList = styled.div<{ reactionsCount: number }>`
  display: flex;
  align-items: center;
  z-index: 0;
`
const Counter = styled.div`
  letter-spacing: -0.04em;
  font-size: 14px;
  line-height: 18px;
  color: rgba(0, 0, 0, 0.2);
  color: #9ea9b2;
`
const ReactionsTypes = styled.div`
  margin-right: 0.4rem;

  display: flex;
  flex-direction: row-reverse;
`
const Reaction = styled.div`
  display: flex;
  align-items: center;

  :nth-of-type(n + 2) {
    margin-left: -0.8rem;
  }
  :nth-of-type(1) {
    order: 5;
  }
  :nth-of-type(2) {
    order: 4;
  }
  :nth-of-type(3) {
    order: 3;
  }
  :nth-of-type(4) {
    order: 2;
  }
  :nth-of-type(5) {
    order: 1;
  }
`
