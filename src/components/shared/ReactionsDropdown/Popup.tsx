import { FC } from 'react'
import styled from '@emotion/styled'

import { reactionsEmojis } from '@/images/reactions'
import { ReactionType } from '@/modules/reaction'

const Container = styled.div`
  height: 46px;
  padding: 0 16px;

  bottom: 12px;
  position: relative;

  display: flex;
  align-items: center;

  background: #fff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.08),
    0px 3.78px 33.4221px rgba(0, 0, 0, 0.0503198),
    0px 41.7776px 33.4221px rgba(0, 0, 0, 0.0503198);
  border-radius: 12px;
`

const List = styled.ul`
  display: grid;
  grid-auto-flow: column;
  column-gap: 16px;
  margin: 0;
  padding: 0;
  list-style-type: none;
  align-items: center;
`

const Reaction = styled.li`
  cursor: pointer;
`

type Props = {
  onClick: (id: ReactionType) => void
  onClose?: () => void
}

export const Popup: FC<Props> = ({ onClick, onClose }) => {
  return (
    <Container>
      <List>
        {reactionsEmojis?.map(({ type, Emoji }) => (
          <Reaction
            key={type}
            onClick={() => {
              onClick(type)
              onClose?.()
            }}
          >
            <Emoji />
          </Reaction>
        ))}
      </List>
    </Container>
  )
}
