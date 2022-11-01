import { FC, Fragment, useState } from 'react'
import Link from 'next/link'
import { useQuery } from '@apollo/client'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { usePopper } from 'react-popper'

import { Avatar } from '@/components/ui-kit/Avatar'
import { reactionsEmojis } from '@/images/reactions'
import { Reactions } from '@/modules/feed'
import { ReactionType } from '@/modules/reaction'
import { QUERY_LIST_REACTION } from '@/modules/reaction/graphql/queries'
import { ROUTES } from '@/modules/router'
import { getAbbreviatedTotalCount } from '@/modules/utils'

import { PAGINATION_LIMIT } from '../ReactionsModal/ReactionsModal'

const MAX_REACTION_COUNT = 5
const DELAY_HIDE_TOOLTIP = 300

export type UserReaction = {
  userId: number
  userName: string
  avatarSrc: string
  emoji: ReactionType
}

type TooltipProps = {
  triggerElement: HTMLElement | null
  onTotalCountClick: () => void
  onMouseEnter: () => void
  totalCount: number
  entityId: string
  closeTooltip: () => void
}

type Props = {
  onOtherReactionClick: () => void
  children: JSX.Element
  entityId: string
  reactions: Reactions
}

export const ReactionsTooltip: FC<Props> = ({
  reactions,
  onOtherReactionClick,
  children,
  entityId,
}) => {
  const totalCount = reactions.total

  let timerId: NodeJS.Timeout
  const isInputDataEmpty = !totalCount

  const [isOpen, setIsOpen] = useState(false)
  const [triggerElement, setTriggerElement] = useState<HTMLElement | null>(null)

  const open = () => setIsOpen(true)

  const close = () => {
    timerId = setTimeout(() => {
      setIsOpen(false)
    }, DELAY_HIDE_TOOLTIP)
  }

  const onTotalCountClick = () => {
    setIsOpen(false)
    onOtherReactionClick()
  }

  const onMouseEnter = () => clearTimeout(timerId)

  return (
    <>
      <TriggerContainer
        ref={setTriggerElement}
        onMouseOver={open}
        onMouseLeave={close}
        data-test-id={'reactions-tooltip:trigger-container'}
      >
        {children}
      </TriggerContainer>

      {isOpen && !isInputDataEmpty && (
        <Tooltip
          triggerElement={triggerElement}
          onTotalCountClick={onTotalCountClick}
          onMouseEnter={onMouseEnter}
          totalCount={totalCount}
          entityId={entityId}
          closeTooltip={close}
        />
      )}
    </>
  )
}

const Tooltip: FC<TooltipProps> = ({
  triggerElement,
  onTotalCountClick,
  onMouseEnter,
  totalCount,
  entityId,
  closeTooltip,
}) => {
  const [tooltipElement, setTooltipElement] = useState<HTMLElement | null>(null)
  const [arrowElement, setArrowElement] = useState<HTMLElement | null>(null)

  const abbreviatedTotalCount: string = `+${getAbbreviatedTotalCount(
    totalCount,
  )}`

  const { data } = useQuery(QUERY_LIST_REACTION, {
    variables: { entityId, limit: PAGINATION_LIMIT, position: 0 },
  })

  const { styles, attributes } = usePopper(triggerElement, tooltipElement, {
    placement: 'top',
    modifiers: [
      { name: 'arrow', options: { element: arrowElement } },
      {
        name: 'offset',
        options: {
          offset: [0, 5],
        },
      },
    ],
  })

  if (!data?.listReactionsByEntity) return <></>

  const reactionsList = (data?.listReactionsByEntity)
    .map((el) => {
      const Emoji = reactionsEmojis.find((e) => e.type === el.type)?.Emoji
      if (!Emoji) return <Fragment key={el.user.userId}></Fragment>

      return (
        <UserContainer
          key={el.user.userId}
          data-test-id={'reactions-tooltip:user'}
        >
          <Link
            href={ROUTES.publicProfile.calcUrl({ userName: el.user.userName })}
            passHref
            shallow
          >
            <Avatar src={el.user.photoUrl} css={AvatarStyle} />
          </Link>
          <EmojiContainer>
            <Emoji />
          </EmojiContainer>
        </UserContainer>
      )
    })
    .slice(0, MAX_REACTION_COUNT)

  return (
    <TooltipContainer
      ref={setTooltipElement}
      style={styles.popper}
      {...attributes}
      onMouseEnter={onMouseEnter}
      onMouseLeave={closeTooltip}
      data-test-id={'reactions-tooltip'}
    >
      <TooltipHeader>Reactions</TooltipHeader>
      <TooltipContent>
        {reactionsList}
        <TotalCountReactions
          onClick={onTotalCountClick}
          data-test-id={'reactions-tooltip:other-reactions'}
        >
          <TotalCountReactionsText>
            {abbreviatedTotalCount}
          </TotalCountReactionsText>
        </TotalCountReactions>
      </TooltipContent>
      <TooltipArrow ref={setArrowElement} style={styles.arrow} />
    </TooltipContainer>
  )
}

const TriggerContainer = styled.div``

const TooltipContainer = styled.div`
  --tooltipBackground: #fff;
  --tooltipBorder: #c0c0c0;

  display: flex;
  flex-direction: column;

  min-width: 100px;
  height: 82px;

  padding: 0.4rem;

  background-color: var(--tooltipBackground);
  box-shadow: 0 2px 4px rgb(0 0 0 / 18%);
  color: #000;

  border-radius: 8px;

  transition: opacity 0.3s;
  z-index: 9999;
`

const TooltipArrow = styled.div`
  position: absolute;

  left: 0px;
  bottom: 0;
  margin-bottom: -1rem;

  height: 1rem;
  width: 1rem;
  pointer-events: none;

  &::before {
    border-color: var(--tooltipBorder) transparent transparent transparent;
    border-width: 0.4rem 0.5rem 0 0.5rem;
    border-style: solid;

    position: absolute;
    top: 1px;
    margin: auto;

    display: block;
    content: '';

    height: 0;
    width: 0;
  }

  &::after {
    border-color: var(--tooltipBackground) transparent transparent transparent;
    border-width: 0.4rem 0.5rem 0 0.5rem;
    border-style: solid;

    display: block;
    content: '';

    position: absolute;
    margin: auto;

    height: 0;
    width: 0;
  }
`

const TooltipHeader = styled.span`
  text-align: center;

  font-family: EuclidCircularA, Segoe UI, Roboto, sans-serif;
  font-weight: 500;
  font-size: 1.2rem;

  line-height: 16px;
  letter-spacing: -0.04em;
`

const TooltipContent = styled.div`
  display: flex;
  flex-direction: row;

  margin-top: 7px;
`

const UserContainer = styled.div`
  display: flex;

  width: 42px;
  height: 42px;

  position: relative;
  margin-left: 12px;
`
const EmojiContainer = styled.div`
  display: flex;
  align-items: center;

  position: absolute;
  right: -9px;
  bottom: -7px;
`

const AvatarStyle = css`
  cursor: pointer;
`

const TotalCountReactions = styled.div`
  width: 51px;
  height: 50px;
  margin-left: 12px;
  margin-right: 12px;

  background-color: #f0f1f6;
  border-radius: 100%;
  cursor: pointer;

  color: #9ea9b2;

  display: flex;
  text-align: center;
  vertical-align: middle;
`

const TotalCountReactionsText = styled.span`
  margin: auto;
  font-size: 15px;
`
