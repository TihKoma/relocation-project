import { useMemo, VFC } from 'react'
import styled from '@emotion/styled'

import { CommentsCounter as CommentsCounterBase } from '@/components/shared/feed/FeedContent/Footer'
import { ReactionsCounter as ReactionsCounterBase } from '@/components/shared/feed/FeedContent/Footer/ReactionsCounter'
import { Reactions } from '@/modules/feed'

type Props = {
  userName: string
  text?: string
  commentsCounter?: number
  mediaSrc?: string
  reactions?: Reactions
  onClick?: () => void
}

export const MapPostContent: VFC<Props> = ({
  userName,
  text,
  commentsCounter,
  mediaSrc,
  reactions,
  onClick,
}) => {
  const reactionsCounter = useMemo(() => {
    return (
      reactions &&
      Object.values(reactions).reduce((accumulator, item) => {
        return typeof item === 'number' ? accumulator + item : accumulator
      }, 0)
    )
  }, [reactions])

  if (!userName || (!text && !mediaSrc)) {
    return null
  }

  const withCounters = !!(reactionsCounter || commentsCounter)

  return (
    <Popup onClick={onClick}>
      <UserName>{userName}</UserName>
      {mediaSrc && <Media mediaSrc={mediaSrc} />}
      {text && <Text>{text}</Text>}
      {withCounters && (
        <Counters>
          {reactionsCounter ? (
            <ReactionsCounter
              isInCenter={!commentsCounter}
              reactions={reactions}
            />
          ) : null}
          {commentsCounter ? (
            <CommentsCounter
              isInCenter={!reactionsCounter}
              counter={commentsCounter}
            />
          ) : null}
        </Counters>
      )}
    </Popup>
  )
}

const ReactionsCounter = styled(ReactionsCounterBase)<{ isInCenter: boolean }>`
  ${(props) => (props.isInCenter ? 'margin: auto;' : '')}
`
const CommentsCounter = styled(CommentsCounterBase)<{ isInCenter: boolean }>`
  ${(props) => (props.isInCenter ? 'margin: auto;' : '')}
`
const Popup = styled.div`
  width: 22.6rem;
  padding: 0.8rem 1.6rem;

  position: relative;

  display: grid;
  grid-auto-flow: row;
  gap: 0.8rem;

  background-color: white;
  box-shadow: 0px 2px 32px rgba(0, 0, 0, 0.0503198);
  border-radius: 12px;
  box-sizing: border-box;
  cursor: pointer;
  font-family: EuclidCircularA, Segoe UI, Roboto, sans-serif; //TODO: change .mapboxgl-map font
`
const Counters = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const UserName = styled.div`
  text-align: center;
  color: #9ea9b2;
  font-size: 12px;
  line-height: 15px;
`
const Text = styled.div`
  max-height: 3.6rem;
  margin: auto;

  display: -webkit-box;

  text-align: center;
  font-size: 14px;
  line-height: 18px;
  color: #12151f;
  word-break: break-word;

  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`

const Media = styled.div<{ mediaSrc: string }>`
  border-radius: 4px;
  width: 100%;
  height: 110px;
  background-image: url(${(props) => props.mediaSrc});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`
